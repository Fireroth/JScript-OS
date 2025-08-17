let highestZIndex = 5;
let lastWindowX = 30;
let lastWindowY = 30;
const spawnOffset = 20;
const maxOffset = 160;

const overlay = document.getElementById('dragOverlay');

function createAppWindow(appKey, params = {}) {
    let config = appConfigs[appKey];
    if (!config) {
        return createAppWindow('error', {title: 'App Not Found', message: `The application "${appKey}" could not be found.`});
    };

    const windowSize = config.windowSize || { width: 400, height: 300 };
    const minSize = config.minSize || { width: 150, height: 100 };

    const { width, height } = windowSize;

    let iframeSrc = config.iframeSrc;
    if (params && Object.keys(params).length > 0) {
        const queryString = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join("&");
        iframeSrc += (iframeSrc.includes('?') ? '&' : '?') + queryString;
    }

    const windowDiv = document.createElement('div');
    windowDiv.classList.add('window', 'movable');
    windowDiv.style.width = `${width}px`;
    windowDiv.style.height = `${height}px`;
    windowDiv.style.left = `0px`;
    windowDiv.style.top = `0px`;

    windowDiv.innerHTML = `
        <div class="titleBar">
            <div class="icon">
                <img src="${config.icon}" alt="Icon" class="icon">
            </div>
            <div class="appName">${config.title}</div>
            <div class="controls">
                <img src="./images/maximize.png" alt="Icon" class="icon" id="maximizeBtn">
                <img src="./images/close.png" alt="Icon" class="icon" id="closeBtn">
            </div>
        </div>
        <div class="windowContent">
            <div class="focusOverlay"></div>
            <iframe src="${iframeSrc}" frameborder="0"></iframe>
        </div>
    `;

    document.body.appendChild(windowDiv);
    
    const closeBtn = windowDiv.querySelector('#closeBtn');
    closeBtn.addEventListener('click', () => {
        windowDiv.remove();
    });

    const maximizeBtn = windowDiv.querySelector('#maximizeBtn');
    maximizeBtn.addEventListener('click', () => {
        toggleMaximize(windowDiv);
    });

    function toggleMaximize(win) {
        if (win.classList.contains('maximized')) {
            // Restore
            win.classList.remove('maximized');
            win.style.width = win.dataset.prevWidth;
            win.style.height = win.dataset.prevHeight;
            win.style.transform = `translate(${win.dataset.prevX}px, ${win.dataset.prevY}px)`;
            win.dataset.x = win.dataset.prevX;
            win.dataset.y = win.dataset.prevY;
            maximizeBtn.src = "./images/maximize.png";
        } else {
            // Save state
            win.dataset.prevWidth = win.style.width;
            win.dataset.prevHeight = win.style.height;
            win.dataset.prevX = win.dataset.x;
            win.dataset.prevY = win.dataset.y;

            // Maximize
            win.classList.add('maximized');
            win.style.width = `${window.innerWidth}px`;
            win.style.height = `${window.innerHeight - 40}px`;
            win.style.transform = `translate(0px, 0px)`;
            win.dataset.x = 0;
            win.dataset.y = 0;
            maximizeBtn.src = "./images/restore.png";
        }
    }


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

                const target = event.target;
                if (target.classList.contains('maximized')) {
                    target.classList.remove('maximized');
                    target.style.width = target.dataset.prevWidth;
                    target.style.height = target.dataset.prevHeight;

                    const mouseX = event.client.x;
                    const mouseY = event.client.y;

                    const restoreX = mouseX - parseInt(target.dataset.prevWidth) / 2;
                    const restoreY = mouseY - 20;

                    target.style.transform = `translate(${restoreX}px, ${restoreY}px)`;
                    target.dataset.x = restoreX;
                    target.dataset.y = restoreY;

                    const maximizeBtn = target.querySelector('#maximizeBtn');
                    maximizeBtn.src = "./images/maximize.png";
                }
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
        const overlay = win.querySelector('.focusOverlay');
        if (win === activeWindow) {
            win.classList.remove('inactive');
            overlay.style.display = 'none';
        } else {
            win.classList.add('inactive');
            overlay.style.display = 'block';
        }
    });
}
