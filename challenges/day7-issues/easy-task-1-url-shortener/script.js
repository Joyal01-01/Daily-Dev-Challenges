// Simple URL Shortener Logic
class URLShortener {
    constructor() {
        this.urls = [];
        this.loadFromStorage();
    }

    generateShortCode(length = 6) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    shortenURL(longURL) {
        if (!this.isValidURL(longURL)) {
            return null;
        }

        const shortCode = this.generateShortCode();
        const shortURL = `short.url/${shortCode}`;
        
        const urlObject = {
            original: longURL,
            shortened: shortURL,
            code: shortCode,
            created: new Date().toLocaleString()
        };

        this.urls.unshift(urlObject);
        this.saveToStorage();
        return urlObject;
    }

    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    getURLs() {
        return this.urls;
    }

    saveToStorage() {
        localStorage.setItem('shortenedURLs', JSON.stringify(this.urls));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shortenedURLs');
        if (stored) {
            this.urls = JSON.parse(stored);
        }
    }
}

// DOM Elements
const urlInput = document.getElementById('urlInput');
const shortenBtn = document.getElementById('shortenBtn');
const resultDiv = document.getElementById('result');
const shortenedUrlInput = document.getElementById('shortenedUrl');
const copyBtn = document.getElementById('copyBtn');
const feedback = document.getElementById('feedback');
const urlsList = document.getElementById('URLs');

// Initialize shortener
const shortener = new URLShortener();

// Event Listeners
shortenBtn.addEventListener('click', shortenURL);
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') shortenURL();
});
copyBtn.addEventListener('click', copyToClipboard);

function shortenURL() {
    const longURL = urlInput.value.trim();

    if (!longURL) {
        alert('Please enter a URL');
        return;
    }

    const result = shortener.shortenURL(longURL);

    if (!result) {
        alert('Please enter a valid URL (e.g., https://example.com)');
        return;
    }

    shortenedUrlInput.value = result.shortened;
    resultDiv.style.display = 'block';
    feedback.textContent = 'URL shortened successfully! ✅';
    feedback.style.color = '#27ae60';

    urlInput.value = '';
    updateURLList();
}

function copyToClipboard() {
    shortenedUrlInput.select();
    document.execCommand('copy');
    
    feedback.textContent = 'Copied to clipboard! 📋';
    feedback.style.color = '#27ae60';
    
    setTimeout(() => {
        feedback.textContent = '';
    }, 2000);
}

function updateURLList() {
    urlsList.innerHTML = '';
    const urls = shortener.getURLs();

    if (urls.length === 0) {
        urlsList.innerHTML = '<li>No shortened URLs yet</li>';
        return;
    }

    urls.forEach((url, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${url.shortened}</strong> 
            <br>
            <small>→ ${url.original}</small>
            <br>
            <small style="color: #999;">${url.created}</small>
        `;
        urlsList.appendChild(li);
    });
}

// Load URLs on page load
updateURLList();
