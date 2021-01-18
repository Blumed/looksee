chrome.storage.local.get('hoverChecked', function(request) {
  checkHover(request);
});

function updateOutline(e) {
  var $$ = $(e.toElement),
      eW = $$.outerWidth(),
      eH = $$.outerHeight(),
      eX = $$.offset().left,
      eY = $$.offset().top,
      hover = $('.looksee-hover'),
      tagName = $$[0].tagName.toLowerCase(),
      idName = $$.attr('id') ? '#' + $$.attr('id') : '',
      className = function() {
        return $$.attr('class') ? '.' + $$.attr('class').replace(' ', '.') : '';
      },
      hoverText = tagName + idName + className();

  if(!$$.hasClass('looksee-hover')) {
    hover.css({
      'top': eY,
      'left': eX,
      'width': eW,
      'height': eH
    });

    hover.find('span').text(hoverText);
  }
}

function toggleOutline(e) {
  e.preventDefault();
  $(e.toElement).toggleClass('borderererzzz');
}

function checkHover(request, sender, sendResponse) {
  if(request.hoverChecked) {
    $('body').append('<div class="looksee-hover"><span></span></div>');
    document.addEventListener('mouseover', updateOutline);
    $(document).bind('click', '*', toggleOutline);
  } 
  if (document.querySelector('.looksee-hover') !== null && !request.hoverChecked) {
    document.querySelector('.looksee-hover').remove();
    document.removeEventListener('mouseover', updateOutline);
    $(document).unbind('click');
  }
}