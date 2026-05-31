document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     0. THEME TOGGLE (LIGHT / DARK THEME) - INITIALIZED FIRST
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    console.log('Theme toggle button found in DOM. Initializing theme settings...');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-theme');
      console.log('Initial theme applied: dark-theme (saved preference or system preference)');
    } else {
      document.body.classList.remove('dark-theme');
      console.log('Initial theme applied: light-theme');
    }
    
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      console.log('Theme toggle clicked. New theme is dark:', isDark);
      if (isDark) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  } else {
    console.error('Warning: themeToggle button was not found in DOM!');
  }

  /* ==========================================================================
     0.5. HERO PICTURE SLIDESHOW
     ========================================================================== */
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 0) {
    let currentSlideIndex = 0;
    const slideIntervalTime = 4000; // 4 seconds per slide
    
    setInterval(() => {
      const activeSlide = slides[currentSlideIndex];
      activeSlide.classList.remove('active');
      activeSlide.classList.add('exit');
      
      // Determine next slide index
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      
      const nextSlide = slides[currentSlideIndex];
      // Reset next slide to prepare for entry from the right
      nextSlide.classList.remove('exit');
      nextSlide.style.transition = 'none'; // Temporarily disable transition
      nextSlide.style.transform = 'translateX(100%)';
      
      // Force layout reflow
      void nextSlide.offsetWidth;
      
      // Re-enable transition and add active
      nextSlide.style.transition = '';
      nextSlide.style.transform = '';
      nextSlide.classList.add('active');
      
      // Clean up exit class on other slides after transition ends
      setTimeout(() => {
        slides.forEach((slide, idx) => {
          if (idx !== currentSlideIndex) {
            slide.classList.remove('exit');
          }
        });
      }, 800); // matches CSS transition duration
    }, slideIntervalTime);
  }

  /* ==========================================================================
     1. STICKY HEADER & SCROLL ANIMATION
     ========================================================================== */
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initially on load

  /* ==========================================================================
     2. MOBILE MENU BURGER TOGGLE
     ========================================================================== */
  const burgerMenu = document.getElementById('burgerMenu');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    burgerMenu.classList.toggle('open');
    navMenu.classList.toggle('open');
  };

  burgerMenu.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  /* ==========================================================================
     3. INTERACTIVE HIGHLIGHTS TABS
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update active button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active pane with smooth transition
      tabPanes.forEach(pane => {
        if (pane.id === targetTab) {
          pane.style.display = 'grid';
          // Force layout reflow to allow transition
          void pane.offsetWidth;
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
          pane.style.display = 'none';
        }
      });
    });
  });



  /* ==========================================================================
     5. FAQ ACCORDION TOGGLE (SINGLE-OPEN BEHAVIOR)
     ========================================================================== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const isOpen = currentItem.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current item
      if (!isOpen) {
        currentItem.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     6. ACTIVE LINK HIGH-LIGHTING (INTERSECTION OBSERVER)
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.id;
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  /* ==========================================================================
     7. TOAST NOTIFICATION & FORM SUBMISSION VALIDATION
     ========================================================================== */
  const toastContainer = document.getElementById('toastContainer');
  const inquiryForm = document.getElementById('inquiryForm');

  const showToast = (title, message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconClass = type === 'success' 
      ? 'fa-solid fa-circle-check' 
      : 'fa-solid fa-triangle-exclamation';

    toast.innerHTML = `
      <div class="toast-icon"><i class="${iconClass}"></i></div>
      <div class="toast-content">
        <h4>${title}</h4>
        <p>${message}</p>
      </div>
    `;

    toastContainer.appendChild(toast);

    // Slide in
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Slide out and remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4000);
  };

  // Set this URL after deploying your Google Apps Script
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwAMZWSIvD4oEeqgpT3ugCK-uVi01rtixhnq_nZ3EbJ9mAkhaH6qE191JzrSMMUpwhG/exec'; // Paste your Google Web App URL here

  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value.trim();
    const parentName = document.getElementById('parentName').value.trim() || 'N/A';
    const phone = document.getElementById('phone').value.trim();
    const targetClass = document.getElementById('targetClass').value;
    const message = document.getElementById('message').value.trim();

    // Basic Indian phone validation (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      showToast('Validation Error', 'Please enter a valid 10-digit mobile number starting with 6-9.', 'error');
      return;
    }

    if (!studentName || !targetClass || !message) {
      showToast('Validation Error', 'Please fill out all required fields.', 'error');
      return;
    }

    const formSubmitBtn = document.getElementById('formSubmitBtn');
    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = 'Submitting...';

    if (!scriptURL) {
      // Fallback behavior if URL is not configured yet
      setTimeout(() => {
        showToast(
          'Inquiry Submitted (Demo)',
          `Thank you ${studentName}. (Configure Google Apps Script URL in index.js to receive actual email).`,
          'success'
        );
        inquiryForm.reset();
        formSubmitBtn.disabled = false;
        formSubmitBtn.textContent = 'Submit Inquiry';
      }, 1000);
      return;
    }

    fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors', // standard cross-origin bypass for simple GAS submits
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: studentName,
        parent: parentName,
        phone: phone,
        class: targetClass,
        message: message
      })
    })
    .then(() => {
      showToast(
        'Inquiry Submitted!',
        `Thank you ${studentName}. Your details have been emailed to Sir Debabrata.`,
        'success'
      );
      inquiryForm.reset();
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
      showToast('Submission Error', 'Failed to send inquiry. Please try calling or WhatsApping directly.', 'error');
    })
    .finally(() => {
      formSubmitBtn.disabled = false;
      formSubmitBtn.textContent = 'Submit Inquiry';
    });
  });

  /* ==========================================================================
     8. TESTIMONIAL MODAL CONTROLLER
     ========================================================================== */
  const reviewModal = document.getElementById('reviewModal');
  const modalAvatarImg = reviewModal.querySelector('#modalAvatar img');
  const modalName = document.getElementById('modalName');
  const modalQuote = document.getElementById('modalQuote');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Event delegation for "Read More" button clicks
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.read-more-btn');
    if (!btn) return;

    const name = btn.getAttribute('data-name');
    const avatar = btn.getAttribute('data-avatar');
    const fullText = btn.getAttribute('data-full');

    // Populate modal contents
    modalName.textContent = name;
    
    // Decode HTML entities
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = fullText;
    const decodedText = tempDiv.textContent || tempDiv.innerText || "";
    modalQuote.textContent = `"${decodedText}"`;
    
    modalAvatarImg.src = avatar;
    modalAvatarImg.alt = name;

    // Show modal
    reviewModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });

  const closeModal = () => {
    reviewModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scrolling
  };

  // Close click handlers
  modalCloseBtn.addEventListener('click', closeModal);
  reviewModal.addEventListener('click', (e) => {
    if (e.target === reviewModal) {
      closeModal();
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reviewModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ==========================================================================
     9. SCROLL REVEAL OBSERVER
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserverOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before it fully rolls onto screen
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

});
