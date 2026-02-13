// ===== MOBILE MENU =====
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('show');
}

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add background to navbar on scroll
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Hide/show navbar on scroll direction
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  
  lastScroll = currentScroll;
});

// ===== PARALLAX EFFECT FOR HERO =====
const heroBackground = document.querySelector('.hero .background');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.8; // Increased from 0.5 for more dramatic effect
  
  if (heroBackground && scrolled < window.innerHeight) {
    heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(${1 + scrolled * 0.0002})`;
  }
});

// ===== SCROLL ANIMATIONS (FADE IN ON SCROLL) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      
      // Special handling for stats animation
      if (entry.target.classList.contains('stat-number')) {
        animateNumber(entry.target);
      }
    }
  });
}, observerOptions);

// Observe all sections and elements
document.addEventListener('DOMContentLoaded', () => {
  // Observe sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
  
  // Observe individual elements
  const animateElements = document.querySelectorAll('.brand, .project, .stat');
  animateElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${index * 0.15}s`; // Increased delay for more staggered effect
    observer.observe(el);
  });
  
  // Observe stat numbers for counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => observer.observe(stat));
});

// ===== ANIMATED NUMBER COUNTER =====
function animateNumber(element) {
  if (element.classList.contains('counted')) return;
  element.classList.add('counted');
  
  const text = element.textContent;
  const hasPlus = text.includes('+');
  const number = parseInt(text.replace(/\D/g, ''));
  
  if (isNaN(number)) return;
  
  const duration = 2000;
  const steps = 60;
  const increment = number / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= number) {
      element.textContent = number + (hasPlus ? '+' : '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
    }
  }, duration / steps);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu && mobileMenu.classList.contains('show')) {
        toggleMenu();
      }
    }
  });
});

// ===== SCROLL INDICATOR ANIMATION =====
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
  // Animate the scroll indicator
  setInterval(() => {
    scrollIndicator.style.animation = 'none';
    setTimeout(() => {
      scrollIndicator.style.animation = 'bounce 2s infinite';
    }, 10);
  }, 2000);
  
  // Hide scroll indicator when scrolled past hero
  window.addEventListener('scroll', () => {
    const heroHeight = document.querySelector('.hero').offsetHeight;
    if (window.pageYOffset > heroHeight * 0.3) {
      scrollIndicator.style.opacity = '0';
    } else {
      scrollIndicator.style.opacity = '1';
    }
  });
}

// ===== BRANDS CAROUSEL SMOOTH SCROLL =====
const carousel = document.querySelector('.brands .carousel');

if (carousel) {
  let isDown = false;
  let startX;
  let scrollLeft;
  
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.style.cursor = 'grabbing';
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.style.cursor = 'grab';
  });
  
  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.style.cursor = 'grab';
  });
  
  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });
  
  // Auto-scroll carousel
  let autoScrollInterval;
  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 4000);
  };
  
  startAutoScroll();
  
  // Pause auto-scroll on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
  });
  
  carousel.addEventListener('mouseleave', () => {
    startAutoScroll();
  });
}

// ===== COLLECTION ITEMS HOVER EFFECT =====
const collectionItems = document.querySelectorAll('.collection-item');

collectionItems.forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.1)';
    this.style.color = 'hsl(38, 60%, 55%)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.color = '';
  });
});

// ===== PROJECT CARDS TILT EFFECT =====
const projectCards = document.querySelectorAll('.project');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-20px) scale(1.03)';
    const img = this.querySelector('.project-image img');
    if (img) {
      img.style.transform = 'scale(1.15) rotate(2deg)';
    }
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    const img = this.querySelector('.project-image img');
    if (img) {
      img.style.transform = 'scale(1) rotate(0deg)';
    }
  });
  
  // Add 3D tilt effect based on mouse position
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    this.style.transform = `translateY(-20px) scale(1.03) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
});

// ===== BRAND CARDS HOVER EFFECT =====
const brandCards = document.querySelectorAll('.brand');

brandCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-15px) scale(1.05)';
    this.style.borderColor = 'hsl(38, 60%, 55%)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.borderColor = '';
  });
});

// ===== FORM SUBMISSION ANIMATION =====
const newsletterForm = document.querySelector('.newsletter .form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = newsletterForm.querySelector('.button');
    const input = newsletterForm.querySelector('.input');
    const originalText = button.textContent;
    
    // Animate button
    button.textContent = 'SUBSCRIBING...';
    button.style.background = 'hsl(38, 60%, 55%)';
    button.disabled = true;
    
    // Simulate subscription
    setTimeout(() => {
      button.textContent = 'SUBSCRIBED ✓';
      button.style.background = 'hsl(120, 60%, 50%)';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
        input.value = '';
      }, 2000);
    }, 1500);
  });
}

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Animate hero title on load
  const heroTitle = document.querySelector('.hero .title');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(50px) scale(0.9)';
    
    setTimeout(() => {
      heroTitle.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0) scale(1)';
    }, 300);
  }
  
  // Animate collection items on load
  const collectionItems = document.querySelectorAll('.collection-item');
  collectionItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    setTimeout(() => {
      item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 800 + index * 150);
  });
});

// ===== CURSOR TRAIL EFFECT (SUBTLE) =====
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// ===== STATS SECTION SPECIAL EFFECTS =====
const statsSection = document.querySelector('.about .stats');

if (statsSection) {
  observer.observe(statsSection);
}

// ===== ADD PULSE ANIMATION TO SCROLL INDICATOR =====
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ===== IMAGE LAZY LOADING EFFECT =====
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease-in-out';
      
      // Fade in when loaded
      if (img.complete) {
        img.style.opacity = '1';
      } else {
        img.addEventListener('load', () => {
          img.style.opacity = '1';
        });
      }
      
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// ===== CONSOLE MESSAGE =====
console.log('%c✨ DM Home - Visual Effects Loaded ', 'background: #D4AF37; color: #1A1A1A; font-size: 16px; padding: 10px; font-weight: bold;');
