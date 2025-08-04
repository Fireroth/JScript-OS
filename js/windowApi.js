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
    } else {
        createAppWindow('apiError');
    }
});