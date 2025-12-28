// MLflow Plugin Manager API - Cloudflare Worker
// PLUGIN_DATA is injected by export_to_worker.py

const PLUGIN_DATA = {
  "aimlflow": {
    "name": "aimlflow",
    "versions": [
      "1.0.0",
      "0.2.0",
      "0.1.0",
      "0.0.9",
      "0.0.8",
      "0.0.7",
      "0.0.6",
      "0.0.5",
      "0.0.4"
    ],
    "latest": "1.0.0"
  },
  "aim-mlflow": {
    "name": "aim-mlflow",
    "versions": [
      "0.2.1",
      "0.2.0",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.2.1"
  },
  "airflow-provider-mlflow": {
    "name": "airflow-provider-mlflow",
    "versions": [
      "1.1.0",
      "1.0.1",
      "1.0.0",
      "0.0.0a0"
    ],
    "latest": "1.1.0"
  },
  "auto-mlflow": {
    "name": "auto-mlflow",
    "versions": [
      "1.5",
      "1.0"
    ],
    "latest": "1.5"
  },
  "azureml-evaluate-mlflow": {
    "name": "azureml-evaluate-mlflow",
    "versions": [
      "47.0.0",
      "0.0.84",
      "0.0.83",
      "0.0.82",
      "0.0.81",
      "0.0.80",
      "0.0.79",
      "0.0.78",
      "0.0.77",
      "0.0.76"
    ],
    "latest": "47.0.0"
  },
  "azureml-mlflow": {
    "name": "azureml-mlflow",
    "versions": [
      "1.61.0.post1",
      "1.61.0",
      "1.60.0.post1",
      "1.60.0",
      "1.59.0.post1",
      "1.59.0",
      "1.58.0.post3",
      "1.58.0.post2",
      "1.58.0.post1",
      "1.58.0"
    ],
    "latest": "1.61.0.post1"
  },
  "bigmlflow": {
    "name": "bigmlflow",
    "versions": [
      "1.0.2",
      "1.0.1",
      "1.0.0"
    ],
    "latest": "1.0.2"
  },
  "comet-for-mlflow": {
    "name": "comet-for-mlflow",
    "versions": [
      "0.1.9",
      "0.1.7",
      "0.1.5",
      "0.1.3",
      "0.1.2",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.9"
  },
  "dagster-mlflow": {
    "name": "dagster-mlflow",
    "versions": [
      "0.28.7",
      "0.28.6",
      "0.28.5",
      "0.28.4",
      "0.28.3",
      "0.28.2",
      "0.28.1",
      "0.28.0",
      "0.27.16",
      "0.27.15"
    ],
    "latest": "0.28.7"
  },
  "dataflow-mlflow": {
    "name": "dataflow-mlflow",
    "versions": [
      "0.0.1",
      "0.0.1rc1"
    ],
    "latest": "0.0.1"
  },
  "datarobot-mlflow": {
    "name": "datarobot-mlflow",
    "versions": [
      "0.1.dev2",
      "0.1.dev1"
    ],
    "latest": "0.1.dev2"
  },
  "dbnd-mlflow": {
    "name": "dbnd-mlflow",
    "versions": [
      "1.0.30.1",
      "1.0.28.1",
      "1.0.27.18",
      "1.0.27.2",
      "1.0.26.2",
      "1.0.26.1",
      "1.0.25.2",
      "1.0.24.1",
      "1.0.23.2",
      "1.0.23.1"
    ],
    "latest": "1.0.30.1"
  },
  "domino-mlflow-client": {
    "name": "domino-mlflow-client",
    "versions": [
      "0.6.9",
      "0.6.8",
      "0.6.7",
      "0.6.6",
      "0.3",
      "0.2",
      "0.1"
    ],
    "latest": "0.6.9"
  },
  "environment-mlflow-client": {
    "name": "environment-mlflow-client",
    "versions": [
      "3.0.2",
      "3.0.0",
      "2.0.2",
      "2.0.1",
      "2.0.0",
      "1.1.1",
      "1.1.0",
      "1.0.3",
      "1.0.2",
      "1.0.1"
    ],
    "latest": "3.0.2"
  },
  "fastapi-mlflow": {
    "name": "fastapi-mlflow",
    "versions": [
      "0.7.0",
      "0.7.0rc1",
      "0.6.4",
      "0.6.3",
      "0.6.2",
      "0.6.1",
      "0.6.0",
      "0.6.0b1",
      "0.5.0",
      "0.4.1"
    ],
    "latest": "0.7.0"
  },
  "flytekitplugins-mlflow": {
    "name": "flytekitplugins-mlflow",
    "versions": [
      "1.16.12a0",
      "1.16.11",
      "1.16.10",
      "1.16.9",
      "1.16.8",
      "1.16.7",
      "1.16.6",
      "1.16.5",
      "1.16.4",
      "1.16.3"
    ],
    "latest": "1.16.12a0"
  },
  "fromconfig-mlflow": {
    "name": "fromconfig-mlflow",
    "versions": [
      "0.4.0",
      "0.3.1",
      "0.3.0",
      "0.2.0",
      "0.1.4",
      "0.1.3",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.4.0"
  },
  "fsd-tools-mlflow": {
    "name": "fsd-tools-mlflow",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "getml-mlflow": {
    "name": "getml-mlflow",
    "versions": [
      "0.1.2",
      "0.1.1"
    ],
    "latest": "0.1.2"
  },
  "gluepy-mlflow": {
    "name": "gluepy-mlflow",
    "versions": [
      "0.3.1",
      "0.3.0"
    ],
    "latest": "0.3.1"
  },
  "google-cloud-mlflow": {
    "name": "google-cloud-mlflow",
    "versions": [
      "0.0.6",
      "0.0.5",
      "0.0.5rc5",
      "0.0.5rc4",
      "0.0.5rc3",
      "0.0.5rc2",
      "0.0.5rc1",
      "0.0.4.1",
      "0.0.4",
      "0.0.4.dev3"
    ],
    "latest": "0.0.6"
  },
  "h2o-mlflow-flavor": {
    "name": "h2o-mlflow-flavor",
    "versions": [
      "0.1.0"
    ],
    "latest": "0.1.0"
  },
  "hiplot-mlflow": {
    "name": "hiplot-mlflow",
    "versions": [
      "0.1.0"
    ],
    "latest": "0.1.0"
  },
  "htmlflow": {
    "name": "htmlflow",
    "versions": [
      "0.0.0"
    ],
    "latest": "0.0.0"
  },
  "infinstor-mlflow-plugin": {
    "name": "infinstor-mlflow-plugin",
    "versions": [
      "2.0.63",
      "2.0.62",
      "2.0.60",
      "2.0.58",
      "2.0.57",
      "2.0.56",
      "2.0.55",
      "2.0.54",
      "2.0.53",
      "2.0.52"
    ],
    "latest": "2.0.63"
  },
  "inxaimlflow": {
    "name": "inxaimlflow",
    "versions": [
      "0.0.3",
      "0.0.2",
      "0.0.1"
    ],
    "latest": "0.0.3"
  },
  "jupyterhub_mlflow_auth": {
    "name": "jupyterhub_mlflow_auth",
    "versions": [
      "1.0.1",
      "1.0.0"
    ],
    "latest": "1.0.1"
  },
  "jupyterlab-mlflow": {
    "name": "jupyterlab-mlflow",
    "versions": [
      "0.5.0",
      "0.4.1",
      "0.4.0",
      "0.3.0",
      "0.2.10",
      "0.2.9",
      "0.2.8",
      "0.2.7",
      "0.2.5",
      "0.2.2"
    ],
    "latest": "0.5.0"
  },
  "kedro-mlflow": {
    "name": "kedro-mlflow",
    "versions": [
      "2.0.0",
      "1.0.2",
      "1.0.1",
      "1.0.0",
      "0.14.5",
      "0.14.4",
      "0.14.3",
      "0.14.2",
      "0.14.1",
      "0.14.0"
    ],
    "latest": "2.0.0"
  },
  "kozai-mlflow": {
    "name": "kozai-mlflow",
    "versions": [
      "0.7.2",
      "0.7.1",
      "0.7.0",
      "0.6.0",
      "0.5.0",
      "0.4.2",
      "0.4.1",
      "0.4.0",
      "0.3.0",
      "0.2.2"
    ],
    "latest": "0.7.2"
  },
  "kozmoserver-mlflow": {
    "name": "kozmoserver-mlflow",
    "versions": [
      "0.1.0.dev1"
    ],
    "latest": "0.1.0.dev1"
  },
  "language-detector-mlflow": {
    "name": "language-detector-mlflow",
    "versions": [
      "0.0.1",
      "0.0.0"
    ],
    "latest": "0.0.1"
  },
  "liga-mlflow": {
    "name": "liga-mlflow",
    "versions": [
      "0.3.0",
      "0.3.0.dev2",
      "0.3.0.dev1",
      "0.3.0.dev0",
      "0.2.0",
      "0.2.0.dev12",
      "0.2.0.dev11",
      "0.2.0.dev10",
      "0.2.0.dev2"
    ],
    "latest": "0.3.0"
  },
  "lit-mlflow": {
    "name": "lit-mlflow",
    "versions": [
      "0.1.2",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.2"
  },
  "lmcmlflow": {
    "name": "lmcmlflow",
    "versions": [
      "1.17.1.2",
      "1.17.1.1",
      "1.17.1"
    ],
    "latest": "1.17.1.2"
  },
  "mlflow": {
    "name": "mlflow",
    "versions": [
      "3.8.1",
      "3.8.0",
      "3.8.0rc0",
      "3.7.0",
      "3.7.0rc0",
      "3.6.0",
      "3.6.0rc0",
      "3.5.1",
      "3.5.0",
      "3.5.0rc0"
    ],
    "latest": "3.8.1"
  },
  "mlflow2sql": {
    "name": "mlflow2sql",
    "versions": [
      "0.1"
    ],
    "latest": "0.1"
  },
  "mlflow-advanced": {
    "name": "mlflow-advanced",
    "versions": [
      "1.0.0"
    ],
    "latest": "1.0.0"
  },
  "mlflow-algorithmia": {
    "name": "mlflow-algorithmia",
    "versions": [
      "0.1.6",
      "0.1.5",
      "0.1.4",
      "0.1.3",
      "0.1.2",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.6"
  },
  "mlflowapi": {
    "name": "mlflowapi",
    "versions": [
      "0.2",
      "0.1"
    ],
    "latest": "0.2"
  },
  "mlflow-assist": {
    "name": "mlflow-assist",
    "versions": [
      "0.2.0",
      "0.1.0"
    ],
    "latest": "0.2.0"
  },
  "mlflow-assistant": {
    "name": "mlflow-assistant",
    "versions": [
      "0.1.5",
      "0.1.4",
      "0.1.3",
      "0.1.2",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.5"
  },
  "mlflow-asus-aimaker": {
    "name": "mlflow-asus-aimaker",
    "versions": [
      "1.0.2",
      "1.0.1",
      "1.0.0",
      "0.0.6",
      "0.0.5",
      "0.0.4",
      "0.0.3",
      "0.0.2",
      "0.0.1"
    ],
    "latest": "1.0.2"
  },
  "mlflow-aws-rds-iam": {
    "name": "mlflow-aws-rds-iam",
    "versions": [
      "0.3.0",
      "0.2.1",
      "0.2.0",
      "0.1.0"
    ],
    "latest": "0.3.0"
  },
  "mlflow-backend": {
    "name": "mlflow-backend",
    "versions": [
      "1.1.0"
    ],
    "latest": "1.1.0"
  },
  "mlflow-baidubce-store-plugin": {
    "name": "mlflow-baidubce-store-plugin",
    "versions": [
      "1.0.7",
      "1.0.6"
    ],
    "latest": "1.0.7"
  },
  "mlflow-boilerplate-spavlyuk": {
    "name": "mlflow-boilerplate-spavlyuk",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "mlflow-by-ckl": {
    "name": "mlflow-by-ckl",
    "versions": [
      "2.81.0",
      "2.80.0",
      "2.79.0",
      "2.77.0",
      "2.76.0",
      "2.74.0",
      "2.73.0",
      "2.72.0",
      "2.71.0",
      "2.70.0"
    ],
    "latest": "2.81.0"
  },
  "mlflow-by-johnsnowlabs": {
    "name": "mlflow-by-johnsnowlabs",
    "versions": [
      "3.4.1.post3",
      "3.4.1.post2",
      "3.4.1.post1",
      "2.40.0",
      "2.39.0",
      "2.38.0",
      "2.37.0",
      "2.35.0",
      "2.33.0",
      "2.32.0"
    ],
    "latest": "3.4.1.post3"
  },
  "mlflow-by-johnsnowlabs-v2": {
    "name": "mlflow-by-johnsnowlabs-v2",
    "versions": [
      "2.44.0",
      "2.43.0",
      "2.42.0",
      "2.41.0",
      "2.40.0",
      "2.39.0",
      "2.38.0",
      "2.37.0",
      "2.36.0"
    ],
    "latest": "2.44.0"
  },
  "mlflowcli": {
    "name": "mlflowcli",
    "versions": [
      "0.0.2"
    ],
    "latest": "0.0.2"
  },
  "mlflow-cloudflare-header-plugin": {
    "name": "mlflow-cloudflare-header-plugin",
    "versions": [
      "1.0.0"
    ],
    "latest": "1.0.0"
  },
  "mlflow-cloudsmith": {
    "name": "mlflow-cloudsmith",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "mlflowcollab": {
    "name": "mlflowcollab",
    "versions": [
      "0.0.4"
    ],
    "latest": "0.0.4"
  },
  "mlflow-cors": {
    "name": "mlflow-cors",
    "versions": [
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.1"
  },
  "mlflow-cratedb": {
    "name": "mlflow-cratedb",
    "versions": [
      "2.14.1",
      "2.14.0",
      "2.13.2",
      "2.13.1",
      "2.13.0",
      "2.12.2",
      "2.12.1",
      "2.11.3",
      "2.10.2",
      "2.10.0"
    ],
    "latest": "2.14.1"
  },
  "mlflow-custom-headers-plugin": {
    "name": "mlflow-custom-headers-plugin",
    "versions": [
      "1.0.2",
      "1.0.1",
      "1.0.0"
    ],
    "latest": "1.0.2"
  },
  "mlflow-databricks-artifacts": {
    "name": "mlflow-databricks-artifacts",
    "versions": [
      "2.0.1",
      "2.0.0",
      "1.0.0"
    ],
    "latest": "2.0.1"
  },
  "mlflow-dbstore": {
    "name": "mlflow-dbstore",
    "versions": [
      "1.0.1",
      "1.0.0"
    ],
    "latest": "1.0.1"
  },
  "mlflow-dep-analyzer": {
    "name": "mlflow-dep-analyzer",
    "versions": [
      "0.9.0",
      "0.8.0",
      "0.7.0",
      "0.6.0",
      "0.4.0",
      "0.3.0",
      "0.2.0",
      "0.1.0"
    ],
    "latest": "0.9.0"
  },
  "mlflow-deploifai": {
    "name": "mlflow-deploifai",
    "versions": [
      "0.0.3",
      "0.0.2",
      "0.0.1"
    ],
    "latest": "0.0.3"
  },
  "mlflow-deploy-cli": {
    "name": "mlflow-deploy-cli",
    "versions": [
      "1.0.1",
      "1.0.0"
    ],
    "latest": "1.0.1"
  },
  "mlflow-devlibx": {
    "name": "mlflow-devlibx",
    "versions": [
      "1.22.8",
      "1.22.7",
      "1.22.6",
      "1.22.5",
      "1.22.4",
      "1.22.3",
      "1.22.2",
      "1.22.1",
      "1.22.0"
    ],
    "latest": "1.22.8"
  },
  "mlflow-dl": {
    "name": "mlflow-dl",
    "versions": [
      "0.2.2",
      "0.2.1",
      "0.2.0"
    ],
    "latest": "0.2.2"
  },
  "mlflow-duckdb": {
    "name": "mlflow-duckdb",
    "versions": [
      "0.1.2",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.2"
  },
  "mlflow-dummy-plugin": {
    "name": "mlflow-dummy-plugin",
    "versions": [
      "0.2",
      "0.1"
    ],
    "latest": "0.2"
  },
  "mlflow-elasticsearchstore": {
    "name": "mlflow-elasticsearchstore",
    "versions": [
      "0.1.2",
      "0.1.1"
    ],
    "latest": "0.1.2"
  },
  "mlflow-emissions-sdk": {
    "name": "mlflow-emissions-sdk",
    "versions": [
      "0.16.4",
      "0.16.2",
      "0.16.1",
      "0.16",
      "0.14",
      "0.13",
      "0.12",
      "0.11",
      "0.10",
      "0.9"
    ],
    "latest": "0.16.4"
  },
  "mlflow-export-import": {
    "name": "mlflow-export-import",
    "versions": [
      "1.2.0",
      "1.1.2",
      "1.1.0",
      "1.0.9",
      "1.0.8",
      "1.0.7",
      "1.0.6",
      "1.0.5",
      "1.0.4",
      "1.0.3"
    ],
    "latest": "1.2.0"
  },
  "mlflow-extend": {
    "name": "mlflow-extend",
    "versions": [
      "0.1.6",
      "0.1.5",
      "0.1.4",
      "0.1.3",
      "0.1.2",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.6"
  },
  "mlflow-extensions": {
    "name": "mlflow-extensions",
    "versions": [
      "0.17.1",
      "0.16.1",
      "0.16.0",
      "0.15.0",
      "0.14.0",
      "0.13.5",
      "0.13.4",
      "0.13.3",
      "0.13.2",
      "0.13.1"
    ],
    "latest": "0.17.1"
  },
  "mlflow-extra": {
    "name": "mlflow-extra",
    "versions": [
      "2023.7",
      "2023.6",
      "2023.4",
      "2023.3",
      "2023.2",
      "2023.1"
    ],
    "latest": "2023.7"
  },
  "mlflow-faculty": {
    "name": "mlflow-faculty",
    "versions": [
      "0.5.0",
      "0.4.3",
      "0.4.2",
      "0.4.1",
      "0.4.0",
      "0.3.1",
      "0.3.0",
      "0.2.1",
      "0.2.0",
      "0.1.1"
    ],
    "latest": "0.5.0"
  },
  "mlflow_for_ml_dev": {
    "name": "mlflow_for_ml_dev",
    "versions": [
      "0.1.4",
      "0.1.3",
      "0.1.2"
    ],
    "latest": "0.1.4"
  },
  "mlflow-fr": {
    "name": "mlflow-fr",
    "versions": [
      "1.0.0"
    ],
    "latest": "1.0.0"
  },
  "mlflow-gcp-iap": {
    "name": "mlflow-gcp-iap",
    "versions": [
      "0.0.3",
      "0.0.2",
      "0.0.1"
    ],
    "latest": "0.0.3"
  },
  "mlflow-gcp-iap-plugin": {
    "name": "mlflow-gcp-iap-plugin",
    "versions": [
      "0.0.2",
      "0.0.1"
    ],
    "latest": "0.0.2"
  },
  "mlflow-go-backend": {
    "name": "mlflow-go-backend",
    "versions": [
      "0.2.2",
      "0.2.0",
      "0.1.0"
    ],
    "latest": "0.2.2"
  },
  "mlflow-greenplum-plugin": {
    "name": "mlflow-greenplum-plugin",
    "versions": [
      "0.1.0"
    ],
    "latest": "0.1.0"
  },
  "mlflowhelper": {
    "name": "mlflowhelper",
    "versions": [
      "1.1.0",
      "1.0.0"
    ],
    "latest": "1.1.0"
  },
  "mlflow-hf-transformers": {
    "name": "mlflow-hf-transformers",
    "versions": [
      "0.6",
      "0.5",
      "0.4",
      "0.3"
    ],
    "latest": "0.6"
  },
  "mlflow-iap-token": {
    "name": "mlflow-iap-token",
    "versions": [
      "0.3.0",
      "0.2.0",
      "0.1.0"
    ],
    "latest": "0.3.0"
  },
  "mlflow_ibmcos": {
    "name": "mlflow_ibmcos",
    "versions": [
      "0.1.9",
      "0.1.8",
      "0.1.7",
      "0.1.6",
      "0.1.5",
      "0.1.4.2",
      "0.1.4.1",
      "0.1.4",
      "0.1.3",
      "0.1.2"
    ],
    "latest": "0.1.9"
  },
  "mlflow-jfrog-artifactory": {
    "name": "mlflow-jfrog-artifactory",
    "versions": [
      "0.0.3"
    ],
    "latest": "0.0.3"
  },
  "mlflow-jfrog-plugin": {
    "name": "mlflow-jfrog-plugin",
    "versions": [
      "1.0.2",
      "1.0.1",
      "1.0.0"
    ],
    "latest": "1.0.2"
  },
  "mlflow-k8sstore-plugin": {
    "name": "mlflow-k8sstore-plugin",
    "versions": [
      "0.0.2",
      "0.0.1"
    ],
    "latest": "0.0.2"
  },
  "mlflow-kernel": {
    "name": "mlflow-kernel",
    "versions": [
      "0.1.10",
      "0.1.9",
      "0.1.8",
      "0.1.7",
      "0.1.6",
      "0.1.5",
      "0.1.4",
      "0.1.3",
      "0.1.2",
      "0.1.1"
    ],
    "latest": "0.1.10"
  },
  "mlflow-knative": {
    "name": "mlflow-knative",
    "versions": [
      "0.4.3",
      "0.4.2",
      "0.4.1",
      "0.3.0",
      "0.2.0",
      "0.1.3",
      "0.1.2",
      "0.1.1"
    ],
    "latest": "0.4.3"
  },
  "mlflow-kubernetes-backends": {
    "name": "mlflow-kubernetes-backends",
    "versions": [
      "0.0.0"
    ],
    "latest": "0.0.0"
  },
  "mlflowlib": {
    "name": "mlflowlib",
    "versions": [
      "3.0",
      "2.6",
      "2.5",
      "2.4",
      "2.3",
      "2.2",
      "2.1",
      "2.0",
      "1.9",
      "1.8"
    ],
    "latest": "3.0"
  },
  "mlflow-log-cli": {
    "name": "mlflow-log-cli",
    "versions": [
      "0.1.0"
    ],
    "latest": "0.1.0"
  },
  "mlflow-logger-ext": {
    "name": "mlflow-logger-ext",
    "versions": [
      "0.2.2"
    ],
    "latest": "0.2.2"
  },
  "mlflow-mage": {
    "name": "mlflow-mage",
    "versions": [
      "0.1.0"
    ],
    "latest": "0.1.0"
  },
  "mlflow-mcp": {
    "name": "mlflow-mcp",
    "versions": [
      "0.1.8",
      "0.1.7",
      "0.1.5",
      "0.1.3",
      "0.1.2",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.8"
  },
  "mlflow-med-cli": {
    "name": "mlflow-med-cli",
    "versions": [
      "0.1.0",
      "0.1.0.dev2"
    ],
    "latest": "0.1.0"
  },
  "mlflow-migration": {
    "name": "mlflow-migration",
    "versions": [
      "1.1.0",
      "1.0.2",
      "1.0.1",
      "1.0.0"
    ],
    "latest": "1.1.0"
  },
  "mlflow-mlserver-docker": {
    "name": "mlflow-mlserver-docker",
    "versions": [
      "0.4.1",
      "0.4.0",
      "0.3.0",
      "0.1.0"
    ],
    "latest": "0.4.1"
  },
  "mlflow-mltf": {
    "name": "mlflow-mltf",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "mlflow-mltf-gateway": {
    "name": "mlflow-mltf-gateway",
    "versions": [
      "0.1.1",
      "0.0.2",
      "0.0.1"
    ],
    "latest": "0.1.1"
  },
  "mlflow-modal": {
    "name": "mlflow-modal",
    "versions": [
      "0.1.0"
    ],
    "latest": "0.1.0"
  },
  "mlflow_nbconvert": {
    "name": "mlflow_nbconvert",
    "versions": [
      "1.0.0"
    ],
    "latest": "1.0.0"
  },
  "mlflow-nemo": {
    "name": "mlflow-nemo",
    "versions": [
      "0.0.2",
      "0.0.1"
    ],
    "latest": "0.0.2"
  },
  "mlflow-no-ssl": {
    "name": "mlflow-no-ssl",
    "versions": [
      "2.16.3"
    ],
    "latest": "2.16.3"
  },
  "mlflow-oauth-keycloak-auth": {
    "name": "mlflow-oauth-keycloak-auth",
    "versions": [
      "0.0.2.post2",
      "0.0.2.post1",
      "0.0.2",
      "0.0.1"
    ],
    "latest": "0.0.2.post2"
  },
  "mlflow-observer": {
    "name": "mlflow-observer",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "mlflow-oidc-auth": {
    "name": "mlflow-oidc-auth",
    "versions": [
      "5.7.0",
      "5.6.1",
      "5.6.0",
      "5.5.2",
      "5.5.1",
      "5.5.0",
      "5.4.0",
      "5.3.1",
      "5.3.0",
      "5.2.0"
    ],
    "latest": "5.7.0"
  },
  "mlflow-oidc-auth-groups-plugin-adfs": {
    "name": "mlflow-oidc-auth-groups-plugin-adfs",
    "versions": [
      "0.0.1",
      "0.0.1b3"
    ],
    "latest": "0.0.1"
  },
  "mlflow-oidc-client": {
    "name": "mlflow-oidc-client",
    "versions": [
      "0.2.4",
      "0.2.3",
      "0.2.2",
      "0.2.0"
    ],
    "latest": "0.2.4"
  },
  "mlflow-onesaitplatform-plugin": {
    "name": "mlflow-onesaitplatform-plugin",
    "versions": [
      "0.2.11",
      "0.2.10",
      "0.2.9"
    ],
    "latest": "0.2.11"
  },
  "mlflow-openshift": {
    "name": "mlflow-openshift",
    "versions": [
      "0.2.3"
    ],
    "latest": "0.2.3"
  },
  "mlflowops": {
    "name": "mlflowops",
    "versions": [
      "0.1.2",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.2"
  },
  "mlflow-oss-artifact": {
    "name": "mlflow-oss-artifact",
    "versions": [
      "2.0.1",
      "2.0.0",
      "1.0.0"
    ],
    "latest": "2.0.1"
  },
  "mlflow-oss-store": {
    "name": "mlflow-oss-store",
    "versions": [
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.1"
  },
  "mlflow-plugin": {
    "name": "mlflow-plugin",
    "versions": [
      "0.0.1rc1"
    ],
    "latest": "0.0.1rc1"
  },
  "mlflow-plugin-manager": {
    "name": "mlflow-plugin-manager",
    "versions": [
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.1"
  },
  "mlflow-plugin-proxy-auth": {
    "name": "mlflow-plugin-proxy-auth",
    "versions": [
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.1"
  },
  "mlflow-polylog": {
    "name": "mlflow-polylog",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "mlflow-pri": {
    "name": "mlflow-pri",
    "versions": [
      "3.6.1.post2",
      "3.6.1.post1",
      "3.5.1.post2",
      "3.5.1.post1",
      "3.4.1.post10",
      "3.4.1.post9",
      "3.4.1.post8",
      "3.4.1.post7",
      "3.4.1.post6",
      "3.3.3.post6"
    ],
    "latest": "3.6.1.post2"
  },
  "mlflow-pyfunc-server": {
    "name": "mlflow-pyfunc-server",
    "versions": [
      "0.3.10",
      "0.3.9",
      "0.3.8",
      "0.3.7",
      "0.3.6",
      "0.3.5",
      "0.3.4",
      "0.3.3",
      "0.3.2",
      "0.3.1"
    ],
    "latest": "0.3.10"
  },
  "mlflow-pytorch-exp": {
    "name": "mlflow-pytorch-exp",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "mlflowrate": {
    "name": "mlflowrate",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "mlflow-ray-serve": {
    "name": "mlflow-ray-serve",
    "versions": [
      "0.2.0",
      "0.1.0"
    ],
    "latest": "0.2.0"
  },
  "mlflow-redisai": {
    "name": "mlflow-redisai",
    "versions": [
      "0.1.0",
      "0.0.1"
    ],
    "latest": "0.1.0"
  },
  "mlflow-registry-mongostore": {
    "name": "mlflow-registry-mongostore",
    "versions": [
      "0.1.11",
      "0.1.10",
      "0.1.9",
      "0.1.8",
      "0.1.7",
      "0.1.6",
      "0.1.5",
      "0.1.4",
      "0.1.3",
      "0.1.2"
    ],
    "latest": "0.1.11"
  },
  "mlflow-rest-client": {
    "name": "mlflow-rest-client",
    "versions": [
      "2.0.0"
    ],
    "latest": "2.0.0"
  },
  "mlflow-saagie": {
    "name": "mlflow-saagie",
    "versions": [
      "2.9.2",
      "2.5.0",
      "2.0.1",
      "1.20.5",
      "1.20.4",
      "1.20.3"
    ],
    "latest": "2.9.2"
  },
  "mlflow-sagemaker": {
    "name": "mlflow-sagemaker",
    "versions": [
      "1.5.11",
      "1.5.10",
      "1.5.9",
      "1.5.8",
      "1.5.7",
      "1.5.6",
      "1.5.5",
      "1.5.4",
      "1.5.3",
      "1.5.2"
    ],
    "latest": "1.5.11"
  },
  "mlflow-secrets-auth": {
    "name": "mlflow-secrets-auth",
    "versions": [
      "0.2.0",
      "0.1.0"
    ],
    "latest": "0.2.0"
  },
  "mlflow-server-proxy": {
    "name": "mlflow-server-proxy",
    "versions": [
      "0.1.0"
    ],
    "latest": "0.1.0"
  },
  "mlflow-skinny": {
    "name": "mlflow-skinny",
    "versions": [
      "3.8.1",
      "3.8.0",
      "3.8.0rc0",
      "3.7.0",
      "3.7.0rc0",
      "3.6.0",
      "3.6.0rc0",
      "3.5.1",
      "3.5.0",
      "3.5.0rc0"
    ],
    "latest": "3.8.1"
  },
  "mlflow-slurm": {
    "name": "mlflow-slurm",
    "versions": [
      "1.0.6",
      "1.0.6a2",
      "1.0.6a1",
      "1.0.5",
      "1.0.5a1",
      "1.0.4",
      "1.0.3",
      "1.0.2",
      "1.0.1",
      "1.0.0"
    ],
    "latest": "1.0.6"
  },
  "mlflow-solar-boilerplate": {
    "name": "mlflow-solar-boilerplate",
    "versions": [
      "0.0.3",
      "0.0.2"
    ],
    "latest": "0.0.3"
  },
  "mlflow-ste": {
    "name": "mlflow-ste",
    "versions": [
      "1.10.1.dev0"
    ],
    "latest": "1.10.1.dev0"
  },
  "mlflow-stonewise": {
    "name": "mlflow-stonewise",
    "versions": [
      "1.30.1"
    ],
    "latest": "1.30.1"
  },
  "mlflow-sweep": {
    "name": "mlflow-sweep",
    "versions": [
      "0.1.0",
      "0.0.3"
    ],
    "latest": "0.1.0"
  },
  "mlflow-sysmetrics": {
    "name": "mlflow-sysmetrics",
    "versions": [
      "0.1.3",
      "0.1.2"
    ],
    "latest": "0.1.3"
  },
  "mlflow-tclake-plugin": {
    "name": "mlflow-tclake-plugin",
    "versions": [
      "3.0.5",
      "3.0.4",
      "3.0.3",
      "2.0.4",
      "2.0.3",
      "2.0.1"
    ],
    "latest": "3.0.5"
  },
  "mlflow-test-plugin": {
    "name": "mlflow-test-plugin",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "mlflow-tmp": {
    "name": "mlflow-tmp",
    "versions": [
      "2.3.3.dev0",
      "2.2.26",
      "2.2.25",
      "2.2.24",
      "2.2.23",
      "2.2.22",
      "2.2.21",
      "2.2.20",
      "2.2.19",
      "2.2.18"
    ],
    "latest": "2.3.3.dev0"
  },
  "mlflow-token": {
    "name": "mlflow-token",
    "versions": [
      "1.1.0",
      "1.0.0",
      "1.0.0a1",
      "0.1.2a1",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "1.1.0"
  },
  "mlflow-token-plugin": {
    "name": "mlflow-token-plugin",
    "versions": [
      "0.0.1rc1"
    ],
    "latest": "0.0.1rc1"
  },
  "mlflow-toolkit": {
    "name": "mlflow-toolkit",
    "versions": [
      "0.2.0",
      "0.1.0"
    ],
    "latest": "0.2.0"
  },
  "mlflow-torchserve": {
    "name": "mlflow-torchserve",
    "versions": [
      "0.1.0",
      "0.0.2",
      "0.0.1.dev0"
    ],
    "latest": "0.1.0"
  },
  "mlflow-tracing": {
    "name": "mlflow-tracing",
    "versions": [
      "3.8.1",
      "3.8.0",
      "3.8.0rc0",
      "3.7.0",
      "3.7.0rc0",
      "3.6.0",
      "3.6.0rc0",
      "3.5.1",
      "3.5.0",
      "3.5.0rc0"
    ],
    "latest": "3.8.1"
  },
  "mlflow-tracking-mongostore": {
    "name": "mlflow-tracking-mongostore",
    "versions": [
      "0.1.15",
      "0.1.14",
      "0.1.13",
      "0.1.12",
      "0.1.11",
      "0.1.10",
      "0.1.9",
      "0.1.8",
      "0.1.7",
      "0.1.6"
    ],
    "latest": "0.1.15"
  },
  "mlflow-tritonserver": {
    "name": "mlflow-tritonserver",
    "versions": [
      "1.1.0",
      "1.0.0"
    ],
    "latest": "1.1.0"
  },
  "mlflow-txtai": {
    "name": "mlflow-txtai",
    "versions": [
      "0.4.0",
      "0.3.0",
      "0.2.0",
      "0.1.0"
    ],
    "latest": "0.4.0"
  },
  "mlflow-utils": {
    "name": "mlflow-utils",
    "versions": [
      "0.0.4",
      "0.0.3",
      "0.0.2",
      "0.0.1"
    ],
    "latest": "0.0.4"
  },
  "mlflow-vismod": {
    "name": "mlflow-vismod",
    "versions": [
      "1.1.1"
    ],
    "latest": "1.1.1"
  },
  "mlflow-vismod.styles.altair": {
    "name": "mlflow-vismod.styles.altair",
    "versions": [
      "1.1.0"
    ],
    "latest": "1.1.0"
  },
  "mlflow-vizmod": {
    "name": "mlflow-vizmod",
    "versions": [
      "1.1.3",
      "1.1.2",
      "1.1.1"
    ],
    "latest": "1.1.3"
  },
  "mlflow-vizmod.styles.altair": {
    "name": "mlflow-vizmod.styles.altair",
    "versions": [
      "1.1.2",
      "1.1.1",
      "1.1.0"
    ],
    "latest": "1.1.2"
  },
  "mlflow-watsonml": {
    "name": "mlflow-watsonml",
    "versions": [
      "0.11.4",
      "0.11.1",
      "0.11.0",
      "0.10.3",
      "0.10.2",
      "0.10.1",
      "0.10.0",
      "0.9.0",
      "0.8.0",
      "0.7.3"
    ],
    "latest": "0.11.4"
  },
  "mlflow-webhdfs": {
    "name": "mlflow-webhdfs",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "mlflow-wrapper": {
    "name": "mlflow-wrapper",
    "versions": [
      "0.0.1.8",
      "0.0.1.7",
      "0.0.1.6",
      "0.0.1.5",
      "0.0.1.4",
      "0.0.1.3"
    ],
    "latest": "0.0.1.8"
  },
  "mlflow-xethub": {
    "name": "mlflow-xethub",
    "versions": [
      "0.0.0"
    ],
    "latest": "0.0.0"
  },
  "mlflow-xgboost-proba": {
    "name": "mlflow-xgboost-proba",
    "versions": [
      "0.3.1",
      "0.3.0",
      "0.2.0",
      "0.1.0"
    ],
    "latest": "0.3.1"
  },
  "mlflow-yarn": {
    "name": "mlflow-yarn",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "mlpype-mlflow": {
    "name": "mlpype-mlflow",
    "versions": [
      "0.6.12",
      "0.6.11",
      "0.6.10",
      "0.6.9",
      "0.6.8",
      "0.6.7",
      "0.6.6",
      "0.6.5",
      "0.6.4",
      "0.6.3"
    ],
    "latest": "0.6.12"
  },
  "mlserver-mlflow": {
    "name": "mlserver-mlflow",
    "versions": [
      "1.7.2rc1",
      "1.7.1",
      "1.7.1rc1",
      "1.7.0",
      "1.7.0rc5",
      "1.7.0rc4",
      "1.7.0rc3",
      "1.7.0rc2",
      "1.7.0rc1",
      "1.6.2rc1"
    ],
    "latest": "1.7.2rc1"
  },
  "model-registry-mlflow": {
    "name": "model-registry-mlflow",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "nbprint-mlflow": {
    "name": "nbprint-mlflow",
    "versions": [
      "0.1.0"
    ],
    "latest": "0.1.0"
  },
  "nbprint-plugin-mlflow": {
    "name": "nbprint-plugin-mlflow",
    "versions": [
      "0.0.0"
    ],
    "latest": "0.0.0"
  },
  "nebari-mlflow-plugin": {
    "name": "nebari-mlflow-plugin",
    "versions": [
      "2025.10.2",
      "2025.10.1"
    ],
    "latest": "2025.10.2"
  },
  "nebari-plugin-mlflow-aws": {
    "name": "nebari-plugin-mlflow-aws",
    "versions": [
      "0.0.16",
      "0.0.15",
      "0.0.14",
      "0.0.13",
      "0.0.12",
      "0.0.11",
      "0.0.10",
      "0.0.9",
      "0.0.8",
      "0.0.7"
    ],
    "latest": "0.0.16"
  },
  "neptune-mlflow": {
    "name": "neptune-mlflow",
    "versions": [
      "1.1.1",
      "1.1.0",
      "1.0.0",
      "1.0.0rc2",
      "1.0.0rc1",
      "1.0.0rc0",
      "0.2.6",
      "0.2.5",
      "0.2.4",
      "0.2.3"
    ],
    "latest": "1.1.1"
  },
  "oci-mlflow": {
    "name": "oci-mlflow",
    "versions": [
      "1.0.2",
      "1.0.1",
      "1.0.0",
      "1.0b0"
    ],
    "latest": "1.0.2"
  },
  "odahu-flow-mlflow-runner": {
    "name": "odahu-flow-mlflow-runner",
    "versions": [
      "1.6.1",
      "1.6.0",
      "1.5.0",
      "1.5.0rc6",
      "1.5.0rc5",
      "1.5.0rc4",
      "1.5.0rc3",
      "1.5.0rc2",
      "1.5.0rc1",
      "1.4.0"
    ],
    "latest": "1.6.1"
  },
  "pai-mlflow-test": {
    "name": "pai-mlflow-test",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "papermill-mlflow-handler": {
    "name": "papermill-mlflow-handler",
    "versions": [
      "1.0.1",
      "1.0.0"
    ],
    "latest": "1.0.1"
  },
  "pype-mlflow": {
    "name": "pype-mlflow",
    "versions": [
      "0.3.0",
      "0.2.0",
      "0.1.2",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.3.0"
  },
  "refract-mlflow-plugin": {
    "name": "refract-mlflow-plugin",
    "versions": [
      "1.0.3",
      "1.0.2",
      "1.0.1",
      "1.0.0"
    ],
    "latest": "1.0.3"
  },
  "sagemaker-mlflow": {
    "name": "sagemaker-mlflow",
    "versions": [
      "0.2.0",
      "0.2.0.dev1",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.2.0"
  },
  "sagemaker-mlflow-skinny": {
    "name": "sagemaker-mlflow-skinny",
    "versions": [
      "0.1.1",
      "0.1.0",
      "0.1.0.dev3",
      "0.1.0.dev2"
    ],
    "latest": "0.1.1"
  },
  "sidetrek-mlflow-plugin": {
    "name": "sidetrek-mlflow-plugin",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "snowglobe-telemetry-mlflow": {
    "name": "snowglobe-telemetry-mlflow",
    "versions": [
      "0.0.2",
      "0.0.1",
      "0.0.0a0"
    ],
    "latest": "0.0.2"
  },
  "sq-mlflow": {
    "name": "sq-mlflow",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "sqprefect-contrib-mlflow": {
    "name": "sqprefect-contrib-mlflow",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "szn-search-mlops-mlflow-upload": {
    "name": "szn-search-mlops-mlflow-upload",
    "versions": [
      "0.0.1"
    ],
    "latest": "0.0.1"
  },
  "tango-mlflow": {
    "name": "tango-mlflow",
    "versions": [
      "2.0.0",
      "1.1.1",
      "1.1.0",
      "1.0.1",
      "1.0.0"
    ],
    "latest": "2.0.0"
  },
  "tfy-mlflow-client": {
    "name": "tfy-mlflow-client",
    "versions": [
      "0.0.56",
      "0.0.55",
      "0.0.54",
      "0.0.53",
      "0.0.52",
      "0.0.51",
      "0.0.50",
      "0.0.49",
      "0.0.48",
      "0.0.47"
    ],
    "latest": "0.0.56"
  },
  "wedata-mlflow-header-plugin": {
    "name": "wedata-mlflow-header-plugin",
    "versions": [
      "0.1.1"
    ],
    "latest": "0.1.1"
  },
  "wk-mlflow-plugins": {
    "name": "wk-mlflow-plugins",
    "versions": [
      "0.0.0.dev1682364155459"
    ],
    "latest": "0.0.0.dev1682364155459"
  },
  "wtu-mlflow": {
    "name": "wtu-mlflow",
    "versions": [
      "0.1.9",
      "0.1.8",
      "0.1.7",
      "0.1.6",
      "0.1.5",
      "0.1.4",
      "0.1.3",
      "0.1.2",
      "0.1.1",
      "0.1.0"
    ],
    "latest": "0.1.9"
  },
  "wtu-mlflow-triton-plugin": {
    "name": "wtu-mlflow-triton-plugin",
    "versions": [
      "0.0.17",
      "0.0.17.dev2",
      "0.0.17.dev1",
      "0.0.17.dev0",
      "0.0.15",
      "0.0.14",
      "0.0.13",
      "0.0.12",
      "0.0.11",
      "0.0.10"
    ],
    "latest": "0.0.17"
  },
  "xk-mlflow-oss-plugin": {
    "name": "xk-mlflow-oss-plugin",
    "versions": [
      "1.0.0"
    ],
    "latest": "1.0.0"
  },
  "yamlflow": {
    "name": "yamlflow",
    "versions": [
      "0.0.9",
      "0.0.8",
      "0.0.7",
      "0.0.6",
      "0.0.4",
      "0.0.3",
      "0.0.2"
    ],
    "latest": "0.0.9"
  },
  "yummy-mlflow": {
    "name": "yummy-mlflow",
    "versions": [
      "0.0.9",
      "0.0.8",
      "0.0.7"
    ],
    "latest": "0.0.9"
  }
};

var worker_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }
    if (url.pathname === "/browse-plugins") {
      const plugins = Object.values(PLUGIN_DATA).map((plugin) => ({
        name: plugin.name,
        version: plugin.latest
      }));
      return new Response(JSON.stringify(plugins), { headers });
    }
    const versionMatch = url.pathname.match(/^\/plugin-versions\/(.+)$/);
    if (versionMatch) {
      const pluginName = versionMatch[1];
      const plugin = PLUGIN_DATA[pluginName];
      if (!plugin) {
        return new Response(
          JSON.stringify({ error: `Plugin ${pluginName} not found` }),
          { status: 404, headers }
        );
      }
      return new Response(JSON.stringify({
        name: plugin.name,
        versions: plugin.versions,
        latest: plugin.latest
      }), { headers });
    }
    if (url.pathname === "/is-approved") {
      const pluginName = url.searchParams.get("name");
      const approved = pluginName && PLUGIN_DATA.hasOwnProperty(pluginName);
      return new Response(
        JSON.stringify({ approved }),
        { headers }
      );
    }
    if (url.pathname === "/") {
      return new Response(JSON.stringify({
        status: "ok",
        message: "MLflow Plugin Manager API",
        endpoints: [
          "/browse-plugins",
          "/plugin-versions/{plugin_name}",
          "/is-approved?name={plugin_name}"
        ]
      }), { headers });
    }
    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers }
    );
  }
};

export {
  worker_default as default
};
