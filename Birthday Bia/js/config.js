window.BIRTHDAY_CONFIG = {
    // 1. Informasi Utama
    recipientName: "Biya Sayangkuuuuuu", // Ganti dengan nama penerima
    heroMessage: "You are the brightest star in my night sky.",
    birthdayDate: "21 October 2026", // Ganti tanggal    

    // 2. Pesan Ulang Tahun Panjang
    longWishTitle: "Special Wish From Kakaber ✨",
    longWishText: "Biyaaa selamat ulang tahun sayangku cintakuu, biya sudah berumur 21 tahun, tapi bi sebenarnya masih 2,1 tahun bung kau itu masih kicik sekali, semoga bi panjang umur, sehat selalu, dan memberikan kk parab sebanyak banyaknya ya, dan mainkan akun gensin kaka selalu, karna kau digaji untuk itu! Kaka wish the best for u bung!",

    // 3. Caption untuk 3 Foto
    photoCaptions: [
        "Ini kau tersenyum bung!",
        "Ini kau merajuk!",
        "Ini kau sekolah!",
        "Ini kau merajuk juga bung!",
        "Ini kau munyo!",
        "Ini kau belum siap bung!",
    ],

    // 4. Kado Popup
    giftPopupTitle: "Ini ada kue lusyu untuk bia yang lusyu",
    giftPopupMessage: "Hey apakah kaka semanis kue ini bung? ",

    // 5. Audio (Pastikan nama file sesuai di folder assets/audio/)
    page1Audio: "assets/audio/lagu.mp3",
    page2Audio: "assets/audio/fireworks-music.mp3",

    // 6. Konfigurasi Karakter Pojok (Bisa diatur ukuran dan posisinya)
    characters: {
        topLeft: { src: "assets/characters/senang.png", width: "120px", top: "20px", left: "20px" },
        topRight: { src: "assets/characters/marah.png", width: "120px", top: "20px", right: "20px" },
        bottomLeft: { src: "assets/characters/malu.png", width: "130px", bottom: "20px", left: "20px" },
        bottomRight: { src: "assets/characters/cinta.png", width: "130px", bottom: "20px", right: "20px" }
    },

    // 7. Endpoint Google Apps Script untuk Form Wish
    // Ganti dengan URL Web App dari Google Apps Script setelah Anda men-deploy-nya
    wishEndpoint: "https://script.google.com/macros/s/AKfycbxfQDNKjBCh5PmrgFllgJX7Hk3V6haXiSq3S6hqRrYo_kR5XYD0sjWFGtFesWIZpto/exec" // Biarkan kosong untuk fallback/demo mode
};