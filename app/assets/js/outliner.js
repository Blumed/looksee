chrome.storage.local.get('hoverChecked', function(request) {
  checkHover(request);
});

function updateOutline(e) {
  const hoverElement = document.querySelector('.looksee-hover');
  const hoverElementText = document.querySelector('.looksee-hover span');
  let element = e.target,
      eW = element.clientWidth,
      eH = element.clientHeight,
      eX = element.getBoundingClientRect().left + window.scrollX,
      eY = element.getBoundingClientRect().top + window.scrollY,
      className = () => element.getAttribute('class') ? '.' + element.getAttribute('class').replace(' ', '.') : '',
      tagName = element.tagName.toLowerCase(),
      idName = element.getAttribute('id') ? '#' + element.getAttribute('id') : '',
      hoverText = tagName + idName + className();

  if(!element.classList.contains('looksee-hover')) {
    hoverElement.style.top = eY + 'px';
    hoverElement.style.left = eX + 'px';
    hoverElement.style.width = eW + 'px';
    hoverElement.style.height = eH + 'px';

    hoverElementText.innerHTML = hoverText;
  }
}

function toggleOutline(e) {
  e.preventDefault();
  e.target.classList.toggle('borderererzzz')
}

function checkHover(request) {
  if(request.hoverChecked) {
    document.body.innerHTML += '<div class="looksee-hover"><span></span></div>';
    document.addEventListener('mouseover', updateOutline);
    document.addEventListener('click', toggleOutline);
  } 
  if (document.querySelector('.looksee-hover') !== null && !request.hoverChecked) {
    document.querySelector('.looksee-hover').remove();
    document.removeEventListener('mouseover', updateOutline);
    document.removeEventListener('click');
  }
}