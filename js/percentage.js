document.addEventListener('DOMContentLoaded', () => {
    const percentageInput = document.getElementById('percentage');
    const baseNumberInput = document.getElementById('base-number');
    const calculateButton = document.getElementById('calculate');
    const resetButton = document.getElementById('reset');
    const resultSpan = document.getElementById('result');
    const resultDiv = document.querySelector('.result');
    const errorDiv = document.getElementById('error');
    const historyDiv = document.getElementById('history');
    const modeButtons = document.querySelectorAll('.mode-btn');
    let currentMode = 'basic';
    let history = [];

    function calculateResult() {
        const percentage = parseFloat(percentageInput.value);
        const baseNumber = parseFloat(baseNumberInput.value);
        if (isNaN(percentage) || isNaN(baseNumber) || percentage < 0 || baseNumber < 0) {
            errorDiv.style.display = 'block';
            resultDiv.classList.remove('show');
            historyDiv.classList.remove('show');
            return;
        }
        errorDiv.style.display = 'none';
        let result;
        let historyText;
        switch (currentMode) {
            case 'basic':
                result = (percentage / 100) * baseNumber;
                historyText = `${percentage}% of ${baseNumber} = ${result.toFixed(2)}`;
                break;
            case 'increase':
                result = baseNumber + (percentage / 100) * baseNumber;
                historyText = `${baseNumber} increased by ${percentage}% = ${result.toFixed(2)}`;
                break;
            case 'decrease':
                result = baseNumber - (percentage / 100) * baseNumber;
                historyText = `${baseNumber} decreased by ${percentage}% = ${result.toFixed(2)}`;
                break;
        }
        resultSpan.textContent = result.toFixed(2);
        resultDiv.classList.add('show');
        addToHistory(historyText);
    }

    function addToHistory(text) {
        history.unshift(text);
        if (history.length > 5) history.pop();
        historyDiv.innerHTML = history.map(item => `<div class="history-item">${item}</div>`).join('');
        historyDiv.classList.add('show');
    }

    function resetForm() {
        percentageInput.value = '';
        baseNumberInput.value = '';
        resultSpan.textContent = '0';
        resultDiv.classList.remove('show');
        errorDiv.style.display = 'none';
        historyDiv.classList.remove('show');
        history = [];
        historyDiv.innerHTML = '';
    }

    function setMode(mode) {
        currentMode = mode;
        modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        updateLabels();
        calculateResult();
    }

    function updateLabels() {
        document.querySelector('label[for="percentage"]').textContent = 
            currentMode === 'basic' ? 'Percentage' : 
            currentMode === 'increase' ? 'Increase by (%)' : 'Decrease by (%)';
        document.querySelector('label[for="base-number"]').textContent = 'Number';
    }

    percentageInput.addEventListener('input', calculateResult);
    baseNumberInput.addEventListener('input', calculateResult);
    calculateButton.addEventListener('click', calculateResult);
    resetButton.addEventListener('click', resetForm);
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => setMode(btn.dataset.mode));
    });
});