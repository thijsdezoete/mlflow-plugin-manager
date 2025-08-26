// MLflow Plugin Manager Menu Injector
// This script adds a "Plugins" menu item to MLflow's navigation

(function() {
    'use strict';
    
    let injected = false;
    
    // Plugin icon SVG (package/box icon)
    const pluginIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 16 16" aria-hidden="true" focusable="false" class="">
        <path fill="currentColor" fill-rule="evenodd" d="M8 1.5a1 1 0 0 0-.866.5L4.5 6.5v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-7L8.866 2A1 1 0 0 0 8 1.5zm-2.366.5a2.5 2.5 0 0 1 4.732 0L13 6.5V13.5a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 3 13.5V6.5L5.634 2z" clip-rule="evenodd"/>
        <path fill="currentColor" d="M5.5 6.5h5v1h-5v-1z"/>
    </svg>`;
    
    function injectPluginMenuItem() {
        if (injected) return;
        
        // Find the navigation list
        const navList = document.querySelector('nav ul');
        if (!navList) return;
        
        // Check if already injected
        if (document.querySelector('a[href="/plugin-manager/"]')) {
            injected = true;
            return;
        }
        
        // Find the last menu item (Prompts) to clone its structure
        const menuItems = navList.querySelectorAll('li');
        if (menuItems.length === 0) return;
        
        const lastItem = menuItems[menuItems.length - 1];
        const pluginItem = lastItem.cloneNode(true);
        
        // Find and update the link
        const link = pluginItem.querySelector('a');
        if (!link) return;
        
        // Update href
        link.href = '/plugin-manager/';
        link.removeAttribute('aria-current');
        
        // Update the icon
        const iconSpan = link.querySelector('span[role="img"]');
        if (iconSpan) {
            iconSpan.innerHTML = pluginIconSVG;
        }
        
        // Update the text
        const textNodes = Array.from(link.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
        if (textNodes.length > 0) {
            textNodes[0].textContent = 'Plugins';
        } else {
            // If no text node found, append one
            link.appendChild(document.createTextNode('Plugins'));
        }
        
        // Add click handler to handle navigation
        link.addEventListener('click', function(e) {
            // If it's a hash-based routing system, we might need to handle differently
            if (window.location.hash) {
                e.preventDefault();
                window.location.href = '/plugin-manager/';
            }
        });
        
        // Append to navigation
        navList.appendChild(pluginItem);
        injected = true;
        console.log('MLflow Plugin Manager menu item injected successfully');
    }
    
    // Try to inject immediately
    injectPluginMenuItem();
    
    // Use MutationObserver to watch for navigation menu to appear
    const observer = new MutationObserver(function(mutations) {
        // Try to inject whenever DOM changes
        injectPluginMenuItem();
        
        // If successfully injected, we can stop observing
        if (injected) {
            observer.disconnect();
        }
    });
    
    // Start observing (only if body exists)
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        // If body doesn't exist yet, wait for it
        document.addEventListener('DOMContentLoaded', function() {
            if (document.body) {
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        });
    }
    
    // Also try on various events
    document.addEventListener('DOMContentLoaded', injectPluginMenuItem);
    window.addEventListener('load', injectPluginMenuItem);
    
    // For single-page applications, also listen to hash changes
    window.addEventListener('hashchange', function() {
        injected = false; // Reset injection flag
        setTimeout(injectPluginMenuItem, 100); // Small delay to let React render
    });
    
    // Periodically check for the first few seconds (for slow-loading apps)
    let attempts = 0;
    const interval = setInterval(function() {
        attempts++;
        injectPluginMenuItem();
        if (injected || attempts > 20) {
            clearInterval(interval);
        }
    }, 500);
})();