// Debounce Function Implementation
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Stats tracking
let withoutDebounceCount = 0;
let withDebounceCount = 0;

// Sample data for search
const sampleData = [
    'JavaScript',
    'Java',
    'Python',
    'React',
    'Vue',
    'Angular',
    'Node.js',
    'Express',
    'MongoDB',
    'SQL',
    'CSS',
    'HTML',
    'TypeScript',
    'Webpack',
    'Babel'
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const callsWithoutEl = document.getElementById('callsWithout');
const callsWithEl = document.getElementById('callsWith');
const efficiencyEl = document.getElementById('efficiency');
const resetBtn = document.getElementById('resetBtn');

// Without Debounce - called on every input
function searchWithoutDebounce(query) {
    withoutDebounceCount++;
    updateStats();
    performSearch(query);
}

// With Debounce - called after delay stops
const debouncedSearch = debounce(function(query) {
    withDebounceCount++;
    updateStats();
    performSearch(query);
}, 500);

// Perform actual search
function performSearch(query) {
    if (!query.trim()) {
        searchResults.innerHTML = 'Start typing to search...';
        return;
    }

    const results = sampleData.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
        searchResults.innerHTML = `<p>No results found for "${query}"</p>`;
    } else {
        searchResults.innerHTML = `
            <p><strong>Found ${results.length} result(s):</strong></p>
            <p style="color: #667eea; margin-top: 10px;">${results.join(', ')}</p>
        `;
    }
}

// Update statistics
function updateStats() {
    callsWithoutEl.textContent = withoutDebounceCount;
    callsWithEl.textContent = withDebounceCount;

    if (withoutDebounceCount > 0) {
        const efficiency = Math.round(
            ((withoutDebounceCount - withDebounceCount) / withoutDebounceCount) * 100
        );
        efficiencyEl.textContent = efficiency + '%';
    } else {
        efficiencyEl.textContent = '0%';
    }
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    
    // Count both calls
    searchWithoutDebounce(query);
    debouncedSearch(query);
});

resetBtn.addEventListener('click', () => {
    withoutDebounceCount = 0;
    withDebounceCount = 0;
    searchInput.value = '';
    searchResults.innerHTML = 'Start typing to search...';
    updateStats();
});

// Initial display
updateStats();
