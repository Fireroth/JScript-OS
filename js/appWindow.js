let highestZIndex = 5;
let lastWindowX = 30;
let lastWindowY = 30;
const spawnOffset = 20;
const maxOffset = 160;

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
    windowDiv.style.left = `${lastWindowX}px`;
    windowDiv.style.top = `${lastWindowY}px`;

    windowDiv.innerHTML = `
        <div class="titleBar">
            <div class="icon">
                <img src="${config.icon}" alt="Icon" class="icon">
            </div>
            <div class="appName">${config.title}</div>
            <div class="controls">
                <img src="./images/close.png" alt="Icon" class="icon">
            </div>
        </div>
        <div class="windowContent">
            <div class="iframeOverlay"></div>
            <iframe src="${config.iframeSrc}" frameborder="0"></iframe>
        </div>
    `;

    document.body.appendChild(windowDiv);
    
    const closeBtn = windowDiv.querySelector('.controls');
    closeBtn.addEventListener('click', () => {
        windowDiv.remove();
    });

    windowDiv.style.position = 'absolute';
    windowDiv.dataset.x = lastWindowX;
    windowDiv.dataset.y = lastWindowY;
    windowDiv.style.transform = `translate(${lastWindowX}px, ${lastWindowY}px)`;

    highestZIndex++;
    windowDiv.style.zIndex = highestZIndex;

    windowDiv.addEventListener('mousedown', () => {
        highestZIndex++;
        windowDiv.style.zIndex = highestZIndex;
        setActiveWindow(windowDiv);
    });

    interact(windowDiv).draggable({
        allowFrom: '.titleBar',
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
    
    lastWindowX += spawnOffset;
    lastWindowY += spawnOffset;
    if (lastWindowX > maxOffset) lastWindowX = 30;
    if (lastWindowY > maxOffset) lastWindowY = 30;

    setActiveWindow(windowDiv);
}

function setActiveWindow(activeWindow) {
    const allWindows = document.querySelectorAll('.window');
    allWindows.forEach(win => {
        const overlay = win.querySelector('.iframeOverlay');
        if (win === activeWindow) {
            win.classList.remove('inactive');
            overlay.style.display = 'none';
        } else {
            win.classList.add('inactive');
            overlay.style.display = 'block';
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
