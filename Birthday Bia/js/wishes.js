document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('wishForm');
    const submitBtn = document.getElementById('submitWishBtn');
    const statusDiv = document.getElementById('formStatus');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const endpoint = window.BIRTHDAY_CONFIG.wishEndpoint;
        const name = document.getElementById('senderName').value.trim();
        const wish = document.getElementById('wishText').value.trim();
        const msg = document.getElementById('additionalMsg') ? document.getElementById('additionalMsg').value.trim() : '';

        if (!name || !wish) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Mengirim... ⏳';
        statusDiv.textContent = '';
        statusDiv.className = 'form-status';

        if (!endpoint || endpoint === "") {
            setTimeout(() => {
                statusDiv.textContent = '✨ (Demo Mode) Wish berhasil dikirim!';
                statusDiv.classList.add('success');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Kirim Wish 🌟';
                form.reset();
            }, 1000);
            return;
        }

        try {
            const payload = JSON.stringify({
                name: name,
                wish: wish,
                message: msg
            });

            // Kirim dengan text/plain agar tidak memicu CORS Preflight, tapi body JSON tetap terbaca Apps Script
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: payload
            });

            statusDiv.textContent = '✨ Yeay! Wish kamu berhasil dikirim.';
            statusDiv.classList.add('success');
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            statusDiv.textContent = '❌ Oops, terjadi kesalahan jaringan. Coba lagi ya.';
            statusDiv.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Kirim Wish 🌟';
        }
    });
});