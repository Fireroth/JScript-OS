const defaultOsState = {
    theme: 'Dark',
    use24HourClock: true,
    wallpaper: 'wallpaper1.jpg',
};

function saveState(state) {
    localStorage.setItem('savedOsState', JSON.stringify(state));
    console.log('State saved:', state);
}

function loadState() {
    const saved = localStorage.getItem('savedOsState');
    return saved ? JSON.parse(saved) : defaultOsState;
}

function applyState() {
    const body = document.body;
    body.classList.remove('dark', 'light');
    body.classList.add(window.osState.theme.toLowerCase());

    document.querySelector('.desktop').style.backgroundImage = `url(../images/${window.osState.wallpaper})`;

    console.log('Applied changes from osState');

    document.querySelectorAll('iframe').forEach(frame => {
        frame.contentWindow.postMessage(
            { theme: window.osState.theme },
            '*'
        );
    });
}

let osState = loadState();
console.log('Loaded osState from localStorage:', osState);

window.osState = new Proxy(osState, {
    set(target, property, value) {
        target[property] = value;
        saveState(target);
        applyState();
        return true;
    }
});

applyState();