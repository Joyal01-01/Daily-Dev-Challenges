class DashboardSidebar {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menuToggle');
        this.closeSidebar = document.getElementById('closeSidebar');
        this.overlay = document.getElementById('overlay');
        this.navItems = document.querySelectorAll('.nav-item');
        
        this.init();
    }

    init() {
        // Menu toggle button
        this.menuToggle.addEventListener('click', () => this.toggleSidebar());
        
        // Close button in sidebar
        this.closeSidebar.addEventListener('click', () => this.closeSidebarMenu());
        
        // Overlay click to close
        this.overlay.addEventListener('click', () => this.closeSidebarMenu());

        // Submenu toggles
        this.setupSubmenus();

        // Navigation item clicks
        this.setupNavItems();

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());

        // Close sidebar on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebarMenu();
            }
        });
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('open');
        this.overlay.classList.toggle('visible');
    }

    closeSidebarMenu() {
        this.sidebar.classList.remove('open');
        this.overlay.classList.remove('visible');
    }

    setupSubmenus() {
        const submenItems = [
            { link: '#analyticsLink', item: null },
            { link: '#productsLink', item: null }
        ];

        submenItems.forEach(({ link }) => {
            const linkEl = document.querySelector(link);
            if (linkEl) {
                linkEl.addEventListener('click', (e) => {
                    e.preventDefault();
                    const parent = linkEl.closest('.nav-item');
                    if (parent) {
                        parent.classList.toggle('expanded');
                    }
                });
            }
        });
    }

    setupNavItems() {
        this.navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link && !link.querySelector('.submenu-toggle')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.setActiveItem(item);
                    
                    // Close sidebar on mobile
                    if (window.innerWidth <= 768) {
                        this.closeSidebarMenu();
                    }
                });
            }
        });
    }

    setActiveItem(item) {
        // Remove active from all items
        this.navItems.forEach(navItem => {
            navItem.classList.remove('active');
        });
        
        // Add active to clicked item
        item.classList.add('active');
    }

    handleResize() {
        // Close sidebar on desktop when resizing from mobile
        if (window.innerWidth > 768) {
            this.closeSidebarMenu();
        }
    }
}

// Advanced Features
class DashboardEnhancements {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.init();
    }

    init() {
        this.setupScrollSpyNavigation();
        this.setupAria();
    }

    setupScrollSpyNavigation() {
        // Highlight nav item based on scroll position
        window.addEventListener('scroll', () => {
            // Can be enhanced to track sections
        });
    }

    setupAria() {
        // Improve accessibility with ARIA attributes
        const sidebarNav = this.sidebar.querySelector('.sidebar-nav');
        if (sidebarNav) {
            sidebarNav.setAttribute('role', 'navigation');
            sidebarNav.setAttribute('aria-label', 'Main navigation');
        }

        // Add aria-current to active nav items
        const activeItem = document.querySelector('.nav-item.active .nav-link');
        if (activeItem) {
            activeItem.setAttribute('aria-current', 'page');
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new DashboardSidebar();
    new DashboardEnhancements();

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const sidebar = document.getElementById('sidebar');
    const navItems = sidebar.querySelectorAll('.nav-link');
    
    // Tab navigation support
    if (e.key === 'Tab') {
        // Improve focus visibility
        document.body.classList.add('keyboard-nav');
    }

    // Arrow key navigation in sidebar
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (document.activeElement.closest('.sidebar')) {
            e.preventDefault();
            const currentIndex = Array.from(navItems).indexOf(document.activeElement.closest('.nav-link'));
            const nextIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
            
            if (nextIndex >= 0 && nextIndex < navItems.length) {
                navItems[nextIndex].focus();
            }
        }
    }
});

// Remove keyboard-nav class on mouse movement
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});
