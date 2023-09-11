# MLflow Plugin Manager

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

Welcome to the MLflow Plugin Manager, inspired by wbond's package manager for Sublime Text. This tool seamlessly integrates with MLflow, allowing you to install, update, and uninstall MLflow plugins directly from the MLflow web interface.

## Features
- 🛠 **Install** new MLflow plugins with ease.
- 🔄 **Update** existing plugins to their latest versions.
- 🗑 **Uninstall** plugins you no longer need.
- 🌐 Direct integration into the MLflow web interface.

## Installation

1. Clone this repository:
   ```bash
   git clone git@github.com:thijsdezoete/mlflow-plugin-manager.git

    ```
Navigate to the cloned directory and install the package:

```bash
cd mlflow-plugin-manager
pip install -e .
```

# Usage

To run the MLflow server with the Plugin Manager, use the following command:

```bash
mlflow server --dev --app-name plugin_manager
```

Once the server is running, navigate to the MLflow web interface. You'll find the Plugin Manager integrated and ready for use.

localhost:5000/plugin-manager/

# License

This project is licensed under the MIT License. Refer to the LICENSE file for more details.


