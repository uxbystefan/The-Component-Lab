// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Navigation clicked:', this.textContent);
    });
});

// Button click handlers
document.querySelector('.btn-primary').addEventListener('click', function() {
    console.log('Get started clicked');
    // Add your navigation logic here
});

document.querySelector('.btn-secondary').addEventListener('click', function() {
    console.log('Book a demo clicked');
    // Add your navigation logic here
});

// Add parallax effect to gradient background on mouse move
document.addEventListener('mousemove', function(e) {
    const gradientBg = document.querySelector('.gradient-bg');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    gradientBg.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
});

// Add intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe hero content elements
document.querySelectorAll('.community-badge, .hero-title, .hero-subtitle, .cta-buttons').forEach(el => {
    observer.observe(el);
});