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
    } else if (event.data && event.data.action === 'changeOsState' && typeof event.data.varName === 'string') {
        if (window.osState.hasOwnProperty(event.data.varName)) {
            window.osState[event.data.varName] = event.data.value;
            console.log(`osState.${event.data.varName} updated to`, event.data.value);
        } else {
            console.warn(`Variable '${event.data.varName}' not found in osState`);
        }
    } else {
        createAppWindow('apiError');
    }
});