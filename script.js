/**
 * Carlm landing page – client-side functionality
 * Handles: mobile menu, scroll header, testimonial carousel,
 *          scroll reveal animations, form validation & submission.
 */
(function () {
  'use strict';

  // Remove no-js class once JS loads
  document.body.classList.remove('no-js');

  // ----- DOM ELEMENTS -----
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.getElementById('nav-list');
  const carouselTrack = document.getElementById('testimonial-track');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  const carouselPrev = document.getElementById('carousel-prev');
  const carouselNext = document.getElementById('carousel-next');
  const joinForm = document.getElementById('join-form');
  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');
  const currentYearSpan = document.getElementById('current-year');

  // ----- MOBILE MENU -----
  function toggleMenu() {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('open');
  }

  menuToggle.addEventListener('click', toggleMenu);

  // Close menu when a nav link is clicked
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // ----- STICKY HEADER SHADOW -----
  function handleScroll() {
    const scrolled = window.scrollY > 10;
    header.classList.toggle('scrolled', scrolled);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial check

  // ----- TESTIMONIAL CAROUSEL -----
  let currentIndex = 0;
  const totalSlides = carouselTrack.children.length;

  function updateCarousel(index) {
    // Remove active from all cards
    const cards = carouselTrack.querySelectorAll('.testimonial-card');
    cards.forEach(card => card.classList.remove('active'));
    cards[index].classList.add('active');

    // Update dots
    carouselDots.forEach(dot => dot.classList.remove('active'));
    carouselDots[index].classList.add('active');
    currentIndex = index;
  }

  function nextSlide() {
    updateCarousel((currentIndex + 1) % totalSlides);
  }

  function prevSlide() {
    updateCarousel((currentIndex - 1 + totalSlides) % totalSlides);
  }

  carouselNext.addEventListener('click', nextSlide);
  carouselPrev.addEventListener('click', prevSlide);

  // Dot navigation
  carouselDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      updateCarousel(index);
    });
  });

  // Auto-advance every 5 seconds
  setInterval(nextSlide, 5000);

  // ----- SCROLL REVEAL ANIMATION -----
  const revealElements = document.querySelectorAll('[data-animate]');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    revealElements.forEach(el => {
      el.classList.add('js-reveal');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // ----- FORM VALIDATION & SUBMISSION -----
  joinForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset errors
    clearErrors();
    formSuccess.hidden = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    let isValid = true;

    // Validate name
    if (!name) {
      showError('name-error', 'Please enter your name.');
      document.getElementById('name').classList.add('error');
      isValid = false;
    }

    // Validate email
    if (!email) {
      showError('email-error', 'Please enter your email.');
      document.getElementById('email').classList.add('error');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('email-error', 'Please enter a valid email address.');
      document.getElementById('email').classList.add('error');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate submission
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate network request
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      formSuccess.hidden = false;
      joinForm.reset();
      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1200);
  });

  function clearErrors() {
    const errors = document.querySelectorAll('.form-error');
    errors.forEach(el => el.textContent = '');
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => input.classList.remove('error'));
  }

  function showError(id, message) {
    const errorEl = document.getElementById(id);
    if (errorEl) errorEl.textContent = message;
  }

  function isValidEmail(email) {
    // Simple regex for demonstration
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ----- FOOTER YEAR -----
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ----- CLOSE MOBILE MENU ON RESIZE -----
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navList.classList.contains('open')) {
      navList.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

})();