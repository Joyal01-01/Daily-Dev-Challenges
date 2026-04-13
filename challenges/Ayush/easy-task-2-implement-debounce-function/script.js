// Debounce function implementation
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Debounce with leading option
function debounceWithLeading(func, delay, leading = false) {
    let timeoutId;
    let lastRun = 0;

    return function(...args) {
        const now = Date.now();

        if (leading && now - lastRun >= delay) {
            func.apply(this, args);
            lastRun = now;
        }

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
            lastRun = now;
        }, delay);
    };
}

// Simulate database with usernames
const userDatabase = ['john', 'jane', 'johnson', 'javascript', 'java', 'julia'];

class DebounceDemo {
    constructor() {
        this.searchCount = 0;
        this.apiCallCount = 0;
        this.init();
    }

    init() {
        this.setupSearchDemo();
        this.setupResizeDemo();
        this.setupUsernameDemo();
    }

    setupSearchDemo() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        const searchCountEl = document.getElementById('searchCount');

        const performSearch = debounce((query) => {
            this.searchCount++;
            searchCountEl.textContent = this.searchCount;

            const query_lower = query.toLowerCase();
            const results = userDatabase.filter(user => 
                user.includes(query_lower)
            );

            if (!query) {
                searchResults.innerHTML = '<div class="empty">Start typing to search...</div>';
                searchResults.classList.add('empty');
            } else if (results.length === 0) {
                searchResults.innerHTML = '<div class="empty">No results found for "<strong>' + query + '</strong>"</div>';
                searchResults.classList.add('empty');
            } else {
                searchResults.classList.remove('empty');
                searchResults.innerHTML = results.map(r => 
                    `<div class="result-item">Found: <strong>${r}</strong></div>`
                ).join('');
            }
        }, 500);

        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        searchResults.innerHTML = '<div class="empty">Start typing to search...</div>';
    }

    setupResizeDemo() {
        const resizeInfo = document.getElementById('resizeInfo');
        let resizeCount = 0;

        const handleResize = debounce(() => {
            resizeCount++;
            const width = window.innerWidth;
            const height = window.innerHeight;

            resizeInfo.innerHTML = `
                <p><strong>Window resized ${resizeCount} time(s)</strong></p>
                <p>Dimensions: ${width}px × ${height}px</p>
                <p><small>Debounce delay: 300ms</small></p>
            `;
        }, 300);

        window.addEventListener('resize', handleResize);
    }

    setupUsernameDemo() {
        const usernameInput = document.getElementById('usernameInput');
        const apiCallCountEl = document.getElementById('apiCallCount');
        const checkStatusEl = document.getElementById('checkStatus');
        const availabilityEl = document.getElementById('availabilityStatus');

        const checkAvailability = debounce((username) => {
            if (!username) {
                checkStatusEl.textContent = 'Ready';
                checkStatusEl.style.background = '';
                availabilityEl.textContent = '-';
                return;
            }

            this.apiCallCount++;
            apiCallCountEl.textContent = this.apiCallCount;
            
            checkStatusEl.textContent = 'Checking...';
            checkStatusEl.style.background = '#ffc107';
            checkStatusEl.style.color = '#333';

            // Simulate API call
            setTimeout(() => {
                const isAvailable = !userDatabase.includes(username.toLowerCase());
                
                if (isAvailable) {
                    checkStatusEl.textContent = 'Available';
                    checkStatusEl.style.background = '#28a745';
                    checkStatusEl.style.color = 'white';
                    availabilityEl.textContent = '✓ Yes';
                    availabilityEl.style.background = '#28a745';
                    availabilityEl.style.color = 'white';
                } else {
                    checkStatusEl.textContent = 'Taken';
                    checkStatusEl.style.background = '#dc3545';
                    checkStatusEl.style.color = 'white';
                    availabilityEl.textContent = '✗ No (taken)';
                    availabilityEl.style.background = '#dc3545';
                    availabilityEl.style.color = 'white';
                }
            }, 400);
        }, 500);

        usernameInput.addEventListener('input', (e) => {
            checkAvailability(e.target.value);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DebounceDemo();
});
