//Adds debuggerer class
chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {
	//console.log(response.selector, response.style);
    $(response.selector).addClass(response.style).css({
        "outline-width": "1px",
        "outline-style": "solid",
        "outline-color": response.color
    });;

});
