from mlflow_plugin_manager import app
from flask import Blueprint, jsonify, render_template, request
import subprocess
import requests
from packaging import version

plugin_api = Blueprint('plugin_api', __name__ )

@plugin_api.route('/')
def index():
	return render_template('plugin_manager.html')


@plugin_api.route('/available-plugins', methods=['GET'])
def available_plugins():
    try:
        response = requests.get("http://localhost:5001/browse-plugins")
        # response = requests.get("https://plugin.mlflowplugins.com/browse-plugins")

        if response.status_code == 200:
            plugins = list([{'name': plugin['name'], "version": plugin['version']} for plugin in response.json()])
            return jsonify(plugins)
    except Exception as e:
        print(e)
        pass
    return jsonify({"error": "Failed to fetch available plugins from server."}), 500


@plugin_api.route('/installed-plugins', methods=['GET'])
def installed_plugins():
    try:
        result = subprocess.run(["pip", "freeze"], check=True, text=True, capture_output=True)
        installed_packages = result.stdout.splitlines()

        def extract_name_version(pkg_str):
            if '==' in pkg_str:
                name, version = pkg_str.split('==')
                return {"name": name, "version": version}
            elif "#egg=" in pkg_str:
                name = pkg_str.split("#egg=")[-1]

                version = pkg_str.split('@')[-1].split('#')[0]
                return {"name": name, "version": version}
            else:
                return None

        mlflow_plugins = [extract_name_version(pkg) for pkg in installed_packages if 'mlflow-' in pkg and '-plugin' in pkg]
        mlflow_plugins_non_conformative = [extract_name_version(pkg) for pkg in installed_packages if 'mlflow-' in pkg]
        plugin_mlflow = [extract_name_version(pkg) for pkg in installed_packages if 'plugin-' in pkg and '-mlflow' in pkg]

        
        all_plugins = mlflow_plugins + plugin_mlflow + mlflow_plugins_non_conformative

        unique_plugins = {}
        for plugin in all_plugins:
            unique_plugins[plugin["name"]] = plugin

        plugins = list(unique_plugins.values())

        return jsonify(plugins)

    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Failed to fetch installed plugins. Error:\n{e.stderr}"}), 500
    return jsonify(plugins)


@plugin_api.route('/install-plugin', methods=['POST'])
def install_plugin():
    plugin_name = request.args.get('name')
    if not plugin_name:
        return jsonify({"error": "Plugin name is required."}), 400

    # response = requests.get(f"https://plugin.mlflowplugins.com/is-approved?name={plugin_name}")
    # if response.status_code != 200 or not response.json().get("approved"):
    #     return jsonify({"error": f"Plugin {plugin_name} is not approved for installation."}), 403

    try:
        result = subprocess.run(["pip", "install", plugin_name], check=True, text=True, capture_output=True)
        return jsonify({"message": f"Successfully installed {plugin_name}!\n{result.stdout}"}), 200

    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Failed to install {plugin_name}. Error:\n{e.stderr}"}), 500


@plugin_api.route('/uninstall-plugin', methods=['POST'])
def uninstall_plugin():
    plugin_name = request.args.get('name')
    if not plugin_name:
        return jsonify({"error": "Plugin name is required."}), 400

    installed = installed_plugins()
    installed_names = [x['name'] for x in installed.json]
    if plugin_name not in installed_names:
        return jsonify({"error": f"Plugin {plugin_name} is not installed."}), 404

    try:
        result = subprocess.run(["pip", "uninstall", "-y", plugin_name], check=True, text=True, capture_output=True)
        return jsonify({"message": f"Successfully uninstalled {plugin_name}!\n{result.stdout}"}), 200

    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Failed to uninstall {plugin_name}. Error:\n{e.stderr}"}), 500


@plugin_api.route('/check-plugin-updates', methods=['GET'])
def check_plugin_updates():
    try:
        installed = installed_plugins()
        if "error" in installed.json:
            return installed

        updates_available = {}

        # hacky, but it'll do for now
        for plugin in [x['name'] for x in installed.json]:
            # Fetch the latest version from PyPI
            response = requests.get(f"https://pypi.org/pypi/{plugin}/json")
            if response.status_code == 200:
                latest_version = response.json()["info"]["version"]

                # Fetch current installed version
                result = subprocess.run(["pip", "show", plugin], check=True, text=True, capture_output=True)
                installed_version_line = [line for line in result.stdout.splitlines() if line.startswith('Version: ')]
                installed_version = installed_version_line[0].split(': ')[1] if installed_version_line else None

                if installed_version and version.parse(installed_version) < version.parse(latest_version):
                    updates_available[plugin] = {
                        "current_version": installed_version,
                        "latest_version": latest_version
                    }

        return jsonify(updates_available)

    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Failed to fetch plugin updates. Error:\n{e.stderr}"}), 500


@plugin_api.route('/upgrade-plugin', methods=['POST'])
def upgrade_plugin():
    plugin_name = request.args.get('name')
    if not plugin_name:
        return jsonify({"error": "Plugin name is required."}), 400

    try:
        # Upgrade the specified plugin
        result = subprocess.run(["pip", "install", "--upgrade", plugin_name], check=True, text=True, capture_output=True)
        return jsonify({"message": f"Successfully upgraded {plugin_name}!\n{result.stdout}"}), 200

    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Failed to upgrade {plugin_name}. Error:\n{e.stderr}"}), 500

