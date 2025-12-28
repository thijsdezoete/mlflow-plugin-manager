"""Integration tests for MLflow compatibility."""

import pytest
from unittest.mock import patch, MagicMock
import sys


class TestCreateApp:
    """Test the create_app factory function."""

    def test_create_app_is_callable(self):
        """create_app should be a callable factory function."""
        from mlflow_plugin_manager import create_app
        assert callable(create_app)

    def test_version_defined(self):
        """Package should have a version defined."""
        from mlflow_plugin_manager import __version__
        assert __version__ is not None
        assert isinstance(__version__, str)


class TestFlaskSetup:
    """Tests for Flask app setup."""

    def test_setup_flask_app_registers_blueprint(self):
        """Should register the plugin blueprint on Flask app."""
        from flask import Flask
        from mlflow_plugin_manager import _setup_flask_app

        app = Flask(__name__)

        with patch('mlflow_plugin_manager._inject_menu_flask'):
            _setup_flask_app(app)

        assert 'plugin_api' in app.blueprints

    def test_setup_flask_app_adds_static_route(self):
        """Should add /plugin-static/ route."""
        from flask import Flask
        from mlflow_plugin_manager import _setup_flask_app

        app = Flask(__name__)

        with patch('mlflow_plugin_manager._inject_menu_flask'):
            _setup_flask_app(app)

        rules = [rule.rule for rule in app.url_map.iter_rules()]
        assert '/plugin-static/<path:filename>' in rules


class TestServerDetection:
    """Tests for server type detection."""

    def test_detect_server_type_returns_tuple(self):
        """Should return (framework, server) tuple."""
        from mlflow_plugin_manager import _detect_server_type

        result = _detect_server_type()
        assert isinstance(result, tuple)
        assert len(result) == 2

    def test_detects_gunicorn(self):
        """Should detect gunicorn when module is loaded."""
        from mlflow_plugin_manager import _detect_server_type

        with patch.dict(sys.modules, {'gunicorn': MagicMock()}):
            framework, server = _detect_server_type()
            assert server == 'gunicorn'


class TestPackagePaths:
    """Tests for package path resolution."""

    def test_get_package_paths_returns_dict(self):
        """Should return dictionary with package paths."""
        from mlflow_plugin_manager import _get_package_paths

        paths = _get_package_paths()

        assert isinstance(paths, dict)
        assert 'package_dir' in paths
        assert 'template_dir' in paths
        assert 'static_dir' in paths

    def test_paths_are_absolute(self):
        """All paths should be absolute."""
        import os
        from mlflow_plugin_manager import _get_package_paths

        paths = _get_package_paths()

        for key, path in paths.items():
            assert os.path.isabs(path), f"{key} should be absolute path"

    def test_paths_exist(self):
        """Package paths should exist."""
        import os
        from mlflow_plugin_manager import _get_package_paths

        paths = _get_package_paths()

        assert os.path.isdir(paths['package_dir'])
        assert os.path.isdir(paths['template_dir'])
        assert os.path.isdir(paths['static_dir'])
