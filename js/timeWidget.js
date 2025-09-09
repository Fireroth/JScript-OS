function updateTime() {
    const now = new Date();
    if (window.osState.use24HourClock) {
        const timeString = now.toLocaleTimeString("it-IT");
        document.getElementById("timeNow").textContent = timeString;
    } else {
        const timeString = now.toLocaleTimeString("en-US");
        document.getElementById("timeNow").textContent = timeString;
    } 
}

updateTime();
setInterval(updateTime, 1000);