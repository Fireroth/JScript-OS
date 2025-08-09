// Override console.log to capture output
const originalConsoleLog = console.log;
console.log = function (...args) {
    const output = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg).join(' ');
    appendText(output);
    originalConsoleLog.apply(console, args);
};

function appendText(text) {
    const consoleDiv = document.getElementById('console');
    const line = document.createElement('div');
    line.textContent = text;
    consoleDiv.appendChild(line);
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

const commandInput = document.getElementById('command-input');
commandInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const command = commandInput.value.trim();
        if (command) {
            appendText(`>>>${command}`);
            try {
                const result = eval(command);
                if (result !== undefined) {
                    console.log(result);
                }
            } catch (error) {
                appendText(`Error: ${error.message}`);
            }
            commandInput.value = '';
        }
    }
});

appendText('JavaScript Console');
appendText(`Use 'parent.osState' to see os state`);