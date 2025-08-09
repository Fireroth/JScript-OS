function openApp() {
    const command = document.getElementById('command').value.trim();
    if (command) {
        window.parent.postMessage({ action: 'createWindow', appName: command }, '*');
        window.parent.postMessage({ action: 'closeWindow' }, '*');
    } else {
        return;
    }
}