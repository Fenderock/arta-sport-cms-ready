/* ARTA SPORT — shared interactions for internal static pages. */
$(function () {
  /* Mobile navigation. */
  $('.menu-toggle').on('click', function () {
    var isOpen = !$('.mobile-menu').hasClass('is-open');
    $('.mobile-menu').toggleClass('is-open', isOpen);
    $(this).attr('aria-expanded', String(isOpen));
  });

  $('.mobile-menu a').on('click', function () {
    $('.mobile-menu').removeClass('is-open');
    $('.menu-toggle').attr('aria-expanded', 'false');
  });

  /* Shared personal-account dropdown in the public header. */
  document.querySelectorAll('.account-icon').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.stopPropagation();
      var dropdown = button.parentElement.querySelector('.account-dropdown');
      var isOpen = dropdown.classList.contains('is-open');
      document.querySelectorAll('.account-dropdown').forEach(function (item) {
        item.classList.remove('is-open');
      });
      document.querySelectorAll('.account-icon').forEach(function (item) {
        item.setAttribute('aria-expanded', 'false');
      });
      dropdown.classList.toggle('is-open', !isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  document.querySelectorAll('.account-dropdown').forEach(function (dropdown) {
    dropdown.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  });

  $(document).on('click', function () {
    $('.account-dropdown').removeClass('is-open');
    $('.account-icon').attr('aria-expanded', 'false');
  });

  /* Close mobile navigation with Escape. */
  $(document).on('keydown', function (event) {
    if (event.key === 'Escape') {
      $('.mobile-menu').removeClass('is-open');
      $('.menu-toggle').attr('aria-expanded', 'false');
      $('.account-dropdown').removeClass('is-open');
      $('.account-icon').attr('aria-expanded', 'false');
    }
  });

  /* Authentication tabs. */
  $('.js-auth-tab').on('click', function () {
    var panel = $(this).data('panel');
    $('.js-auth-tab').removeClass('is-active').attr('aria-selected', 'false');
    $(this).addClass('is-active').attr('aria-selected', 'true');
    $('.js-auth-panel').addClass('is-hidden');
    $('.js-auth-panel[data-panel="' + panel + '"]').removeClass('is-hidden');
  });

  /* Password recovery panel. */
  $('.js-reset-link').on('click', function () {
    $('.js-auth-panel').addClass('is-hidden');
    $('.js-auth-panel[data-panel="reset"]').removeClass('is-hidden');
  });

  $('.js-login-link').on('click', function () {
    $('.js-auth-panel').addClass('is-hidden');
    $('.js-auth-panel[data-panel="login"]').removeClass('is-hidden');
    $('.js-auth-tab').removeClass('is-active').attr('aria-selected', 'false');
    $('.js-auth-tab[data-panel="login"]').addClass('is-active').attr('aria-selected', 'true');
  });

  /* Static form demonstration without server submission. */
  $('.js-demo-form').on('submit', function (event) {
    event.preventDefault();
    $(this).find('.form-success').removeClass('is-hidden');
  });

  /* Event countdown. */
  $('.js-countdown').each(function () {
    var $countdown = $(this);
    var target = new Date($countdown.data('target')).getTime();

    function updateCountdown() {
      var distance = Math.max(0, target - Date.now());
      var values = [
        Math.floor(distance / 86400000),
        Math.floor(distance / 3600000) % 24,
        Math.floor(distance / 60000) % 60,
        Math.floor(distance / 1000) % 60
      ];

      $countdown.find('[data-time]').each(function (index) {
        $(this).text(String(values[index]).padStart(2, '0'));
      });
    }

    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  });
});
