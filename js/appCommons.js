let inIframe = false;

function applyTheme(theme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme.toLowerCase());
}

try {
    inIframe = window.self !== window.top;
} catch (e) {
    inIframe = true;
}

if (!inIframe) {
    document.body.classList.add('dark');
} else {
    applyTheme(parent.osState.theme);

    window.addEventListener('message', (event) => {
        if (event.data.theme) {
            applyTheme(event.data.theme);
        }
    });
}