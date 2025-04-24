// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuTrigger = document.querySelector('.mobile-menu-trigger');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    // Open mobile menu
    mobileMenuTrigger.addEventListener('click', function() {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    // Close mobile menu
    mobileMenuClose.addEventListener('click', function() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-list a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    });
}); 