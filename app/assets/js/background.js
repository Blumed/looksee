var background = {
    selector: "",
    style: "",
    color: "#FF0000",
    hoverChecked: false,
    init: function() {

        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
                //listen to any messages, and route them to functions
                if(request.fn in background) {
                    background[request.fn](request, sender, sendResponse);
                }
            });

        chrome.tabs.onActivated.addListener(function(data) {

          chrome.tabs.executeScript(null, {
              file: 'assets/js/outliner.js'
          }, function() {
            if (chrome.runtime.lastError) {
               var errorMsg = chrome.runtime.lastError.message
               if (errorMsg == "Cannot access a chrome:// URL") {
                console.log('There is an internal Chrome url open. All other pages will excecute script.');
               }
            }
        });
        });

    },

    setSelections: function(request, sender, sendResponse) {
        // console.log('setting selectors', request.selector);
        // console.log('setting style', request.style);
        // console.log('setting matched', request.matched);
        this.selector = request.selector; 
        this.style = request.style; 
        this.color = request.color;
    },

    setColor: function(request, sender, sendResponse) {
        this.color = request.color;
    },

    getSelector: function(request, sender, sendResponse) {
        // console.log('getting selector', this.selector);
        // console.log('getting style', this.style);
        // console.log('getting matched', this.matched);
        sendResponse({selector: this.selector, style: this.style, color: this.color });
    }
    
}
chrome.storage.local.set({hoverChecked: false});

background.init();
