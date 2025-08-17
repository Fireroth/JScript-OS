function loadUrl() {
    const urlInput = document.getElementById('urlInput').value;
    const browserFrame = document.getElementById('browserFrame');
    let url = urlInput.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    try {
        new URL(url);
        browserFrame.src = url;
    } catch (e) {
        window.parent.postMessage({ action: 'createError', title: 'Invalid URL', message: 'Please enter a valid URL (e.g., https://example.com).' }, '*');
    }
}