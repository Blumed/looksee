//Adds debuggerer class
chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {
	//console.log(response.selector);
    $(response.selector).addClass(response.style);
});