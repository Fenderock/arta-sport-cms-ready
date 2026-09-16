$(function () {
  /* Manual partner carousel: touch swipe, mouse drag and side arrows. */
  const partnerTrack = document.querySelector('.partner-strip');
  if (partnerTrack) {
    const partnerCards = Array.from(partnerTrack.querySelectorAll('a'));
    let partnerDrag = null;
    let suppressPartnerClick = false;

    partnerTrack.querySelectorAll('a, img').forEach(function (element) {
      element.setAttribute('draggable', 'false');
    });

    document.querySelectorAll('[data-partner-scroll]').forEach(function (button) {
      button.addEventListener('click', function () {
        const firstCard = partnerCards[0];
        if (!firstCard) return;
        const gap = parseFloat(window.getComputedStyle(partnerTrack).gap) || 0;
        const direction = button.dataset.partnerScroll === 'prev' ? -1 : 1;
        partnerTrack.scrollBy({
          left: direction * (firstCard.getBoundingClientRect().width + gap),
          behavior: 'smooth'
        });
      });
    });

    partnerTrack.addEventListener('pointerdown', function (event) {
      if (event.button !== undefined && event.button !== 0) return;
      partnerDrag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startScroll: partnerTrack.scrollLeft,
        moved: false
      };
      suppressPartnerClick = false;
      partnerTrack.classList.add('is-dragging');
      partnerTrack.setPointerCapture(event.pointerId);
      if (event.pointerType === 'mouse') event.preventDefault();
    });

    partnerTrack.addEventListener('pointermove', function (event) {
      if (!partnerDrag || partnerDrag.pointerId !== event.pointerId) return;
      const deltaX = event.clientX - partnerDrag.startX;
      const deltaY = event.clientY - partnerDrag.startY;
      if (Math.abs(deltaX) < 4 && Math.abs(deltaY) < 4) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
      partnerDrag.moved = true;
      suppressPartnerClick = true;
      partnerTrack.scrollLeft = partnerDrag.startScroll - deltaX;
      if (event.cancelable) event.preventDefault();
    }, { passive: false });

    function finishPartnerDrag(event) {
      if (!partnerDrag || partnerDrag.pointerId !== event.pointerId) return;
      partnerDrag = null;
      partnerTrack.classList.remove('is-dragging');
      if (partnerTrack.hasPointerCapture(event.pointerId)) {
        partnerTrack.releasePointerCapture(event.pointerId);
      }
      const firstCard = partnerCards[0];
      if (firstCard) {
        const gap = parseFloat(window.getComputedStyle(partnerTrack).gap) || 0;
        const step = firstCard.getBoundingClientRect().width + gap;
        const target = Math.round(partnerTrack.scrollLeft / step) * step;
        window.requestAnimationFrame(function () {
          partnerTrack.scrollTo({ left: target, behavior: 'smooth' });
        });
      }
      window.setTimeout(function () {
        suppressPartnerClick = false;
      }, 0);
    }

    partnerTrack.addEventListener('pointerup', finishPartnerDrag);
    partnerTrack.addEventListener('pointercancel', finishPartnerDrag);
    partnerTrack.addEventListener('click', function (event) {
      if (!suppressPartnerClick) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
  }


});
