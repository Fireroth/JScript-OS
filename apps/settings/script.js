let restoreConfirmed = false;
function confirmRestoreDefaults() {
    const label = document.getElementById('restoreDefaultsText');
    const button = document.getElementById('restoreDefaultsBtn');

    if (!restoreConfirmed) {
        label.textContent = "Are you sure?";
        button.textContent = "Yes, Restore Defaults";
        restoreConfirmed = true;
    } else {
        restoreDefaults();
        label.textContent = "Defaults Restored.";
        button.textContent = "Load Default Configuration";
        restoreConfirmed = false;
    }
}

function restoreDefaults() {
    window.parent.postMessage({ action: 'changeOsState', varName: 'use24HourClock', value: true }, '*');
    window.parent.postMessage({ action: 'changeOsState', varName: 'theme', value: 'Dark' }, '*');
    window.parent.postMessage({ action: 'changeOsState', varName: 'wallpaper', value: 'wallpaper1.jpg' }, '*');

    for (const key in parent.desktopApps) {
        if (parent.desktopApps.hasOwnProperty(key)) {
            delete parent.desktopApps[key];
        }
    }
    window.parent.postMessage({ action: 'addDesktopApp', appNameID: 'notepad', appName: 'Notepad', icon: './images/appIcons/notepad.png' }, '*');
    window.parent.postMessage({ action: 'addDesktopApp', appNameID: 'calculator', appName: 'Calculator', icon: './images/appIcons/calculator.png' }, '*');
    window.parent.postMessage({ action: 'addDesktopApp', appNameID: 'console', appName: 'Console', icon: './images/appIcons/console.png' }, '*');
    window.parent.postMessage({ action: 'addDesktopApp', appNameID: 'settings', appName: 'Settings', icon: './images/appIcons/settings.png' }, '*');
    window.parent.postMessage({ action: 'addDesktopApp', appNameID: 'cube', appName: 'Rotating cube', icon: './images/appIcons/cube.png' }, '*');

    setTimeout(() => parent.location.reload(), 600);
}
//-----------------------------------------------------------------
const navItems = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.panel');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        item.classList.add('active');
        const panelId = 'panel-' + item.getAttribute('data-panel');
        document.getElementById(panelId).classList.add('active');
    });
});
//-----------------------------------------------------------------

const checkbox24Hour = document.getElementById("use24HourClock");
checkbox24Hour.addEventListener('change', () => {
    const is24Hour = checkbox24Hour.checked;
    window.parent.postMessage({ action: 'changeOsState', varName: 'use24HourClock', value: is24Hour }, '*');
});

const selectedTheme = document.getElementById("themeSelect");
selectedTheme.addEventListener("change", function () {
    window.parent.postMessage({ action: 'changeOsState', varName: 'theme', value: selectedTheme.value }, '*');
});

document.querySelectorAll("img[data-wallpaper]").forEach(img => {
    img.addEventListener("click", () => {
        window.parent.postMessage({ action: 'changeOsState', varName: 'wallpaper', value: img.dataset.wallpaper }, '*');
    });
});