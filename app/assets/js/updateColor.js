
chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {
    document.getElementById('lookseeGlobalStyles').innerHTML = `.borderererzzz{outline-color:${response.color}}`;
});