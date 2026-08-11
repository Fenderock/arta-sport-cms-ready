$(function () {
  if (!$('body').hasClass('events-page')) return;

  let status = 'upcoming';
  const selected = { sport: 'all', year: 'all' };

  function render() {
    let visible = 0;

    $('#eventsPageGrid .event-card').each(function () {
      const card = $(this);
      const show = card.data('status') === status
        && (selected.sport === 'all' || card.data('sport') === selected.sport)
        && (selected.year === 'all' || String(card.data('year')) === selected.year);

      card.toggle(show);
      if (show) visible += 1;
    });

    $('#eventsResultTitle').text(status === 'upcoming' ? 'Предстоящие мероприятия' : 'Прошедшие мероприятия');
    $('#eventsResultCount').text(`Найдено: ${visible}`);
    $('#eventsPageGrid .empty').remove();
    if (!visible) $('#eventsPageGrid').append('<div class="empty">По выбранным фильтрам мероприятий нет.</div>');
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

  render();
});
