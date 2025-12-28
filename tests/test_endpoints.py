"""Tests for the plugin manager API endpoints."""

import pytest
from unittest.mock import patch, MagicMock


class TestIndex:
    """Tests for the index route."""

    def test_returns_html(self, client):
        """Should return the plugin manager HTML page."""
        response = client.get('/plugin-manager/')
        assert response.status_code == 200
        assert b'Plugin Manager' in response.data


class TestInstalledPlugins:
    """Tests for the installed-plugins endpoint."""

    def test_returns_json(self, client):
        """Should return a JSON response."""
        with patch('subprocess.run') as mock_run:
            mock_run.return_value = MagicMock(
                stdout='mlflow-test-plugin==1.0.0\n',
                returncode=0
            )
            response = client.get('/plugin-manager/installed-plugins')
            assert response.status_code == 200
            assert response.content_type == 'application/json'

    def test_filters_mlflow_packages(self, client):
        """Should only return packages with mlflow in the name."""
        pip_output = """mlflow==3.8.0
mlflow-export-import==1.0.0
requests==2.31.0
numpy==1.24.0
mlflow-plugin-manager==0.2.0
"""
        with patch('subprocess.run') as mock_run:
            mock_run.return_value = MagicMock(
                stdout=pip_output,
                returncode=0
            )
            response = client.get('/plugin-manager/installed-plugins')
            data = response.get_json()

            names = [p['name'] for p in data]
            assert 'requests' not in names
            assert 'numpy' not in names
            # mlflow- packages should be included
            assert 'mlflow-export-import' in names


class TestAvailablePlugins:
    """Tests for the available-plugins endpoint."""

    def test_returns_json(self, client):
        """Should return a JSON response from the plugin server."""
        mock_plugins = [
            {"name": "mlflow-test", "version": "1.0.0"},
        ]
        with patch('requests.get') as mock_get:
            mock_response = MagicMock()
            mock_response.status_code = 200
            mock_response.json.return_value = mock_plugins
            mock_get.return_value = mock_response

            response = client.get('/plugin-manager/available-plugins')
            assert response.status_code == 200
            assert response.content_type == 'application/json'

    def test_handles_server_unavailable(self, client):
        """Should return empty list if plugin server is unavailable."""
        import requests as req
        with patch('requests.get') as mock_get:
            mock_get.side_effect = req.exceptions.ConnectionError()

            response = client.get('/plugin-manager/available-plugins')
            assert response.status_code == 200
            assert response.get_json() == []


class TestInstallPlugin:
    """Tests for the install-plugin endpoint."""

    def test_requires_plugin_name(self, client):
        """Should return 400 if no plugin name provided."""
        response = client.post('/plugin-manager/install-plugin')
        assert response.status_code == 400

    def test_installs_plugin(self, client):
        """Should call pip install with the plugin name."""
        with patch('subprocess.run') as mock_run:
            mock_run.return_value = MagicMock(
                stdout='Successfully installed test-plugin',
                returncode=0
            )
            response = client.post('/plugin-manager/install-plugin?name=test-plugin')
            assert response.status_code == 200
            mock_run.assert_called_once()
            args = mock_run.call_args[0][0]
            assert 'pip' in args
            assert 'install' in args
            assert 'test-plugin' in args

    def test_installs_specific_version(self, client):
        """Should install specific version when provided."""
        with patch('subprocess.run') as mock_run:
            mock_run.return_value = MagicMock(
                stdout='Successfully installed test-plugin==1.0.0',
                returncode=0
            )
            response = client.post('/plugin-manager/install-plugin?name=test-plugin&version=1.0.0')
            assert response.status_code == 200
            args = mock_run.call_args[0][0]
            assert 'test-plugin==1.0.0' in args


class TestUninstallPlugin:
    """Tests for the uninstall-plugin endpoint."""

    def test_requires_plugin_name(self, client):
        """Should return 400 if no plugin name provided."""
        response = client.post('/plugin-manager/uninstall-plugin')
        assert response.status_code == 400

    def test_checks_if_installed(self, client):
        """Should return 404 if plugin not installed."""
        with patch('subprocess.run') as mock_run:
            mock_run.return_value = MagicMock(
                stdout='flask==3.0.0\nrequests==2.31.0',
                returncode=0
            )
            response = client.post('/plugin-manager/uninstall-plugin?name=nonexistent-plugin')
            assert response.status_code == 404


class TestUpgradePlugin:
    """Tests for the upgrade-plugin endpoint."""

    def test_requires_plugin_name(self, client):
        """Should return 400 if no plugin name provided."""
        response = client.post('/plugin-manager/upgrade-plugin')
        assert response.status_code == 400

    def test_upgrades_plugin(self, client):
        """Should call pip install --upgrade."""
        with patch('subprocess.run') as mock_run:
            mock_run.return_value = MagicMock(
                stdout='Successfully upgraded test-plugin',
                returncode=0
            )
            response = client.post('/plugin-manager/upgrade-plugin?name=test-plugin')
            assert response.status_code == 200
            args = mock_run.call_args[0][0]
            assert '--upgrade' in args


class TestCheckUpdates:
    """Tests for the check-plugin-updates endpoint."""

    def test_returns_dict(self, client):
        """Should return a dictionary."""
        with patch('subprocess.run') as mock_run:
            # pip freeze returns no mlflow plugins
            mock_run.return_value = MagicMock(
                stdout='flask==3.0.0\n',
                returncode=0
            )

            response = client.get('/plugin-manager/check-plugin-updates')
            assert response.status_code == 200
            data = response.get_json()
            assert isinstance(data, dict)
