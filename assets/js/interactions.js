/* Static HTML enhancement only. No page templates, AJAX or HTML rendering. */
$(function () {
  'use strict';
  document.documentElement.classList.add('local-ui');
  function notice(message) {
    if ($('#toast').length) $('#toast').stop(true,true).text(message).fadeIn(150).delay(3500).fadeOut(200);
    else window.alert(message);
  }
  $('.search-btn').on('click', function () {
    $('.mobile-menu').addClass('is-open is-search-open');
    $('.menu-toggle').attr('aria-expanded','true');
    $('.mobile-search-form .search-input').trigger('focus');
  });
  $(window).on('scroll', function () { $('.site-header').toggleClass('is-scrolled',window.scrollY>30); });
  $('[data-scroll]').on('click', function () {
    var target=document.querySelector($(this).attr('data-scroll'));
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
  $('[data-open-modal="account"]').on('click',function(){window.location.href='lk.html';});
  $('[data-open-modal="video"]').on('click',function(){notice('Видео пока не добавлено.');});
  $('[data-open-modal="result"]').on('click',function(){window.location.href=$(this).closest('.event-card').attr('data-event-href')||'event.html';});
  $('.js-demo-form').on('submit', function () {
    if($(this).closest('[data-panel="reset"]').length) {
      $(this).find('.form-success').text('Локальная демонстрация: письмо не отправляется.');
    } else window.location.href='lk.html';
  });

  /* Filter existing event cards without rebuilding their content. */
  var grid=$('#eventsPageGrid').length?$('#eventsPageGrid'):$('#eventGrid');
  function filterCards() {
    if(!grid.length)return;
    var status=$('.status-btn.is-active').attr('data-status')||'upcoming';
    var count=0;
    grid.find('.event-card').each(function(){
      var card=$(this), matches=card.attr('data-status')===status;
      $('.custom-select[data-filter]').each(function(){
        var value=$(this).attr('data-current-value')||'all';
        if(value!=='all' && card.attr('data-'+$(this).attr('data-filter'))!==value)matches=false;
      });
      card.prop('hidden',!matches);
      if(matches)count++;
    });
    $('#'+grid.attr('id')+'Empty').prop('hidden',count!==0);
    $('#eventsResultTitle').text(status==='past'?'Прошедшие мероприятия':'Предстоящие мероприятия');
    $('#eventsResultCount').text('Найдено: '+count);
  }
  $('.select-trigger').on('click',function(event){event.stopPropagation();var box=$(this).closest('.custom-select');$('.custom-select').not(box).removeClass('is-open');box.toggleClass('is-open');});
  $('.select-options li').on('click',function(){
    var box=$(this).closest('.custom-select');
    box.attr('data-current-value',$(this).attr('data-value')).removeClass('is-open');
    box.find('.select-trigger').text($(this).text());box.find('li').removeClass('is-selected');$(this).addClass('is-selected');filterCards();
  });
  $('.status-btn').on('click',function(){$('.status-btn').removeClass('is-active');$(this).addClass('is-active');filterCards();});
  $(document).on('click',function(){$('.custom-select').removeClass('is-open');});
  var requested=new URLSearchParams(window.location.search).get('status');
  if(requested==='past'||requested==='upcoming'){$('.status-btn').removeClass('is-active').filter('[data-status="'+requested+'"]').addClass('is-active');}
  filterCards();
  $('.sport-card').on('click',function(){
    $('.custom-select[data-filter="sport"] .select-options li[data-value="'+$(this).attr('data-sport')+'"]').trigger('click');
  });
  $('.event-card[data-event-href]').on('click keydown',function(event){
    if(event.type==='click' && $(event.target).closest('a,button,input,select,textarea,label').length)return;
    if(event.type==='keydown' && (event.target!==this||!['Enter',' '].includes(event.key)))return;
    event.preventDefault();window.location.href=$(this).attr('data-event-href');
  });
  $('.series-toggle').on('click',function(){var panel=$(this).closest('.series-card').find('.series-history');var open=panel.hasClass('is-hidden');panel.toggleClass('is-hidden',!open);$(this).attr('aria-expanded',String(open)).text(open?'Свернуть':'История выпусков');});
  $('.series-year').on('click',function(){var card=$(this).closest('.series-card'),year=$(this).attr('data-year');card.find('.series-year').removeClass('is-active');$(this).addClass('is-active');card.find('.series-edition').each(function(){$(this).prop('hidden',year!=='all'&&$(this).attr('data-year')!==year);});});
  $('.participants-tab').on('click',function(){
    var group=$(this).attr('data-group'),number=0;$('.participants-tab').removeClass('is-active');$(this).addClass('is-active');
    $('.participant-row').each(function(){var show=group==='all'||$(this).attr('data-group')===group;$(this).prop('hidden',!show);if(show)$(this).find('.participant-num').text(++number);});
  });
  function tick(){
    $('[data-countdown]').each(function(){
      var remaining=new Date($(this).attr('data-countdown')).getTime()-Date.now();
      if(remaining<=0||$(this).attr('data-event-status')==='past'){$(this).text('Старт прошел');return;}
      var days=Math.floor(remaining/86400000),hours=Math.floor(remaining/3600000)%24,minutes=Math.floor(remaining/60000)%60,seconds=Math.floor(remaining/1000)%60;
      $(this).text(days+' дн '+[hours,minutes,seconds].map(function(n){return String(n).padStart(2,'0');}).join(':'));
    });
  }
  tick();window.setInterval(tick,1000);
  if(!$('body').hasClass('lk-page'))return;

  var scope='mine',opener=null;
  function setView(view){
    var panel=$('[data-view-panel]').filter(function(){return $(this).attr('data-view-panel')===view;});
    if(!panel.length)return;
    $('.side-link').removeClass('is-active').filter('[data-view="'+view+'"]').addClass('is-active');
    $('.view').removeClass('is-visible');panel.addClass('is-visible');$('body').removeClass('menu-open');
    if(location.hash!=='#'+view)location.hash=view;
  }
  $('.side-link[data-view],[data-view-target]').on('click',function(){setView($(this).attr('data-view')||$(this).attr('data-view-target'));});
  $(window).on('hashchange',function(){setView(location.hash.slice(1));});
  setView(location.hash.slice(1)||'profile');
  $('.menu-btn').on('click',function(){$('body').toggleClass('menu-open');});
  function filterCalendar(){
    var visible=0;
    $('#calendarList .event-row').each(function(){
      var row=$(this),show=(scope==='mine'?row.attr('data-paid')==='true':row.attr('data-paid')!=='true');
      [['sportFilter','sport'],['regionFilter','region'],['statusFilter','status']].forEach(function(pair){var value=$('#'+pair[0]).val();if(value!=='all'&&row.attr('data-'+pair[1])!==value)show=false;});
      row.prop('hidden',!show);if(show)visible++;
    });
    $('#calendarList .month-group').each(function(){$(this).prop('hidden',$(this).find('.event-row:not([hidden])').length===0);});
    $('.calendar-empty').prop('hidden',visible!==0);
  }
  $('#eventFilters select').on('change',filterCalendar);filterCalendar();
  $('[data-my-registrations],[data-potential-registrations]').on('click',function(event){
    if($(event.target).closest('[data-open-drawer]').length)return;
    scope=$(this).is('[data-potential-registrations]')?'potential':'mine';$('#sportFilter,#regionFilter').val('all');$('#statusFilter').val('upcoming');filterCalendar();setView('registrations');
  });
  $('[data-my-registrations],[data-potential-registrations]').on('keydown',function(event){
    if(event.target===this && (event.key==='Enter'||event.key===' ')){event.preventDefault();$(this).trigger('click');}
  });
  function openDrawer(key){
    var panel=$('[data-drawer-panel="'+key+'"]');if(!panel.length)return;
    opener=document.activeElement;$('.static-drawer-panel').prop('hidden',true);panel.prop('hidden',false);
    $('#drawerTitle').text(panel.attr('data-title'));$('#drawer').addClass('is-open').attr('aria-hidden','false');panel.find('input,select,button').first().trigger('focus');
  }
  function closeDrawer(){$('#drawer').removeClass('is-open').attr('aria-hidden','true');if(opener)opener.focus();}
  $('[data-open-drawer]').on('click',function(event){event.stopPropagation();openDrawer($(this).attr('data-open-drawer'));updatePrice();});
  $('[data-close-drawer]').on('click',closeDrawer);
  $(document).on('keydown',function(event){if(event.key==='Escape'){closeDrawer();$('body').removeClass('menu-open');}});
  function money(n){return Math.max(0,n).toLocaleString('ru-RU')+' ₽';}
  function updatePrice(){
    var event=$('#regEvent option:selected'),person=$('#regPerson option:selected'),base=Number(event.attr('data-price')),age=Number(person.attr('data-age'));
    var days=Math.ceil((new Date(event.attr('data-date'))-Date.now())/86400000),ageDiscount=age<14?-700:age>=60?-500:0,dateFee=days<14?900:days<30?400:0,promo=$('#regPromo').val().trim().toUpperCase()==='ARTA10'?-Math.round(base*.1):0;
    $('#regBase').text(money(base));$('#regAge').text((ageDiscount<0?'-':'')+money(Math.abs(ageDiscount)));$('#regDate').text('+'+money(dateFee));$('#regPromoValue').text((promo<0?'-':'')+money(Math.abs(promo)));$('#regTotal').text(money(base+ageDiscount+dateFee+promo));
    $('#payBtn').text('Оплатить '+money(base+ageDiscount+dateFee+promo)).prop('disabled',!($('#offerAgree').prop('checked')&&$('#policyAgree').prop('checked')));
  }
  $('#regEvent,#regPerson,#regPromo,#offerAgree,#policyAgree').on('input change',updatePrice);updatePrice();
  $(document).on('click','.js-register',function(){
    openDrawer('registration');if($(this).attr('data-event'))$('#regEvent').val($(this).attr('data-event'));$('#regPerson').val($(this).attr('data-child')||'self');updatePrice();
  });
  $(document).on('click','.js-transfer',function(){$('#transferEventName').text($(this).closest('.event-row').find('.event-title').text());openDrawer('transfer');});
  $('#insuranceUpload,#medicalUpload').on('change',function(){if(this.files[0]){$(this.id==='insuranceUpload'?'#insuranceFile':'#medicalFile').text(this.files[0].name+' · выбран локально');notice('Файл выбран. Для загрузки на сервер необходимо подключить обработчик.');}});
  $('[data-order-document]').on('click',function(){notice('Документ не включён в демонстрационные данные.');});
  $('#drawer form').on('submit',function(event){
    event.preventDefault();if(!this.reportValidity())return;
    if(this.id==='profileDrawerForm'){
      ['region','city','birth','club'].forEach(function(key){var v=$('#profileDrawerForm [name="'+key+'"]').val();$('[data-profile="'+key+'"]').text(key==='birth'&&v?v.split('-').reverse().join('.'):v||'Не указан');});
    }
    if(this.id==='passwordDrawerForm'){
      var inputs=$(this).find('input');if(inputs.eq(1).val()!==inputs.eq(2).val()){notice('Новые пароли не совпадают.');return;}
    }
    closeDrawer();notice('Локальная демонстрация: данные не отправляются, оплата и изменения на сервере не выполняются.');
  });
});
