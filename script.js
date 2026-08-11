/* ==========================================================================
   PERCULIAR LINES LIMITED - LOGISTICS & FREIGHT FORWARDING
   JAVASCRIPT CONTROLLER (script.js)
   ========================================================================== */

/* ==========================================================================
   1. DOM Content Loaded Initialization Starts
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Site Preloader
  initPreloader();

  // Initialize Scroll Progress Bar
  initProgressBar();

  // Initialize Sticky Navbar & Scroll Styling
  initStickyNavbar();

  // Initialize Mobile Drawer Navigation
  initMobileNav();

  // Initialize SPA Router for Single-Page Navigation
  initSPARouter();

  // Initialize Canvas Particles on Hero Background
  initHeroParticles();

  // Initialize Scroll Triggered Counter Animation
  initCounterAnimation();

  // Initialize Logistics Showcase Image Slider
  initShowcaseCarousel();

  // Initialize Testimonial Carousel
  initTestimonialSlider();

  // Initialize Gallery Category Filtering
  initGalleryFilter();

  // Initialize Lightbox Modal for Images
  initLightboxModal();

  // Initialize Video Modal Player
  initVideoModal();

  // Initialize Cargo Tracking Search Widget
  initTrackingSearch();

  // Initialize Live Quote Rate Estimator
  initQuoteCalculator();

  // Initialize Contact & Quotation Form Validation
  initFormValidations();

  // Initialize Scroll To Top Floating Button
  initBackToTop();
});

/* ==========================================================================
   2. Site Preloader Function Starts
   ========================================================================== */
/**
 * Handles the initial site preloader animation and removal.
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 600);
    });
    // Fallback in case load event fired early
    setTimeout(() => {
      if (preloader && !preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
      }
    }, 2000);
  }
}

/* ==========================================================================
   3. Scroll Progress Bar Function Starts
   ========================================================================== */
/**
 * Updates the top scroll progress indicator as the user scrolls down the page.
 */
function initProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/* ==========================================================================
   4. Sticky Navbar Scroll Styling Function Starts
   ========================================================================== */
/**
 * Toggles 'scrolled' class on navbar for background shift and shadow effect.
 */
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   5. Mobile Navigation Drawer Function Starts
   ========================================================================== */
/**
 * Sets up hamburger menu toggle and slide-out navigation overlay for mobile viewports.
 */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-nav-menu');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !mobileMenu || !mobileOverlay) return;

  function toggleMobileMenu() {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

/* ==========================================================================
   6. SPA Router & Page View Switching Function Starts
   ========================================================================== */
/**
 * Single Page Application router: Shows target page section and hides all others.
 * Updates navigation link highlights and scrolls window smoothly to top.
 */
function initSPARouter() {
  const navLinks = document.querySelectorAll('[data-page-target]');
  const pageViews = document.querySelectorAll('.page-view');

  function navigateToPage(pageId) {
    // Hide all page views
    pageViews.forEach(page => {
      page.classList.remove('active-page');
    });

    // Find and show target page view
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active-page');
    } else {
      // Default to home page if not found
      document.getElementById('home-page').classList.add('active-page');
    }

    // Update nav links active state
    navLinks.forEach(link => {
      if (link.getAttribute('data-page-target') === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Scroll window smoothly back to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Update location hash silently
    if (history.pushState) {
      history.pushState(null, null, '#' + pageId);
    } else {
      location.hash = '#' + pageId;
    }
  }

  // Event Listener for all nav target links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-page-target');
      if (target) {
        navigateToPage(target);
      }
    });
  });

  // Handle initial page load from URL hash if provided
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById(initialHash)) {
    navigateToPage(initialHash);
  } else {
    navigateToPage('home-page');
  }

  // Listen to popstate event for browser back/forward buttons
  window.addEventListener('popstate', () => {
    const currentHash = window.location.hash.replace('#', '') || 'home-page';
    navigateToPage(currentHash);
  });
}

/* ==========================================================================
   7. Hero Section Particles Canvas Function Starts
   ========================================================================== */
