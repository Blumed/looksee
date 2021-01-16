//Adds stylez to all elements in the body
chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {
	//  console.log(response.selector, response.style, response.color);
    Array.from(document.querySelectorAll('body *')).map(parts => parts.classList.add(...response.style));

});