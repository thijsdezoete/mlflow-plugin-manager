from setuptools import setup, find_packages

setup(
    name="mlflow-plugin-manager",
    version="0.1",
    packages=find_packages(),
    entry_points={
        "mlflow.app": [
            "plugin_manager = mlflow_plugin_manager:app"
        ],
    },
)
