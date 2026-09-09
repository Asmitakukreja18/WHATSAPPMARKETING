/**
 * Marketiqx Shared Mobile Navigation & Responsive Experience
 * Automatically handles mobile hamburger navigation, responsive drawers,
 * and seamless interactions across all pages.
 */

(function () {
  'use strict';

  function initMobileNav() {
    const header = document.querySelector('header');
    if (!header) return;

    // Check if toggle button already exists
    let toggleBtn = header.querySelector('.mobile-nav-toggle');
    const actionsGroup = header.querySelector('.header-actions-group') || header;

    if (!toggleBtn) {
      toggleBtn = document.createElement('button');
      toggleBtn.className = 'mobile-nav-toggle';
      toggleBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
      toggleBtn.setAttribute('type', 'button');
      toggleBtn.innerHTML = `
        <svg class="hamburger-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg class="close-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" style="display: none;">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
      actionsGroup.appendChild(toggleBtn);
    }

    // Check if drawer already exists
    let drawer = document.getElementById('mobileNavDrawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'mobileNavDrawer';
      drawer.className = 'mobile-nav-drawer';

      // Current page filename
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      drawer.innerHTML = `
        <div class="mobile-nav-inner">
          <div class="mobile-nav-section-title">Navigation</div>
          <nav class="mobile-nav-links">
            <a href="index.html" class="${currentPage === 'index.html' || currentPage === '' ? 'active' : ''}">
              <span>🏠</span> Platform Home
            </a>
            <a href="case-studies.html" class="${currentPage === 'case-studies.html' ? 'active' : ''}">
              <span>📊</span> Case Studies
            </a>
            <a href="pricing-sms-voice-email-wa.html" class="${currentPage === 'pricing-sms-voice-email-wa.html' ? 'active' : ''}">
              <span>💳</span> Pricing & Tariffs
            </a>
            <a href="about-us.html" class="${currentPage === 'about-us.html' ? 'active' : ''}">
              <span>🏢</span> About Marketiqx
            </a>
            <a href="leadership.html" class="${currentPage === 'leadership.html' ? 'active' : ''}">
              <span>👥</span> Leadership & Team
            </a>
            <a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}">
              <span>📍</span> Contact & Offices
            </a>
            <a href="demo_regi.html" class="${currentPage === 'demo_regi.html' ? 'active' : ''}" style="color: #0ea5e9; font-weight: 700;">
              <span>🎁</span> Free Demo (100 Credits)
            </a>
          </nav>

          <div class="mobile-nav-divider"></div>

          <div class="mobile-nav-section-title">Quick Access</div>
          <div class="mobile-nav-actions">
            <a href="tel:+919820144521" class="mobile-phone-btn">
              📞 24/7 Helpline: +91 98201 44521
            </a>
            <div class="mobile-actions-row">
              <a href="login.html" class="btn-secondary" style="flex: 1; text-align: center; justify-content: center;">🔑 Login</a>
              <a href="dashboard.html" class="btn-primary" style="flex: 1; text-align: center; justify-content: center;">🚀 Dashboard</a>
            </div>
          </div>
        </div>
        <div class="mobile-nav-backdrop" id="mobileNavBackdrop"></div>
      `;

      document.body.appendChild(drawer);
    }

    // Toggle logic
    function toggleNav() {
      const isOpen = drawer.classList.toggle('is-open');
      document.body.classList.toggle('nav-drawer-open', isOpen);
      
      const hamburger = toggleBtn.querySelector('.hamburger-icon');
      const close = toggleBtn.querySelector('.close-icon');
      if (hamburger && close) {
        hamburger.style.display = isOpen ? 'none' : 'block';
        close.style.display = isOpen ? 'block' : 'none';
      }
    }

    function closeNav() {
      if (drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        document.body.classList.remove('nav-drawer-open');
        const hamburger = toggleBtn.querySelector('.hamburger-icon');
        const close = toggleBtn.querySelector('.close-icon');
        if (hamburger && close) {
          hamburger.style.display = 'block';
          close.style.display = 'none';
        }
      }
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNav();
    });

    // Close on backdrop click
    const backdrop = document.getElementById('mobileNavBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeNav);
    }

    // Close when any link inside drawer is clicked
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close on window resize if larger than 992px
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) {
        closeNav();
      }
    });

    // Expose toggle globally
    window.togglePublicNav = toggleNav;
    window.closePublicNav = closeNav;
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
