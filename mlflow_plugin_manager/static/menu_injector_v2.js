// MLflow Plugin Manager Menu Injector - MLflow 2.x
// Injects "Plugins" link into top header navigation (next to GitHub, Docs)

(function() {
    'use strict';

    let injected = false;

    function isAlreadyInjected() {
        return document.querySelector('a[href="/plugin-manager/"]') !== null;
    }

    function inject() {
        if (injected || isAlreadyInjected()) {
            injected = true;
            return;
        }

        // Find GitHub link in the header
        const allLinks = document.querySelectorAll('a');
        let githubLink = null;

        for (const link of allLinks) {
            if (link.href && link.href.includes('github.com/mlflow')) {
                githubLink = link;
                break;
            }
        }

        if (!githubLink || !githubLink.parentNode) return;

        // Create simple link - inherits styles from parent
        const pluginLink = document.createElement('a');
        pluginLink.href = '/plugin-manager/';
        pluginLink.textContent = 'Plugins';

        // Insert before GitHub
        githubLink.parentNode.insertBefore(pluginLink, githubLink);
        injected = true;
    }

    // Run injection
    inject();

    // MutationObserver for React apps
    const observer = new MutationObserver(function() {
        if (!injected) inject();
        if (injected) observer.disconnect();
    });

    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    }

    document.addEventListener('DOMContentLoaded', inject);
    window.addEventListener('load', inject);

    // SPA navigation
    window.addEventListener('hashchange', function() {
        if (!isAlreadyInjected()) {
            injected = false;
            inject();
        }
    });
})();
