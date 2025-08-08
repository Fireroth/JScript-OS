function applyTheme(theme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme.toLowerCase());
}

applyTheme(parent.osState.theme);

window.addEventListener('message', (event) => {
    if (event.data.theme) {
        applyTheme(event.data.theme);
    }
});