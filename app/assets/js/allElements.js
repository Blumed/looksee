//Adds stylez to all elements in the body
chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {
    Array.from(document.querySelectorAll('body *')).map(parts => parts.classList.add(...response.style));
});