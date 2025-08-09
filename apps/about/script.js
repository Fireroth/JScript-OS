function closeWindow() {
    window.parent.postMessage({ action: 'closeWindow' }, '*');
}