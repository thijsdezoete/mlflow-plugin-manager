document.addEventListener("DOMContentLoaded", function() {

    function fetchAvailablePlugins() {
        // Fetch available plugins and populate the list
        fetch('/plugin-manager/available-plugins')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.warn(`Error fetching available plugins: ${data.error}`);
                return;
            }
            const list = document.getElementById('available-plugins');
            console.log(data);
            data.forEach(plugin => {
                const listItem = document.createElement('li');
                listItem.textContent = `${plugin.name} (Latest Version: ${plugin.version})`;

                // Create an install button for each plugin
                const installButton = document.createElement('button');
                installButton.textContent = 'Install';
                installButton.addEventListener('click', function() {
                    // Handle the installation logic here
                    installPlugin(plugin.name);
                });

                listItem.appendChild(installButton);
                list.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error fetching available plugins:", error);
        });
    }
    fetchAvailablePlugins();

    function fetchInstalledPlugins() {
        // Fetch installed plugins and populate the list
        fetch('/plugin-manager/installed-plugins')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('installed-plugins');
            data.forEach(plugin => {
                const listItem = document.createElement('li');
                listItem.textContent = `${plugin.name} (v${plugin.version})`;

                const uninstallButton = document.createElement('button');
                uninstallButton.textContent = 'Uninstall';
                uninstallButton.onclick = function() {
                    if (confirm(`Are you sure you want to uninstall ${plugin.name}?`)) {
                        uninstallPlugin(plugin.name);
                    }
                };

                listItem.appendChild(uninstallButton);
                list.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error fetching installed plugins:", error);
        });
    }
    fetchInstalledPlugins();

    function installPlugin(pluginName) {
        fetch(`/plugin-manager/install-plugin?name=${pluginName}`, {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                alert(`Successfully installed ${pluginName}!`);
                // Refresh the page or update the lists without a page reload
                location.reload();
            } else {
                alert(`Failed to install ${pluginName}.`);
            }
        })
        .catch(error => {
            console.error(`Error installing plugin ${pluginName}:`, error);
        });
    }

    function uninstallPlugin(pluginName) {
        fetch(`/plugin-manager/uninstall-plugin?name=${pluginName}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error uninstalling plugin: ${data.error}`);
            } else {
                alert(data.message);
                // Refresh the list of installed plugins
                const installedPluginsList = document.getElementById("installed-plugins");
                installedPluginsList.innerHTML = "";
                fetchInstalledPlugins();
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error uninstalling plugin. Please try again.');
        });
    }

    function upgradePlugin(pluginName) {
        fetch(`/plugin-manager/upgrade-plugin?name=${pluginName}`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Failed to upgrade ${pluginName}. Error: ${data.error}`);
            } else {
                alert(`Successfully upgraded ${pluginName}!\n${data.message}`);
                // Optionally: Refresh the plugin list after a successful upgrade
                const installedPluginsList = document.getElementById("installed-plugins");
                installedPluginsList.innerHTML = "";
                fetchInstalledPlugins();
                checkForPluginUpdates();
            }
        });
    }

    function checkForPluginUpdates() {
        fetch("/plugin-manager/check-plugin-updates")
            .then(response => response.json())
            .then(data => {
                const updateResultsDiv = document.getElementById("update-results");
                updateResultsDiv.innerHTML = ""; // Clear previous results

                if (Object.keys(data).length === 0) {
                    updateResultsDiv.innerHTML = "All plugins are up to date!";
                } else {
                    for (const plugin in data) {
                        const currentVersion = data[plugin].current_version;
                        const latestVersion = data[plugin].latest_version;
                        const pluginDiv = document.createElement("div");
                        const updateInfo = document.createElement("p");

                        updateInfo.innerHTML = `${plugin}: Current Version ${currentVersion} | Latest Version ${latestVersion}`;
                        pluginDiv.appendChild(updateInfo);

                        const upgradeButton = document.createElement('button');
                        upgradeButton.textContent = "Upgrade now";
                        upgradeButton.onclick = () => upgradePlugin(plugin);
                        pluginDiv.appendChild(upgradeButton);

                        updateResultsDiv.appendChild(pluginDiv);
                    }
                }
            })
            .catch(error => {
                console.error("Error checking for updates:", error);
            });

    }

    document.getElementById("check-updates-btn").addEventListener("click", function() {
        checkForPluginUpdates();
    });

});


