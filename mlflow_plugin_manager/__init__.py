from flask import Flask, send_from_directory, Response
import os


def create_app():
    """Create and configure the MLflow plugin manager app."""
    from mlflow.server import app, _add_static_prefix
    from .api.endpoints import plugin_api
    
    package_dir = os.path.dirname(os.path.abspath(__file__))
    template_dir = os.path.join(package_dir, 'templates')
    
    app.jinja_loader.searchpath.append(template_dir)
    
    plugin_static_folder = os.path.join(package_dir, 'static')
    
    @app.route('/plugin-static/<path:filename>')
    def custom_static(filename):
        """Serve the plugin's static files."""
        return send_from_directory(plugin_static_folder, filename)
    
    # Register our blueprint
    app.register_blueprint(
        plugin_api,
        url_prefix="/plugin-manager",
        template_folder="templates",
        static_folder="static"
    )
    
    # Override the root route to inject our menu item
    original_serve = None
    for rule in app.url_map.iter_rules():
        if rule.endpoint == 'serve':
            original_serve = app.view_functions[rule.endpoint]
            break
    
    if original_serve:
        @app.route(_add_static_prefix("/"), methods=['GET'])
        def serve_with_injection():
            import os
            from flask import send_from_directory
            
            if os.path.exists(os.path.join(app.static_folder, "index.html")):
                try:
                    with open(os.path.join(app.static_folder, "index.html"), 'r') as f:
                        html = f.read()
                    
                    injection = '<script src="/plugin-static/menu_injector.js"></script>\n</head>'
                    html = html.replace('</head>', injection)
                    
                    return Response(html, mimetype='text/html')
                except Exception as e:
                    app.logger.warning(f"Could not inject plugin menu: {e}")
                    return original_serve()
            
            return original_serve()
        
        app.view_functions['serve'] = serve_with_injection
    
    # If running under Uvicorn (ASGI), wrap the Flask app
    try:
        from asgiref.wsgi import WsgiToAsgi
        return WsgiToAsgi(app)
    except ImportError:
        return app


app = create_app

