//Adds debuggerer class
chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {

    if(response.selector !== ""){
        Array.from(document.querySelectorAll(response.selector)).map(parts => parts.classList.add(...response.style));
    }

    if(document.getElementById('lookseeGlobalStyles') === null) {
        const style = document.createElement('style');
        style.id="lookseeGlobalStyles"
        style.innerHTML = `.borderererzzz{outline-color:${response.color};}`;
        document.body.appendChild(style);
    }
});

