document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector('.start');
    const startMenu = document.getElementById('startMenu');

    startButton.addEventListener('click', () => {
        startMenu.classList.toggle('visible');
    });

    document.addEventListener('click', (event) => {
        if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
            startMenu.classList.remove('visible');
        }
    });
});

//---------------------------------------------------------

const startMenuContainer = document.getElementById('startMenu');

const startMenuApps = {
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
    browser: {
        title: 'Web Browser',
        icon: './images/appIcons/browser.png'
    },
    cube: {
        title: 'Rotating cube',
        icon: './images/appIcons/cube.png'
    },
    devPanel: {
        title: 'Developer Panel',
        icon: './images/appIcons/code.png'
    },
    /*allApps: {
        title: 'All Apps',
        icon: './images/appIcons/folder.png'
    },*/
    run: {
        title: 'Run',
        icon: './images/appIcons/program.png'
    },
    about: {
        title: 'About',
        icon: './images/appIcons/info.png'
    }
};


for (const appKey in startMenuApps) {
    const appData = startMenuApps[appKey];

    const appDiv = document.createElement('div');
    appDiv.classList.add('menuItem');
    appDiv.setAttribute('data-app', appKey);

    const img = document.createElement('img');
    img.src = appData.icon;
    img.alt = `${appData.title} Icon`;
    appDiv.appendChild(img);

    const appNameDiv = document.createElement('div');
    appNameDiv.classList.add('appName');
    appNameDiv.textContent = appData.title;
    appDiv.appendChild(appNameDiv);

    startMenuContainer.appendChild(appDiv);
}
console.log('Start menu initialized with apps');

document.querySelectorAll('.menuItem').forEach(app => {
    app.addEventListener('click', () => {
        const appKey = app.getAttribute('data-app');
        createAppWindow(appKey);
        startMenu.classList.remove('visible');
    });
});