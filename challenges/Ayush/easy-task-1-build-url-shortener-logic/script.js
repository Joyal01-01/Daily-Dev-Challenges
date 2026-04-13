class URLShortener {
    constructor() {
        this.urlList = [];
        this.baseUrl = 'https://short.link/';
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.loadHistory();
    }

    attachEventListeners() {
        document.getElementById('generateBtn').addEventListener('click', () => this.generate());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        
        document.querySelectorAll('input[name="algorithm"]').forEach(radio => {
            radio.addEventListener('change', (e) => this.handleAlgorithmChange(e));
        });

        document.getElementById('longUrl').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.generate();
        });

        document.getElementById('customCode').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.generate();
        });
    }

    handleAlgorithmChange(e) {
        const customCodeGroup = document.querySelector('.custom-code-group');
        if (e.target.value === 'custom') {
            customCodeGroup.classList.remove('hidden');
        } else {
            customCodeGroup.classList.add('hidden');
        }
    }

    generate() {
        const longUrl = document.getElementById('longUrl').value.trim();
        if (!longUrl) {
            alert('Please enter a URL');
            return;
        }

        try {
            new URL(longUrl);
        } catch {
            alert('Please enter a valid URL');
            return;
        }

        const algorithm = document.querySelector('input[name="algorithm"]:checked').value;
        let shortCode = '';

        switch(algorithm) {
            case 'base62':
                shortCode = this.generateBase62();
                break;
            case 'md5':
                shortCode = this.generateMD5Short();
                break;
            case 'custom':
                shortCode = document.getElementById('customCode').value.trim();
                if (!shortCode) {
                    alert('Please enter a custom short code');
                    return;
                }
                if (!/^[a-zA-Z0-9-]+$/.test(shortCode)) {
                    alert('Short code can only contain letters, numbers, and hyphens');
                    return;
                }
                break;
        }

        this.displayResult(longUrl, shortCode, algorithm);
        this.addToHistory(longUrl, shortCode, algorithm);
    }

    generateBase62() {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        const timestamp = Date.now();
        
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return result;
    }

    generateMD5Short() {
        const url = document.getElementById('longUrl').value;
        const hash = this.simpleHash(url);
        return hash.substring(0, 6).toLowerCase();
    }

    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
    }

    displayResult(longUrl, shortCode, algorithm) {
        const resultsSection = document.querySelector('.results-section');
        resultsSection.classList.remove('hidden');

        document.getElementById('originalUrl').textContent = longUrl;
        document.getElementById('shortCode').textContent = shortCode;
        document.getElementById('shortUrl').textContent = this.baseUrl + shortCode;
        
        const algorithmNames = {
            'base62': 'Base62 Random Encoding',
            'md5': 'MD5 Hash (First 6 characters)',
            'custom': 'Custom Short Code'
        };
        document.getElementById('algorithmUsed').textContent = algorithmNames[algorithm];

        window.scrollTo({ top: resultsSection.offsetTop - 100, behavior: 'smooth' });
    }

    addToHistory(longUrl, shortCode, algorithm) {
        const entry = { longUrl, shortCode, algorithm };
        this.urlList.unshift(entry);
        
        if (this.urlList.length > 20) {
            this.urlList.pop();
        }

        this.saveHistory();
        this.renderHistory();
    }

    renderHistory() {
        const tbody = document.getElementById('urlTableBody');
        
        if (this.urlList.length === 0) {
            tbody.innerHTML = '<tr class="empty-state"><td colspan="4">No URLs generated yet</td></tr>';
            return;
        }

        tbody.innerHTML = this.urlList.map((entry, index) => `
            <tr>
                <td><code>${entry.shortCode}</code></td>
                <td title="${entry.longUrl}">${this.truncate(entry.longUrl, 50)}</td>
                <td>${this.getAlgorithmLabel(entry.algorithm)}</td>
                <td>
                    <button class="copy-btn" onclick="urlShortener.copyEntry('${entry.shortCode}')">📋 Copy</button>
                </td>
            </tr>
        `).join('');
    }

    getAlgorithmLabel(algorithm) {
        const labels = {
            'base62': 'Base62',
            'md5': 'MD5',
            'custom': 'Custom'
        };
        return labels[algorithm] || algorithm;
    }

    truncate(str, len) {
        return str.length > len ? str.substring(0, len) + '...' : str;
    }

    copyEntry(shortCode) {
        const fullUrl = this.baseUrl + shortCode;
        navigator.clipboard.writeText(fullUrl).then(() => {
            alert('Copied to clipboard: ' + fullUrl);
        });
    }

    reset() {
        const resultsSection = document.querySelector('.results-section');
        resultsSection.classList.add('hidden');
        document.getElementById('longUrl').focus();
    }

    saveHistory() {
        localStorage.setItem('urlHistory', JSON.stringify(this.urlList));
    }

    loadHistory() {
        const saved = localStorage.getItem('urlHistory');
        if (saved) {
            this.urlList = JSON.parse(saved);
            this.renderHistory();
        }
    }
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

const urlShortener = new URLShortener();

document.addEventListener('DOMContentLoaded', () => {
    urlShortener.renderHistory();
});
