// ================================================================
// ACTIVITY 2 - JAVASCRIPT INTERACTIVITY
// DM Home Luxury Living Website
// ================================================================

// ================================================================
// FEATURE 1: SHOW / HIDE SECTIONS - Mobile Menu Toggle
// ================================================================
/**
 * Toggles the visibility of the mobile navigation menu
 * Shows/hides menu when hamburger button is clicked
 */
function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  
  // Toggle the 'show' class to display/hide menu
  if (mobileMenu.classList.contains('show')) {
    mobileMenu.classList.remove('show');
  } else {
    mobileMenu.classList.add('show');
  }
}

// ================================================================
// FEATURE 2: FORM VALIDATION - Newsletter Subscription
// ================================================================
/**
 * Validates the newsletter form before submission
 * Checks for empty fields and valid email format
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add loaded class to body for any animations
  document.body.classList.add('loaded');
  
  const newsletterForm = document.querySelector('.newsletter .form');
  const emailInput = newsletterForm.querySelector('.input');
  const submitButton = newsletterForm.querySelector('.button');
  
  // Handle form submission
  newsletterForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    const email = emailInput.value.trim();
    
    // Validation 1: Check if email field is empty
    if (email === '') {
      showValidationMessage('Please enter your email address', 'error');
      emailInput.focus();
      return;
    }
    
    // Validation 2: Check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showValidationMessage('Please enter a valid email address', 'error');
      emailInput.focus();
      return;
    }
    
    // If validation passes, show success message
    showValidationMessage('Thank you for subscribing! ✓', 'success');
    
    // Animate button
    submitButton.style.backgroundColor = '#4ade80';
    submitButton.textContent = 'SUBSCRIBED ✓';
    
    // Reset form after 2 seconds
    setTimeout(function() {
      emailInput.value = '';
      submitButton.style.backgroundColor = '';
      submitButton.textContent = 'SUBSCRIBE';
    }, 2000);
  });
});

/**
 * Displays validation messages dynamically below the form
 * @param {string} message - The message to display
 * @param {string} type - Type of message ('error' or 'success')
 */
function showValidationMessage(message, type) {
  // Remove any existing message
  const existingMessage = document.querySelector('.validation-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message element
  const messageDiv = document.createElement('div');
  messageDiv.className = `validation-message ${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    margin-top: 10px;
    padding: 10px 15px;
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    ${type === 'error' 
      ? 'background-color: #fee2e2; color: #dc2626; border: 1px solid #fca5a5;' 
      : 'background-color: #dcfce7; color: #16a34a; border: 1px solid #86efac;'}
  `;
  
  // Insert message after the form
  const newsletterForm = document.querySelector('.newsletter .form');
  newsletterForm.parentNode.insertBefore(messageDiv, newsletterForm.nextSibling);
  
  // Remove message after 3 seconds
  setTimeout(function() {
    messageDiv.style.opacity = '0';
    setTimeout(function() {
      messageDiv.remove();
    }, 300);
  }, 3000);
}

// ================================================================
// FEATURE 3: INTERACTIVE NAVIGATION - Smooth Scroll & Active Highlighting
// ================================================================
/**
 * Enables smooth scrolling to sections when navigation links are clicked
 * Highlights the active section in the navigation menu
 */

// Add smooth scroll behavior to all navigation links
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

navLinks.forEach(function(link) {
  link.addEventListener('click', function(event) {
    const href = link.getAttribute('href');
    
    // Check if link points to a section on the page
    if (href.startsWith('#') && href !== '#') {
      event.preventDefault();
      
      const targetSection = document.querySelector(href);
      
      if (targetSection) {
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('show')) {
          mobileMenu.classList.remove('show');
        }
        
        // Smooth scroll to section
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active link
        updateActiveNavLink(link);
      }
    }
  });
});

/**
 * Updates the active state of navigation links
 * @param {HTMLElement} activeLink - The link that should be marked as active
 */
function updateActiveNavLink(activeLink) {
  // Remove active class from all links
  navLinks.forEach(function(link) {
    link.classList.remove('active-link');
  });
  
  // Add active class to clicked link
  activeLink.classList.add('active-link');
}

// Highlight navigation based on scroll position
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.pageYOffset + 150;
  
  sections.forEach(function(section) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Find and highlight the corresponding nav link
      navLinks.forEach(function(link) {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active-link');
        }
      });
    }
  });
});

// ================================================================
// FEATURE 4: DYNAMIC CONTENT CHANGE - Theme Toggle (Light/Dark Mode)
// ================================================================
/**
 * Implements a theme toggle feature to switch between light and dark modes
 * Uses CSS variables to change colors dynamically
 */

// Create theme toggle button
const themeToggleButton = document.createElement('button');
themeToggleButton.id = 'theme-toggle';
themeToggleButton.setAttribute('aria-label', 'Toggle theme');
themeToggleButton.innerHTML = `
  <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
  <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
`;

