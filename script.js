// Custom cursor
const cursor = document.querySelector('.cursor-inner');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
let isAnimating = false;

// Smooth animation
function animate() {
    if (!isAnimating) return;
    
    const smoothing = 0.05;
    currentX += (mouseX - currentX) * smoothing;
    currentY += (mouseY - currentY) * smoothing;
    
    cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
}

// Start cursor only when mouse enters the page
document.addEventListener('mouseenter', () => {
    isAnimating = true;
    cursor.style.opacity = '1';
    animate(); // Start animation
});

document.addEventListener('mouseleave', () => {
    isAnimating = false;
    cursor.style.opacity = '0';
});

// Cursor movement
document.addEventListener('mousemove', (e) => {
    if (!isAnimating) return;
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (!isAnimating) return;
        cursor.style.width = '50px';
        cursor.style.height = '50px';
    });
    
    el.addEventListener('mouseleave', () => {
        if (!isAnimating) return;
        cursor.style.width = '40px';
        cursor.style.height = '40px';
    });
});

// Add click effect
document.addEventListener('mousedown', () => {
    if (!isAnimating) return;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) scale(0.9)`;
});

document.addEventListener('mouseup', () => {
    if (!isAnimating) return;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) scale(1)`;
});

// Lazy Loading
const lazyLoad = () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Lazy load sections
    const lazySections = document.querySelectorAll('.lazy-section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    lazySections.forEach(section => sectionObserver.observe(section));
};

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoad);

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .visible {
        opacity: 1;
        transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
        .fade-in {
            transition: none;
        }
    }
`;
document.head.appendChild(style);

// Navbar scroll effect
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    document.body.classList.toggle('light-theme', !isDark);
    themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme === 'dark');
} else {
    setTheme(prefersDarkScheme.matches);
}

themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('light-theme');
    setTheme(!isDark);
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.opacity = '0';
    });

    // Show cursor when entering window
    document.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.opacity = '1';
    });
});
