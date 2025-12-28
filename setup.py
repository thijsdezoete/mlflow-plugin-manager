from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="mlflow-plugin-manager",
    version="0.2.0",
    author="Thijs de Zoete",
    author_email="",
    description="PyPI package management integrated directly into MLflow's web interface",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/thijsdezoete/mlflow-plugin-manager",
    project_urls={
        "Bug Tracker": "https://github.com/thijsdezoete/mlflow-plugin-manager/issues",
        "Documentation": "https://thijsdezoete.github.io/mlflow-plugin-manager/",
        "Source": "https://github.com/thijsdezoete/mlflow-plugin-manager",
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "Intended Audience :: Science/Research",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Programming Language :: Python :: 3.13",
    ],
    packages=find_packages(exclude=["server*", "docs*", "tests*", "landing*"]),
    python_requires=">=3.10",
    install_requires=[
        # Core dependencies only - these are essential
        "flask>=2.0.0",  # For Blueprint and web interface
        "requests>=2.25.0",  # For API calls to plugin server
        "packaging>=20.0",  # For version comparison
        "asgiref>=3.4.0",  # For ASGI/WSGI compatibility with MLflow 3+
        "starlette>=0.27.0",  # For FastAPI middleware (MLflow 3.x)
        # Note: mlflow is NOT a dependency - it's the host application
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "black>=22.0.0",
            "flake8>=4.0.0",
        ],
        "server": [
            # Dependencies for running your own metadata server
            "flask-sqlalchemy>=2.5.0",
            "flask-migrate>=3.0.0",
            "flask-login>=0.5.0",
        ],
    },
    entry_points={
        "mlflow.app": [
            "plugin_manager = mlflow_plugin_manager:create_app"
        ],
    },
    include_package_data=True,
    package_data={
        'mlflow_plugin_manager': [
            'templates/*.html',
            'static/*.js',
            'static/*.css',
            'static/*.html',
        ],
    },
)
