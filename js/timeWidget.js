function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById("timeNow").textContent = timeString;
}

updateTime();
setInterval(updateTime, 1000);