/**
 * ALEX MORGAN - PROFESSIONAL PORTFOLIO SCRIPT
 * Handles dark/light theme switching, responsive hamburger navigation,
 * scroll reveal animations, interactive project modals, resume viewer,
 * project category filtering, and contact form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all core features
  initThemeToggle();
  initMobileNavigation();
  initStickyHeaderAndActiveLinks();
  initScrollReveal();
  initProjectFiltering();
  initProjectModals();
  initResumeModal();
  initContactForm();
  initBackToTop();
  updateCopyrightYear();
});

/* ==========================================================================
   1. DARK / LIGHT THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Check stored preference or system default
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
  }

  // Toggle listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburgerBtn || !navMenu) return;

  function toggleMenu() {
    const isOpen = navMenu.classList.contains('open');
    navMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      toggleMenu();
    }
  });
}

/* ==========================================================================
   3. STICKY HEADER & ACTIVE NAVIGATION HIGHLIGHTING
   ========================================================================== */
function initStickyHeaderAndActiveLinks() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Highlight active link based on scroll position
  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (matchingLink) {
          navLinks.forEach(link => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

/* ==========================================================================
   4. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   5. PROJECT CATEGORY FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE PROJECT DETAIL MODALS
   ========================================================================== */
const projectData = {
  "1": {
    title: "Apex Analytics SaaS Dashboard",
    category: "Full-Stack Web App",
    image: "images/project1.png",
    description: "Apex Analytics is a high-performance web dashboard engineered for enterprise revenue forecasting and user retention analytics.",
    features: [
      "Real-time data visualization charts built with Chart.js & WebSockets",
      "Customizable widgets with drag-and-drop dashboard layout",
      "Sub-second page response times with client-side caching",
      "Full dark/light mode UI theme tokens"
    ],
    tech: ["React.js", "JavaScript (ES6+)", "Chart.js", "Tailwind CSS", "REST API"],
    demoUrl: "https://example.com/demo/apex",
    githubUrl: "https://github.com/example/apex-analytics"
  },
  "2": {
    title: "Lumina Luxe E-Commerce",
    category: "Storefront & Checkout",
    image: "images/project2.png",
    description: "A minimalist luxury e-commerce experience designed for high conversion and smooth shopping interactions.",
    features: [
      "Dynamic product filtering by price, collection, and stock status",
      "Slide-out reactive shopping bag drawer with local storage persistence",
      "Stripe payment gateway modal integration",
      "Optimized Core Web Vitals with 100/100 Lighthouse score"
    ],
    tech: ["HTML5", "CSS3 Grid", "Vanilla JavaScript", "Stripe API", "LocalStore"],
    demoUrl: "https://example.com/demo/lumina",
    githubUrl: "https://github.com/example/lumina-luxe"
  },
  "3": {
    title: "Cognitive Studio AI Workspace",
    category: "AI Developer Tool",
    image: "images/project3.png",
    description: "An intelligent web workspace featuring real-time code completion, prompt debugging, and markdown output formatting.",
    features: [
      "Syntax-highlighted code editor supporting 15+ programming languages",
      "Streaming SSE (Server-Sent Events) model responses",
      "Export code snippets to Gist or PDF",
      "Keyboard shortcut map for fast editing"
    ],
    tech: ["React.js", "JavaScript", "WebSockets", "Monaco Editor", "Node.js"],
    demoUrl: "https://example.com/demo/cognitive",
    githubUrl: "https://github.com/example/cognitive-studio"
  },
  "4": {
    title: "Prism UI Component Kit",
    category: "Design System",
    image: "images/project1.png",
    description: "A lightweight, zero-dependency design system offering 30+ accessible UI components, micro-animations, and CSS tokens.",
    features: [
      "WCAG 2.1 AA compliant color contrast and focus rings",
      "Pure Vanilla CSS custom properties setup",
      "Copy-paste HTML/CSS code snippets for rapid prototyping",
      "Responsive layout components"
    ],
    tech: ["HTML5", "Vanilla CSS", "JavaScript", "WCAG a11y"],
    demoUrl: "https://example.com/demo/prism",
    githubUrl: "https://github.com/example/prism-ui"
  }
};

function initProjectModals() {
  const projectModal = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');
  const closeBtn = document.getElementById('close-project-modal');
  const triggerBtns = document.querySelectorAll('.btn-demo, .btn-overlay-preview');

  if (!projectModal || !modalBody) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];

      if (data) {
        modalBody.innerHTML = `
          <div class="modal-project-header">
            <span class="tech-tag">${data.category}</span>
            <h2 style="font-size: 1.6rem; margin: 0.5rem 0 1rem 0;">${data.title}</h2>
          </div>
          
          <div class="modal-project-media" style="border-radius: 12px; overflow: hidden; margin-bottom: 1.25rem; border: 1px solid var(--border-color);">
            <img src="${data.image}" alt="${data.title}" style="width:100%; height:auto;">
          </div>
          
          <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.6;">${data.description}</p>
          
          <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-primary);">Key Features:</h4>
          <ul style="list-style: disc; padding-left: 1.25rem; margin-bottom: 1.5rem; color: var(--text-secondary);">
            ${data.features.map(f => `<li style="margin-bottom: 0.3rem;">${f}</li>`).join('')}
          </ul>
          
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
            ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live Preview
            </a>
            <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
              <i class="fa-brands fa-github"></i> Source Code
            </a>
          </div>
        `;

        projectModal.showModal();
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => projectModal.close());
  }

  // Close modal when clicking on backdrop
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.close();
    }
  });
}

/* ==========================================================================
   7. RESUME PREVIEW & DOWNLOAD MODAL
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const sectionResumeBtn = document.getElementById('section-resume-btn');
  const closeBtn = document.getElementById('close-resume-modal');
  const downloadPdfBtn = document.getElementById('download-pdf-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  if (!resumeModal) return;

  const openModal = () => resumeModal.showModal();
  const closeModal = () => resumeModal.close();

  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openModal);
  if (sectionResumeBtn) sectionResumeBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Backdrop click
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  // Mock PDF Download trigger with notification toast
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
      showToast("Resume download initialized (Alex_Morgan_Resume.pdf)");
      setTimeout(() => {
        window.print();
      }, 500);
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   8. CONTACT FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  if (!form) return;

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.classList.add('invalid');
      nameError.classList.add('visible');
      isValid = false;
    } else {
      nameInput.classList.remove('invalid');
      nameError.classList.remove('visible');
    }

    // Validate Email
    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      emailInput.classList.add('invalid');
      emailError.classList.add('visible');
      isValid = false;
    } else {
      emailInput.classList.remove('invalid');
      emailError.classList.remove('visible');
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.classList.add('invalid');
      messageError.classList.add('visible');
      isValid = false;
    } else {
      messageInput.classList.remove('invalid');
      messageError.classList.remove('visible');
    }

    if (isValid) {
      const submitBtn = document.getElementById('submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

      setTimeout(() => {
        showToast("Thank you! Your message has been sent successfully.");
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1000);
    }
  });

  // Clear errors on typing
  [nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
        const errEl = document.getElementById(`${input.id}-error`);
        if (errEl) errEl.classList.remove('visible');
      });
    }
  });
}

/* ==========================================================================
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   11. DYNAMIC COPYRIGHT YEAR
   ========================================================================== */
function updateCopyrightYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
