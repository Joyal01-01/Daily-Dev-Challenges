// Leaderboard Data
const leaderboardData = [
    { rank: 1, name: 'Bishwash Kafle', task: 'URL Shortener', category: 'easy', status: 'completed', points: 100 },
    { rank: 2, name: 'Bishwash Kafle', task: 'Debounce Function', category: 'easy', status: 'completed', points: 100 },
    { rank: 3, name: 'Bishwash Kafle', task: '3D Card Hover', category: 'medium', status: 'completed', points: 150 },
    { rank: 4, name: 'Bishwash Kafle', task: 'Markdown to HTML', category: 'medium', status: 'completed', points: 150 },
    { rank: 5, name: 'Bishwash Kafle', task: 'Dashboard Sidebar', category: 'hard', status: 'completed', points: 200 },
];

let currentFilter = 'all';

// Populate leaderboard table
function populateLeaderboard() {
    const tbody = document.getElementById('leaderboardBody');
    tbody.innerHTML = '';

    const filteredData = currentFilter === 'all' 
        ? leaderboardData 
        : leaderboardData.filter(item => item.category === currentFilter);

    filteredData.forEach((item, index) => {
        const row = document.createElement('tr');
        let rankClass = '';
        let rankDisplay = item.rank;

        if (item.rank === 1) {
            rankClass = 'gold';
            rankDisplay = '🥇 ' + item.rank;
        } else if (item.rank === 2) {
            rankClass = 'silver';
            rankDisplay = '🥈 ' + item.rank;
        } else if (item.rank === 3) {
            rankClass = 'bronze';
            rankDisplay = '🥉 ' + item.rank;
        }

        row.innerHTML = `
            <td><span class="rank ${rankClass}">${rankDisplay}</span></td>
            <td><strong>${item.name}</strong></td>
            <td>${item.task}</td>
            <td><span class="category-badge ${item.category}">${item.category}</span></td>
            <td><span class="status-badge ${item.status}">${item.status}</span></td>
            <td><span class="points">${item.points}</span></td>
        `;
        tbody.appendChild(row);
    });

    updateStats();
}

// Filter by category
function filterByCategory(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    populateLeaderboard();
}

// Update statistics
function updateStats() {
    const filteredData = currentFilter === 'all' 
        ? leaderboardData 
        : leaderboardData.filter(item => item.category === currentFilter);

    const totalParticipants = new Set(leaderboardData.map(item => item.name)).size;
    const totalTasks = leaderboardData.length;
    const totalPoints = leaderboardData.reduce((sum, item) => sum + item.points, 0);

    document.getElementById('totalParticipants').textContent = totalParticipants;
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('totalPoints').textContent = totalPoints;

    populateTopPerformers();
}

// Get top performers
function populateTopPerformers() {
    const performerMap = {};
    leaderboardData.forEach(item => {
        if (!performerMap[item.name]) {
            performerMap[item.name] = {
                name: item.name,
                tasks: 0,
                points: 0
            };
        }
        performerMap[item.name].tasks++;
        performerMap[item.name].points += item.points;
    });

    const topPerformers = Object.values(performerMap)
        .sort((a, b) => b.points - a.points)
        .slice(0, 3);

    const performersDiv = document.getElementById('topPerformers');
    performersDiv.innerHTML = '';

    topPerformers.forEach((performer, index) => {
        const card = document.createElement('div');
        card.className = 'performer-card';
        card.innerHTML = `
            <div class="performer-rank">#${index + 1}</div>
            <div class="performer-name">${performer.name}</div>
            <div class="performer-tasks">Tasks Completed: ${performer.tasks}</div>
            <div class="performer-points">${performer.points} Points</div>
        `;
        performersDiv.appendChild(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateLeaderboard();
});

// Add animation on page load
window.addEventListener('load', () => {
    const rows = document.querySelectorAll('.leaderboard-table tbody tr');
    rows.forEach((row, index) => {
        row.style.animation = `slideIn 0.4s ease ${index * 0.05}s forwards`;
        row.style.opacity = '0';
    });
});

// Create animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
