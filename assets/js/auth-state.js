/* Original ARTA Sport demo auth behavior. Header states are static HTML. */
(function () {
  'use strict';
  var AUTH_KEY = 'artaAuthDemo';
  function isAuthed() {
    try { return window.localStorage.getItem(AUTH_KEY) === '1'; }
    catch (error) { return false; }
  }
  function updateHeader() {
    document.documentElement.classList.toggle('auth-member', isAuthed());
  }
  updateHeader();
  document.addEventListener('submit', function (event) {
    if (event.target && event.target.closest('.js-demo-form') && !event.target.closest('[data-panel="reset"]')) {
      try { window.localStorage.setItem(AUTH_KEY, '1'); } catch (error) {}
      updateHeader();
    }
  }, true);
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.account-logout')) return;
    event.preventDefault();
    try { window.localStorage.removeItem(AUTH_KEY); } catch (error) {}
    updateHeader();
    window.location.href = 'index.html';
  }, true); // Capture runs before the dropdown stops click propagation.
  document.addEventListener('DOMContentLoaded', function () {
    updateHeader();
    if (document.body.classList.contains('lk-page') && !isAuthed()) {
      window.location.replace('registration.html#registration');
    }
  });
})();
