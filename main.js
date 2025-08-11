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
});