// Style the theme toggle button
themeToggleButton.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: hsl(43, 74%, 49%);
  border: 2px solid hsl(38, 60%, 55%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
`;

// Add button to page
document.body.appendChild(themeToggleButton);

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

/**
 * Toggles between light and dark themes
 */
themeToggleButton.addEventListener('click', function() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Update theme
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // Save preference to localStorage (FEATURE 5)
  localStorage.setItem('theme', newTheme);
  
  // Update icon
  updateThemeIcon(newTheme);
  
  // Add animation effect
  themeToggleButton.style.transform = 'rotate(360deg)';
  setTimeout(function() {
    themeToggleButton.style.transform = 'rotate(0deg)';
  }, 300);
});

/**
 * Updates the theme toggle icon based on current theme
 * @param {string} theme - Current theme ('light' or 'dark')
 */
function updateThemeIcon(theme) {
  const sunIcon = themeToggleButton.querySelector('.sun-icon');
  const moonIcon = themeToggleButton.querySelector('.moon-icon');
  
  if (theme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
    themeToggleButton.style.background = '#1f2937';
    themeToggleButton.style.borderColor = '#374151';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
    themeToggleButton.style.background = 'hsl(43, 74%, 49%)';
    themeToggleButton.style.borderColor = 'hsl(38, 60%, 55%)';
  }
}

// Hover effect for theme toggle button
themeToggleButton.addEventListener('mouseenter', function() {
  this.style.transform = 'scale(1.1)';
  this.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.4)';
});

themeToggleButton.addEventListener('mouseleave', function() {
  this.style.transform = 'scale(1)';
  this.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
});

// ================================================================
// FEATURE 5: LOCAL STORAGE - Persist Theme Preference
// ================================================================
/**
 * Uses localStorage to remember user's theme preference
 * Theme is automatically applied on page load
 * Implementation is integrated with Feature 4 (Theme Toggle)
 */

// Display welcome message with visit count
window.addEventListener('load', function() {
  // Get visit count from localStorage
  let visitCount = localStorage.getItem('visitCount');
  
  if (visitCount === null) {
    visitCount = 1;
  } else {
    visitCount = parseInt(visitCount) + 1;
  }
  
  // Save updated count
  localStorage.setItem('visitCount', visitCount);
  
  // Show welcome message
  console.log(`Welcome to DM Home! You have visited ${visitCount} time(s).`);
  
  // Optional: Display visit count on page
  if (visitCount === 1) {
    showWelcomeMessage('Welcome to DM Home! 🎉');
  } else {
    showWelcomeMessage(`Welcome back! Visit #${visitCount}`);
  }
});

/**
 * Displays a welcome message banner
 * @param {string} message - The welcome message to display
 */
function showWelcomeMessage(message) {
  const welcomeBanner = document.createElement('div');
  welcomeBanner.className = 'welcome-banner';
  welcomeBanner.textContent = message;
  welcomeBanner.style.cssText = `
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background: hsl(43, 74%, 49%);
    color: white;
    padding: 15px 30px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
    z-index: 10000;
    transition: transform 0.5s ease;
  `;
  
  document.body.appendChild(welcomeBanner);
  
  // Animate in
  setTimeout(function() {
    welcomeBanner.style.transform = 'translateX(-50%) translateY(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(function() {
    welcomeBanner.style.transform = 'translateX(-50%) translateY(-100px)';
    setTimeout(function() {
      welcomeBanner.remove();
    }, 500);
  }, 3000);
}

// ================================================================
// ADDITIONAL FEATURE: Sticky Navbar on Scroll
// ================================================================
/**
 * Makes the navbar sticky and adds background when scrolling down
 * Part of Interactive Navigation feature
 */
let lastScrollPosition = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  const currentScrollPosition = window.pageYOffset;
  
  // Add scrolled class when user scrolls down
  if (currentScrollPosition > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Hide navbar when scrolling down, show when scrolling up
  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  
  lastScrollPosition = currentScrollPosition;
});

// ================================================================
// ADDITIONAL FEATURE: Scroll to Top Button
// ================================================================
/**
 * Creates a button to scroll back to the top of the page
 */
const scrollToTopButton = document.createElement('button');
scrollToTopButton.id = 'scroll-to-top';
scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
scrollToTopButton.innerHTML = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 15l-6-6-6 6"/>
  </svg>
