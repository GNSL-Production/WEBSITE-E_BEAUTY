/* ==================== UTILITAIRES ==================== */
function safeInit(label, fn) {
    try {
        fn();
    } catch (err) {
        console.error(`[script.js] Échec d'initialisation : ${label}`, err);
    }
}

/* ==================== ÉTAT GLOBAL ==================== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==================== INITIALISATIONS DES FONCTIONNALITÉS ==================== */

/* ---- Préchargeur d'entrée ---- */
safeInit('préchargeur d\'entrée', () => {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    if (prefersReducedMotion) {
        loader.remove();
        return;
    }

    const MIN_DISPLAY_MS = 400;
    const MAX_WAIT_MS = 2500;
    const shownAt = Date.now();
    let done = false;

    const hideLoader = () => {
        if (done) return;
        done = true;
        const wait = Math.max(0, MIN_DISPLAY_MS - (Date.now() - shownAt));
        setTimeout(() => {
            loader.classList.add('is-hidden');
            loader.addEventListener('transitionend', () => loader.remove(), { once: true });
        }, wait);
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader, { once: true });
    }
    setTimeout(hideLoader, MAX_WAIT_MS);
});

/* ---- Effet magnétique des boutons CTA ---- */
safeInit('effet magnétique des boutons CTA', () => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const MAX_OFFSET = 10;

    document.querySelectorAll('.cta-button').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            btn.style.setProperty('--mx', `${relX * MAX_OFFSET}px`);
            btn.style.setProperty('--my', `${relY * MAX_OFFSET}px`);
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.setProperty('--mx', '0px');
            btn.style.setProperty('--my', '0px');
        });
    });
});

/* ---- Menu mobile ---- */
safeInit('menu mobile', () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
    const syncNavInert = () => {
        const isOffCanvas = mobileMediaQuery.matches && !navLinks.classList.contains('active');
        navLinks.toggleAttribute('inert', isOffCanvas);
    };

    const openMenu = () => {
        navLinks.classList.add('active');
        mobileMenuBtn.classList.add('active');
        navOverlay.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileMenuBtn.setAttribute('aria-label', 'Fermer le menu');
        document.documentElement.classList.add('menu-open');
        document.body.classList.add('menu-open');
        syncNavInert();
    };

    const closeMenu = () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        navOverlay.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Ouvrir le menu');
        document.documentElement.classList.remove('menu-open');
        document.body.classList.remove('menu-open');
        syncNavInert();
    };

    syncNavInert();
    mobileMediaQuery.addEventListener('change', syncNavInert);

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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                closeMenu();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const LAYOUT_BREAKPOINT = 768;
    let isMobileLayout = window.innerWidth <= LAYOUT_BREAKPOINT;
    window.addEventListener('resize', () => {
        const nowMobileLayout = window.innerWidth <= LAYOUT_BREAKPOINT;
        if (nowMobileLayout !== isMobileLayout) {
            isMobileLayout = nowMobileLayout;
            closeMenu();
        }
    });
});

/* ---- Animations au scroll ---- */
safeInit('animations au scroll', () => {
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

    document.querySelectorAll('.services-grid, .gallery-grid').forEach(grid => {
        Array.from(grid.children).forEach((el, i) => {
            el.classList.add('stagger-item');
            el.style.setProperty('--i', i);
        });
    });
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.stagger-item').forEach(el => staggerObserver.observe(el));
});

/* ---- Fondu des images ---- */
safeInit('fondu des images', () => {
    document.querySelectorAll('.gallery-item img, .service-image img').forEach(img => {
        if (img.complete) {
            img.classList.add('is-loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('is-loaded'));
        }
    });
});

/* ---- Repli visuel des images cassées ---- */
safeInit('repli visuel des images cassées', () => {
    document.querySelectorAll('picture img').forEach(img => {
        img.addEventListener('error', () => {
            img.closest('picture')?.classList.add('media-broken');
        }, { once: true });
    });
});

/* ---- Scrollspy de la navigation ---- */
safeInit('scrollspy', () => {
    const navLinks = document.getElementById('navLinks');
    const navAnchors = Array.from(navLinks.querySelectorAll('a[href^="#"]'));
    const spySections = navAnchors
        .map(anchor => document.querySelector(anchor.getAttribute('href')))
        .filter(Boolean);

    if (spySections.length) {
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const anchor = navAnchors.find(a => a.getAttribute('href') === `#${entry.target.id}`);
                if (!anchor) return;
                anchor.classList.toggle('active', entry.isIntersecting);
            });
        }, { rootMargin: '-50% 0px -50% 0px' });

        spySections.forEach(section => spyObserver.observe(section));
    }
});

