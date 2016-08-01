//Adds debuggerer class
chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {
	//console.log(response.selector, response.style);
    $(response.selector).addClass(response.style);
});

//Adds debuggerer class
chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {
	//console.log(response.selector, response.style);
    $(response.selector).addClass(response.style);
});

chrome.storage.local.get('hoverChecked', function(request) {
  checkHover(request);
})

function updateOutline(e) {
  var $$ = $(e.toElement),
      eW = $$.outerWidth(),
      eH = $$.outerHeight(),
      eX = $$.offset().left,
      eY = $$.offset().top,
      hover = $('.hover'),
      tagName = $$[0].tagName.toLowerCase(),
      idName = $$.attr('id') ? '#' + $$.attr('id') : '',
      className = function() {
        return $$.attr('class') ? '.' + $$.attr('class').replace(' ', '.') : '';
      },
      hoverText = tagName + idName + className();

  if(!$$.hasClass('hover')) {
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
  
  chrome.storage.local.get('hoverChecked', function(request) {
    if(request.hoverChecked) {
      e.preventDefault();
      $(e.toElement).toggleClass('borderererzzz');
    }
  })
}

function checkHover(request, sender, sendResponse) {
  if(request.hoverChecked) {
    $('body').append('<div class="hover"><span></span></div>');
    document.addEventListener('mouseover', updateOutline);
    document.addEventListener('click', toggleOutline);
  } else {
    $('body').find('.hover').remove();
    document.removeEventListener('mouseover', updateOutline);
    document.removeEventListener('click', toggleOutline);
  }
}

chrome.runtime.onMessage.addListener(checkHover);
