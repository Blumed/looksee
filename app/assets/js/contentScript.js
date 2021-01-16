//Adds debuggerer class
chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {
	//console.log(response.selector, response.style);
    if(response.selector !== ""){
        console.log(...response.style);
        Array.from(document.querySelectorAll(response.selector)).map(parts => parts.classList.add(...response.style));
    }

    if(document.getElementById('lookseeGlobalStyles') === null) {
        var style = document.createElement('style');
        style.id="lookseeGlobalStyles"
        style.innerHTML = `.borderererzzz{outline-color:${response.color};}`;
        document.body.appendChild(style);
    }
});
