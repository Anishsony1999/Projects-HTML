document.addEventListener('DOMContentLoaded', function() {
    // Handle the aximo accordion
    const aximoAccordionItems = document.querySelectorAll('.aximo-accordion-item');
    
    aximoAccordionItems.forEach(item => {
        const header = item.querySelector('.aximo-accordion-header');
        const body = item.querySelector('.aximo-accordion-body');
        const activeIcon = item.querySelector('.aximo-accordion-icon.active');
        const inactiveIcon = item.querySelector('.aximo-accordion-icon.inactive');
        
        // Initially hide all accordion bodies except the first one
        if (!item.classList.contains('open')) {
            body.style.display = 'none';
            activeIcon.style.display = 'none';
            inactiveIcon.style.display = 'block';
        } else {
            activeIcon.style.display = 'block';
            inactiveIcon.style.display = 'none';
        }
        
        header.addEventListener('click', () => {
            // Toggle the current item
            const isOpen = item.classList.contains('open');
            
            // Close all other items
            aximoAccordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.aximo-accordion-body').style.display = 'none';
                    otherItem.querySelector('.aximo-accordion-icon.active').style.display = 'none';
                    otherItem.querySelector('.aximo-accordion-icon.inactive').style.display = 'block';
                }
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
                body.style.display = 'block';
                activeIcon.style.display = 'block';
                inactiveIcon.style.display = 'none';
            } else {
                item.classList.remove('open');
                body.style.display = 'none';
                activeIcon.style.display = 'none';
                inactiveIcon.style.display = 'block';
            }
        });
    });

    // Handle Bootstrap accordion
    const bootstrapAccordionButtons = document.querySelectorAll('.accordion-button');
    
    bootstrapAccordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            bootstrapAccordionButtons.forEach(btn => {
                if (btn !== button) {
                    btn.classList.add('collapsed');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current button
            button.classList.toggle('collapsed');
            button.setAttribute('aria-expanded', button.classList.contains('collapsed') ? 'false' : 'true');
        });
    });
});
