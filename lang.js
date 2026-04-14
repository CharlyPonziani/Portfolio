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
