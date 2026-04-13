// Mouse tracking for enhanced 3D effect
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            rotateZ(0deg)
            translateZ(20px)
            scale(1.05)
        `;
    });

    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = `
            0 20px 40px rgba(102, 126, 234, 0.4),
            0 0 40px rgba(118, 75, 162, 0.3)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0) rotateZ(0) translateZ(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    });
});

// Add animation on page load
window.addEventListener('load', () => {
    cards.forEach((card, index) => {
        card.style.animation = `slideIn 0.6s ease-out ${index * 0.1}s forwards`;
    });
});

// Create animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
