const appConfigs = {
    cube: {
        title: 'Rotating cube',
        icon: './favicon.ico',
        iframeSrc: 'https://fireroth.is-a.dev/sottau/webGLCube/',
        windowSize: {width: 900, height: 600},
        minSize: {width: 300, height: 200}
    },
    about: {
        title: 'About JScript OS',
        icon: './images/appIcons/info.png',
        iframeSrc: './apps/about.html',
        windowSize: {width: 250, height: 210},
        minSize: {width: 250, height: 210}
    },
    notepad: {
        title: 'Notepad',
        icon: './images/appIcons/notepad.png',
        iframeSrc: './apps/notepad.html',
        windowSize: {width: 500, height: 350},
        minSize: {width: 200, height: 150}
    },
    error: {
        title: 'Error :(',
        icon: './images/appIcons/error.png',
        iframeSrc: './apps/error.html',
        windowSize: {width: 400, height: 150},
        minSize: {width: 400, height: 150}
    },
    appNotFoundError: {
        title: 'Error',
        icon: './images/appIcons/error.png',
        iframeSrc: './apps/appNotFoundError.html',
        windowSize: {width: 400, height: 150},
        minSize: {width: 400, height: 150}
    },
    apiError: {
        title: 'Error',
        icon: './images/appIcons/error.png',
        iframeSrc: './apps/apiError.html',
        windowSize: {width: 400, height: 150},
        minSize: {width: 400, height: 150}
    },
    devPanel: {
        title: 'Developer stuff',
        icon: './images/appIcons/code.png',
        iframeSrc: './apps/devPanel.html',
        windowSize: {width: 700, height: 450},
        minSize: {width: 700, height: 200}
    },
    calculator: {
        title: 'Calculator',
        icon: './images/appIcons/calculator.png',
        iframeSrc: './apps/calculator.html',
        windowSize: {width: 300, height: 400},
        minSize: {width: 200, height: 350}
    }
};

let highestZIndex = 5;

const overlay = document.getElementById('dragOverlay');

function createAppWindow(appKey) {
    let config = appConfigs[appKey];
    if (!config) {
        config = appConfigs['appNotFoundError']
    };

    const windowSize = config.windowSize || { width: 400, height: 300 };
    const minSize = config.minSize || { width: 150, height: 100 };

    const { width, height } = windowSize;

    const windowDiv = document.createElement('div');
    windowDiv.classList.add('window', 'movable');
    windowDiv.style.width = `${width}px`;
    windowDiv.style.height = `${height}px`;
    windowDiv.style.left = '10px';
    windowDiv.style.top = '10px';

    windowDiv.innerHTML = `
        <div class="titleBar">
            <div class="icon">
                <img src="${config.icon}" alt="Icon" class="icon">
            </div>
            <div class="appName">${config.title}</div>
            <div class="controls">X</div>
        </div>
        <div class="windowContent">
            <iframe src="${config.iframeSrc}" frameborder="0"></iframe>
        </div>
    `;

    document.body.appendChild(windowDiv);

    const closeBtn = windowDiv.querySelector('.controls');
    closeBtn.addEventListener('click', () => {
        windowDiv.remove();
    });

    windowDiv.style.position = 'absolute';
    windowDiv.dataset.x = 100;
    windowDiv.dataset.y = 100;
    windowDiv.style.transform = `translate(100px, 100px)`;

    highestZIndex++;
    windowDiv.style.zIndex = highestZIndex;

    windowDiv.addEventListener('mousedown', () => {
        highestZIndex++;
        windowDiv.style.zIndex = highestZIndex;
    });

    interact(windowDiv).draggable({
        listeners: {
            start(event) {
                overlay.style.display = 'block';
            },
            move(event) {
                let x = (parseFloat(event.target.dataset.x) || 0) + event.dx;
                let y = (parseFloat(event.target.dataset.y) || 0) + event.dy;

                event.target.style.transform = `translate(${x}px, ${y}px)`;
                event.target.dataset.x = x;
                event.target.dataset.y = y;
            },
            end(event) {
                overlay.style.display = 'none';
            }
        }
    });

    interact(windowDiv).resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        margin: 5,
        modifiers: [
            interact.modifiers.restrictSize({
                min: minSize
            })
        ],
        listeners: {
            start(event) {
                overlay.style.display = 'block';
            },
            move(event) {
                let x = (parseFloat(event.target.dataset.x) || 0) + event.deltaRect.left;
                let y = (parseFloat(event.target.dataset.y) || 0) + event.deltaRect.top;

                Object.assign(event.target.style, {
                    width: `${event.rect.width}px`,
                    height: `${event.rect.height}px`,
                    transform: `translate(${x}px, ${y}px)`
                });

                event.target.dataset.x = x;
                event.target.dataset.y = y;
            },
            end(event) {
                overlay.style.display = 'none';
            }
        }
    });
}

document.querySelectorAll('.app').forEach(app => {
    app.addEventListener('click', () => {
        const appKey = app.getAttribute('data-app');
        createAppWindow(appKey);
    });
});

document.querySelectorAll('.menuItem').forEach(app => {
    app.addEventListener('click', () => {
        const appKey = app.getAttribute('data-app');
        createAppWindow(appKey);
    });
});
