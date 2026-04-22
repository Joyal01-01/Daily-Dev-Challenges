// Profile card interactivity
const followBtn = document.querySelector('.follow-btn');
let isFollowing = false;

followBtn.addEventListener('click', () => {
    isFollowing = !isFollowing;
    followBtn.textContent = isFollowing ? 'Following' : 'Follow';
    followBtn.classList.toggle('following');
});

// Social media link clicks
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = btn.classList[1]; // github, twitter, or linkedin
        console.log(`Navigating to ${platform} profile...`);
        // In real app, you would navigate to actual profile
    });
});

// Add hover animation
const profileCard = document.querySelector('.profile-card');
profileCard.addEventListener('mousemove', (e) => {
    const rect = profileCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Optional: Add 3D tilt effect if desired
    // Can be enhanced with more complex calculations
});
