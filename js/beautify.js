document.getElementById('minify-btn').addEventListener('click', function() {
    const input = document.getElementById('input').value;
    const advancedMode = document.getElementById('advanced-mode').checked;
    const preserveScripts = document.getElementById('preserve-scripts').checked;
    if (!input.trim()) {
        showMessage('Please enter some HTML code to minify.', 'error');
        return;
    }
    let minified = advancedMode ? minifyHTMLAdvanced(input, preserveScripts) : minifyHTMLBasic(input);
    document.getElementById('output').value = minified;
    showMessage('HTML minified successfully!', 'success');
});

document.getElementById('copy-btn').addEventListener('click', function() {
    const output = document.getElementById('output').value;
    if (!output) {
        showMessage('Nothing to copy.', 'error');
        return;
    }
    navigator.clipboard.writeText(output).then(() => {
        showMessage('Copied to clipboard!', 'success');
    }, (err) => {
        console.error('Copy failed:', err);
        showMessage('Failed to copy.', 'error');
    });
});

document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('input').value = '';
    document.getElementById('output').value = '';
    showMessage('Cleared!', 'success');
});

document.getElementById('download-btn').addEventListener('click', function() {
    const output = document.getElementById('output').value;
    if (!output) {
        showMessage('Nothing to download.', 'error');
        return;
    }
    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.html';
    a.click();
    URL.revokeObjectURL(url);
    showMessage('Downloaded!', 'success');
});

function minifyHTMLBasic(html) {
    html = html.replace(/<!--[\s\S]*?-->/g, '');
    html = html.replace(/>\s+</g, '><');
    return html.trim();
}

function minifyHTMLAdvanced(html, preserveScripts) {
    let minified = minifyHTMLBasic(html);
    if (!preserveScripts) {
        minified = minified.replace(/>\s+</g, '><');
    }
    minified = minified.replace(/\s+(?=[^<]*>)/g, ' ');
    minified = minified.replace(/\s*([<>])\s*/g, '$1');
    return minified;
}

function showMessage(msg, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = msg;
    messageDiv.className = type;
    messageDiv.classList.add('show');
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 2500);
}