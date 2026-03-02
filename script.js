// script.js
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ANIMASI RIPPLE EFFECT UNTUK SEMUA TOMBOL =====
    const buttons = document.querySelectorAll('.btn-enter, .btn-ripple');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Cek jika tombol sudah memiliki ripple
            if (this.querySelector('.ripple')) return;
            
            // Posisi klik relatif terhadap tombol
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Buat elemen ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Tambahkan ke tombol
            this.appendChild(ripple);
            
            // Hapus setelah animasi selesai
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ===== ANIMASI KARTU SAAT DIKLIK =====
    const cards = document.querySelectorAll('.choice-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Mencegah event bubbling jika diperlukan
            if (!e.target.classList.contains('btn-enter')) {
                this.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // ===== EFEK SUARA KLIK (OPSIONAL) =====
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            playClickSound();
        });
    });
    
    function playClickSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // ===== ANIMASI FLOWER INTERAKTIF =====
    const flowers = document.querySelectorAll('.flower');
    
    flowers.forEach(flower => {
        flower.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.5) rotate(180deg)';
            this.style.opacity = '0.5';
            
            setTimeout(() => {
                this.style.animation = '';
                this.style.transform = '';
                this.style.opacity = '';
            }, 1000);
        });
    });

    // ===== LOADING ANIMATION SAAT HALAMAN DIMUAT =====
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    const header = document.querySelector('header');
    const icons = document.querySelectorAll('.icon');
    
    // Efek hover lebih halus
    header.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    // Animasi untuk ikon
    icons.forEach((icon, index) => {
        // Delay animasi untuk setiap ikon
        icon.style.animationDelay = `${index * 0.5}s`;
        icon.style.animation = `float 3s ease-in-out infinite`;
    });
    
    // Menambahkan efek klik pada ikon
    icons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Menambahkan efek pada tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        tagline.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        tagline.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Log untuk debugging
    console.log('Header "Teman Tidur" telah dimuat dengan sukses!');
    
});