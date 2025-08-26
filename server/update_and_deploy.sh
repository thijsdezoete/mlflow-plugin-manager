#!/bin/bash
# Script to update plugin data and deploy to Cloudflare

echo "🔄 Step 1: Reindexing plugins from PyPI..."
python reindex_plugins.py

echo ""
echo "📤 Step 2: Exporting to Cloudflare Worker..."
python export_to_worker.py

echo ""
echo "✅ Done! Check https://api.mlflowplugins.com/browse-plugins"