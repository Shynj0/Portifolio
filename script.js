// 1. Efeito de Digitação Dinâmico
const textElement = document.getElementById('typing-text');
const messages = [
    "Analista e Desenvolvedor em formação.",
    "Especialista em resolver problemas complexos.",
    "Focado em Clean Code e Performance.",
    "Apaixonado pelo ecossistema Open Source."
];
let msgIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < messages[msgIndex].length) {
        textElement.textContent += messages[msgIndex].charAt(charIndex++);
        setTimeout(type, 70);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        textElement.textContent = messages[msgIndex].substring(0, charIndex-- - 1);
        setTimeout(erase, 35);
    } else {
        msgIndex = (msgIndex + 1) % messages.length;
        setTimeout(type, 500);
    }
}

// 2. Sistema de Filtros (Carrossel)
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        cards.forEach(card => {
            if (filter === 'todos' || card.dataset.categoria === filter) {
                card.style.display = 'flex';
                card.style.opacity = '0';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 3. Grid de Partículas Reativas (Background)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const mouse = { x: null, y: null, radius: 130 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    const spacing = 45;
    for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
            particles.push({ x, y });
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (mouse.x != null && dist < mouse.radius) {
            ctx.fillStyle = '#ff5a1f';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', initCanvas);
initCanvas();
animate();
type();