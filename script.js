/**
 * ANTI-GRAVITY LANDING PAGE - JAVASCRIPT
 * Handles navigation, animations, and interactions
 */

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Add/remove scrolled class based on scroll position
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optionally unobserve after animation
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all elements with fade-in class
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => observer.observe(element));

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle && nav) {
  mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');

    // Update toggle icon
    const isActive = nav.classList.contains('active');
    mobileMenuToggle.textContent = isActive ? '✕' : '☰';
  });

  // Close menu when clicking on a link
  const navLinks = nav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      mobileMenuToggle.textContent = '☰';
    });
  });
}

// ============================================
// PARALLAX EFFECT FOR HERO SECTION (SUBTLE)
// ============================================
const heroWaves = document.querySelector('.hero-waves');

if (heroWaves) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = document.querySelector('.hero').offsetHeight;

    // Only apply parallax within hero section
    if (scrolled < heroHeight) {
      const parallaxSpeed = 0.3;
      heroWaves.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  });
}


// ============================================
// AMBIENT BACKGROUND INTERACTIVITY (MOUSE)
// ============================================
const ambientLights = document.querySelectorAll('.ambient-light');

if (ambientLights.length > 0) {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    ambientLights.forEach((light, index) => {
      const isOdd = index % 2 !== 0;
      const moveX = (mouseX - 0.5) * (isOdd ? 50 : -50);
      const moveY = (mouseY - 0.5) * (isOdd ? 50 : -50);

      light.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images (native)
document.querySelectorAll('img[data-src]').forEach(img => {
  img.setAttribute('src', img.getAttribute('data-src'));
  img.onload = () => {
    img.removeAttribute('data-src');
  };
});

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

// ============================================
// ANALYTICS / TRACKING (PLACEHOLDER)
// ============================================

// Track CTA clicks
const ctaButtons = document.querySelectorAll('.btn-primary');
ctaButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // Add analytics tracking here
    console.log('CTA clicked:', e.target.textContent);

    // Example: Send to analytics
    // gtag('event', 'cta_click', { button_text: e.target.textContent });
  });
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ============================================
// PAGE LOAD PERFORMANCE
// ============================================

// Log Core Web Vitals (if available)
if ('PerformanceObserver' in window) {
  // Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.log('LCP measurement not supported');
  }

  // Cumulative Layout Shift (CLS)
  try {
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      }
      console.log('CLS:', clsScore);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.log('CLS measurement not supported');
  }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
console.log('🚀 Anti-Gravity Landing Page initialized');