/* ---- Parallax du hero ---- */
safeInit('parallax hero', () => {
    const heroImage = document.querySelector('.hero-image img');

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
});

/* ---- Rétrécissement du header au scroll ---- */
safeInit('rétrécissement du header au scroll', () => {
    const header = document.getElementById('header');
    if (!header) return;

    const SCROLL_THRESHOLD = 80;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= SCROLL_THRESHOLD) {
            header.classList.remove('nav-shrink');
        } else if (currentScrollY > lastScrollY) {
            header.classList.add('nav-shrink');
        } else if (currentScrollY < lastScrollY) {
            header.classList.remove('nav-shrink');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
});

/* ---- Retour en haut ---- */
safeInit('retour en haut', () => {
    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
});

/* ---- Bandeau cookies ---- */
safeInit('bandeau cookies', () => {
    const STORAGE_KEY = 'eBeautyCookieConsent';
    if (localStorage.getItem(STORAGE_KEY)) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Préférences de cookies');
    const privacyHref = `${window.__siteBase || ''}pages/politique-de-confidentialite.html`;
    banner.innerHTML = `
        <div class="cookie-banner-inner">
            <div class="cookie-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                </svg>
            </div>
            <div class="cookie-copy">
                <p class="cookie-kicker">Confidentialité</p>
                <p>Ce site n'utilise aucun cookie de mesure d'audience ni de publicité. Seul un stockage local strictement technique retient la fermeture de ce message. <a href="${privacyHref}" rel="noopener noreferrer">En savoir plus</a>.</p>
            </div>
            <div class="cookie-actions">
                <button type="button" class="cta-button" id="cookieAccept">J'ai compris</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    requestAnimationFrame(() => banner.classList.add('visible'));

    const dismiss = (value) => {
        localStorage.setItem(STORAGE_KEY, value);
        banner.classList.remove('visible');
        banner.addEventListener('transitionend', () => banner.remove(), { once: true });
    };

    banner.querySelector('#cookieAccept').addEventListener('click', () => dismiss('accepted'));
});

/* ---- Squelette de chargement Cal.com ---- */
safeInit('squelette de chargement Cal.com', () => {
    const target = document.getElementById('my-cal-inline-booking');
    const skeleton = document.getElementById('calSkeleton');
    if (!target || !skeleton) return;

    let hidden = false;
    const observer = new MutationObserver(() => hideSkeleton());

    function hideSkeleton() {
        if (hidden) return;
        hidden = true;
        skeleton.classList.add('is-hidden');
        observer.disconnect();
    }

    observer.observe(target, { childList: true });
    setTimeout(hideSkeleton, 6000);
});

/* ---- Lightbox galerie ---- */
safeInit('lightbox galerie', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxViewport = document.getElementById('lightboxViewport');
    const lightboxTrack = document.getElementById('lightboxTrack');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxDots = document.getElementById('lightboxDots');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    let lastFocusedElement = null;
    let currentIndex = 0;

    const dots = galleryItems.map((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'lightbox-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Photo ${i + 1} sur ${galleryItems.length}`);
        dot.addEventListener('click', () => showLightboxAt(i));
        lightboxDots.appendChild(dot);
        return dot;
    });

    const slides = galleryItems.map((item) => {
        const slide = document.createElement('div');
        slide.className = 'lightbox-slide';
        slide.dataset.full = item.dataset.full;
        const img = document.createElement('img');
        img.src = item.dataset.full;
        img.alt = item.querySelector('img').alt;
        slide.appendChild(img);
        lightboxTrack.appendChild(slide);
        return slide;
    });

    let trackStep = 0;
    let trackOffset = 0;

    const isMobileLightbox = () => window.matchMedia('(max-width: 768px)').matches;

    function layoutTrack(skipAnimation) {
        const w = lightboxViewport.clientWidth;
        const mobile = isMobileLightbox();
        const slideWidth = mobile ? w * 0.8 : w;
        const gap = mobile ? w * 0.04 : 0;
        slides.forEach((slide) => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.marginRight = `${gap}px`;
            slide.style.backgroundImage = mobile ? `url("${slide.dataset.full}")` : 'none';
        });
        trackStep = slideWidth + gap;
        trackOffset = (w - slideWidth) / 2;
        if (skipAnimation) lightboxTrack.style.transition = 'none';
        lightboxTrack.style.transform = `translateX(${trackOffset - currentIndex * trackStep}px)`;
        if (skipAnimation) {
            void lightboxTrack.offsetHeight;
            lightboxTrack.style.transition = '';
        }
    }

    window.addEventListener('resize', () => {
        if (!lightbox.hidden) layoutTrack(true);
    });

    const trapFocus = (e) => {
        if (e.key !== 'Tab') return;
        const focusable = lightbox.querySelectorAll('button, [href], img');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    };

    const onLightboxKeydown = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showLightboxAt(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showLightboxAt(currentIndex + 1);
        } else {
            trapFocus(e);
        }
    };

    function showLightboxAt(index, skipAnimation) {
        currentIndex = (index + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentIndex];
        lightboxCaption.textContent = item.dataset.caption || '';
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
            dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
        });
        slides.forEach((slide, i) => {
            slide.setAttribute('aria-hidden', i === currentIndex ? 'false' : 'true');
        });
        layoutTrack(skipAnimation);
    }

    function openLightbox(trigger) {
        lastFocusedElement = trigger;
        lightbox.hidden = false;
        document.body.classList.add('menu-open');
        showLightboxAt(galleryItems.indexOf(trigger), true);
        lightboxClose.focus();
        document.addEventListener('keydown', onLightboxKeydown);
    }

    function closeLightbox() {
        lightbox.hidden = true;
        document.body.classList.remove('menu-open');
        document.removeEventListener('keydown', onLightboxKeydown);
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    galleryItems.forEach((item) => {
        item.addEventListener('click', () => openLightbox(item));
    });

    lightboxPrev.addEventListener('click', () => showLightboxAt(currentIndex - 1));
    lightboxNext.addEventListener('click', () => showLightboxAt(currentIndex + 1));

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    const lightboxFigure = document.querySelector('.lightbox-figure');
    const DRAG_DEAD_ZONE = 6;
    const DRAG_COMMIT_RATIO = 0.18;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragBaseX = 0;
    let dragDeltaX = 0;
    let dragIntent = null;

    lightboxFigure.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        dragStartX = t.clientX;
        dragStartY = t.clientY;
        dragBaseX = trackOffset - currentIndex * trackStep;
        dragDeltaX = 0;
        dragIntent = null;
    }, { passive: true });

    lightboxFigure.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        const dx = t.clientX - dragStartX;
        const dy = t.clientY - dragStartY;

        if (dragIntent === null) {
            if (Math.abs(dx) < DRAG_DEAD_ZONE && Math.abs(dy) < DRAG_DEAD_ZONE) return;
            dragIntent = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
            if (dragIntent === 'horizontal') lightboxTrack.style.transition = 'none';
        }
        if (dragIntent !== 'horizontal') return;

        e.preventDefault();
        dragDeltaX = dx;
        lightboxTrack.style.transform = `translateX(${dragBaseX + dx}px)`;
    }, { passive: false });

    lightboxFigure.addEventListener('touchend', () => {
        if (dragIntent !== 'horizontal') return;
        lightboxTrack.style.transition = '';
        const threshold = lightboxViewport.clientWidth * DRAG_COMMIT_RATIO;
        if (Math.abs(dragDeltaX) > threshold) {
            showLightboxAt(currentIndex + (dragDeltaX < 0 ? 1 : -1));
        } else {
            layoutTrack();
        }
        dragIntent = null;
    });
});
