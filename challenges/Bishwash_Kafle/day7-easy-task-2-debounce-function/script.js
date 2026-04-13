// Debounce Function Implementation
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Statistics tracking
let stats = {
    totalCalls: 0,
    debouncedCalls: 0
};

// Mock search function
function performSearch(searchTerm) {
    stats.debouncedCalls++;
    updateStats();
    
    const resultsDiv = document.getElementById('searchResults');
    
    if (!searchTerm.trim()) {
        resultsDiv.innerHTML = '<p style="color: #999;">Start typing to search...</p>';
        return;
    }

    // Mock search results
    const mockData = [
        'JavaScript',
        'Java',
        'JSON',
        'jQuery',
        'Jest',
        'Joomla',
        'Django',
        'Vue.js',
        'Node.js'
    ];

    const results = mockData.filter(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p style="color: #999;">No results found</p>';
        return;
    }

    resultsDiv.innerHTML = results.map(result => 
        `<div class="result-item">🔍 ${result}</div>`
    ).join('');
}

// Create debounced version of search
const debouncedSearch = debounce(performSearch, 500);

// Track input events
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
    stats.totalCalls++;
    updateStats();
    debouncedSearch(this.value);
});

function updateStats() {
    const totalCalls = stats.totalCalls;
    const debouncedCalls = stats.debouncedCalls;
    const efficiency = totalCalls > 0 
        ? Math.round(((totalCalls - debouncedCalls) / totalCalls) * 100) 
        : 0;

    document.getElementById('totalCalls').textContent = totalCalls;
    document.getElementById('debouncedCalls').textContent = debouncedCalls;
    document.getElementById('efficiency').textContent = efficiency + '%';
}

function resetStats() {
    stats = {
        totalCalls: 0,
        debouncedCalls: 0
    };
    searchInput.value = '';
    document.getElementById('searchResults').innerHTML = '<p style="color: #999;">Start typing to search...</p>';
    updateStats();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchResults').innerHTML = '<p style="color: #999;">Start typing to search...</p>';
});
