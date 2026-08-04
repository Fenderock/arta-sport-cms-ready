/* Shared motion system: scroll reveals, counters and reduced-motion support. */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('motion-ready');

  const revealSelectors = [
    '.section-head',
    '.event-card',
    '.info-card',
    '.past-list > a',
    '.sport-card',
    '.trust-grid > article',
    '.news-card',
    '.account-preview > *',
    '.cta > *',
    '.partner-carousel',
    '.about-hero-grid > *',
    '.offers-hero .container > *',
    '.image-hero-content > *',
    '.page-section .container > .page-kicker',
    '.page-section .container > h2',
    '.feature-card',
    '.offer-card',
    '.content-block',
    '.side-card',
    '.timing-banner > *',
    '.contact-panel > *',
    '.service-deliverables > li',
    '.service-sports-grid > *',
    '.reviews-grid > *',
    '.service-past-events > a',
    '.auth-card'
  ];

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.08
  });

  function registerRevealItems(root) {
    const scope = root || document;
    const items = scope.querySelectorAll(revealSelectors.join(','));
    items.forEach(function (item, index) {
      if (item.classList.contains('reveal-item')) return;
      item.classList.add('reveal-item');
      item.style.setProperty('--reveal-delay', (index % 5) * 55 + 'ms');
      revealObserver.observe(item);
    });
  }

  function animateCounter(element) {
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    if (!Number.isFinite(target)) return;
    const duration = 900;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased).toLocaleString('ru-RU') + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  const counterObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.55 });

  document.querySelectorAll('[data-count]').forEach(function (counter) {
    counterObserver.observe(counter);
  });

  registerRevealItems(document);

  const dynamicGrid = document.querySelector('#eventGrid');
  if (dynamicGrid && 'MutationObserver' in window) {
    new MutationObserver(function () {
      registerRevealItems(dynamicGrid);
    }).observe(dynamicGrid, { childList: true });
  }
})();
