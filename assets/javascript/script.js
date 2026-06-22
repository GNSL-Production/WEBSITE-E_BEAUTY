    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
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
                navLinks.classList.remove('active');
            }
        });
    });
    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1
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
    // Hide Elfsight Free branding text
    function hideElfsightBranding() {
        // Try multiple times because widget loads asynchronously
        const hideBranding = () => {
            // Find elements containing "Free" or "elfsight" references
            const widgetContainer = document.querySelector('.elfsight-app-52dc525d-25db-473b-8a00-cb53010201aa');
            if (widgetContainer) {
                const allElements = widgetContainer.querySelectorAll('*');
                allElements.forEach(el => {
                    if (el.textContent && (el.textContent.includes('Free') || el.textContent.includes('Widget'))) {
                        el.style.display = 'none';
                        el.style.visibility = 'hidden';
                    }
                });
                // Hide footer/link elements that might contain branding
                const brandingLinks = widgetContainer.querySelectorAll('a[href*="elfsight"]');
                brandingLinks.forEach(link => {
                    link.remove();
                });
            }
        };
        // Run immediately and then every 500ms for first 5 seconds
        hideBranding();
        const interval = setInterval(hideBranding, 500);
        // Stop trying after 5 seconds
        setTimeout(() => clearInterval(interval), 5000);
    }
    // Start hiding branding when page loads
    window.addEventListener('load', hideElfsightBranding);