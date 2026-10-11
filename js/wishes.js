document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('wishForm');
    const submitBtn = document.getElementById('submitWishBtn');
    const statusDiv = document.getElementById('formStatus');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const endpoint = window.BIRTHDAY_CONFIG ? window.BIRTHDAY_CONFIG.wishEndpoint : '';
        const wishInput = document.getElementById('wishText');
        
        if (!wishInput) return;
        const wish = wishInput.value.trim();

        if (!wish) return;

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Mengirim... ⏳';
        }
        
        if (statusDiv) {
            statusDiv.textContent = '';
            statusDiv.className = 'form-status';
        }

        // Mode Demo jika URL Endpoint belum diisi
        if (!endpoint || endpoint === "") {
            setTimeout(() => {
                if (statusDiv) {
                    statusDiv.textContent = '✨ (Demo Mode) Wish berhasil dikirim!';
                    statusDiv.classList.add('success');
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Kirim';
                }
                form.reset();
            }, 1000);
            return;
        }

        try {
            const formData = new URLSearchParams();
            formData.append('wish', wish);

            await fetch(endpoint, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });

            if (statusDiv) {
                statusDiv.textContent = '✨ Yeay! Wish Biya berhasil dikirim ke Kaka!';
                statusDiv.classList.add('success');
            }
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            if (statusDiv) {
                statusDiv.textContent = '❌ Oops, jaringan bermasalah. Coba lagi ya.';
                statusDiv.classList.add('error');
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Kirim';
            }
        }
    });
});