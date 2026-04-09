// Dropdown functionality
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-btn');
    const content = dropdown.querySelector('.dropdown-content');

    // Desktop: Show on hover
    dropdown.addEventListener('mouseenter', () => {
        content.style.display = 'block';
    });

    dropdown.addEventListener('mouseleave', () => {
        content.style.display = 'none';
    });

    // Mobile: Toggle on click
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close other dropdowns
        dropdowns.forEach(other => {
            if (other !== dropdown) {
                other.classList.remove('active');
            }
        });

        // Toggle current dropdown
        dropdown.classList.toggle('active');
    });
});

// Close dropdowns when clicking on a link
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', () => {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});
