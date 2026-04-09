// Add interactivity to profile cards
const followButtons = document.querySelectorAll('.primary-btn');
const messageButtons = document.querySelectorAll('.secondary-btn');

followButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.textContent === 'Follow') {
            this.textContent = 'Following';
            this.style.background = '#27ae60';
        } else {
            this.textContent = 'Follow';
            this.style.background = '#667eea';
        }
    });
});

messageButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const card = this.closest('.profile-card');
        const name = card.querySelector('.profile-name').textContent;
        
        alert(`Message window opened for ${name}`);
    });
});

// Add ripple effect on button click
document.querySelectorAll('.profile-btn, .social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});
