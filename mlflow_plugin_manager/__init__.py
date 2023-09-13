from flask import Flask, send_from_directory
from mlflow.server import app
from .api.endpoints import plugin_api
import os

template_dir = os.path.abspath('mlflow_plugin_manager/templates')

app.jinja_loader.searchpath.append(os.path.abspath('mlflow_plugin_manager/templates'))



plugin_static_folder = os.path.abspath('mlflow_plugin_manager/static')

@app.route('/plugin-static/<path:filename>')
def custom_static(filename):
    """Serve the plugin's static files."""
    return send_from_directory(plugin_static_folder, filename)

app.register_blueprint(
    plugin_api,
    url_prefix="/plugin-manager",
    template_folder="templates",
    static_folder="static"
)

