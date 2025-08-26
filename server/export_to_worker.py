#!/usr/bin/env python3
"""
Export plugin data from database and update Cloudflare Worker
"""
import json
import requests
import subprocess
from app import db, Plugin, app
from collections import defaultdict

def export_plugins_to_json():
    """Export all plugins from database to JSON format for Cloudflare Worker"""
    with app.app_context():
        plugins = Plugin.query.all()
        
        # Group by plugin name
        plugin_data = defaultdict(lambda: {"name": "", "versions": [], "latest": ""})
        
        for plugin in plugins:
            plugin_data[plugin.name]["name"] = plugin.name
            plugin_data[plugin.name]["versions"].append(plugin.version)
        
        # Sort versions and determine latest
        for name, data in plugin_data.items():
            # Sort versions (newest first)
            from packaging import version
            sorted_versions = sorted(data["versions"], 
                                   key=lambda x: version.parse(x), 
                                   reverse=True)
            data["versions"] = sorted_versions[:10]  # Keep top 10 versions
            data["latest"] = sorted_versions[0] if sorted_versions else ""
        
        return dict(plugin_data)

def update_worker_script(plugin_data):
    """Update the Cloudflare Worker script with new plugin data"""
    
    # Read the current worker script
    worker_file = "../cloudflare-worker/worker.js"
    
    try:
        with open(worker_file, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Worker file not found at {worker_file}")
        return False
    
    # Convert plugin data to JavaScript object format
    js_plugin_data = json.dumps(plugin_data, indent=2)
    
    # Replace the PLUGIN_DATA section
    import re
    pattern = r'const PLUGIN_DATA = \{[^}]*\};'
    replacement = f'const PLUGIN_DATA = {js_plugin_data};'
    
    # More robust pattern that handles multi-line objects
    pattern = r'const PLUGIN_DATA = \{[\s\S]*?\n\};'
    new_content = re.sub(pattern, replacement, content)
    
    # Write back the updated content
    with open(worker_file, 'w') as f:
        f.write(new_content)
    
    print(f"✅ Updated worker.js with {len(plugin_data)} plugins")
    return True

def deploy_to_cloudflare():
    """Deploy the updated worker to Cloudflare"""
    import os
    
    # Change to cloudflare-worker directory
    original_dir = os.getcwd()
    os.chdir('../cloudflare-worker')
    
    try:
        # Deploy using wrangler
        result = subprocess.run(['npx', 'wrangler', 'deploy'], 
                              capture_output=True, 
                              text=True)
        
        if result.returncode == 0:
            print("✅ Successfully deployed to Cloudflare!")
            print(result.stdout)
            return True
        else:
            print("❌ Deployment failed:")
            print(result.stderr)
            return False
    except Exception as e:
        print(f"❌ Error during deployment: {e}")
        return False
    finally:
        os.chdir(original_dir)

def main():
    """Main function to export and optionally deploy"""
    print("📦 Exporting plugins from database...")
    
    # Export plugins
    plugin_data = export_plugins_to_json()
    print(f"Found {len(plugin_data)} unique plugins")
    
    # Save to JSON file for reference
    with open('plugin_data.json', 'w') as f:
        json.dump(plugin_data, f, indent=2)
    print("💾 Saved to plugin_data.json")
    
    # Update worker script
    if update_worker_script(plugin_data):
        print("\n🚀 Ready to deploy!")
        
        # Ask if user wants to deploy
        response = input("Deploy to Cloudflare now? (y/n): ")
        if response.lower() == 'y':
            deploy_to_cloudflare()
    else:
        print("❌ Failed to update worker script")

if __name__ == "__main__":
    main()