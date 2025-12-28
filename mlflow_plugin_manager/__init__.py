"""
MLflow Plugin Manager - PyPI package management integrated into MLflow's web interface.

Supports:
- MLflow 2.x (Flask + Gunicorn/WSGI)
- MLflow 3.x (Flask + Gunicorn/WSGI)
- MLflow 3.x (FastAPI + Uvicorn/ASGI)
"""

import os
import sys
import logging

logger = logging.getLogger(__name__)

# Package metadata
__version__ = "0.2.0"


def _get_package_paths():
    """Get paths to plugin package resources."""
    package_dir = os.path.dirname(os.path.abspath(__file__))
    return {
        "package_dir": package_dir,
        "template_dir": os.path.join(package_dir, "templates"),
        "static_dir": os.path.join(package_dir, "static"),
    }


def _detect_server_type():
    """
    Detect what type of server MLflow is running.

    Returns:
        tuple: (framework, server) e.g. ('flask', 'gunicorn'), ('fastapi', 'uvicorn')
    """
    # Check for ASGI servers
    is_uvicorn = (
        "uvicorn" in sys.modules
        or any("uvicorn" in str(arg).lower() for arg in sys.argv)
    )

    # Check for WSGI servers
    is_gunicorn = (
        "gunicorn" in sys.modules
        or any("gunicorn" in str(arg).lower() for arg in sys.argv)
    )

    is_waitress = "waitress" in sys.modules

    # Determine server type
    if is_uvicorn:
        server = "uvicorn"
    elif is_gunicorn:
        server = "gunicorn"
    elif is_waitress:
        server = "waitress"
    else:
        server = "unknown"

    # Try to detect framework
    # Check if MLflow has FastAPI (3.x default)
    try:
        from mlflow.server import fastapi_app
        framework = "fastapi"
    except ImportError:
        framework = "flask"

    logger.info(f"Detected server environment: {framework}/{server}")
    return framework, server


def _setup_flask_app(flask_app):
    """
    Configure the Flask app for MLflow 2.x or Flask-based MLflow 3.x.

    Args:
        flask_app: The Flask application instance from mlflow.server
    """
    from flask import send_from_directory
    from .api.endpoints import plugin_api

    paths = _get_package_paths()

    # Add our templates to Jinja loader
    if hasattr(flask_app, "jinja_loader") and flask_app.jinja_loader:
        if hasattr(flask_app.jinja_loader, "searchpath"):
            flask_app.jinja_loader.searchpath.append(paths["template_dir"])

    # Serve plugin static files
    @flask_app.route("/plugin-static/<path:filename>")
    def custom_static(filename):
        """Serve the plugin's static files."""
        return send_from_directory(paths["static_dir"], filename)

    # Register the plugin API blueprint
    flask_app.register_blueprint(
        plugin_api,
        url_prefix="/plugin-manager",
        template_folder="templates",
        static_folder="static",
    )

    # Inject menu item into MLflow's index.html
    _inject_menu_flask(flask_app)

    logger.info("MLflow Plugin Manager registered (Flask mode)")
    return flask_app


def _inject_menu_flask(flask_app):
    """Inject the menu injector script into MLflow's index.html for Flask."""
    from flask import Response

    try:
        from mlflow.server import _add_static_prefix
    except ImportError:
        # Fallback for older MLflow versions
        _add_static_prefix = lambda x: x

    # Find the original serve function
    original_serve = None
    for rule in flask_app.url_map.iter_rules():
        if rule.endpoint == "serve":
            original_serve = flask_app.view_functions[rule.endpoint]
            break

    if not original_serve:
        logger.warning("Could not find 'serve' endpoint to inject menu")
        return

    @flask_app.route(_add_static_prefix("/"), methods=["GET"])
    def serve_with_injection():
        if flask_app.static_folder and os.path.exists(
            os.path.join(flask_app.static_folder, "index.html")
        ):
            try:
                with open(
                    os.path.join(flask_app.static_folder, "index.html"), "r"
                ) as f:
                    html = f.read()

                # Inject menu script before </head> (v2 for Flask/Gunicorn)
                injection = '<script src="/plugin-static/menu_injector_v2.js"></script>\n</head>'
                html = html.replace("</head>", injection)

                return Response(html, mimetype="text/html")
            except Exception as e:
                logger.warning(f"Could not inject plugin menu: {e}")
                return original_serve()

        return original_serve()

    flask_app.view_functions["serve"] = serve_with_injection


def _setup_fastapi_app(fastapi_app):
    """
    Configure the FastAPI app for MLflow 3.x with Uvicorn.

    Args:
        fastapi_app: The FastAPI application instance
    """
    try:
        from starlette.middleware.wsgi import WSGIMiddleware
    except ImportError as e:
        logger.error(f"Starlette not available: {e}")
        raise

    from flask import Flask
    from .api.endpoints import plugin_api

    paths = _get_package_paths()

    # Create a mini Flask app for our plugin (reuses existing Flask blueprint)
    plugin_flask_app = Flask(
        __name__,
        template_folder=paths["template_dir"],
        static_folder=paths["static_dir"],
    )

    # Add custom_static route for template url_for() calls
    # The route path must match what the middleware serves (/plugin-static/)
    from flask import send_from_directory

    @plugin_flask_app.route("/plugin-static/<path:filename>")
    def custom_static(filename):
        return send_from_directory(paths["static_dir"], filename)

    plugin_flask_app.register_blueprint(plugin_api, url_prefix="")

    # Wrap Flask app with WSGI adapter for use in middleware
    wsgi_app = WSGIMiddleware(plugin_flask_app)

    # Handle everything via middleware (MLflow's catch-all mount blocks normal routes)
    _inject_menu_fastapi(fastapi_app, paths["static_dir"], wsgi_app)

    logger.info("MLflow Plugin Manager registered (FastAPI mode)")
    return fastapi_app


