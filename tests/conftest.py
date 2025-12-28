"""Pytest configuration and fixtures for MLflow Plugin Manager tests."""

import pytest
import sys
import os
from unittest.mock import MagicMock, patch


@pytest.fixture
def app():
    """Create a Flask app for testing the plugin API."""
    from flask import Flask, send_from_directory
    from mlflow_plugin_manager.api.endpoints import plugin_api
    from mlflow_plugin_manager import _get_package_paths

    app = Flask(__name__)
    app.config['TESTING'] = True

    # Add custom_static route (same as in main app)
    paths = _get_package_paths()

    @app.route("/plugin-static/<path:filename>")
    def custom_static(filename):
        return send_from_directory(paths["static_dir"], filename)

    # Register the blueprint
    app.register_blueprint(plugin_api, url_prefix='/plugin-manager')

    return app


@pytest.fixture
def client(app):
    """Create a test client for the Flask app."""
    with app.test_client() as client:
        yield client


@pytest.fixture
def mock_pip_freeze():
    """Mock pip freeze output with sample packages."""
    return """mlflow==3.8.0
mlflow-plugin-manager==0.2.0
mlflow-export-import==1.0.0
requests==2.31.0
flask==3.0.0
"""


@pytest.fixture
def mock_plugin_server_response():
    """Mock response from the plugin metadata server."""
    return [
        {"name": "mlflow-export-import", "version": "1.0.0"},
        {"name": "mlflow-vizmod", "version": "0.1.0"},
        {"name": "mlflow-skinny", "version": "3.8.0"},
    ]


def get_mlflow_version():
    """Get the installed MLflow version for conditional testing."""
    try:
        import mlflow
        return mlflow.__version__
    except ImportError:
        return None


def is_mlflow2():
    """Check if MLflow 2.x is installed."""
    version = get_mlflow_version()
    return version and version.startswith('2.')


def is_mlflow3():
    """Check if MLflow 3.x is installed."""
    version = get_mlflow_version()
    return version and version.startswith('3.')
