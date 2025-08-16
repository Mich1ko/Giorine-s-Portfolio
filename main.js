function switchTab(tab) {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(t => t.classList.remove('active'));
  contents.forEach(c => c.style.display = 'none');

  document.querySelector('.tab[onclick*="' + tab + '"]').classList.add('active');
  document.getElementById(tab).style.display = 'block';
}

// Typing Effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Scroll Animation Observer
function createScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        // Remove visible class when element is out of view
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all animated elements
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .testimonial-card');
  animatedElements.forEach(el => observer.observe(el));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Start typing effect after a delay
  setTimeout(() => {
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
      typeWriter(typingElement, "Passionate Video Editor & Graphic Designer", 80);
    }
  }, 2000);

  // Initialize scroll animations
  createScrollObserver();

  // Why Me carousel
  (function initializeWhyMeCarousel() {
    const imageElement = document.getElementById('whyme-image');
    const dotsContainer = document.getElementById('whyme-dots');
    const prevButton = document.querySelector('#whyme .carousel-arrow.left');
    const nextButton = document.querySelector('#whyme .carousel-arrow.right');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('#lightbox .lightbox-close');

    if (!imageElement || !dotsContainer || !prevButton || !nextButton) return;

    const imageSources = [
      'assets/whyme/meida.jpg',
      'assets/whyme/CLIENT RESULTS 1.jpg',
      'assets/whyme/CLIENT RESULTS 4.jpg'
    ];

    let currentIndex = 0;

    function renderDots() {
      dotsContainer.innerHTML = '';
      imageSources.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (index === currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
        dot.addEventListener('click', () => {
          currentIndex = index;
          updateSlide(true);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateSlide(animate = false) {
      const newSrc = imageSources[currentIndex];
      const probe = new Image();
      probe.onload = () => {
        const isPortrait = probe.naturalHeight / probe.naturalWidth > 1.05;
        imageElement.classList.toggle('contain', isPortrait);
        imageElement.classList.toggle('cover', !isPortrait);

        if (animate) {
          imageElement.classList.remove('show');
          // force reflow
          imageElement.offsetWidth;
          imageElement.src = newSrc;
          imageElement.alt = 'Showcase image ' + (currentIndex + 1);
          requestAnimationFrame(() => imageElement.classList.add('show'));
        } else {
          imageElement.src = newSrc;
          imageElement.alt = 'Showcase image ' + (currentIndex + 1);
          imageElement.classList.add('show');
        }
        renderDots();
      };
      probe.src = newSrc;
    }

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
      updateSlide(true);
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % imageSources.length;
      updateSlide(true);
    });

    // Keyboard support when section is in view
    document.addEventListener('keydown', (e) => {
      const isWhyMeInView = !!document.querySelector('#whyme.visible');
      if (!isWhyMeInView) return;
      if (e.key === 'ArrowLeft') prevButton.click();
      if (e.key === 'ArrowRight') nextButton.click();
    });

    // Lightbox open/close
    function openLightbox() {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = imageElement.src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightbox || !lightboxImg) return;
      lightbox.style.display = 'none';
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    if (imageElement) {
      imageElement.style.cursor = 'zoom-in';
      imageElement.addEventListener('click', openLightbox);
    }
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });

    // Initialize
    updateSlide(false);
  })();

  // Attach lightbox to Client Results grid images
  (function initializeClientResultsLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('#lightbox .lightbox-close');
    if (!lightbox || !lightboxImg) return;

    function open(src) {
      lightboxImg.src = src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.client-results-grid img[data-lightbox]').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => open(img.src));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  })();

  // Attach lightbox to Why Me feature images
  (function initializeWhyMeFeaturesLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;
    function open(src) {
      lightboxImg.src = src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    document.querySelectorAll('.whyme-features img[data-lightbox]').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => open(img.src));
    });
  })();

  // Video functionality
  const videoContainers = document.querySelectorAll('.video-container');
  
  videoContainers.forEach(container => {
    const video = container.querySelector('video');
    const playOverlay = container.querySelector('.play-overlay');
    
    if (video && playOverlay) {
      // Hide overlay when video starts playing
      video.addEventListener('play', function() {
        playOverlay.style.opacity = '0';
      });
      
      // Show overlay when video pauses
      video.addEventListener('pause', function() {
        playOverlay.style.opacity = '1';
      });
      
      // Show overlay when video ends
      video.addEventListener('ended', function() {
        playOverlay.style.opacity = '1';
      });
      
      // Click overlay to play video
      playOverlay.addEventListener('click', function() {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('nav-open');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link highlighting based on scroll position
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Initial call

  // Contact Form Functionality
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Validate form data
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Show loading state
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon">⏳</span>';
      submitBtn.disabled = true;
      
      // Simulate email sending (replace with actual email service)
      setTimeout(() => {
        // Here you would typically send the data to your email service
        // For now, we'll simulate a successful submission
        
        // Hide form and show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Optional: Send to email service (uncomment and configure)
        // sendEmailToService(name, email, subject, message);
        
      }, 2000);
    });
  }

  // Social Media Link Hover Effects
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(10px) scale(1.02)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0) scale(1)';
    });
  });

  // Input Focus Effects
  const formInputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
    
    // Handle label animation on input
    input.addEventListener('input', function() {
      if (this.value) {
        this.parentElement.classList.add('has-value');
      } else {
        this.parentElement.classList.remove('has-value');
      }
    });
  });

  // Floating Elements Animation
  const floatingShapes = document.querySelectorAll('.floating-shape');
  
  floatingShapes.forEach((shape, index) => {
    shape.style.animationDelay = `${index * 1.5}s`;
  });

  // Contact Form Input Validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Clear previous error states
    document.querySelectorAll('.input-wrapper').forEach(wrapper => {
      wrapper.classList.remove('error');
    });
    
    if (!name) {
      document.getElementById('name').parentElement.classList.add('error');
      isValid = false;
    }
    
    if (!email || !validateEmail(email)) {
      document.getElementById('email').parentElement.classList.add('error');
      isValid = false;
    }
    
    if (!subject) {
      document.getElementById('subject').parentElement.classList.add('error');
      isValid = false;
    }
    
    if (!message) {
      document.getElementById('message').parentElement.classList.add('error');
      isValid = false;
    }
    
    return isValid;
  }

  // Add error styles to CSS
  const style = document.createElement('style');
  style.textContent = `
    .input-wrapper.error input,
    .input-wrapper.error textarea {
      border: 2px solid var(--primary);
      animation: shake 0.5s ease-in-out;
    }
    
    .input-wrapper.error label {
      color: var(--primary);
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    .input-wrapper.focused label {
      color: var(--accent);
      transform: translateY(-12px) scale(0.8);
    }
    
    .input-wrapper.has-value label {
      color: var(--accent);
      transform: translateY(-12px) scale(0.8);
    }
  `;
  document.head.appendChild(style);
});

