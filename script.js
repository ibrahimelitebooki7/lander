// Intersection Observer for scroll-reveal animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation triggers
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.classList.add('reveal', `reveal-delay-${(index % 4) + 1}`);
        observer.observe(card);
    });

    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.classList.add('reveal', `reveal-delay-${(index % 3) + 1}`);
        observer.observe(card);
    });

    // Observe pricing cards
    document.querySelectorAll('.pricing-card').forEach((card, index) => {
        card.classList.add('reveal', `reveal-delay-${(index % 3) + 1}`);
        observer.observe(card);
    });

    // Observe section headings
    document.querySelectorAll('section h2').forEach((heading) => {
        heading.classList.add('reveal');
        observer.observe(heading);
    });

    // Observe section subheadings
    document.querySelectorAll('section h2 + p').forEach((subheading) => {
        subheading.classList.add('reveal', 'reveal-delay-1');
        observer.observe(subheading);
    });

    // Mobile nav smooth scroll (close on click for better UX)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Nav background opacity on scroll
    const nav = document.querySelector('nav');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 20) {
                    nav.style.backgroundColor = 'rgba(10, 10, 15, 0.95)';
                    nav.style.boxShadow = '0 1px 30px rgba(0, 0, 0, 0.3)';
                } else {
                    nav.style.backgroundColor = 'rgba(10, 10, 15, 0.8)';
                    nav.style.boxShadow = 'none';
                }
                ticking = false;
            });
            ticking = true;
        }
    });
});