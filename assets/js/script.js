    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    const openMenu = () => {
        navLinks.classList.add('active');
        mobileMenuBtn.classList.add('active');
        navOverlay.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileMenuBtn.setAttribute('aria-label', 'Fermer le menu');
        document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        navOverlay.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Ouvrir le menu');
        document.body.classList.remove('menu-open');
    };

    mobileMenuBtn.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navOverlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                closeMenu();
            }
        });
    });
    // Fade in animation on scroll
    // Sur mobile, le contenu s'empile en une seule colonne : les sections sont bien
    // plus hautes que sur desktop. Avec un threshold de 0.1, il faut que 10% de la
    // hauteur (parfois plusieurs écrans) soit visible avant le déclenchement — la
    // transition de 0.6s a alors souvent déjà fini de jouer avant que l'utilisateur
    // ne voie réellement le contenu, ce qui donne l'impression qu'il n'y a pas
    // d'animation. On garde le comportement desktop (0.1) inchangé et on abaisse
    // seulement le seuil sur mobile pour déclencher dès l'entrée dans l'écran.
    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
    const observerOptions = {
        threshold: isMobileViewport ? 0 : 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Subtle parallax on the hero image
    const heroImage = document.querySelector('.hero-image img');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (heroImage && !prefersReducedMotion) {
        const maxOffset = 60;
        let ticking = false;

        const updateParallax = () => {
            const offset = Math.min(window.scrollY * 0.15, maxOffset);
            heroImage.style.transform = `translateY(${offset}px)`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
