chrome.storage.local.get('hoverChecked', function(request) {
  checkHover(request);
});

function updateOutline(e) {
  var element = e.target,
      eW = element.clientWidth,
      eH = element.clientHeight,
      eX = element.getBoundingClientRect().left + window.scrollX,
      eY = element.getBoundingClientRect().top + window.scrollY,
      hover = className('looksee-hover'),
      tagName = element[0].tagName.toLowerCase(),
      idName = element.attr('id') ? '#' + element.attr('id') : '',
      className = function() {
        return element.attr('class') ? '.' + element.attr('class').replace(' ', '.') : '';
      },
      hoverText = tagName + idName + className();

  if(!element.hasClass('looksee-hover')) {
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
  e.target.classList.toggle('borderererzzz')
}

function checkHover(request) {
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