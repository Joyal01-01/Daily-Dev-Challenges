// Leaderboard Data
const leaderboardData = [
    { rank: 1, developer: 'Ashmit', task: 'URL Shortener', difficulty: 'easy', completed: '2026-04-12', score: 100 },
    { rank: 2, developer: 'Ashmit', task: 'Debounce Function', difficulty: 'easy', completed: '2026-04-12', score: 100 },
    { rank: 3, developer: 'Ashmit', task: '3D Card Hover', difficulty: 'medium', completed: '2026-04-12', score: 150 },
    { rank: 4, developer: 'Ashmit', task: 'Markdown Previewer', difficulty: 'medium', completed: '2026-04-12', score: 150 },
    { rank: 5, developer: 'Ashmit', task: 'Dashboard Sidebar', difficulty: 'hard', completed: '2026-04-12', score: 200 },
];

let currentFilter = 'all';

// DOM Elements
const leaderboardBody = document.getElementById('leaderboardBody');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalSubmissionsEl = document.getElementById('totalSubmissions');
const easyCompletedEl = document.getElementById('easyCompleted');
const mediumCompletedEl = document.getElementById('mediumCompleted');
const hardCompletedEl = document.getElementById('hardCompleted');

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderLeaderboard();
    });
});

// Render leaderboard
function renderLeaderboard() {
    leaderboardBody.innerHTML = '';

    const filtered = currentFilter === 'all' 
        ? leaderboardData 
        : leaderboardData.filter(item => item.difficulty === currentFilter);

    filtered.forEach((item, index) => {
        const row = document.createElement('tr');
        row.className = `rank-${index + 1}`;

        row.innerHTML = `
            <td><span class="rank-badge">${item.rank}</span></td>
            <td><strong>${item.developer}</strong></td>
            <td>${item.task}</td>
            <td><span class="difficulty-badge difficulty-${item.difficulty}">${item.difficulty}</span></td>
            <td>${item.completed}</td>
            <td><span class="score">${item.score} pts</span></td>
        `;

        leaderboardBody.appendChild(row);
    });

    updateStats();
}

// Update statistics
function updateStats() {
    const easy = leaderboardData.filter(d => d.difficulty === 'easy').length;
    const medium = leaderboardData.filter(d => d.difficulty === 'medium').length;
    const hard = leaderboardData.filter(d => d.difficulty === 'hard').length;

    totalSubmissionsEl.textContent = leaderboardData.length;
    easyCompletedEl.textContent = easy;
    mediumCompletedEl.textContent = medium;
    hardCompletedEl.textContent = hard;
}

// Initialize
renderLeaderboard();
