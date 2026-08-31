/* ARTA SPORT — demo auth state for the personal account icon.
   Shows the account icon only when "logged in"; otherwise shows a text link
   to the registration form. Replace with a real CMS session check. */
(function () {
  'use strict';

  var AUTH_KEY = 'artaAuthDemo';

  function isAuthed() {
    try {
      return window.localStorage.getItem(AUTH_KEY) === '1';
    } catch (error) {
      return false;
    }
  }

  function login() {
    try {
      window.localStorage.setItem(AUTH_KEY, '1');
    } catch (error) { /* storage unavailable — ignore in demo */ }
  }

  function logout() {
    try {
      window.localStorage.removeItem(AUTH_KEY);
    } catch (error) { /* storage unavailable — ignore in demo */ }
  }

  /* Swap the icon for a text link while logged out, and add a "Logout"
     action to the account dropdown while logged in. */
  function updateHeader() {
    var authed = isAuthed();

    document.querySelectorAll('.account-menu').forEach(function (menu) {
      var icon = menu.querySelector('.account-icon');
      var dropdown = menu.querySelector('.account-dropdown');
      var loginLink = menu.querySelector('.account-login-link');

      if (authed) {
        if (icon) icon.style.display = '';
        if (dropdown) dropdown.style.display = '';
        if (loginLink) loginLink.remove();

        if (dropdown && !dropdown.querySelector('.account-logout')) {
          var logoutLink = document.createElement('a');
          logoutLink.className = 'account-logout';
          logoutLink.href = '#';
          logoutLink.textContent = 'Выйти';
          logoutLink.addEventListener('click', function (event) {
            event.preventDefault();
            logout();
            window.location.href = 'index.html';
          });
          dropdown.appendChild(logoutLink);
        }
      } else {
        if (icon) icon.style.display = 'none';
        if (dropdown) dropdown.style.display = 'none';

        if (!loginLink) {
          loginLink = document.createElement('a');
          loginLink.className = 'account-login-link';
          loginLink.href = 'registration.html#registration';
          loginLink.textContent = 'Личный кабинет';
          menu.appendChild(loginLink);
        }
      }
    });
  }

  /* Demo forms (login and registration) set the "logged in" state on submit. */
  document.addEventListener('submit', function (event) {
    if (event.target && event.target.closest && event.target.closest('.js-demo-form')) {
      login();
      updateHeader();
    }
  }, true);

  document.addEventListener('DOMContentLoaded', function () {
    updateHeader();

    /* The personal account page requires a "session". */
    if (document.body.classList.contains('lk-page') && !isAuthed()) {
      window.location.replace('registration.html#registration');
    }
  });
})();
