// Stars Animation
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Star particles
const stars = [];
const numStars = 200;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.02;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Twinkling effect
        this.opacity += this.twinkleSpeed;
        if (this.opacity > 1 || this.opacity < 0) {
            this.twinkleSpeed = -this.twinkleSpeed;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize stars
for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
const buttons = document.querySelectorAll('.btn-connect, .btn-services, .nav-connect-btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Mouse-following laser particles
const mouseParticles = [];
const maxMouseParticles = 40;
let mouse = { x: 0, y: 0 };
let time = 0;

class MouseParticle {
    constructor(x, y, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.prevX = x;
        this.prevY = y;
        this.size = Math.random() * 1 + 0.8;
        this.speedX = velocityX * 3 + (Math.random() - 0.5) * 4;
        this.speedY = velocityY * 3 + (Math.random() - 0.5) * 4;
        this.life = 1;
        this.decay = Math.random() * 0.04 + 0.03;
        this.color = this.getRandomColor();
        this.brightness = Math.random() * 0.3 + 0.3;
        this.trail = [];
        this.maxTrailLength = 5;
    }

    getRandomColor() {
        const colors = [
            { r: 137, g: 14, b: 129 },   // #890E81
            { r: 25, g: 43, b: 239 },    // #192BEF
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return `rgba(${color.r}, ${color.g}, ${color.b}, `;
    }

    update() {
        // Store previous position for trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
        
        this.prevX = this.x;
        this.prevY = this.y;
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Add slight friction
        this.speedX *= 0.97;
        this.speedY *= 0.97;
        
        this.life -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        // Draw laser trail - simplified for performance
        if (this.trail.length > 1) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            for (let i = 0; i < this.trail.length - 1; i++) {
                const point = this.trail[i];
                const nextPoint = this.trail[i + 1];
                const trailLife = ((i + 1) / this.trail.length) * this.life;
                const lineWidth = this.size * 1.5 * trailLife;
                
                // Outer glow
                ctx.strokeStyle = this.color + (trailLife * 0.25) + ')';
                ctx.lineWidth = lineWidth * 2.5;
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color + (trailLife * 0.4) + ')';
                
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(nextPoint.x, nextPoint.y);
                ctx.stroke();
                
                // Inner bright line
                ctx.strokeStyle = this.color + (trailLife * 0.5) + ')';
                ctx.lineWidth = lineWidth * 0.8;
                ctx.shadowBlur = 8;
                
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(nextPoint.x, nextPoint.y);
                ctx.stroke();
            }
        }
        
        // Draw laser particle core - simplified
        const coreSize = this.size * 2;
        
        // Outer glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color + (this.life * 0.5) + ')';
        ctx.fillStyle = this.color + (this.life * 0.35) + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, coreSize * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Bright center
        ctx.shadowBlur = 8;
        ctx.fillStyle = this.color + (this.life * 0.6) + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, coreSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Track mouse position
let lastMouse = { x: 0, y: 0 };
let mouseVelocity = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
    const newX = e.clientX;
    const newY = e.clientY;
    
    mouseVelocity.x = newX - mouse.x;
    mouseVelocity.y = newY - mouse.y;
    
    mouse.x = newX;
    mouse.y = newY;
    
    // Create laser particles when mouse moves
    const distance = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y);
    
    if (distance > 5) {
        // Create particles based on speed
        const particleCount = Math.min(Math.floor(distance / 12), 3);
        for (let i = 0; i < particleCount; i++) {
            if (mouseParticles.length < maxMouseParticles) {
                mouseParticles.push(new MouseParticle(mouse.x, mouse.y, mouseVelocity.x, mouseVelocity.y));
            }
        }
        lastMouse = { x: mouse.x, y: mouse.y };
    }
});

// Update animation loop to include mouse particles
function animate() {
    // Fade effect instead of clearing for trail persistence
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    time++; // Increment time for turbulence
    
    // Draw stars
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Draw and update laser particles
    for (let i = mouseParticles.length - 1; i >= 0; i--) {
        mouseParticles[i].update();
        mouseParticles[i].draw();
        
        // Remove dead particles
        if (mouseParticles[i].life <= 0) {
            mouseParticles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();