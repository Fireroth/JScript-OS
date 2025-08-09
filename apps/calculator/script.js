let display = document.getElementById('display');
        let currentInput = '';

        function updateDisplay() {
            display.textContent = currentInput || '0';
        }

        function appendNumber(num) {
            currentInput += num;
            updateDisplay();
        }

        function appendOperator(op) {
            if (currentInput === '' && op !== '-') return;
            if (/[\+\-\*\/]$/.test(currentInput)) {
                currentInput = currentInput.slice(0, -1) + op;
            } else {
                currentInput += op;
            }
            updateDisplay();
        }

        function clearDisplay() {
            currentInput = '';
            updateDisplay();
        }

        function deleteLast() {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        }

        function calculate() {
            try {
                currentInput = eval(currentInput).toString();
            } catch (e) {
                currentInput = 'Error';
            }
            updateDisplay();
        }

        document.addEventListener('keydown', (e) => {
            const key = e.key;
            if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
                appendNumber(key);
            } else if (key === 'Enter') {
                calculate();
            } else if (key === 'Backspace') {
                deleteLast();
            } else if (key.toLowerCase() === 'c') {
                clearDisplay();
            }
        });