/**
 * Creates an animated background canvas with floating supply chain nodes and connections.
 */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(50, 140, 193, 0.4)';
      ctx.fill();
    }
  }

  for (let i = 0; i < 45; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(50, 140, 193, ${0.25 - dist / 480})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   8. Counter Stats Scroll Animation Function Starts
   ========================================================================== */
/**
 * Uses IntersectionObserver to trigger smooth counter numbers animation when scrolled into view.
 */
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0', 10);
          const prefix = stat.getAttribute('data-prefix') || '';
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = target / 60;

          const updateCount = () => {
            count += speed;
            if (count < target) {
              stat.innerText = prefix + Math.ceil(count).toLocaleString() + suffix;
              setTimeout(updateCount, 25);
            } else {
              stat.innerText = prefix + target.toLocaleString() + suffix;
            }
          };

          updateCount();
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   9. Showcase Image Carousel Function Starts
   ========================================================================== */
/**
 * Controls auto-sliding image carousel with dots and arrow controls for logistics showcase.
 */
function initShowcaseCarousel() {
  const carouselTrack = document.getElementById('showcase-carousel');
  const slides = document.querySelectorAll('.showcase-slide');
  const prevBtn = document.getElementById('showcase-prev');
  const nextBtn = document.getElementById('showcase-next');
  const dotsContainer = document.getElementById('showcase-dots');

  if (!carouselTrack || !slides.length) return;

  let currentIndex = 0;
  let autoSlideTimer;

  // Create dot indicators dynamically
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentIndex = index;
    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });

    resetTimer();
  }

  function resetTimer() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 4500);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  resetTimer();
}

/* ==========================================================================
   10. Testimonials Slider Function Starts
   ========================================================================== */
/**
 * Controls sliding testimonial cards with auto-play functionality.
 */
function initTestimonialSlider() {
  const track = document.getElementById('testimonial-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('testimonial-dots');

  if (!track || !cards.length) return;

  let index = 0;
  let timer;

  dotsContainer.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function goToTestimonial(i) {
    if (i < 0) i = cards.length - 1;
    if (i >= cards.length) i = 0;

    index = i;
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === index);
    });

    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      goToTestimonial(index + 1);
    }, 5000);
  }

  resetTimer();
}

/* ==========================================================================
   11. Gallery Category Filtering Function Starts
   ========================================================================== */
/**
 * Filters media items in the gallery grid based on category tabs (all, images, videos).
 */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-bar .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => { item.style.opacity = '1'; }, 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => { item.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   12. Image Lightbox Modal Function Starts
   ========================================================================== */
/**
 * Opens full screen lightbox modal when clicking image gallery cards.
 */
function initLightboxModal() {
  const galleryImages = document.querySelectorAll('.gallery-item[data-type="image"]');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightboxModal || !lightboxImg) return;

  galleryImages.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-item-title');

      if (img) lightboxImg.src = img.src;
      if (title && lightboxTitle) lightboxTitle.innerText = title.innerText;

      lightboxModal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   13. Video Popup Modal Function Starts
   ========================================================================== */
/**
 * Opens popup modal with playable YouTube embed video player for logistics showcases.
 */
function initVideoModal() {
  const videoTriggers = document.querySelectorAll('[data-video-url]');
  const videoModal = document.getElementById('video-modal');
  const videoIframe = document.getElementById('video-modal-iframe');
  const closeBtn = document.getElementById('video-modal-close');

  if (!videoModal || !videoIframe) return;

  videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const videoUrl = trigger.getAttribute('data-video-url');
      if (videoUrl) {
        videoIframe.src = videoUrl + '?autoplay=1';
        videoModal.classList.add('active');
      }
    });
  });

  function closeVideo() {
    videoIframe.src = '';
    videoModal.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeVideo);

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideo();
  });
}

/* ==========================================================================
   14. Cargo Tracking Search Function Starts
   ========================================================================== */
/**
 * Simulates real-time container/airway bill tracking query with realistic logistics milestones.
 */
