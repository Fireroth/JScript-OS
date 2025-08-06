const defaultOsState = {
    theme: 'dark',
    use24HourClock: true,
};

function saveState(state) {
    localStorage.setItem('savedOsState', JSON.stringify(state));
    console.log('State saved:', state);
}

function loadState() {
    const saved = localStorage.getItem('savedOsState');
    return saved ? JSON.parse(saved) : defaultOsState;
}

let osState = loadState();
console.log('Loaded osState from localStorage:', osState);

window.osState = new Proxy(osState, {
    set(target, property, value) {
        target[property] = value;
        saveState(target);
        return true;
    }
});