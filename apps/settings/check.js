if (parent.osState.use24HourClock) {
    document.getElementById("use24HourClock").checked = true;
}

if (parent.osState.theme === 'Dark') {
    document.getElementById("themeDark").selected = true;
} else {
    document.getElementById("themeLight").selected = true;
}