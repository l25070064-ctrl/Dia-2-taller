// Smooth scroll behavior and interactive enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Add subtle tilt effect on hover
            const rect = card.getBoundingClientRect();
            const cardGlow = card.querySelector('.card-glow');

            card.addEventListener('mousemove', (e) => {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                // Move glow effect
                if (cardGlow) {
                    cardGlow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(102, 126, 234, 0.4) 0%, transparent 70%)`;
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.removeEventListener('mousemove', () => { });
        });
    });

    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all project cards
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Add parallax effect to gradient orbs
    const orbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.2);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add smooth fade-in for header on load
    const header = document.querySelector('.header-content');
    setTimeout(() => {
        header.style.opacity = '1';
    }, 100);

    // Console message
    console.log('%c🚀 Taller de Programación con IA', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%cBienvenido a mi portafolio de proyectos', 'font-size: 14px; color: #a0aec0;');
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});