// Email Service Function (configure with your preferred service)
function sendEmailToService(name, email, subject, message) {
  // Example using EmailJS (you'll need to sign up and configure)
  // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  //   from_name: name,
  //   from_email: email,
  //   subject: subject,
  //   message: message,
  //   to_email: 'giorine@creative.com'
  // });
  
  // Example using Formspree
  // fetch('https://formspree.io/f/YOUR_FORM_ID', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     name: name,
  //     email: email,
  //     subject: subject,
  //     message: message
  //   })
  // });
  
  // Example using Netlify Forms
  // The form will automatically work if you add netlify attribute to the form
  // <form id="contactForm" class="contact-form" netlify>
  
  console.log('Email data:', { name, email, subject, message });
}

// --- Services interactions (plain JS) ---
// Prefill contact form and scroll to contact section
function prefillContact(serviceTitle) {
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');
  if (subject) subject.value = `Inquiry: ${serviceTitle}`;
  if (message) message.value = `Hi Giorine,\n\nI'm interested in your ${serviceTitle} service. Please share pricing & availability.`;

  // mark has-value so floating labels animate
  document.querySelectorAll('.input-wrapper').forEach(w => {
    const input = w.querySelector('input, textarea');
    if (input && input.value) w.classList.add('has-value');
  });

  const contact = document.getElementById('contact');
  if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Details toggle (expands simple info inline)
document.addEventListener('click', function (e) {
  const detailsBtn = e.target.closest && e.target.closest('.details-btn');
  if (detailsBtn) {
    const card = detailsBtn.closest('.service-card');
    if (!card) return;
    let extra = card.querySelector('.service-extra');
    if (extra) {
      // toggle
      card.classList.remove('open');
      extra.remove();
      detailsBtn.textContent = 'Details';
      return;
    }

    extra = document.createElement('div');
    extra.className = 'service-extra';
    extra.style.marginTop = '8px';
    extra.style.color = 'var(--neutral)';
    extra.textContent = 'Includes 1 free revision, source files on request, and quick 24-72h turnaround for short-form edits.';
    card.appendChild(extra);
    // trigger CSS animation
    requestAnimationFrame(() => card.classList.add('open'));
    detailsBtn.textContent = 'Close';
  }

  const hireBtn = e.target.closest && e.target.closest('.hire-btn');
  if (hireBtn) {
    const svc = hireBtn.getAttribute('data-service') || hireBtn.closest('.service-card')?.querySelector('.service-title')?.textContent;
    if (svc) {
      e.preventDefault();
      prefillContact(svc);
    }
  }
});
