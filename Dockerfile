# MLflow Plugin Manager
# Dockerfile for running MLflow with the plugin manager installed

ARG PYTHON_VERSION=3.12
ARG MLFLOW_VERSION=3.8.0

FROM python:${PYTHON_VERSION}-slim

ARG MLFLOW_VERSION

LABEL maintainer="Thijs de Zoete"
LABEL description="MLflow with Plugin Manager - Visual package management for MLflow"
LABEL version="0.2.0"

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN useradd --create-home --shell /bin/bash mlflow
WORKDIR /home/mlflow

# Install MLflow
RUN pip install mlflow==${MLFLOW_VERSION}

# Copy and install the plugin manager
COPY --chown=mlflow:mlflow . /home/mlflow/plugin-manager/
RUN pip install -e /home/mlflow/plugin-manager/

# Create directories for MLflow data
RUN mkdir -p /home/mlflow/mlruns /home/mlflow/mlartifacts && \
    chown -R mlflow:mlflow /home/mlflow

# Switch to non-root user
USER mlflow

# Expose MLflow port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Default command: Run MLflow with the plugin manager
CMD ["mlflow", "server", \
     "--host", "0.0.0.0", \
     "--port", "5000", \
     "--app-name", "plugin_manager", \
     "--backend-store-uri", "sqlite:///mlruns/mlflow.db", \
     "--default-artifact-root", "/home/mlflow/mlartifacts"]
