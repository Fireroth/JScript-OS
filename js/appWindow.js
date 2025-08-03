const appConfigs = {
    cube: {
        title: 'Rotating cube',
        icon: './favicon.ico',
        iframeSrc: 'https://fireroth.is-a.dev/sottau/webGLCube/',
        windowSize: { width: 900, height: 600 }
    },
    about: {
        title: 'About JScript OS',
        icon: './images/appIcons/info.svg',
        iframeSrc: './apps/about.html',
        windowSize: { width: 250, height: 195 }
    },
    notepad: {
        title: 'Notepad',
        icon: './images/appIcons/notepad.svg',
        iframeSrc: './apps/notepad.html',
        windowSize: { width: 500, height: 400 }
    },
    error: {
        title: 'Error :(',
        icon: './images/appIcons/error.svg',
        iframeSrc: './apps/error.html',
        windowSize: { width: 400, height: 200 }
    },
    calculator: {
        title: 'Calculator',
        icon: './images/appIcons/calculator.svg',
        iframeSrc: './apps/calculator.html',
        windowSize: { width: 300, height: 400 }
    }
};

let highestZIndex = 5;

const overlay = document.getElementById('dragOverlay');

function createAppWindow(appKey) {
    const config = appConfigs[appKey];
    if (!config) return;

    const { width = 400, height = 300 } = config.windowSize || {};

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
