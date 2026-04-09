// Sample products database
const products = [
    { id: 1, name: 'Wireless Earbuds', category: 'electronics', price: 89.99 },
    { id: 2, name: 'USB-C Cable', category: 'electronics', price: 9.99 },
    { id: 3, name: 'Laptop Stand', category: 'electronics', price: 34.99 },
    { id: 4, name: 'Mechanical Keyboard', category: 'electronics', price: 129.99 },
    { id: 5, name: 'Wireless Mouse', category: 'electronics', price: 39.99 },
    { id: 6, name: 'Monitor Light Bar', category: 'electronics', price: 79.99 },
    { id: 7, name: "Men's T-Shirt", category: 'clothing', price: 29.99 },
    { id: 8, name: "Women's Jeans", category: 'clothing', price: 59.99 },
    { id: 9, name: 'Winter Jacket', category: 'clothing', price: 149.99 },
    { id: 10, name: 'Running Shoes', category: 'sports', price: 119.99 },
    { id: 11, name: 'Yoga Mat', category: 'sports', price: 24.99 },
    { id: 12, name: 'Dumbbell Set', category: 'sports', price: 79.99 },
    { id: 13, name: 'JavaScript Guide', category: 'books', price: 34.99 },
    { id: 14, name: 'Web Design Basics', category: 'books', price: 29.99 },
    { id: 15, name: 'Coffee Beans', category: 'food', price: 14.99 },
    { id: 16, name: 'Organic Tea', category: 'food', price: 9.99 },
];

const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const searchBtn = document.getElementById('searchBtn');
const suggestions = document.getElementById('suggestions');
const resultsContainer = document.getElementById('resultsContainer');
const resultCount = document.getElementById('resultCount');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');
const sortFilter = document.getElementById('sortFilter');
const advancedBtn = document.getElementById('advancedBtn');
const advancedModal = document.getElementById('advancedModal');
const closeModal = document.getElementById('closeModal');
const advancedSearch = document.getElementById('advancedSearch');
const resetAdvanced = document.getElementById('resetAdvanced');

let currentResults = [];

// Clear button functionality
searchInput.addEventListener('input', () => {
    clearBtn.style.display = searchInput.value ? 'block' : 'none';
    handleSearch();
});

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    suggestions.classList.remove('active');
    resultsContainer.innerHTML = '<div class="no-results"><p>Start typing to search for products...</p></div>';
});

// Search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length === 0) {
        suggestions.classList.remove('active');
        resultsContainer.innerHTML = '<div class="no-results"><p>Start typing to search for products...</p></div>';
        return;
    }

    // Show suggestions
    const matched = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matched.length > 0) {
        suggestions.innerHTML = matched.map(p => 
            `<div class="suggestion-item">${p.name}</div>`
        ).join('');
        suggestions.classList.add('active');
    }

    // Perform search with filters
    performSearch();
}

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const maxPrice = parseFloat(priceFilter.value);
    const sort = sortFilter.value;

    let results = products.filter(p => {
        const matchesQuery = query === '' || 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query);
        const matchesCategory = category === '' || p.category === category;
        const matchesPrice = p.price <= maxPrice;

        return matchesQuery && matchesCategory && matchesPrice;
    });

    // Sort results
    switch(sort) {
        case 'price-low':
            results.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            results.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            results.reverse();
            break;
    }

    currentResults = results;
    displayResults(results);
}

function displayResults(results) {
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results"><p>No products found. Try a different search!</p></div>';
        resultCount.textContent = 'No results';
        return;
    }

    resultCount.textContent = `Found ${results.length} product${results.length !== 1 ? 's' : ''}`;

    resultsContainer.innerHTML = results.map(p => `
        <div class="result-item">
            <div class="result-category">${p.category}</div>
            <div class="result-title">${p.name}</div>
            <div class="result-price">$${p.price.toFixed(2)}</div>
        </div>
    `).join('');
}

// Filter event listeners
categoryFilter.addEventListener('change', performSearch);
priceFilter.addEventListener('input', () => {
    priceValue.textContent = `$0 - $${priceFilter.value}`;
    performSearch();
});
sortFilter.addEventListener('change', performSearch);

// Suggestion click
suggestions.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestion-item')) {
        searchInput.value = e.target.textContent;
        suggestions.classList.remove('active');
        performSearch();
    }
});

// Advanced search modal
advancedBtn.addEventListener('click', () => {
    advancedModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    advancedModal.style.display = 'none';
});

advancedSearch.addEventListener('click', () => {
    const exact = document.getElementById('exactMatch').value.toLowerCase();
    const allWords = document.getElementById('allWords').value.toLowerCase().split(' ').filter(w => w);
    const anyWord = document.getElementById('anyWord').value.toLowerCase().split(' ').filter(w => w);
    const excludeWords = document.getElementById('excludeWords').value.toLowerCase().split(' ').filter(w => w);

    let results = products.filter(p => {
        const name = p.name.toLowerCase();

        if (exact && !name.includes(exact)) return false;
        if (allWords.length && !allWords.every(w => name.includes(w))) return false;
        if (anyWord.length && !anyWord.some(w => name.includes(w))) return false;
        if (excludeWords.length && excludeWords.some(w => name.includes(w))) return false;

        return true;
    });

    currentResults = results;
    displayResults(results);
    advancedModal.style.display = 'none';
});

resetAdvanced.addEventListener('click', () => {
    document.getElementById('exactMatch').value = '';
    document.getElementById('allWords').value = '';
    document.getElementById('anyWord').value = '';
    document.getElementById('excludeWords').value = '';
});

// Close modal on background click
advancedModal.addEventListener('click', (e) => {
    if (e.target === advancedModal) {
        advancedModal.style.display = 'none';
    }
});

// Keyboard support
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
        suggestions.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        advancedModal.style.display = 'none';
        suggestions.classList.remove('active');
    }
});
