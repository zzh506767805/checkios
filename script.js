// Execute after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbarScroll();
    initSmoothScrolling();
    initScrollAnimations();
    initParallaxEffect();
});

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add transparency change when scrolling
        if (scrollTop > 50) {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide navbar when scrolling down, show when scrolling up
        if (scrollTop > 100) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth scroll to anchor points
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Subtract navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Scroll animation effects
function initScrollAnimations() {
    // Create observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that need animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .ai-feature, .app-update, .compatibility-card, .timeline'
    );
    
    animatedElements.forEach(element => {
        element.classList.add('animate-ready');
        observer.observe(element);
    });
    
    // Add CSS animation classes
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-ready:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .animate-ready:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .animate-ready:nth-child(4) {
            transition-delay: 0.3s;
        }
    `;
    document.head.appendChild(style);
}

// Parallax effect
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.2; // Reduced speed to prevent overlap
        
        if (hero && scrolled < window.innerHeight) {
            // Only apply parallax while hero is visible
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Add loading animation
window.addEventListener('load', () => {
    // Animation after page load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
    
    // Add page loading animation styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .hero-content {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s ease-out;
        }
        
        body {
            overflow-x: hidden;
        }
        
        /* Enhanced button hover effect */
        .btn:hover {
            transform: translateY(-3px) scale(1.02);
        }
        
        /* Enhanced card hover effect */
        .feature-card:hover,
        .ai-feature:hover,
        .app-update:hover,
        .compatibility-card:hover {
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }
        
        /* Active navigation link state */
        .nav-link.active {
            background: var(--glass-bg);
            color: var(--primary-color);
        }
        
        /* Add page enter animation */
        @keyframes pageEnter {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .section {
            animation: pageEnter 0.8s ease-out;
        }
        
        /* Enhanced timeline animation */
        .timeline-item {
            transition: all 0.3s ease;
        }
        
        .timeline-item:hover {
            transform: scale(1.05) translateY(-5px);
            box-shadow: 0 15px 45px rgba(0, 122, 255, 0.2);
        }
        
        /* Responsive optimization */
        @media (max-width: 768px) {
            .hero-title {
                font-size: 2.5rem;
            }
            
            .hero-subtitle {
                font-size: 1.5rem;
            }
            
            .section-title {
                font-size: 2rem;
            }
        }
    `;
    document.head.appendChild(loadingStyle);
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

// Keyboard navigation styles
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .keyboard-navigation .btn:focus {
        outline: 3px solid var(--primary-color);
        outline-offset: 3px;
    }
`;
document.head.appendChild(keyboardStyle);

// Performance optimization: debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
const optimizedScrollHandler = debounce(() => {
    // Scroll-related operations
}, 16); // About 60fps

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Add error handling
window.addEventListener('error', (e) => {
    console.warn('Page loading issue, but basic functionality remains:', e.message);
});

// Add browser compatibility check
function checkBrowserSupport() {
    const isSupported = {
        backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
        gridLayout: CSS.supports('display', 'grid'),
        flexbox: CSS.supports('display', 'flex')
    };
    
    if (!isSupported.backdropFilter) {
        console.warn('Browser does not support backdrop-filter, some visual effects may not display');
        // Can add fallback solution
        document.body.classList.add('no-backdrop-filter');
    }
    
    return isSupported;
}

// Check browser support on initialization
checkBrowserSupport(); 