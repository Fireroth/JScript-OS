window.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'closeWindow') {
        const iframes = document.querySelectorAll('.window iframe');
        iframes.forEach(iframe => {
            if (iframe.contentWindow === event.source) {
                const windowDiv = iframe.closest('.window');
                if (windowDiv) {
                    windowDiv.remove();
                }
            }
        });
    } else if (event.data && event.data.action === 'createWindow' && typeof event.data.appName === 'string') {
        createAppWindow(event.data.appName);
    } else if (event.data && event.data.action === 'addDesktopApp' && typeof event.data.appNameID === 'string' && typeof event.data.appName === 'string' && typeof event.data.icon === 'string') {
        window.desktopApps[event.data.appNameID] = { title: event.data.appName, icon: event.data.icon };
    } else if (event.data && event.data.action === 'removeDesktopApp' && typeof event.data.appNameID === 'string') {
        delete window.desktopApps[event.data.appNameID];
    } else if (event.data && event.data.action === 'changeOsState' && typeof event.data.varName === 'string') {
        if (window.osState.hasOwnProperty(event.data.varName)) {
            window.osState[event.data.varName] = event.data.value;
            console.log(`osState.${event.data.varName} updated to`, event.data.value);
        } else {
            console.warn(`Variable '${event.data.varName}' not found in osState`);
        }
    } else {
        createAppWindow('error', {title: 'API Error', message: 'Invalid API command'});
    }
});