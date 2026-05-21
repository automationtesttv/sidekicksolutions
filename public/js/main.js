/* ═══════════════════════════════════════════════════════
   Sidekick Solutions – main.js
   Lightweight vanilla JS for all interactive behaviours
════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── 1. Announcement banner close ─────────────────── */
  const banner    = document.getElementById('announcement-banner');
  const closeBtn  = document.getElementById('close-banner');
  if (closeBtn && banner) {
    closeBtn.addEventListener('click', () => {
      banner.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease';
      banner.style.maxHeight  = banner.scrollHeight + 'px';
      requestAnimationFrame(() => {
        banner.style.maxHeight = '0';
        banner.style.opacity   = '0';
        banner.style.padding   = '0';
        banner.style.overflow  = 'hidden';
      });
    });
  }

  /* ─── 2. Navbar scroll effect ───────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 16) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── 3. Mobile menu toggle ─────────────────────────── */
  const mobileBtn  = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamTop     = document.getElementById('ham-top');
  const hamMid     = document.getElementById('ham-mid');
  const hamBot     = document.getElementById('ham-bot');

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('hidden');
    if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
    if (hamTop) { hamTop.style.transform = ''; hamTop.style.opacity = ''; }
    if (hamMid) hamMid.style.transform = '';
    if (hamBot) { hamBot.style.transform = ''; hamBot.style.opacity = ''; }
  }
  window.closeMobileMenu = closeMobileMenu;

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        closeMobileMenu();
      } else {
        mobileMenu.classList.remove('hidden');
        mobileBtn.setAttribute('aria-expanded', 'true');
        // Animate hamburger → X
        if (hamTop) { hamTop.style.transform = 'translateY(8px) rotate(45deg)'; }
        if (hamMid) { hamMid.style.opacity = '0'; hamMid.style.transform = 'scaleX(0)'; }
        if (hamBot) { hamBot.style.transform = 'translateY(-8px) rotate(-45deg)'; }
      }
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  /* ─── 4. Scroll-reveal (IntersectionObserver) ──────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    revealEls.forEach((el) => el.classList.add('revealed'));
  }

  /* ─── 5. FAQ accordion ──────────────────────────────── */
  const faqList = document.getElementById('faq-list');
  if (faqList) {
    faqList.addEventListener('click', (e) => {
      const trigger = e.target.closest('.faq-trigger');
      if (!trigger) return;

      const idx      = trigger.dataset.faqIndex;
      const body     = document.getElementById('faq-body-' + idx);
      const icon     = trigger.querySelector('.faq-icon');
      const isOpen   = trigger.getAttribute('aria-expanded') === 'true';

      // Close all others
      faqList.querySelectorAll('.faq-trigger').forEach((t) => {
        if (t !== trigger) {
          t.setAttribute('aria-expanded', 'false');
          const b = document.getElementById('faq-body-' + t.dataset.faqIndex);
          const ic = t.querySelector('.faq-icon');
          if (b)  b.classList.remove('open');
          if (ic) ic.style.transform = '';
        }
      });

      // Toggle current
      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        body.classList.remove('open');
        if (icon) icon.style.transform = '';
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        body.classList.add('open');
        if (icon) icon.style.transform = 'rotate(45deg)';
      }
    });
  }

  /* ─── 6. Pricing toggle (monthly / annual) ──────────── */
  const billingToggle = document.getElementById('billing-toggle');
  if (billingToggle) {
    const toggleBtns    = billingToggle.querySelectorAll('.toggle-btn');
    const priceDisplays = document.querySelectorAll('.price-display');

    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const period = btn.dataset.period;

        // Update button states
        toggleBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Update prices with a quick fade
        priceDisplays.forEach((el) => {
          el.style.transition = 'opacity 0.2s ease';
          el.style.opacity    = '0';
          setTimeout(() => {
            el.textContent  = period === 'annual' ? el.dataset.annual : el.dataset.monthly;
            el.style.opacity = '1';
          }, 200);
        });
      });
    });
  }

  /* ─── 7. Smooth anchor scroll with offset for navbar ── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navH   = navbar ? navbar.offsetHeight : 72;
      const bannerH = (banner && banner.style.maxHeight !== '0px') ? (banner.offsetHeight || 44) : 0;
      const offset = navH + bannerH + 16;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ─── 8. Hover micro-interactions on bento cards ────── */
  document.querySelectorAll('.bento-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
      card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── 9. Active nav highlight on scroll ─────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const highlightNav = () => {
      const scrollY = window.scrollY + 120;
      sections.forEach((sec) => {
        const top    = sec.offsetTop;
        const height = sec.offsetHeight;
        const id     = sec.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === '#' + id) {
            if (scrollY >= top && scrollY < top + height) {
              link.classList.add('text-gray-900', 'font-semibold');
            } else {
              link.classList.remove('text-gray-900', 'font-semibold');
            }
          }
        });
      });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();
  }

})();
