// Button click handler (optional - add your own logic)
document.querySelector('.access-button').addEventListener('click', function() {
    console.log('Access requested');
    // Add your access request logic here
});

// Social link click handlers (optional)
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Social link clicked:', this.getAttribute('aria-label'));
        // Add your social link logic here
    });
});