`;

scrollToTopButton.style.cssText = `
  position: fixed;
  bottom: 90px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  border: 2px solid hsl(43, 74%, 49%);
  color: hsl(43, 74%, 49%);
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 999;
`;

document.body.appendChild(scrollToTopButton);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollToTopButton.style.display = 'flex';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

// Scroll to top when clicked
scrollToTopButton.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Hover effects
scrollToTopButton.addEventListener('mouseenter', function() {
  this.style.transform = 'translateY(-5px)';
  this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
});

scrollToTopButton.addEventListener('mouseleave', function() {
  this.style.transform = 'translateY(0)';
  this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
});

// ================================================================
// CONSOLE LOG: Activity Summary
// ================================================================
console.log(`
╔════════════════════════════════════════════════════════════════╗
║        ACTIVITY 2 - JAVASCRIPT FEATURES IMPLEMENTED           ║
╚════════════════════════════════════════════════════════════════╝

✓ Feature 1: Show/Hide Sections (Mobile Menu Toggle)
✓ Feature 2: Form Validation (Newsletter Email Validation)
✓ Feature 3: Interactive Navigation (Smooth Scroll + Active Highlighting)
✓ Feature 4: Dynamic Content Change (Theme Toggle - Light/Dark Mode)
✓ Feature 5: Local Storage (Theme Preference + Visit Counter)

BONUS FEATURES:
• Sticky Navbar with Hide/Show on Scroll
• Scroll to Top Button
• Animated Validation Messages
• Welcome Banner with Visit Count

All features use vanilla JavaScript (no external libraries)
Code is properly commented and documented
`);

// ================================================================
// VISUAL EFFECTS - Original Animations & Interactions
// ================================================================

// ===== PARALLAX EFFECT FOR HERO =====
const heroBackground = document.querySelector('.hero .background');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.5;
  
  if (heroBackground && scrolled < window.innerHeight) {
    heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }
});

// ===== FADE-IN ANIMATIONS ON SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      
      // Animate stat numbers
      if (entry.target.classList.contains('stat-number')) {
        animateNumber(entry.target);
      }
    }
  });
}, observerOptions);

// Observe elements for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.brand, .project, .stat');
  animateElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${index * 0.1}s`;
    fadeObserver.observe(el);
  });
});

// ===== ANIMATED NUMBER COUNTERS =====
function animateNumber(element) {
  const targetText = element.textContent;
  const targetNumber = parseInt(targetText.replace(/\D/g, ''));
  
  if (isNaN(targetNumber)) return;
  
  const duration = 2000;
  const steps = 60;
  const increment = targetNumber / steps;
  let current = 0;
  let step = 0;
  
  const timer = setInterval(() => {
    current += increment;
    step++;
    
    if (step >= steps) {
      element.textContent = targetText;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (targetText.includes('+') ? '+' : '');
    }
  }, duration / steps);
}

// ===== PROJECT CARDS HOVER EFFECTS =====
const projectCards = document.querySelectorAll('.project');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
    const img = this.querySelector('.project-image img');
    if (img) {
      img.style.transform = 'scale(1.08)';
    }
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    const img = this.querySelector('.project-image img');
    if (img) {
      img.style.transform = 'scale(1)';
    }
  });
  
  // 3D tilt effect
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    this.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
});

// ===== BRAND CARDS HOVER =====
const brandCards = document.querySelectorAll('.brand');

brandCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
    this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '';
  });
});

// ===== CUSTOM CURSOR EFFECT =====
let cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(212, 175, 55, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0;
`;
document.body.appendChild(cursor);

let cursorX = 0, cursorY = 0;
let targetX = 0, targetY = 0;

document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
  cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

function animateCursor() {
  cursorX += (targetX - cursorX) * 0.15;
  cursorY += (targetY - cursorY) * 0.15;
  
  cursor.style.left = cursorX - 20 + 'px';
  cursor.style.top = cursorY - 20 + 'px';
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Enlarge cursor on interactive elements
document.querySelectorAll('a, button, .brand, .project, .collection-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    cursor.style.borderColor = 'rgba(212, 175, 55, 0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.borderColor = 'rgba(212, 175, 55, 0.5)';
  });
});

// ===== BRANDS CAROUSEL AUTO-SCROLL =====
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
}

// ===== COLLECTION ITEMS HOVER =====
const collectionItems = document.querySelectorAll('.collection-item');
collectionItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 50}ms`;
  
  item.addEventListener('mouseenter', function() {
    collectionItems.forEach((otherItem, otherIndex) => {
      if (otherIndex !== index) {
        otherItem.style.opacity = '0.4';
      }
    });
  });
  
  item.addEventListener('mouseleave', function() {
    collectionItems.forEach(otherItem => {
      otherItem.style.opacity = '1';
    });
  });
});

// ===== SCROLL INDICATOR =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollIndicator.style.opacity = '0';
    } else {
      scrollIndicator.style.opacity = '1';
    }
  });
}

// ===== IMAGE LAZY LOADING =====
const images = document.querySelectorAll('img[data-src]');
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

images.forEach(img => imageObserver.observe(img));

