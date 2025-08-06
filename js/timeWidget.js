function updateTime() {
    const now = new Date();
    if (window.osState.use24HourClock) {
        const timeString = now.toLocaleTimeString([], { hour12: false });
        document.getElementById("timeNow").textContent = timeString;
    } else {
        const timeString = now.toLocaleTimeString();
        document.getElementById("timeNow").textContent = timeString;
    } 
}

updateTime();
setInterval(updateTime, 1000);