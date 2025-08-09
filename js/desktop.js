const defaultDesktopApps = {
    notepad: {
        title: 'Notepad',
        icon: './images/appIcons/notepad.png'
    },
    calculator: {
        title: 'Calculator',
        icon: './images/appIcons/calculator.png'
    },
    console: {
        title: 'Console',
        icon: './images/appIcons/console.png'
    },
    settings: {
        title: 'Settings',
        icon: './images/appIcons/settings.png'
    },
    cube: {
        title: 'Rotating cube',
        icon: './images/appIcons/cube.png'
    }
};

function saveDesktopApps(apps) {
    localStorage.setItem('savedDesktopApps', JSON.stringify(apps));
    console.log('Desktop Apps saved:', apps);
}

function loadDesktopApps() {
    const saved = localStorage.getItem('savedDesktopApps');
    return saved ? JSON.parse(saved) : defaultDesktopApps;
}

let desktopApps = loadDesktopApps();
console.log('Loaded desktopApps from localStorage:', desktopApps);

const appsContainer = document.getElementById('appsContainer');

function buildDesktop() {
    appsContainer.innerHTML = '';
    for (const appKey in window.desktopApps) {
        const appData = window.desktopApps[appKey];

        const appDiv = document.createElement('div');
        appDiv.classList.add('app');
        appDiv.setAttribute('data-app', appKey);

        const img = document.createElement('img');
        img.src = appData.icon;
        img.alt = `${appData.title} Icon`;
        appDiv.appendChild(img);

        const appNameDiv = document.createElement('div');
        appNameDiv.classList.add('appName');
        appNameDiv.textContent = appData.title;
        appDiv.appendChild(appNameDiv);

        appsContainer.appendChild(appDiv);
    }

    document.querySelectorAll('.app').forEach(app => {
        app.addEventListener('click', () => {
            const appKey = app.getAttribute('data-app');
            createAppWindow(appKey);
        });
    });

    console.log('Desktop updated');
}

window.desktopApps = new Proxy(desktopApps, {
    set(target, property, value) {
        target[property] = value;
        saveDesktopApps(target);
        buildDesktop();
        return true;
    },
    deleteProperty(target, property) {
        delete target[property];
        saveDesktopApps(target);
        buildDesktop();
        return true;
    }
});

buildDesktop();