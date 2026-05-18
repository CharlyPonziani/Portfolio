// Language switcher — EN / IT
(function () {
  const STORAGE_KEY = 'cp-lang';
  const DEFAULT = 'en';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT;
  }

  function applyLang(lang) {
    // Text content
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = lang === 'it' ? el.dataset.it : el.dataset.en;
    });

    // HTML content (for elements that contain markup)
    document.querySelectorAll('[data-html-en]').forEach(el => {
      el.innerHTML = lang === 'it' ? el.dataset.htmlIt : el.dataset.htmlEn;
    });

    // Placeholder attributes
    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
      el.placeholder = lang === 'it' ? el.dataset.placeholderIt : el.dataset.placeholderEn;
    });

    // Update toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Store
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }

  function init() {
    const lang = getLang();
    applyLang(lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Dark / Light mode toggle
(function () {
  const STORAGE_KEY = 'cp-theme';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
    localStorage.setItem(STORAGE_KEY, theme);
    // Update icon
    document.querySelectorAll('.theme-icon').forEach(el => {
      el.textContent = theme === 'dark' ? '○' : '◐';
    });
  }

  function initTheme() {
    const theme = getTheme();
    applyTheme(theme);

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = getTheme();
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();

// Hamburger menu
(function () {
  function initHamburger() {
    const btn = document.querySelector('.nav-hamburger');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      links.classList.toggle('open');
    });

    // Close when a link is clicked
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        btn.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburger);
  } else {
    initHamburger();
  }
})();

// Contact form — async submit (stay on page, show inline confirmation)
(function () {
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const success = document.getElementById('form-success');
    const btn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          // Hide fields, show confirmation
          Array.from(form.elements).forEach(el => {
            if (el !== btn) el.style.display = 'none';
          });
          btn.style.display = 'none';
          success.style.display = 'block';
          // Re-apply language to new element
          const lang = localStorage.getItem('cp-lang') || 'en';
          success.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = lang === 'it' ? el.dataset.it : el.dataset.en;
          });
        } else {
          btn.disabled = false;
          alert('Something went wrong — please try again or email directly.');
        }
      } catch {
        btn.disabled = false;
        alert('Something went wrong — please try again or email directly.');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();

// Smooth scroll — slower, more natural feel
(function () {
  function smoothScrollTo(target, duration) {
    const start = window.scrollY;
    // Aim at section title to skip top padding and land with content visible
    const landmark = target.querySelector('.section-title, h1, h2, .section-label') || target;
    const end = landmark.getBoundingClientRect().top + window.scrollY - 64; // 52px nav + 12px breathing room
    const distance = end - start;
    let startTime = null;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href*="#"]').forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const hashIndex = href.indexOf('#');
        if (hashIndex === -1) return;
        const id = href.slice(hashIndex + 1);
        const target = document.getElementById(id);
        if (!target) return;
        // Only intercept same-page or same-file anchors
        const path = href.slice(0, hashIndex);
        if (path && !window.location.pathname.endsWith(path.replace(/^.*\//, ''))) return;
        e.preventDefault();
        smoothScrollTo(target, 900); // 900ms — adjust here to taste
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
  } else {
    initSmoothScroll();
  }
})();

// Exclusive audio — pause all others when one starts playing
(function () {
  function initExclusiveAudio() {
    document.querySelectorAll('audio').forEach(audio => {
      audio.addEventListener('play', () => {
        document.querySelectorAll('audio').forEach(other => {
          if (other !== audio) other.pause();
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExclusiveAudio);
  } else {
    initExclusiveAudio();
  }
})();
