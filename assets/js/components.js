/* ==================== INJECTION DU HEADER & FOOTER PARTAGÉS ==================== */
(function () {
    /* ---- Constantes & état ---- */
    const scriptEl = document.currentScript || document.querySelector('script[src*="components.js"]');
    const base = scriptEl.src.replace(/assets\/js\/components\.js.*$/, '');
    window.__siteBase = base;

    const isHome = !!document.getElementById('accueil');
    const navHref = (hash) => (isHome ? `#${hash}` : `${base}index.html#${hash}`);

    /* ==================== TEMPLATE : HEADER ==================== */
    const headerHTML = `
    <svg style="display:none" aria-hidden="true">
        <symbol id="icon-instagram" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </symbol>
        <symbol id="icon-whatsapp" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </symbol>
        <symbol id="icon-check" viewBox="0 0 24 24">
            <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        </symbol>
    </svg>

    <a href="#main-content" class="skip-link">Aller au contenu principal</a>

    <header id="header">
        <nav class="container">
            <div class="nav-row-top">
                <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="navLinks">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <a href="${base}index.html" class="logo">
                    <picture>
                        <source srcset="${base}assets/images/logo.webp" type="image/webp">
                        <img src="${base}assets/images/logo.png" width="499" height="499" alt="E Beauty Esthetics - Salon d'ongles élégant à Marin">
                    </picture>
                </a>
                <a href="${navHref('reservation')}" class="nav-book-btn" aria-label="Réserver">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                        <path d="M9 16l2 2 4-4"></path>
                    </svg>
                </a>
            </div>
            <ul class="nav-links" id="navLinks">
                <li><a href="${navHref('accueil')}" class="nav-text">Accueil</a></li>
                <li><a href="${navHref('services')}" class="nav-text">Services</a></li>
                <li><a href="${navHref('galerie')}" class="nav-text">Galerie</a></li>
                <li><a href="${navHref('reservation')}" class="nav-text nav-cta"><strong>Réservation</strong></a></li>
                <li><a href="${navHref('contact')}" class="nav-text">Contact</a></li>
                <li class="nav-social">
                    <a href="https://www.instagram.com/e_beauty_esthetics/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <svg width="20" height="20" fill="currentColor"><use href="#icon-instagram"></use></svg>
                    </a>
                    <a href="https://wa.me/41786344144" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <svg width="20" height="20" fill="currentColor"><use href="#icon-whatsapp"></use></svg>
                    </a>
                </li>
            </ul>
        </nav>
    </header>
    <div class="nav-overlay" id="navOverlay"></div>
    `;

    /* ==================== TEMPLATE : FOOTER ==================== */
    const footerHTML = `
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="logo">
                        <picture>
                            <source srcset="${base}assets/images/logo.webp" type="image/webp">
                            <img src="${base}assets/images/logo.png" width="499" height="499" alt="E Beauty Esthetics - Salon d'ongles élégant à Marin">
                        </picture>
                    </div>
                    <div class="social-links">
                        <a href="https://www.instagram.com/e_beauty_esthetics/" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" fill="currentColor"><use href="#icon-instagram"></use></svg>
                        </a>
                        <a href="https://wa.me/41786344144" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" fill="currentColor"><use href="#icon-whatsapp"></use></svg>
                        </a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Navigation</h4>
                    <ul>
                        <li><a href="${navHref('accueil')}">Accueil</a></li>
                        <li><a href="${navHref('services')}">Services</a></li>
                        <li><a href="${navHref('galerie')}">Galerie</a></li>
                        <li><a href="${navHref('reservation')}"><strong>Réservation</strong></a></li>
                        <li><a href="${navHref('contact')}">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Aide et support</h4>
                    <ul>
                        <li><a href="${navHref('contact')}">Me contacter</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Légal</h4>
                    <ul>
                        <li><a href="${base}pages/mentions-legales.html" rel="noopener noreferrer">Mentions légales</a></li>
                        <li><a href="${base}pages/politique-de-confidentialite.html" rel="noopener noreferrer">Politique de confidentialité</a></li>
                        <li><a href="${base}pages/conditions-generales.html" rel="noopener noreferrer">Conditions générales</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-back-to-top">
                <button type="button" id="backToTop" aria-label="Retourner en haut de page">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                    <span>Retour en haut</span>
                </button>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 <strong>E Beauty Esthetics</strong>. Tous droits réservés. | Site web par <strong><a href="https://gnslproduction.ch/" target="_blank" rel="noopener noreferrer">&copy; GNSL Production</a></strong>.</p>
                <p></p>
            </div>
        </div>
    </footer>

    <a href="https://wa.me/41786344144"
       target="_blank"
       rel="noopener noreferrer"
       class="whatsapp-float"
       aria-label="Discuter sur WhatsApp">
        <svg width="30" height="30" fill="currentColor"><use href="#icon-whatsapp"></use></svg>
    </a>
    `;

    /* ==================== INJECTION DANS LE DOM ==================== */
    const headerPlaceholder = document.getElementById('site-header');
    if (headerPlaceholder) headerPlaceholder.outerHTML = headerHTML;

    const footerPlaceholder = document.getElementById('site-footer');
    if (footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;
})();
