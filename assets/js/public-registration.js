/* All modal content and options are present in HTML. */
$(function(){
  var opener=null;
  function update(){
    var o=$('#publicEvent option:selected'),raw=o.attr('data-price'),known=!!raw,base=Number(raw),days=Math.ceil((new Date(o.attr('data-date'))-Date.now())/86400000),fee=days<14?900:days<30?400:0,promo=$('#publicPromo').val().trim().toUpperCase()==='ARTA10'?Math.round(base*.1):0;
    function money(v){return v.toLocaleString('ru-RU')+' ₽';}
    $('#publicBase').text(known?money(base):'Уточняется');$('#publicDateFee').text(known?money(fee):'Уточняется');$('#publicTotal').text(known?money(base+fee-promo):'Уточняется');
    $('#publicPay').text(known?'Оплатить '+money(base+fee-promo):'Стоимость уточняется').prop('disabled',!known||!$('#publicOffer').prop('checked')||!$('#publicPolicy').prop('checked'));
  }
  $('.js-public-register').on('click',function(e){e.preventDefault();e.stopPropagation();opener=this;$('#publicEvent').val($(this).attr('data-event'));$('#publicRegistrationForm').prop('hidden',false);$('#publicRegistrationNotice').prop('hidden',true);$('#modal').addClass('is-open').attr('aria-hidden','false');update();$('#publicEvent').trigger('focus');});
  function close(){$('#modal').removeClass('is-open').attr('aria-hidden','true');if(opener)opener.focus();}
  $('[data-close-modal]').on('click',close);$(document).on('keydown',function(e){if(e.key==='Escape')close();});
  $('#publicEvent,#publicPromo,#publicOffer,#publicPolicy').on('input change',update);
  $('#publicRegistrationForm').on('submit',function(e){e.preventDefault();$(this).prop('hidden',true);$('#publicRegistrationNotice').prop('hidden',false);});
});
