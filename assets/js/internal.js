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

  /* Mobile submenu toggle (for pages that use internal.js) */
  $(document).on('click', '.mobile-sub-toggle', function () {
    const expanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', String(!expanded));
    $(this).next('.mobile-submenu').toggleClass('is-open', !expanded);
  });

  /* Desktop dropdown: hover opens immediately, mouseleave closes after a short delay */
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $('.nav-dropdown').each(function () {
      var $item = $(this);
      var closeTimer = null;
      $item.on('mouseenter', function () {
        if (closeTimer) clearTimeout(closeTimer);
        $item.addClass('is-open');
        $item.find('.nav-dropdown-toggle').attr('aria-expanded', 'true');
      }).on('mouseleave', function () {
        closeTimer = setTimeout(function () {
          $item.removeClass('is-open');
          $item.find('.nav-dropdown-toggle').attr('aria-expanded', 'false');
        }, 180);
      });
    });
  }

  $('.nav-dropdown .nav-dropdown-toggle').on('focus', function () {
    $(this).attr('aria-expanded', 'true');
  }).on('blur', function () {
    $(this).attr('aria-expanded', 'false');
  });

  $(document).on('keydown', '.nav-dropdown .nav-dropdown-toggle', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).trigger('click');
    }
  });

  /* Click handler for desktop dropdown in pages using internal.js */
  $('.nav-dropdown .nav-dropdown-toggle').on('click', function (e) {
    if (e.metaKey || e.ctrlKey || e.which === 2) return;
    e.preventDefault();
    var $parent = $(this).closest('.nav-dropdown');
    var isOpen = $parent.hasClass('is-open');
    $('.nav-dropdown').not($parent).removeClass('is-open');
    $parent.toggleClass('is-open', !isOpen);
    $(this).attr('aria-expanded', String(!isOpen));
  });

  $(document).on('click', function (e) {
    if ($(e.target).closest('.nav-dropdown').length === 0) {
      $('.nav-dropdown').removeClass('is-open');
      $('.nav-dropdown .nav-dropdown-toggle').attr('aria-expanded', 'false');
    }
  });

  $(document).on('keydown', function (event) {
    if (event.key === 'Escape') {
      $('.nav-dropdown').removeClass('is-open');
      $('.nav-dropdown .nav-dropdown-toggle').attr('aria-expanded', 'false');
    }
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

  /* Event participants: total count and list by age groups (demo data, replace with CMS data). */
  var participantsByGroup = {
    'all': 'Все группы',
    '12-14': '12–14 лет',
    '15-17': '15–17 лет',
    '18-29': '18–29 лет',
    '30-39': '30–39 лет',
    '40-49': '40–49 лет',
    '50+': '50+'
  };

  var participants = [
    { name: 'Васильев Дмитрий Сергеевич', bib: '184', group: '30-39', city: 'Москва' },
    { name: 'Васильева Анна', bib: '312', group: '30-39', city: 'Москва' },
    { name: 'Смирнов Артем', bib: '021', group: '15-17', city: 'Химки' },
    { name: 'Кузнецова Ольга', bib: '045', group: '18-29', city: 'Мытищи' },
    { name: 'Соколов Игорь Петрович', bib: '102', group: '50+', city: 'Королёв' },
    { name: 'Лебедева Мария', bib: '058', group: '12-14', city: 'Балашиха' },
    { name: 'Громов Павел', bib: '210', group: '40-49', city: 'Люберцы' },
    { name: 'Никитин Семён', bib: '077', group: '15-17', city: 'Подольск' },
    { name: 'Орлова Елена', bib: '156', group: '40-49', city: 'Москва' },
    { name: 'Захаров Роман', bib: '233', group: '18-29', city: 'Одинцово' },
    { name: 'Морозова Татьяна Ивановна', bib: '301', group: '50+', city: 'Пушкино' },
    { name: 'Волков Артём', bib: '012', group: '12-14', city: 'Москва' }
  ];

  var $participantsApp = $('#participantsApp');

  if ($participantsApp.length) {
    function renderParticipants(activeGroup) {
      var rows = participants.filter(function (item) {
        return activeGroup === 'all' || item.group === activeGroup;
      });

      var tabs = Object.keys(participantsByGroup).map(function (key) {
        var count = key === 'all' ? participants.length : participants.filter(function (item) { return item.group === key; }).length;
        return '<button class="participants-tab' + (key === activeGroup ? ' is-active' : '') + '" type="button" data-group="' + key + '">' +
          participantsByGroup[key] + '<span>' + count + '</span></button>';
      }).join('');

      var list = rows.length ? rows.map(function (item, index) {
        return '<div class="participant-row"><span class="participant-num">' + (index + 1) + '</span>' +
          '<strong class="participant-name">' + item.name + '</strong>' +
          '<span class="participant-city">' + item.city + '</span>' +
          '<span class="participant-bib">№ ' + item.bib + '</span></div>';
      }).join('') : '<p class="participant-empty">В этой группе пока нет зарегистрированных участников.</p>';

      $participantsApp.html(
        '<div class="participants-total"><strong>' + participants.length + '</strong><span>зарегистрированных участников</span></div>' +
        '<div class="participants-tabs" role="tablist">' + tabs + '</div>' +
        '<div class="participants-list">' + list + '</div>'
      );
    }

    $participantsApp.on('click', '.participants-tab', function () {
      renderParticipants($(this).data('group'));
    });

    renderParticipants('all');
  }
});
