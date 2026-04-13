// URL Shortener Logic
class URLShortener {
    constructor() {
        this.urls = this.loadFromStorage();
    }

    generateShortCode(length = 6) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let shortCode = '';
        for (let i = 0; i < length; i++) {
            shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return shortCode;
    }

    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    shortenURL(longUrl) {
        if (!this.isValidURL(longUrl)) {
            throw new Error('Invalid URL format');
        }

        const shortCode = this.generateShortCode();
        const timestamp = new Date().toLocaleString();
        
        this.urls.push({
            longUrl,
            shortCode,
            timestamp,
            clicks: 0
        });

        this.saveToStorage();
        return shortCode;
    }

    saveToStorage() {
        localStorage.setItem('urlShortener', JSON.stringify(this.urls));
    }

    loadFromStorage() {
        const data = localStorage.getItem('urlShortener');
        return data ? JSON.parse(data) : [];
    }

    getHistory() {
        return this.urls;
    }
}

// Initialize the shortener
const shortener = new URLShortener();

function shortenUrl() {
    const longUrlInput = document.getElementById('longUrl');
    const longUrl = longUrlInput.value.trim();

    if (!longUrl) {
        alert('Please enter a URL');
        return;
    }

    try {
        const shortCode = shortener.shortenURL(longUrl);
        displayResult(shortCode, longUrl);
        longUrlInput.value = '';
        updateHistory();
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function displayResult(shortCode, longUrl) {
    const resultDiv = document.getElementById('result');
    const shortUrlInput = document.getElementById('shortUrl');
    
    const displayUrl = `short.url/${shortCode}`;
    shortUrlInput.value = displayUrl;
    resultDiv.style.display = 'block';
}

function copyToClipboard() {
    const shortUrlInput = document.getElementById('shortUrl');
    shortUrlInput.select();
    
    try {
        document.execCommand('copy');
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    } catch (error) {
        alert('Failed to copy');
    }
}

function updateHistory() {
    const history = shortener.getHistory();
    const historyList = document.getElementById('historyList');
    
    historyList.innerHTML = '';
    
    history.slice().reverse().forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            <strong>short.url/${item.shortCode}</strong><br>
            <small>→ ${item.longUrl}</small><br>
            <small>Created: ${item.timestamp}</small>
        `;
        historyList.appendChild(li);
    });
}

// Load history on page load
document.addEventListener('DOMContentLoaded', updateHistory);

// Allow Enter key to shorten URL
document.getElementById('longUrl').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        shortenUrl();
    }
});
