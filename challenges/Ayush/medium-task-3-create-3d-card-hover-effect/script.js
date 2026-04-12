class Card3DEffect {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.init();
    }

    init() {
        this.cards.forEach((card, index) => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate the distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Calculate rotation angles (limited to ±10 degrees)
        const rotateX = (distanceY / rect.height) * 10;
        const rotateY = (distanceX / rect.width) * -10;
        
        // Add shadow depth based on rotation
        const shadowIntensity = (Math.abs(rotateX) + Math.abs(rotateY)) / 20;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
        `;
        
        card.style.boxShadow = `
            ${-rotateY * 2}px ${rotateX * 2}px ${30 + shadowIntensity * 10}px rgba(0, 0, 0, ${0.2 + shadowIntensity * 0.1})
        `;
    }

    handleMouseLeave(e, card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new Card3DEffect();
});

// Optional: Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.card').forEach(card => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    }
});
