function getQueryParams() {
    const params = {};
    location.search.substring(1).split("&").forEach(part => {
        if (!part) return;
        const [key, value] = part.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    });
    return params;
}

function closeWindow() {
    window.parent.postMessage({ action: 'closeWindow' }, '*');
}

const params = getQueryParams();
if (params.title) document.getElementById("errorTitle").textContent = params.title;
if (params.message) document.getElementById("errorMessage").textContent = params.message;