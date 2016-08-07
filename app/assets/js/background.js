var background = {
    selector: "",
    style: "",
    hoverChecked: false,
    init: function() {

        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
                //listen to any messages, and route them to functions
                if(request.fn in background) {
                    background[request.fn](request, sender, sendResponse);
                }
            });
    },

    setSelections: function(request, sender, sendResponse) {
    	console.log('setting selectors', request.selector);
        console.log('setting style', request.style);
        console.log('setting matched', request.matched);
        this.selector = request.selector;
        this.style = request.style;
    },

    getSelector: function(request, sender, sendResponse) {
        console.log('getting selector', this.selector);
        console.log('getting style', this.style);
        console.log('getting matched', this.matched);
        sendResponse({selector: this.selector, style: this.style });
    }
}

background.init();
