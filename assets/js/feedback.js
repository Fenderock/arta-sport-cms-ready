/* Shared feedback validation for the static preview. */
document.querySelectorAll('.feedback-form').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const status = form.querySelector('.feedback-status');
    if (!form.checkValidity()) {
      status.textContent = 'Заполните обязательные поля и подтвердите согласие.';
      form.reportValidity();
      return;
    }
    status.textContent = 'Это демонстрационная форма: сообщение не отправлено. Свяжитесь с нами по телефону или электронной почте.';
  });
});
