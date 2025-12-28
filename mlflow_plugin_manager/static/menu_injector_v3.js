// MLflow Plugin Manager Menu Injector - MLflow 3.x
// Injects "Plugins" link into sidebar navigation

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

        // MLflow 3.x uses nav > ul for sidebar
        const navList = document.querySelector('nav ul');
        if (!navList) return;

        const menuItems = navList.querySelectorAll('li');
        if (menuItems.length === 0) return;

        // Clone the last menu item to match styling
        const lastItem = menuItems[menuItems.length - 1];
        const pluginItem = lastItem.cloneNode(true);

        const link = pluginItem.querySelector('a');
        if (!link) return;

        // Update link
        link.href = '/plugin-manager/';
        link.removeAttribute('aria-current');
        link.classList.remove('active');

        // Update text - find the text span
        const spans = link.querySelectorAll('span');
        for (const span of spans) {
            // Skip icon spans (usually have role="img" or contain SVG)
            if (span.getAttribute('role') === 'img' || span.querySelector('svg')) {
                continue;
            }
            // This is likely the text span
            if (span.textContent.trim()) {
                span.textContent = 'Plugins';
                break;
            }
        }

        // If no text span found, try text nodes
        if (!Array.from(spans).some(s => s.textContent === 'Plugins')) {
            const textNodes = Array.from(link.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
            if (textNodes.length > 0) {
                textNodes[0].textContent = 'Plugins';
            }
        }

        navList.appendChild(pluginItem);
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
