//Adds stylez to all elements in the body
chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {
	//console.log(response.selector, response.style);
    $('body *').addClass(response.style);
});