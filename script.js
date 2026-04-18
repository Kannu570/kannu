document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animation (Intersection Observer implementation for better optimization)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const textRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: un-observe after revealing if you don't want it to hide again when scrolling up
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => textRevealObserver.observe(el));

    // Force visible for elements already in viewport on load (like Hero)
    setTimeout(() => {
        const hero = document.getElementById('hero');
        if (hero) hero.classList.add('visible');
    }, 100);


    // 3. Dynamic Background Gradient matching mouse position for desktop
    const bgGradient = document.querySelector('.bg-gradient');
    
    // Throttle rendering for better optimization
    let isTicking = false;

    document.addEventListener('mousemove', (e) => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                // Calculate percentage position
                const xPos = (e.clientX / window.innerWidth) * 100;
                const yPos = (e.clientY / window.innerHeight) * 100;
                
                // Subtle parallax shift for the background glow
                // Moves opposite to mouse to simulate depth slightly, or follows mouse
                // We'll make it follow the mouse contextually
                bgGradient.style.transform = `translate(-${100 - xPos}%, -${100 - yPos}%)`;
                
                isTicking = false;
            });
            isTicking = true;
        }
    });

    // 4. Smooth Scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});
