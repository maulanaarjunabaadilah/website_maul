function showPage(pageId) {
    document.getElementById('page-home').classList.add('hidden');
    document.getElementById('page-about').classList.add('hidden');
    document.getElementById('page-login').classList.add('hidden');
    document.getElementById('page-register').classList.add('hidden');

    document.getElementById('page-' + pageId).classList.remove('hidden');

    document.getElementById('nav-home').classList.remove('active');
    document.getElementById('nav-about').classList.remove('active');
    document.getElementById('nav-login').classList.remove('active');

    if (pageId === 'home') document.getElementById('nav-home').classList.add('active');
    if (pageId === 'about') document.getElementById('nav-about').classList.add('active');
    if (pageId === 'login' || pageId === 'register') document.getElementById('nav-login').classList.add('active');
}

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 1.5;
        this.color = '#ffffff';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const numberOfParticles = (canvas.width * canvas.height) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();