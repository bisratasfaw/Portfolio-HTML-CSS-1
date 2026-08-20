// Frosted nav border once the page leaves the very top (sentinel, no scroll listener)
(function () {
  var nav = document.getElementById('site-nav');
  var sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
  document.body.prepend(sentinel);
  new IntersectionObserver(function (entries) {
    nav.classList.toggle('scrolled', !entries[0].isIntersecting);
  }).observe(sentinel);
})();

// Theme toggle: manual choice persists; system preference is followed until then
(function () {
  var btn = document.getElementById('theme-toggle');
  function setLabel() {
    var dark = document.documentElement.dataset.theme === 'dark';
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  setLabel();
  btn.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    setLabel();
  });
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var onSystemChange = function (e) {
    var stored = null;
    try { stored = localStorage.getItem('theme'); } catch (err) {}
    if (!stored) {
      document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
      setLabel();
    }
  };
  if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
})();

// Mobile menu
function toggleMenu() {
  document.body.classList.toggle('menu-open');
}
document.querySelectorAll('#nav-links a').forEach(function (a) {
  a.addEventListener('click', function () {
    document.body.classList.remove('menu-open');
  });
});

// Scroll reveal (honors prefers-reduced-motion via CSS override)
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
