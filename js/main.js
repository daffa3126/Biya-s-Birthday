document.addEventListener('DOMContentLoaded', () => {
    const config = window.BIRTHDAY_CONFIG;

    if (!config) {
        console.error("BIRTHDAY_CONFIG belum dimuat! Pastikan config.js di-import sebelum main.js.");
        return;
    }

    // 1. Populate Text Data
    const setElementText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text || '';
    };

    setElementText('recipient-name', config.recipientName);
    setElementText('hero-message', config.heroMessage);
    setElementText('birthday-date', config.birthdayDate);
    setElementText('long-wish-title', config.longWishTitle);
    setElementText('long-wish-text', config.longWishText);
    setElementText('popup-title', config.giftPopupTitle);
    setElementText('popup-message', config.giftPopupMessage);

    // Dynamic Photo Captions (Support sampai 6 foto atau lebih)
    if (config.photoCaptions && Array.isArray(config.photoCaptions)) {
        config.photoCaptions.forEach((caption, index) => {
            setElementText(`cap-${index + 1}`, caption);
        });
    }

    // 2. Inject Corner Characters
    const charContainer = document.getElementById('corner-characters');
    if (charContainer && config.characters) {
        Object.keys(config.characters).forEach(key => {
            const char = config.characters[key];
            if (!char || !char.src) return;

            const img = document.createElement('img');
            img.src = char.src;
            img.className = 'corner-char';
            img.style.width = char.width || '100px';
            if (char.top) img.style.top = char.top;
            if (char.bottom) img.style.bottom = char.bottom;
            if (char.left) img.style.left = char.left;
            if (char.right) img.style.right = char.right;

            img.onerror = () => img.style.display = 'none';
            charContainer.appendChild(img);
        });
    }

    // 3. Audio Setup & Autoplay Music Modal
    const audio = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playAudioBtn');
    const musicModal = document.getElementById('musicModal');
    const startMusicBtn = document.getElementById('startMusicBtn');

    if (audio) {
        audio.src = config.page1Audio;
        audio.loop = true;

        // Fungsi memutar lagu
        const playMusicTrack = () => {
            audio.play().then(() => {
                if (playBtn) playBtn.textContent = '⏸ Pause Music';
            }).catch(err => {
                console.log("Autoplay ditahan browser:", err);
            });
        };

        // Klik tombol pada Pop-up Musik
        if (startMusicBtn && musicModal) {
            startMusicBtn.addEventListener('click', () => {
                playMusicTrack();
                musicModal.classList.remove('show');
                setTimeout(() => {
                    musicModal.style.display = 'none';
                }, 300);
            });
        }

        // Toggle manual tombol di pojok kanan atas
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (audio.paused) {
                    audio.play();
                    playBtn.textContent = '⏸ Pause Music';
                } else {
                    audio.pause();
                    playBtn.textContent = '🎵 Play Music';
                }
            });
        }
    }

    // 4. Gift Box Interaction
    const giftBox = document.getElementById('giftBox');
    const giftModal = document.getElementById('giftModal');
    const closeModal = document.getElementById('closeModal');

    if (giftBox && giftModal) {
        giftBox.addEventListener('click', () => {
            giftBox.classList.add('open');
            setTimeout(() => {
                giftModal.classList.add('show');
                createSparkles();
            }, 600);
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                giftModal.classList.remove('show');
                giftBox.classList.remove('open');
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === giftModal) {
                giftModal.classList.remove('show');
                giftBox.classList.remove('open');
            }
        });
    }
});

// Sparkle Effect for Gift
function createSparkles() {
    for (let i = 0; i < 30; i++) {
        let sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.top = '50%';
        sparkle.style.left = '50%';
        sparkle.style.width = '5px';
        sparkle.style.height = '5px';
        sparkle.style.backgroundColor = '#FFD76A';
        sparkle.style.borderRadius = '50%';
        sparkle.style.zIndex = '1001';
        sparkle.style.pointerEvents = 'none';

        let vx = (Math.random() - 0.5) * 1000;
        let vy = (Math.random() - 0.5) * 1000;

        sparkle.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
    }
}

// Navigation to page 2
function goToFireworks() {
    const audio = document.getElementById('bgMusic');
    if (audio) audio.pause();

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        window.location.href = 'fireworks.html';
    }, 500);
}