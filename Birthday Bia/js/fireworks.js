document.addEventListener('DOMContentLoaded', () => {
    // Inject Name
    document.getElementById('fw-name').textContent = window.BIRTHDAY_CONFIG.recipientName;

    // UI Logic
    const startBtn = document.getElementById('startBtn');
    const startScreen = document.getElementById('startScreen');
    const celebrationText = document.getElementById('celebrationText');
    const audio = document.getElementById('fwMusic');
    const audioToggle = document.getElementById('audioToggle');

    audio.src = window.BIRTHDAY_CONFIG.page2Audio;
    audio.loop = true;

    startBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        celebrationText.classList.remove('hidden');
        audio.play().catch(e => console.log("Audio play blocked", e));
        
        // Mulai sistem kembang api otomatis setelah di-start
        autoLaunchInterval = setInterval(launchRandomRocket, 800);
    });

    audioToggle.addEventListener('click', () => {
        if(audio.paused) {
            audio.play(); audioToggle.textContent = '⏸ Pause Music';
        } else {
            audio.pause(); audioToggle.textContent = '🎵 Play Music';
        }
    });

    // --- CANVAS FIREWORKS SYSTEM ---
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    let cw = canvas.width = window.innerWidth;
    let ch = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        cw = canvas.width = window.innerWidth;
        ch = canvas.height = window.innerHeight;
    });

    const particles = [];
    const rockets = [];
    const colors = ['#FFD76A', '#78BFFF', '#FF5A5F', '#FF69B4', '#00FFFF', '#FFFFFF'];
    let autoLaunchInterval;

    class Rocket {
        constructor(x, y, targetY) {
            this.x = x; this.y = y; this.targetY = targetY;
            this.speed = 8 + Math.random() * 4;
            this.angle = Math.PI / 2 + (Math.random() - 0.5) * 0.2;
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = -Math.sin(this.angle) * this.speed;
            this.color = '#FFF';
            this.trail = [];
        }
        update(index) {
            this.trail.push({x: this.x, y: this.y});
            if(this.trail.length > 5) this.trail.shift();
            
            this.x += this.vx; this.y += this.vy;
            
            // Meledak jika mencapai target atau mulai turun
            if(this.vy >= -1 || this.y <= this.targetY) {
                rockets.splice(index, 1);
                createExplosion(this.x, this.y);
            } else {
                this.vy += 0.1; // gravity for rocket
            }
        }
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.trail[0]?.x || this.x, this.trail[0]?.y || this.y);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x; this.y = y; this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 7 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = 0.015 + Math.random() * 0.015;
        }
        update(index) {
            this.vy += 0.05; // gravity for particles
            this.vx *= 0.98; // friction
            this.vy *= 0.98;
            this.x += this.vx; this.y += this.vy;
            this.alpha -= this.decay;
            if(this.alpha <= 0) particles.splice(index, 1);
        }
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function createExplosion(x, y) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const count = 50 + Math.random() * 50;
        for(let i=0; i<count; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    function launchRandomRocket() {
        if(document.visibilityState !== 'visible') return; // Hemat baterai jika tab tidak aktif
        const x = Math.random() * cw;
        const targetY = Math.random() * (ch / 2);
        rockets.push(new Rocket(x, ch, targetY));
    }

    // Interaktif: Klik untuk menembak roket
    canvas.addEventListener('click', (e) => {
        rockets.push(new Rocket(e.clientX, ch, e.clientY));
    });

    function loop() {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Efek jejak memudar (trail effect)
        ctx.fillRect(0, 0, cw, ch);
        ctx.globalCompositeOperation = 'lighter';
        
        ctx.globalAlpha = 1;
        for(let i = rockets.length - 1; i >= 0; i--) rockets[i].update(i);
        for(let i = rockets.length - 1; i >= 0; i--) rockets[i]?.draw();
        
        for(let i = particles.length - 1; i >= 0; i--) particles[i].update(i);
        for(let i = particles.length - 1; i >= 0; i--) particles[i]?.draw();
        
        requestAnimationFrame(loop);
    }
    
    loop();
});