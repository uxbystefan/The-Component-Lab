document.addEventListener('DOMContentLoaded', function() {
    const inputGroup = document.querySelector('.input-group');
    const inputField = document.querySelector('.input-field');
    const socialButtons = document.querySelectorAll('.social-button');
    const card = document.querySelector('.card');

    // Handle input field focus
    inputField.addEventListener('focus', function() {
        inputGroup.classList.add('focused');
    });

    inputField.addEventListener('blur', function() {
        inputGroup.classList.remove('focused');
    });

    // Handle social buttons focus
    socialButtons.forEach(button => {
        button.addEventListener('focus', function() {
            this.classList.add('focused');
        });

        button.addEventListener('blur', function() {
            this.classList.remove('focused');
        });

        // Also handle click for better interaction
        button.addEventListener('mousedown', function() {
            this.classList.add('focused');
        });
    });

    // Handle mouse tracking gradient effect
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseenter', function() {
        card.classList.add('hover-effect');
    });

    card.addEventListener('mouseleave', function() {
        card.classList.remove('hover-effect');
    });
});