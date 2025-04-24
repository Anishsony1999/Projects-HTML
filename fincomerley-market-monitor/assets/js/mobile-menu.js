// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Select ALL menu triggers (both desktop and mobile)
    const menuTriggers = document.querySelectorAll('.mobile-menu-trigger');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    // Add click event to all triggers
    menuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-list a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}); 