function initTrackingSearch() {
  const trackingBtn = document.getElementById('tracking-search-btn');
  const trackingInput = document.getElementById('tracking-number-input');
  const trackingModal = document.getElementById('tracking-result-modal');
  const trackingClose = document.getElementById('tracking-modal-close');
  const trackingResultContent = document.getElementById('tracking-result-content');

  if (!trackingBtn || !trackingInput || !trackingModal) return;

  trackingBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const trackingNum = trackingInput.value.trim();

    if (!trackingNum) {
      showToast('Please enter a valid Tracking or Container Number (e.g., PLL-882049).', 'error');
      return;
    }

    trackingResultContent.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2.5rem; color: var(--secondary-color);"></i>
        <p style="margin-top: 16px; font-weight: 600;">Searching global freight network for <strong>${trackingNum.toUpperCase()}</strong>...</p>
      </div>
    `;

    trackingModal.classList.add('active');

    setTimeout(() => {
      trackingResultContent.innerHTML = `
        <div style="border-bottom: 2px solid var(--border-color); padding-bottom: 16px; margin-bottom: 20px;">
          <span style="background: rgba(50,140,193,0.15); color: var(--secondary-color); padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.8rem;">IN TRANSIT</span>
          <h3 style="margin-top: 10px; font-size: 1.4rem;">Shipment #${trackingNum.toUpperCase()}</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Master Bill of Lading: <strong>MBL-GH-882049</strong></p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background: var(--bg-light); padding: 16px; border-radius: 8px; margin-bottom: 24px; font-size: 0.9rem;">
          <div><strong>Origin:</strong> Port of Shanghai, CN</div>
          <div><strong>Destination:</strong> Tema Port, GH</div>
          <div><strong>Vessel:</strong> Perculiar Pioneer V.204</div>
          <div><strong>Est. Delivery:</strong> 3 Days (On Schedule)</div>
        </div>

        <h4 style="margin-bottom: 16px; color: var(--primary-dark);">Logistics Milestones</h4>

        <div style="position: relative; padding-left: 28px; border-left: 3px solid var(--secondary-color); display: flex; flex-direction: column; gap: 20px;">
          <div>
            <div style="font-weight: 700; color: var(--accent-color);">Arrived at Gulf of Guinea - En Route to Tema</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Aug 03, 2026 - 06:15 AM</div>
          </div>
          <div>
            <div style="font-weight: 700; color: var(--primary-dark);">Customs Documentation Cleared</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Jul 28, 2026 - 02:40 PM</div>
          </div>
          <div>
            <div style="font-weight: 700; color: var(--primary-dark);">Vessel Departed Origin Port</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Jul 14, 2026 - 11:20 AM</div>
          </div>
          <div>
            <div style="font-weight: 700; color: var(--primary-dark);">Cargo Received & Container Sealed</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Jul 12, 2026 - 09:00 AM</div>
          </div>
        </div>
      `;
    }, 1200);
  });

  if (trackingClose) {
    trackingClose.addEventListener('click', () => trackingModal.classList.remove('active'));
  }

  trackingModal.addEventListener('click', (e) => {
    if (e.target === trackingModal) trackingModal.classList.remove('active');
  });
}

/* ==========================================================================
   15. Live Quote Rate Calculator Function Starts
   ========================================================================== */
/**
 * Calculates real-time estimated freight price range on the Get a Quote form based on inputs.
 */
function initQuoteCalculator() {
  const typeSelect = document.getElementById('quote-shipment-type');
  const weightInput = document.getElementById('quote-weight');
  const originSelect = document.getElementById('quote-origin');
  const destSelect = document.getElementById('quote-destination');
  const estimateDisplay = document.getElementById('estimated-price-display');

  if (!typeSelect || !weightInput || !estimateDisplay) return;

  function calculateRate() {
    const weight = parseFloat(weightInput.value) || 0;
    const type = typeSelect.value;
    let baseRate = 120;
    let perKg = 2.5;

    if (type === 'air') {
      baseRate = 250;
      perKg = 6.8;
    } else if (type === 'ocean-fcl') {
      baseRate = 1200;
      perKg = 0.4;
    } else if (type === 'road') {
      baseRate = 180;
      perKg = 1.8;
    } else if (type === 'customs') {
      baseRate = 350;
      perKg = 0.1;
    }

    if (weight <= 0) {
      estimateDisplay.innerText = '$0.00';
      return;
    }

    const estimatedTotal = Math.round(baseRate + (weight * perKg));
    const minEstimate = Math.round(estimatedTotal * 0.9);
    const maxEstimate = Math.round(estimatedTotal * 1.15);

    estimateDisplay.innerText = `$${minEstimate.toLocaleString()} - $${maxEstimate.toLocaleString()}`;
  }

  typeSelect.addEventListener('change', calculateRate);
  weightInput.addEventListener('input', calculateRate);
  if (originSelect) originSelect.addEventListener('change', calculateRate);
  if (destSelect) destSelect.addEventListener('change', calculateRate);
}

/* ==========================================================================
   16. Contact & Quote Form Validation Function Starts
   ========================================================================== */
/**
 * Handles validation and submission for Contact Form & Quotation Form with notifications.
 */
function initFormValidations() {
  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields (Name, Email, Message).', 'error');
        return;
      }

      showToast('Thank you! Your message has been forwarded to info@perculiarlines.com. Our logistics team will contact you shortly.');
      contactForm.reset();
    });
  }

  // Quote Form Submission
  const quoteForm = document.getElementById('quote-form');
  const quoteConfirmModal = document.getElementById('quote-confirm-modal');
  const quoteConfirmContent = document.getElementById('quote-confirm-content');
  const quoteConfirmClose = document.getElementById('quote-confirm-close');

  if (quoteForm && quoteConfirmModal) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('quote-name').value.trim();
      const email = document.getElementById('quote-email').value.trim();
      const phone = document.getElementById('quote-phone').value.trim();
      const origin = document.getElementById('quote-origin').value;
      const destination = document.getElementById('quote-destination').value;
      const shipmentType = document.getElementById('quote-shipment-type').value;
      const weight = document.getElementById('quote-weight').value;

      if (!name || !email || !phone || !origin || !destination) {
        showToast('Please complete all mandatory quote request fields.', 'error');
        return;
      }

      quoteConfirmContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="width: 64px; height: 64px; background: var(--accent-light); color: var(--accent-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 16px;">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h3 style="font-size: 1.6rem; color: var(--primary-dark);">Quotation Request Dispatched!</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Reference ID: <strong>PLL-QT-${Math.floor(100000 + Math.random() * 900000)}</strong></p>
        </div>

        <div style="background: var(--bg-light); padding: 20px; border-radius: 8px; font-size: 0.9rem; margin-bottom: 24px;">
          <div style="margin-bottom: 8px;"><strong>Client Name:</strong> ${name}</div>
          <div style="margin-bottom: 8px;"><strong>Email Contact:</strong> ${email}</div>
          <div style="margin-bottom: 8px;"><strong>Route:</strong> ${origin} &rarr; ${destination}</div>
          <div style="margin-bottom: 8px;"><strong>Service Mode:</strong> ${shipmentType} (${weight ? weight + ' kg' : 'N/A'})</div>
          <div style="margin-bottom: 8px;"><strong>Forwarded To:</strong> info@perculiarlines.com</div>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-dark); text-align: center; margin-bottom: 24px;">
          Our freight specialist at Airport Residential, Accra, Ghana will review your cargo specs and send a formal competitive quote to <strong>${email}</strong> within <strong>2 business hours</strong>.
        </p>

        <button class="btn btn-primary btn-lg" style="width: 100%;" id="modal-ack-btn">Done</button>
      `;

      quoteConfirmModal.classList.add('active');

      document.getElementById('modal-ack-btn').addEventListener('click', () => {
        quoteConfirmModal.classList.remove('active');
      });

      quoteForm.reset();
      const estimateDisplay = document.getElementById('estimated-price-display');
      if (estimateDisplay) estimateDisplay.innerText = '$0.00';
    });

    if (quoteConfirmClose) {
      quoteConfirmClose.addEventListener('click', () => quoteConfirmModal.classList.remove('active'));
    }
  }
}

/* Helper function for Toast Notifications */
function showToast(message, type = 'success') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-check'}" style="font-size: 1.2rem;"></i>
    <div>${message}</div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   17. Back-To-Top Button Function Starts
   ========================================================================== */
/**
 * Displays floating back-to-top button when user scrolls down.
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
