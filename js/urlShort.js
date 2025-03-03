document.getElementById('shortenButton').addEventListener('click', function() {
    const longUrl = document.getElementById('longUrl').value;
    if (!longUrl) {
        alert('Please enter a valid URL.');
        return;
    }

    // Generate a unique short URL
    const shortUrlKey = Math.random().toString(36).substr(2, 8);
    const shortUrl = `https://short.link/${shortUrlKey}`;

    // Store the long URL in local storage
    localStorage.setItem(shortUrlKey, longUrl);

    // Show results
    document.getElementById('shortUrl').innerText = shortUrl;
    document.getElementById('shortUrl').style.display = 'block';
    document.getElementById('copyButton').style.display = 'block';
});

document.getElementById('copyButton').addEventListener('click', function() {
    const shortUrl = document.getElementById('shortUrl').innerText;
    navigator.clipboard.writeText(shortUrl).then(() => {
        this.textContent = 'Copied!';
        setTimeout(() => {
            this.textContent = 'Copy to Clipboard';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
});

// Handle URL redirection
window.onload = function() {
    const path = window.location.pathname;
    if (path.startsWith('/short/')) {
        const shortUrlKey = path.split('/short/')[1];
        const longUrl = localStorage.getItem(shortUrlKey);
        if (longUrl) {
            window.location.href = longUrl;
        } else {
            document.body.innerHTML = '<div class="container"><h1>⚠️ URL Not Found</h1><p>The requested short URL does not exist.</p></div>';
        }
    }
};