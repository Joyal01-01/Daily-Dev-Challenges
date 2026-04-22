let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(op) {
    if (expression === '') return;
    if (/[+\-*/%]$/.test(expression)) {
        expression = expression.slice(0, -1);
    }
    expression += op;
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = expression || '0';
}

function calculate() {
    try {
        if (expression === '') return;
        const result = eval(expression);
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%') appendOperator(e.key);
    if (e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === '.') appendNumber('.');
});
