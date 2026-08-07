$(function () {
  if (!$('body').hasClass('events-page')) return;

  const events = [
    { title: 'VII этап МФЛРД 2026 — «С НАМИ ВСЕ». Тульская гонка друзей', sport: 'ski', sportName: 'Лыжероллеры', date: '2026-08-22', place: 'Тульская область, Лыжероллерный центр «Веденино»', status: 'upcoming', image: 'assets/images/diz1/imports/1440WLight/20d6faaf14e1d2458642b2028593187587031c0c.png' },
    { title: 'Туристический слет среди многодетных семей города Москвы', sport: 'multi', sportName: 'Спортивный фестиваль', date: '2026-08-23', place: 'Москва, ВАО', status: 'upcoming', image: 'assets/images/legacy/services/event-organization/event-1.jpg' },
    { title: '4 этап — «ТЫЩА В МЫТИЩАХ-2026» памяти Александра Толстых', sport: 'run', sportName: 'Легкая атлетика', date: '2026-08-26', place: 'Московская область, Мытищи, ул. Коминтерна, вл. 5', status: 'upcoming', image: 'assets/images/diz1/imports/1440WLight/6ffce6e4ee8939e1a96f476ecf2fdf47352d257d.png' },
    { title: '6-е любительские соревнования по маунтинбайку ЯСПОРТ ХС RACE 2026', sport: 'bike', sportName: 'Маунтинбайк', date: '2026-08-30', place: 'Московская область, Одинцовский городской округ, Парк Малевича', status: 'upcoming', image: 'assets/images/diz1/imports/1440WLight/453815ae6aaca94cfa7ba9935a5657c4abddffea.png' },
    { title: 'Гонки на лыжероллерах и роликовых коньках', sport: 'ski', sportName: 'Лыжероллеры', date: '2026-09-05', place: 'Архангельская область, д. Малые Карелы, л/с им. В. С. Кузина', status: 'upcoming', image: 'assets/images/diz1/imports/1440WLight/031d70ce4026a68e34bc8924b7b577f61fbe6ee4.png' },
    { title: 'Этап Фестиваля лыжероллерных дисциплин 2026', sport: 'ski', sportName: 'Лыжероллеры', date: '2026-09-05', place: 'Калужская область', status: 'upcoming', image: 'assets/images/legacy/services/event-organization/rollers.jpg' },
    { title: 'Гонка чемпионов', sport: 'ski', sportName: 'Лыжероллеры', date: '2026-10-17', place: 'Москва, ОБЛК «Юго-Восток», лыжероллерная трасса', status: 'upcoming', image: 'assets/images/legacy/services/event-organization/ski.jpg' },
    { title: '3 этап — «ТЫЩА В МЫТИЩАХ-2026» памяти Александра Толстых', sport: 'run', sportName: 'Легкая атлетика', date: '2026-07-08', place: 'Московская область, Мытищи, ул. Коминтерна, вл. 5', status: 'past', image: 'assets/images/diz1/imports/1440WLight/6ffce6e4ee8939e1a96f476ecf2fdf47352d257d.png' },
    { title: 'Семейный фестиваль #ЦБНАСПОРТЕ', sport: 'multi', sportName: 'Спортивный фестиваль', date: '2026-07-05', place: 'Москва, стадион «Воробьевы горы»', status: 'past', image: 'assets/images/legacy/services/event-organization/event-3.jpg' },
    { title: 'Чемпионат ФСО России по служебному двоеборью', sport: 'multi', sportName: 'Двоеборье', date: '2026-06-30', place: 'Московская область, Богородский городской округ, поселок Бисерово', status: 'past', image: 'assets/images/legacy/services/event-organization/biathlon.jpg' },
    { title: 'Соревнования по легкой атлетике в рамках «Мегаспартакиады — 2026»', sport: 'run', sportName: 'Легкая атлетика', date: '2026-06-28', place: 'Москва, ул. Лужники, 24, с. 8', status: 'past', image: 'assets/images/legacy/services/event-organization/athletics.jpg' },
    { title: 'Дуатлон в рамках дорожного этапа V Железнодорожных спортивных игр', sport: 'multi', sportName: 'Дуатлон', date: '2026-06-27', place: 'Москва, ОД-80', status: 'past', image: 'assets/images/diz1/imports/1440WLight/70709b4fe4f01449ab339feb2339804b4a1bdff2.png' },
    { title: '2 этап — «ТЫЩА В МЫТИЩАХ-2026» памяти Александра Толстых', sport: 'run', sportName: 'Легкая атлетика', date: '2026-06-24', place: 'Московская область, Мытищи, ул. Коминтерна, вл. 5', status: 'past', image: 'assets/images/diz1/imports/1440WLight/04d0e49637dd3340ccec361b074a85de3c5bff80.png' }
  ];

  let status = 'upcoming';
  const selected = { sport: 'all', year: 'all' };

  function formatDate(value) {
    return new Date(`${value}T12:00:00`).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function card(item) {
    const action = item.status === 'upcoming' ? '<a class="primary-btn" href="event.html">Подробнее</a>' : '<a class="primary-btn" href="event.html">Смотреть материалы</a>';
    return `<article class="event-card" data-event-href="event.html" role="link" tabindex="0"><img class="event-image" src="${item.image}" alt="${item.title}"><div class="event-body"><span class="event-badge">${item.sportName}</span><h3><a href="event.html">${item.title}</a></h3><div class="event-meta"><span>Дата: ${formatDate(item.date)}</span><span>Место: ${item.place}</span></div><div class="event-footer">${action}</div></div></article>`;
  }

  function render() {
    const filtered = events.filter((item) => item.status === status && (selected.sport === 'all' || item.sport === selected.sport) && (selected.year === 'all' || item.date.startsWith(selected.year)));
    $('#eventsResultTitle').text(status === 'upcoming' ? 'Предстоящие мероприятия' : 'Прошедшие мероприятия');
    $('#eventsResultCount').text(`Найдено: ${filtered.length}`);
    $('#eventsPageGrid').html(filtered.map(card).join('') || '<div class="empty">По выбранным фильтрам мероприятий нет.</div>');
  }

  $('.events-page .select-trigger').on('click', function (event) { event.stopPropagation(); const box = $(this).closest('.custom-select'); $('.custom-select').not(box).removeClass('is-open'); box.toggleClass('is-open'); });
  $('.events-page .select-options li').on('click', function () { const item = $(this); const box = item.closest('.custom-select'); selected[box.data('filter')] = String(item.data('value')); box.find('.select-trigger').text(item.text()); box.find('li').removeClass('is-selected'); item.addClass('is-selected'); box.removeClass('is-open'); render(); });
  $('.events-page .status-btn').on('click', function () { $('.events-page .status-btn').removeClass('is-active'); $(this).addClass('is-active'); status = $(this).data('status'); render(); });
  $(document).on('click', '.events-page .event-card', function (clickEvent) { if ($(clickEvent.target).closest('a, button, input, select, textarea, label').length) return; window.location.href = $(this).data('event-href') || 'event.html'; });
  $(document).on('keydown', '.events-page .event-card', function (keyEvent) { if (keyEvent.target !== this || (keyEvent.key !== 'Enter' && keyEvent.key !== ' ')) return; keyEvent.preventDefault(); window.location.href = $(this).data('event-href') || 'event.html'; });
  $(document).on('click', function () { $('.custom-select').removeClass('is-open'); });
  render();
});
