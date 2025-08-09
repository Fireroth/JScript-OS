function closeWindow() {
    window.parent.postMessage({ action: 'closeWindow' }, '*');
}

function changeVar() {
    window.parent.postMessage({ action: 'changeOsState', varName: 'theme', value: 'light' }, '*');
}

function badCommand() {
    window.parent.postMessage({ action: 'null' }, '*');
}

function badApp() {
    window.parent.postMessage({ action: 'createWindow', appName: 'null' }, '*');
}

function addApp() {
    window.parent.postMessage({ action: 'addDesktopApp', appNameID: 'run', appName: 'Run', icon: './images/appIcons/program.png' }, '*');
}

function delApp() {
    window.parent.postMessage({ action: 'removeDesktopApp', appNameID: 'run' }, '*');
}