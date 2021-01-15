//Adds stylez to all elements in the body
chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {
	console.log(response.selector, response.style, response.color);
    $('body *').addClass(response.style).css({
        "outline-width": "1px",
        "outline-style": "solid",
        "outline-color": response.color
    });
});