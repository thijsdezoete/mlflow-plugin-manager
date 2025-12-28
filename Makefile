# MLflow Plugin Manager - Makefile
# ================================
# Quick commands for development and deployment

.PHONY: help install dev build run test lint clean docker-build docker-run docker-stop

# Default target
help:
	@echo "MLflow Plugin Manager - Available Commands"
	@echo "==========================================="
	@echo ""
	@echo "Development:"
	@echo "  make install     - Install the plugin in development mode"
	@echo "  make dev         - Run MLflow with plugin manager (development)"
	@echo "  make test        - Run the test suite"
	@echo "  make lint        - Run code linting (black, flake8)"
	@echo "  make format      - Auto-format code with black"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-build   - Build the Docker image"
	@echo "  make docker-run     - Run MLflow in Docker container"
	@echo "  make docker-stop    - Stop the Docker container"
	@echo "  make docker-logs    - View container logs"
	@echo "  make docker-shell   - Open shell in running container"
	@echo ""
	@echo "Testing MLflow Versions:"
	@echo "  make test-mlflow2   - Test with MLflow 2.x (latest 2.x)"
	@echo "  make test-mlflow3   - Test with MLflow 3.x (latest)"
	@echo ""
	@echo "Release:"
	@echo "  make build       - Build the package for PyPI"
	@echo "  make clean       - Remove build artifacts"
	@echo ""

# =============================================================================
# Development
# =============================================================================

# Install in development mode
install:
	pip install -e ".[dev]"

# Run MLflow with plugin manager in development mode
dev:
	@echo "Starting MLflow with Plugin Manager..."
	@echo "Access at: http://localhost:5000"
	@echo "Plugin Manager at: http://localhost:5000/plugin-manager/"
	mlflow server --host 0.0.0.0 --port 5001 --app-name plugin_manager

# Run with local metadata server
dev-local:
	PLUGIN_SERVER_URL=http://localhost:5001 mlflow server --host 0.0.0.0 --port 5000 --app-name plugin_manager

# Run the metadata server (for development)
server:
	cd server && python app.py

# =============================================================================
# Testing
# =============================================================================

# Run all tests
test:
	pytest tests/ -v --tb=short

# Run tests with coverage
test-cov:
	pytest tests/ -v --cov=mlflow_plugin_manager --cov-report=html --cov-report=term

# Test with MLflow 2.x
test-mlflow2:
	pip install "mlflow>=2.0,<3.0"
	pytest tests/ -v -k "mlflow2 or not mlflow_version"

# Test with MLflow 3.x
test-mlflow3:
	pip install "mlflow>=3.0"
	pytest tests/ -v -k "mlflow3 or not mlflow_version"

# =============================================================================
# Code Quality
# =============================================================================

# Run linting
lint:
	flake8 mlflow_plugin_manager/ tests/ --max-line-length=120
	black --check mlflow_plugin_manager/ tests/

# Auto-format code
format:
	black mlflow_plugin_manager/ tests/

# =============================================================================
# Docker
# =============================================================================

DOCKER_IMAGE_NAME ?= mlflow-plugin-manager
DOCKER_CONTAINER_NAME ?= mlflow-pm
MLFLOW_VERSION ?= 3.8.0
PYTHON_VERSION ?= 3.12

# Build Docker image
docker-build:
	docker build \
		--build-arg PYTHON_VERSION=$(PYTHON_VERSION) \
		--build-arg MLFLOW_VERSION=$(MLFLOW_VERSION) \
		-t $(DOCKER_IMAGE_NAME):latest \
		-t $(DOCKER_IMAGE_NAME):mlflow-$(MLFLOW_VERSION) \
		.

# Run Docker container
docker-run:
	docker run -d \
		--name $(DOCKER_CONTAINER_NAME) \
		-p 5000:5000 \
		-v mlflow-data:/home/mlflow/mlruns \
		-v mlflow-artifacts:/home/mlflow/mlartifacts \
		$(DOCKER_IMAGE_NAME):latest
	@echo "MLflow started at http://localhost:5000"
	@echo "Plugin Manager at http://localhost:5000/plugin-manager/"

# Stop Docker container
docker-stop:
	docker stop $(DOCKER_CONTAINER_NAME) || true
	docker rm $(DOCKER_CONTAINER_NAME) || true

# View Docker logs
docker-logs:
	docker logs -f $(DOCKER_CONTAINER_NAME)

# Open shell in container
docker-shell:
	docker exec -it $(DOCKER_CONTAINER_NAME) /bin/bash

# Restart container
docker-restart: docker-stop docker-run

# Build and run (convenience)
docker: docker-build docker-run

# Build for multiple MLflow versions (for testing)
docker-build-all:
	docker build --build-arg MLFLOW_VERSION=2.18.0 -t $(DOCKER_IMAGE_NAME):mlflow-2.18 .
	docker build --build-arg MLFLOW_VERSION=3.0.0 -t $(DOCKER_IMAGE_NAME):mlflow-3.0 .
	docker build --build-arg MLFLOW_VERSION=3.8.0 -t $(DOCKER_IMAGE_NAME):mlflow-3.8 .

# =============================================================================
# Release
# =============================================================================

# Build package
build:
	python -m build

# Clean build artifacts
clean:
	rm -rf build/ dist/ *.egg-info/
	rm -rf .pytest_cache/ .coverage htmlcov/
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete

# Upload to PyPI (requires credentials)
publish: clean build
	twine upload dist/*

# Upload to Test PyPI
publish-test: clean build
	twine upload --repository testpypi dist/*
