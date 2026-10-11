document.addEventListener('DOMContentLoaded', () => {
    const config = window.BIRTHDAY_CONFIG;

    // 1. Populate Text Data
    document.getElementById('recipient-name').textContent = config.recipientName;
    document.getElementById('hero-message').textContent = config.heroMessage;
    document.getElementById('birthday-date').textContent = config.birthdayDate;
    
    document.getElementById('cap-1').textContent = config.photoCaptions[0];
    document.getElementById('cap-2').textContent = config.photoCaptions[1];
    document.getElementById('cap-3').textContent = config.photoCaptions[2];
    document.getElementById('cap-4').textContent = config.photoCaptions[3];
    document.getElementById('cap-5').textContent = config.photoCaptions[4];
    document.getElementById('cap-6').textContent = config.photoCaptions[5];
    
    document.getElementById('long-wish-title').textContent = config.longWishTitle;
    document.getElementById('long-wish-text').textContent = config.longWishText;
    
    document.getElementById('popup-title').textContent = config.giftPopupTitle;
    document.getElementById('popup-message').textContent = config.giftPopupMessage;

    // 2. Inject Corner Characters
    const charContainer = document.getElementById('corner-characters');
    Object.keys(config.characters).forEach(key => {
        const char = config.characters[key];
        const img = document.createElement('img');
        img.src = char.src;
        img.className = 'corner-char';
        img.style.width = char.width;
        if(char.top) img.style.top = char.top;
        if(char.bottom) img.style.bottom = char.bottom;
        if(char.left) img.style.left = char.left;
        if(char.right) img.style.right = char.right;
        
        // Handle broken image silently
        img.onerror = () => img.style.display = 'none';
        charContainer.appendChild(img);
    });

    // 3. Audio Setup
    // Setup Audio Autoplay & Loop
    const audio = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playAudioBtn');

    if (audio) {
        audio.src = config.page1Audio;
        audio.loop = true;

        function playAudio() {
            audio.play().then(() => {
                if (playBtn) playBtn.textContent = '⏸ Pause Music';
            }).catch(error => {
                console.log("Autoplay diblokir browser, menunggu interaksi pengguna...");
            });
        }

        // Coba autoplay saat awal muat
        playAudio();

        // Autoplay saat pengguna pertama kali berinteraksi (klik/tap layar)
        function enableAutoplayOnInteraction() {
            playAudio();
            document.removeEventListener('click', enableAutoplayOnInteraction);
            document.removeEventListener('touchstart', enableAutoplayOnInteraction);
        }

        document.addEventListener('click', enableAutoplayOnInteraction);
        document.addEventListener('touchstart', enableAutoplayOnInteraction);

        // Toggle manual dari tombol audio
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
    const modal = document.getElementById('giftModal');
    const closeBtn = document.getElementById('closeModal');

    giftBox.addEventListener('click', () => {
        giftBox.classList.add('open');
        setTimeout(() => {
            modal.classList.add('show');
            createSparkles();
        }, 600); // Wait for lid animation
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        giftBox.classList.remove('open');
    });

    window.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.remove('show');
            giftBox.classList.remove('open');
        }
    });
});

// Sparkle Effect for Gift
function createSparkles() {
    for(let i=0; i<30; i++) {
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
        
        // Random velocity
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
    // Stop audio cleanly before leaving
    const audio = document.getElementById('bgMusic');
    if(audio) audio.pause();
    
    // Add simple fade out class (requires inline CSS transition on body or just navigate directly)
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        window.location.href = 'fireworks.html';
    }, 500);
}