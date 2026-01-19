document.addEventListener('DOMContentLoaded', () => {
  // Enable animations via CSS class (Fallback mechanism)
  document.body.classList.add('animations-enabled');

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px" // Offset slightly to trigger before bottom
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Reversible animation logic
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  // Observe specific elements for individual fade-in effect
  // We use a comprehensive selector to ensure all key content is animated
  const elementsToAnimate = document.querySelectorAll('.fade-in, section h1, section h2, section h3, section h4, section p, .card, .btn');

  elementsToAnimate.forEach(el => {
    // Exclude the official contact section from animations to ensure visibility
    if (el.closest('#cellnit-official-contact')) return;

    el.classList.add('fade-in'); // Ensure the class is added
    observer.observe(el);
  });

  // Hamburger Menu Logic
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Navbar blur effect on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Parallax Scroll Effect for Hero Background
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      // Only animate if within reasonable view range to save performance
      if (scrollPosition < window.innerHeight) {
        // Move slightly slower than scroll (0.3 factor)
        // We use translate3d for hardware acceleration
        requestAnimationFrame(() => {
          heroBg.style.transform = `translate3d(0, ${scrollPosition * 0.3}px, 0)`;
        });
      }
    });
  }
});
