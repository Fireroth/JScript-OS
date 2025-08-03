document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector('.start');
    const startMenu = document.getElementById('startMenu');

    startButton.addEventListener('click', () => {
        startMenu.classList.toggle('visible');
    });

    document.addEventListener('click', (event) => {
        if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
            startMenu.classList.remove('visible');
        }
    });
});
