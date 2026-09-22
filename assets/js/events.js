$(function () {
  if (!$('body').hasClass('events-page')) return;

  let status = 'upcoming';

  const requestedStatus = new URLSearchParams(window.location.search).get('status');
  if (requestedStatus === 'upcoming' || requestedStatus === 'past') {
    status = requestedStatus;
    $('.status-btn').removeClass('is-active');
    $('.status-btn[data-status="' + status + '"]').addClass('is-active');
  }
  const selected = { sport: 'all', year: 'all' };
  const pageSize = 8;

  function render() {
    let visible = 0;
    let matched = 0;

    $('#eventsPageGrid .event-card').each(function () {
      const card = $(this);
      const matches = card.data('status') === status
        && (selected.sport === 'all' || card.data('sport') === selected.sport)
        && (selected.year === 'all' || String(card.data('year')) === selected.year);
      const show = matches && matched < pageSize;

      card.toggle(show);
      if (matches) matched += 1;
      if (show) visible += 1;
    });

    $('#eventsResultTitle').text(status === 'upcoming' ? 'Предстоящие мероприятия' : 'Прошедшие мероприятия');
    $('#eventsResultCount').text(matched > pageSize ? `Показано: ${visible} из ${matched}` : `Найдено: ${matched}`);
    $('#eventsPageGrid .empty').remove();
    if (!matched) $('#eventsPageGrid').append('<div class="empty">По выбранным фильтрам мероприятий нет.</div>');
  }

  $('.events-page .select-trigger').on('click', function (event) {
    event.stopPropagation();
    const box = $(this).closest('.custom-select');
    $('.custom-select').not(box).removeClass('is-open');
    box.toggleClass('is-open');
  });

  $('.events-page .select-options li').on('click', function () {
    const item = $(this);
    const box = item.closest('.custom-select');
    selected[box.data('filter')] = String(item.data('value'));
    box.find('.select-trigger').text(item.text());
    box.find('li').removeClass('is-selected');
    item.addClass('is-selected');
    box.removeClass('is-open');
    render();
  });

  $('.events-page .status-btn').on('click', function () {
    $('.events-page .status-btn').removeClass('is-active');
    $(this).addClass('is-active');
    status = $(this).data('status');
    render();
  });

  $(document).on('click', '.events-page .event-card', function (clickEvent) {
    if ($(clickEvent.target).closest('a, button, input, select, textarea, label').length) return;
    window.location.href = $(this).data('event-href') || 'event.html';
  });

  $(document).on('keydown', '.events-page .event-card', function (keyEvent) {
    if (keyEvent.target !== this || (keyEvent.key !== 'Enter' && keyEvent.key !== ' ')) return;
    keyEvent.preventDefault();
    window.location.href = $(this).data('event-href') || 'event.html';
  });

  $(document).on('click', function () {
    $('.custom-select').removeClass('is-open');
  });

  /* Event series: annual events grouped with history of editions by year (demo data, replace with CMS data). */
  const eventSeries = [
    {
      id: 'tyscha',
      title: '«ТЫЩА В МЫТИЩАХ»',
      description: 'Летняя серия стартов по лёгкой атлетике памяти Александра Толстых. Проводится ежегодно в Мытищах.',
      image: 'assets/images/diz1/imports/1440WLight/04d0e49637dd3340ccec361b074a85de3c5bff80.png',
      editions: [
        {
          year: '2026',
          title: '4 этап — «ТЫЩА В МЫТИЩАХ-2026»',
          date: '26 августа 2026 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Стартовый протокол', href: 'event.html' },
            { type: 'Фото', label: 'Фотоотчёт (до 500 фото)', href: 'event.html' }
          ]
        },
        {
          year: '2025',
          title: '«ТЫЩА В МЫТИЩАХ-2025»',
          date: '25 июня 2025 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Итоговый протокол', href: 'event.html' },
            { type: 'Фото', label: 'Фотоотчёт', href: 'event.html' },
            { type: 'Пресс-релиз', label: 'Итоги соревнований', href: 'event.html' }
          ]
        },
        {
          year: '2024',
          title: '«ТЫЩА В МЫТИЩАХ-2024»',
          date: '19 июня 2024 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Итоговый протокол', href: 'event.html' },
            { type: 'Фото', label: 'Фотоотчёт', href: 'event.html' }
          ]
        }
      ]
    },
    {
      id: 'moscow-cross',
      title: 'Московский кросс лыжников',
      description: 'Ежегодный осенний кросс среди лыжников и любителей бега. Проводится в парках Москвы с 2018 года.',
      image: 'assets/images/legacy/events/event-run.jpg',
      editions: [
        {
          year: '2026',
          title: 'Московский кросс лыжников-2026',
          date: '12 сентября 2026 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Стартовый протокол', href: 'event.html' }
          ]
        },
        {
          year: '2025',
          title: 'Московский кросс лыжников-2025',
          date: '13 сентября 2025 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Итоговый протокол', href: 'event.html' },
            { type: 'Фото', label: 'Фотоотчёт', href: 'event.html' }
          ]
        },
        {
          year: '2024',
          title: 'Московский кросс лыжников-2024',
          date: '14 сентября 2024 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Итоговый протокол', href: 'event.html' },
            { type: 'Фото', label: 'Фотоотчёт', href: 'event.html' },
            { type: 'Пресс-релиз', label: 'Итоги кросса', href: 'event.html' }
          ]
        },
        {
          year: '2023',
          title: 'Московский кросс лыжников-2023',
          date: '9 сентября 2023 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Итоговый протокол', href: 'event.html' },
            { type: 'Фото', label: 'Фотоотчёт', href: 'event.html' }
          ]
        }
      ]
    },
    {
      id: 'city-run',
      title: 'ARTA City Run',
      description: 'Серия городских забегов на дистанции от 3 до 21,1 км. Финальный старт сезона проходит в центре Москвы.',
      image: 'assets/images/legacy/services/event-organization/trail.jpg',
      editions: [
        {
          year: '2026',
          title: 'ARTA City Run 10K',
          date: '18 августа 2026 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Стартовый протокол', href: 'event.html' },
            { type: 'Фото', label: 'Фотоотчёт', href: 'event.html' }
          ]
        },
        {
          year: '2025',
          title: 'ARTA City Run Half',
          date: '16 августа 2025 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Итоговый протокол', href: 'event.html' },
            { type: 'Фото', label: 'Фотоотчёт', href: 'event.html' }
          ]
        },
        {
          year: '2024',
          title: 'ARTA City Run 5K',
          date: '18 августа 2024 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Итоговый протокол', href: 'event.html' }
          ]
        }
      ]
    },
    {
      id: 'ski-classic',
      title: 'Vologda Ski Classic',
      description: 'Зимняя серия лыжных гонок классическим и свободным стилем на трассах Вологды. Этапы Кубка АНО «АРТА-СПОРТ».',
      image: 'assets/images/legacy/events/event-ski.jpg',
      editions: [
        {
          year: '2026',
          title: 'Vologda Ski Classic 2026',
          date: '15 февраля 2026 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Итоговый протокол', href: 'event.html' },
            { type: 'Фото', label: 'Фотоотчёт', href: 'event.html' }
          ]
        },
        {
          year: '2025',
          title: 'Vologda Ski Classic 2025',
          date: '16 февраля 2025 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Итоговый протокол', href: 'event.html' },
            { type: 'Фото', label: 'Фотоотчёт', href: 'event.html' },
            { type: 'Пресс-релиз', label: 'Итоги гонки', href: 'event.html' }
          ]
        },
        {
          year: '2024',
          title: 'Vologda Ski Classic 2024',
          date: '18 февраля 2024 г.',
          href: 'event.html',
          materials: [
            { type: 'Протокол', label: 'Итоговый протокол', href: 'event.html' },
            { type: 'Фото', label: 'Фотоотчёт', href: 'event.html' }
          ]
        }
      ]
    }
  ];

  const $seriesApp = $('#eventSeriesApp');

  if ($seriesApp.length) {
    function renderSeriesEditions(series, activeYear) {
      const editions = series.editions.filter((item) => activeYear === 'all' || item.year === activeYear);
      return editions.map((edition) => `
        <div class="series-edition">
          <div class="series-edition-head">
            <strong>${edition.year}</strong>
            <div><a href="${edition.href}">${edition.title}</a><span>${edition.date}</span></div>
          </div>
          <div class="series-edition-materials">
            ${edition.materials.map((material) => `<a href="${material.href}" class="series-material"><b>${material.type}</b>${material.label}</a>`).join('')}
          </div>
        </div>
      `).join('');
    }

    function renderSeries() {
      $seriesApp.html(eventSeries.map((series) => `
        <article class="series-card" data-series-id="${series.id}">
          <img class="series-image" src="${series.image}" alt="${series.title}">
          <div class="series-body">
            <span class="series-badge">Серия мероприятий</span>
            <h3>${series.title}</h3>
            <p>${series.description}</p>
            <span class="series-count">${series.editions.length} выпуска · ${Math.min(...series.editions.map((item) => +item.year))}–${Math.max(...series.editions.map((item) => +item.year))}</span>
            <button class="series-toggle ui-button secondary" type="button" aria-expanded="false">История выпусков</button>
          </div>
          <div class="series-history is-hidden">
            <div class="series-years" role="tablist">
              <button class="series-year is-active" type="button" data-year="all">Все годы</button>
              ${[...new Set(series.editions.map((item) => item.year))].map((year) => `<button class="series-year" type="button" data-year="${year}">${year}</button>`).join('')}
            </div>
            <div class="series-editions">${renderSeriesEditions(series, 'all')}</div>
          </div>
        </article>
      `).join(''));
    }

    $seriesApp.on('click', '.series-toggle', function () {
      const history = $(this).closest('.series-card').find('.series-history');
      const isOpen = !history.hasClass('is-hidden');
      history.toggleClass('is-hidden', isOpen);
      $(this).attr('aria-expanded', String(!isOpen)).text(isOpen ? 'История выпусков' : 'Свернуть');
    });

    $seriesApp.on('click', '.series-year', function () {
      const $card = $(this).closest('.series-card');
      const series = eventSeries.find((item) => item.id === $card.data('series-id'));
      $card.find('.series-year').removeClass('is-active');
      $(this).addClass('is-active');
      $card.find('.series-editions').html(renderSeriesEditions(series, String($(this).data('year'))));
    });

    renderSeries();
  }

  render();
});
