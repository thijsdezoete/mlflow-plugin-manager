# MLflow Plugin Manager

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![PyPI](https://img.shields.io/pypi/v/mlflow-plugin-manager)
![Python](https://img.shields.io/pypi/pyversions/mlflow-plugin-manager)

**PyPI package management integrated directly into MLflow's web interface**

## 🚀 Quick Start

### Install from PyPI (Recommended)
```bash
pip install mlflow-plugin-manager
```

### Install from Source
```bash
git clone https://github.com/thijsdezoete/mlflow-plugin-manager.git
cd mlflow-plugin-manager
pip install -e .
```

## 📦 Core Features

- **📦 Direct PyPI Integration** - Install any MLflow-compatible package from PyPI through the web interface
- **🔄 Version Management** - Compare installed versions against latest PyPI releases, update or rollback as needed
- **🎯 Version Pinning** - Install specific package versions for reproducibility
- **🔍 Package Discovery** - Browse and search MLflow packages indexed from PyPI
- **📝 Installation Logs** - View complete pip output for debugging
- **🔧 REST API** - Programmatic access for CI/CD integration

## 🎮 Usage

Run the MLflow server with the Plugin Manager:

```bash
mlflow server --app-name plugin_manager
```

Access the Plugin Manager at:
- MLflow UI: http://localhost:5000
- Plugin Manager: http://localhost:5000/plugin-manager/
- Click "Plugins" in the sidebar for quick access

## ⚙️ Configuration

### Environment Variables

- `PLUGIN_SERVER_URL`: URL of the plugin metadata server
  - **Default**: `https://api.mlflowplugins.com` (production)
  - **Local Development**: Set to `http://localhost:5001` if running your own server

```bash
# Use production server (default)
mlflow server --app-name plugin_manager

# Use local server for development
export PLUGIN_SERVER_URL="http://localhost:5001"
mlflow server --app-name plugin_manager
```

## 🏗️ Architecture

The MLflow Plugin Manager consists of two components:

1. **MLflow Plugin** (this package): Integrates with MLflow's web interface and handles package installation locally via pip
2. **Metadata Server**: Provides plugin information (hosted at api.mlflowplugins.com)

> **Note**: Package installation happens locally on your machine. The remote server only provides plugin metadata (available packages, versions, etc.).

## 🔌 API Endpoints

- `GET /plugin-manager/` - Web interface
- `GET /plugin-manager/installed-plugins` - List installed packages
- `GET /plugin-manager/available-plugins` - Browse PyPI packages
- `POST /plugin-manager/install-plugin` - Install a package
- `POST /plugin-manager/uninstall-plugin` - Remove a package
- `GET /plugin-manager/check-plugin-updates` - Check for updates
- `POST /plugin-manager/upgrade-plugin` - Update a package

## 📋 Requirements

- Python 3.8+
- MLflow 2.0+ (optimized for 3.0+)
- pip package manager

## 🔧 Advanced: Running Your Own Metadata Server

For maintainers who want to run their own plugin metadata server:

```bash
cd server
python reindex_plugins.py  # Index packages from PyPI
python app.py              # Run metadata server on port 5001
```

> **Note**: End users don't need to run these commands - the default configuration uses api.mlflowplugins.com.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/thijsdezoete/mlflow-plugin-manager)
- [PyPI Package](https://pypi.org/project/mlflow-plugin-manager/)
- [Issue Tracker](https://github.com/thijsdezoete/mlflow-plugin-manager/issues)
- [MLflow Documentation](https://mlflow.org)


