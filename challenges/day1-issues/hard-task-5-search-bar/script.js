// Sample data for search
const sampleData = [
    'JavaScript', 'Python', 'React', 'Vue', 'Angular',
    'Node.js', 'Express', 'Django', 'Flask', 'MongoDB',
    'PostgreSQL', 'MySQL', 'CSS', 'HTML', 'TypeScript',
    'Java', 'C++', 'PHP', 'Ruby', 'Go'
];

const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestionsList');
const suggestionsContainer = document.querySelector('.suggestions-container');
const historyList = document.getElementById('historyList');
const searchHistory = document.querySelector('.search-history');
const clearHistoryBtn = document.querySelector('.clear-history');
const resultsContainer = document.getElementById('resultsContainer');
const results = document.getElementById('results');

let searchHistoryData = JSON.parse(localStorage.getItem('searchHistory')) || [];
let highlightIndex = -1;

// Load search history from localStorage
function loadSearchHistory() {
    historyList.innerHTML = '';
    if (searchHistoryData.length === 0) {
        searchHistory.classList.remove('show');
        return;
    }
    
    searchHistoryData.slice().reverse().forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.addEventListener('click', () => {
            searchInput.value = item;
            performSearch(item);
        });
        historyList.appendChild(li);
    });
}

// Save to history
function addToHistory(query) {
    if (!query.trim()) return;
    
    // Remove duplicate if exists
    searchHistoryData = searchHistoryData.filter(item => item !== query);
    
    // Add to beginning
    searchHistoryData.unshift(query);
    
    // Keep only last 10 searches
    if (searchHistoryData.length > 10) {
        searchHistoryData = searchHistoryData.slice(0, 10);
    }
    
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryData));
}

// Get suggestions
function getSuggestions(query) {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return sampleData.filter(item => 
        item.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
}

// Display suggestions
function showSuggestions(query) {
    const suggestions = getSuggestions(query);
    
    if (suggestions.length === 0) {
        suggestionsContainer.classList.remove('show');
        searchHistory.classList.remove('show');
        return;
    }
    
    suggestionsList.innerHTML = '';
    suggestions.forEach((suggestion, index) => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.addEventListener('click', () => {
            searchInput.value = suggestion;
            performSearch(suggestion);
        });
        suggestionsList.appendChild(li);
    });
    
    suggestionsContainer.classList.add('show');
    searchHistory.classList.remove('show');
    highlightIndex = -1;
}

// Perform search
function performSearch(query) {
    if (!query.trim()) {
        resultsContainer.classList.remove('show');
        suggestionsContainer.classList.remove('show');
        return;
    }
    
    addToHistory(query);
    
    // Filter results
    const filteredResults = sampleData.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    );
    
    // Display results
    results.innerHTML = '';
    
    if (filteredResults.length === 0) {
        results.innerHTML = '<div class="no-results">No results found for "' + query + '"</div>';
    } else {
        filteredResults.forEach(result => {
            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <h3>${result}</h3>
                <p>Search result for: ${result}</p>
            `;
            results.appendChild(card);
        });
    }
    
    resultsContainer.classList.add('show');
    suggestionsContainer.classList.remove('show');
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    
    if (query.trim()) {
        showSuggestions(query);
        resultsContainer.classList.remove('show');
    } else {
        suggestionsContainer.classList.remove('show');
        resultsContainer.classList.remove('show');
        loadSearchHistory();
        searchHistory.classList.add('show');
    }
    
    highlightIndex = -1;
});

searchInput.addEventListener('focus', () => {
    if (!searchInput.value.trim()) {
        loadSearchHistory();
        searchHistory.classList.add('show');
    } else {
        suggestionsContainer.classList.add('show');
    }
});

searchInput.addEventListener('keydown', (e) => {
    const items = suggestionsContainer.querySelectorAll('li');
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightIndex = Math.min(highlightIndex + 1, items.length - 1);
        updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightIndex = Math.max(highlightIndex - 1, -1);
        updateHighlight(items);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightIndex !== -1) {
            searchInput.value = items[highlightIndex].textContent;
        }
        performSearch(searchInput.value);
    } else if (e.key === 'Escape') {
        suggestionsContainer.classList.remove('show');
        searchHistory.classList.remove('show');
    }
});

function updateHighlight(items) {
    items.forEach((item, index) => {
        if (index === highlightIndex) {
            item.classList.add('highlight');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('highlight');
        }
    });
}

// Clear history
clearHistoryBtn.addEventListener('click', () => {
    searchHistoryData = [];
    localStorage.removeItem('searchHistory');
    loadSearchHistory();
});

// Close on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        suggestionsContainer.classList.remove('show');
        searchHistory.classList.remove('show');
    }
});

// Initial load
loadSearchHistory();
