// Sample leaderboard data
const leaderboardData = [
    {
        rank: 1,
        name: 'Alice Chen',
        points: 245,
        tasks: '6/6',
        badge: '⭐',
        difficulty: 'all',
        avatar: 'AC'
    },
    {
        rank: 2,
        name: 'Bob Martinez',
        points: 235,
        tasks: '6/6',
        badge: '⭐',
        difficulty: 'all',
        avatar: 'BM'
    },
    {
        rank: 3,
        name: 'Carol Singh',
        points: 220,
        tasks: '5/6',
        badge: '🥉',
        difficulty: 'all',
        avatar: 'CS'
    },
    {
        rank: 4,
        name: 'David Lee',
        points: 195,
        tasks: '5/6',
        badge: '🎯',
        difficulty: 'all',
        avatar: 'DL'
    },
    {
        rank: 5,
        name: 'Emma Wilson',
        points: 185,
        tasks: '4/6',
        badge: '🚀',
        difficulty: 'all',
        avatar: 'EW'
    },
    {
        rank: 6,
        name: 'Frank Brown',
        points: 175,
        tasks: '4/6',
        badge: '',
        difficulty: 'all',
        avatar: 'FB'
    },
    {
        rank: 7,
        name: 'Grace Taylor',
        points: 160,
        tasks: '4/6',
        badge: '',
        difficulty: 'all',
        avatar: 'GT'
    },
    {
        rank: 8,
        name: 'Henry White',
        points: 145,
        tasks: '3/6',
        badge: '',
        difficulty: 'easy',
        avatar: 'HW'
    },
    {
        rank: 9,
        name: 'Isabella Garcia',
        points: 130,
        tasks: '3/6',
        badge: '',
        difficulty: 'medium',
        avatar: 'IG'
    },
    {
        rank: 10,
        name: 'James Miller',
        points: 120,
        tasks: '3/6',
        badge: '',
        difficulty: 'easy',
        avatar: 'JM'
    }
];

const leaderboardBody = document.getElementById('leaderboardBody');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentFilter = 'all';

// Difficulty mapping for filter
function getDifficulty(tasks) {
    const completed = parseInt(tasks.split('/')[0]);
    if (completed === 0) return 'none';
    if (completed <= 2) return 'easy';
    if (completed <= 4) return 'medium';
    return 'hard';
}

function renderLeaderboard(filter = 'all') {
    const filtered = leaderboardData.filter(entry => {
        if (filter === 'all') return true;
        const difficulty = getDifficulty(entry.tasks);
        return difficulty === filter || (filter === 'easy' && entry.points <= 50);
    }).sort((a, b) => b.points - a.points);

    if (filtered.length === 0) {
        leaderboardBody.innerHTML = '<div class="empty-state">No players in this category yet</div>';
        return;
    }

    leaderboardBody.innerHTML = filtered.map((entry, index) => {
        const topClass = index < 3 ? `top-${index + 1}` : '';
        return `
            <div class="table-row ${topClass}">
                <div class="rank">${index + 1}</div>
                <div class="player">
                    <div class="player-avatar">${entry.avatar}</div>
                    <div class="player-name">${entry.name}</div>
                </div>
                <div class="points">${entry.points}</div>
                <div class="tasks">${entry.tasks}</div>
                <div class="badge">${entry.badge}</div>
            </div>
        `;
    }).join('');

    updateStatistics(filtered);
}

function updateStatistics(filtered) {
    const totalPlayers = document.getElementById('totalPlayers');
    const totalPoints = document.getElementById('totalPoints');
    const avgScore = document.getElementById('avgScore');
    const completionRate = document.getElementById('completionRate');

    const players = filtered.length;
    const points = filtered.reduce((sum, entry) => sum + entry.points, 0);
    const avg = Math.round(points / players);
    const completion = Math.round((filtered.reduce((sum, entry) => {
        const completed = parseInt(entry.tasks.split('/')[0]);
        return sum + (completed / 6) * 100;
    }, 0) / players));

    totalPlayers.textContent = players;
    totalPoints.textContent = points;
    avgScore.textContent = avg;
    completionRate.textContent = completion + '%';
}

// Filter button click handlers
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderLeaderboard(currentFilter);
    });
});

// Initial render
renderLeaderboard();

// Add animation to rows on load
window.addEventListener('load', () => {
    const rows = document.querySelectorAll('.table-row');
    rows.forEach((row, index) => {
        row.style.animation = `none`;
        setTimeout(() => {
            row.style.animation = `fadeIn 0.5s ease ${index * 0.05}s forwards`;
        }, 10);
    });
});
