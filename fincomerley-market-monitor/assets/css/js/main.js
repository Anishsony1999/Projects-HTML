document.addEventListener('DOMContentLoaded', function() {
    // Handle Aximo accordion (FAQ section)
    const aximoAccordionItems = document.querySelectorAll('.aximo-accordion-item');
    
    aximoAccordionItems.forEach(item => {
        const header = item.querySelector('.aximo-accordion-header');
        const body = item.querySelector('.aximo-accordion-body');
        const activeIcon = item.querySelector('.aximo-accordion-icon.active');
        const inactiveIcon = item.querySelector('.aximo-accordion-icon.inactive');
        
        // Set initial state
        if (!item.classList.contains('open')) {
            body.style.display = 'none';
            if (activeIcon && inactiveIcon) {
                activeIcon.style.display = 'none';
                inactiveIcon.style.display = 'block';
            }
        } else {
            if (activeIcon && inactiveIcon) {
                activeIcon.style.display = 'block';
                inactiveIcon.style.display = 'none';
            }
        }
        
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all other items in the same accordion group
            const parentAccordion = item.closest('.aximo-accordion-wrap');
            if (parentAccordion) {
                parentAccordion.querySelectorAll('.aximo-accordion-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                        const otherBody = otherItem.querySelector('.aximo-accordion-body');
                        const otherActiveIcon = otherItem.querySelector('.aximo-accordion-icon.active');
                        const otherInactiveIcon = otherItem.querySelector('.aximo-accordion-icon.inactive');
                        
                        if (otherBody) otherBody.style.display = 'none';
                        if (otherActiveIcon) otherActiveIcon.style.display = 'none';
                        if (otherInactiveIcon) otherInactiveIcon.style.display = 'block';
                    }
                });
            }
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
                body.style.display = 'block';
                if (activeIcon && inactiveIcon) {
                    activeIcon.style.display = 'block';
                    inactiveIcon.style.display = 'none';
                }
            } else {
                item.classList.remove('open');
                body.style.display = 'none';
                if (activeIcon && inactiveIcon) {
                    activeIcon.style.display = 'none';
                    inactiveIcon.style.display = 'block';
                }
            }
        });
    });

    // Handle Bootstrap accordion
    const bootstrapAccordionButtons = document.querySelectorAll('.accordion-button');
    
    bootstrapAccordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isCollapsed = button.classList.contains('collapsed');
            const targetId = button.getAttribute('data-bs-target') || button.getAttribute('href');
            const targetContent = document.querySelector(targetId);
            
            // Close all other accordion items first
            bootstrapAccordionButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.classList.add('collapsed');
                    otherButton.setAttribute('aria-expanded', 'false');
                    const otherId = otherButton.getAttribute('data-bs-target') || otherButton.getAttribute('href');
                    const otherContent = document.querySelector(otherId);
                    if (otherContent) {
                        otherContent.classList.remove('show');
                    }
                }
            });
            
            // Toggle current item
            if (isCollapsed) {
                button.classList.remove('collapsed');
                button.setAttribute('aria-expanded', 'true');
                if (targetContent) {
                    targetContent.classList.add('show');
                }
            } else {
                button.classList.add('collapsed');
                button.setAttribute('aria-expanded', 'false');
                if (targetContent) {
                    targetContent.classList.remove('show');
                }
            }
        });
    });

    // Handle mobile menu
    const menuTriggers = document.querySelectorAll('.mobile-menu-trigger');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    menuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});