def _inject_menu_fastapi(fastapi_app, static_dir, wsgi_app):
    """Inject menu script and serve static files for FastAPI-based MLflow 3.x."""
    try:
        from starlette.responses import Response, FileResponse
    except ImportError:
        logger.warning("Starlette not available, skipping menu injection")
        return

    # Use pure ASGI middleware (BaseHTTPMiddleware breaks WSGI mounts)
    class PluginMiddleware:
        def __init__(self, app):
            self.app = app

        async def __call__(self, scope, receive, send):
            if scope["type"] != "http":
                await self.app(scope, receive, send)
                return

            path = scope["path"]

            # Serve static files for /plugin-static/*
            if path.startswith("/plugin-static/"):
                filename = path[len("/plugin-static/"):]
                file_path = os.path.join(static_dir, filename)
                if os.path.isfile(file_path):
                    if filename.endswith('.js'):
                        media_type = 'application/javascript'
                    elif filename.endswith('.css'):
                        media_type = 'text/css'
                    else:
                        media_type = 'application/octet-stream'
                    response = FileResponse(file_path, media_type=media_type)
                else:
                    response = Response(content="File not found", status_code=404)
                await response(scope, receive, send)
                return

            # Handle plugin manager requests via our Flask app
            if path.startswith("/plugin-manager"):
                # Strip prefix for the Flask app
                new_scope = dict(scope)
                new_scope["path"] = path[len("/plugin-manager"):] or "/"
                new_scope["raw_path"] = new_scope["path"].encode()
                await wsgi_app(new_scope, receive, send)
                return

            # For index pages, we need to intercept and modify the response
            if path in ("/", "/index.html"):
                # Collect the response
                initial_message = {}
                body_parts = []

                async def receive_wrapper():
                    return await receive()

                async def send_wrapper(message):
                    nonlocal initial_message, body_parts
                    if message["type"] == "http.response.start":
                        initial_message = message
                    elif message["type"] == "http.response.body":
                        body_parts.append(message.get("body", b""))
                        if not message.get("more_body", False):
                            # Check if it's HTML
                            headers = dict(initial_message.get("headers", []))
                            content_type = headers.get(b"content-type", b"").decode()
                            if content_type.startswith("text/html"):
                                try:
                                    body = b"".join(body_parts)
                                    html = body.decode("utf-8")
                                    injection = '<script src="/plugin-static/menu_injector_v3.js"></script>\n</head>'
                                    html = html.replace("</head>", injection)
                                    new_body = html.encode("utf-8")

                                    # Send modified response
                                    new_headers = [
                                        (k, v) for k, v in initial_message.get("headers", [])
                                        if k.lower() != b"content-length"
                                    ]
                                    new_headers.append((b"content-length", str(len(new_body)).encode()))

                                    await send({
                                        "type": "http.response.start",
                                        "status": initial_message.get("status", 200),
                                        "headers": new_headers,
                                    })
                                    await send({
                                        "type": "http.response.body",
                                        "body": new_body,
                                    })
                                    return
                                except Exception as e:
                                    logger.warning(f"Could not inject plugin menu: {e}")

                            # Send original response
                            await send(initial_message)
                            await send({"type": "http.response.body", "body": b"".join(body_parts)})

                await self.app(scope, receive_wrapper, send_wrapper)
                return

            # Pass through all other requests
            await self.app(scope, receive, send)

    fastapi_app.add_middleware(PluginMiddleware)


def create_app():
    """
    Create and configure the MLflow plugin manager app.

    This is the entry point called by MLflow when using --app-name plugin_manager.
    Automatically detects the MLflow version and server type.

    Returns:
        The configured application
    """
    framework, server = _detect_server_type()

    # Case 1: MLflow 3.x with FastAPI + Uvicorn (ASGI)
    if framework == "fastapi" and server == "uvicorn":
        try:
            from mlflow.server.fastapi_app import app as fastapi_app
            if hasattr(fastapi_app, "add_middleware"):
                _setup_fastapi_app(fastapi_app)
                return fastapi_app
        except ImportError:
            logger.info("FastAPI app not available, falling back to Flask")
        except Exception as e:
            logger.warning(f"FastAPI setup failed: {e}, falling back to Flask")

    # Case 2: Any MLflow version with Flask (Gunicorn/Waitress/WSGI)
    try:
        from mlflow.server import app as flask_app
        _setup_flask_app(flask_app)

        # Only wrap with ASGI if we're definitely running under Uvicorn
        # and Flask is being used (unusual but possible)
        if server == "uvicorn":
            try:
                from asgiref.wsgi import WsgiToAsgi
                logger.info("Wrapping Flask with ASGI adapter for Uvicorn")
                return WsgiToAsgi(flask_app)
            except ImportError:
                logger.warning("asgiref not available, returning Flask app directly")

        # Return Flask app for WSGI servers (Gunicorn, Waitress, dev server)
        return flask_app

    except ImportError as e:
        raise ImportError(
            "Could not import MLflow server. "
            "Make sure MLflow is installed: pip install mlflow"
        ) from e


# Entry point compatibility
# MLflow calls either `create_app` (factory) or `app` (instance)
app = create_app
