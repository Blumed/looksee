function contentScript() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let tabId = tabs[0];
        chrome.scripting.executeScript({
            files: ['assets/js/contentScript.js'],
            target: {tabId: tabId.id}
        });
    });
}

function allElements() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let tabId = tabs[0];
        chrome.scripting.executeScript({
            files: ['assets/js/allElements.js'],
            target: {tabId: tabId.id}
        });
    });
}

function removeClass() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let tabId = tabs[0];
        chrome.scripting.executeScript({
            files: ['assets/js/remove.js'],
            target: {tabId: tabId.id}
        });
    });
}

function addHover() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let tabId = tabs[0];
        chrome.scripting.executeScript({
            files: ['assets/js/outliner.js'],
            target: {tabId: tabId.id}
        });
    });
}

function updateColor() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let tabId = tabs[0];
        chrome.scripting.executeScript({
            files: ['assets/js/updateColor.js'],
            target: {tabId: tabId.id}
        });
    });
}

document.getElementById('clearButton').addEventListener('click', removeClass);

var app = {
    init: function() {
        //Cache elements
        var customSelectors = document.getElementById('inputBorders'),
            customSelectorsInput = document.getElementById('submitBorders'),
            toggleShaders = document.getElementById('shaderererzzz'),
            allSelectors = document.getElementById('bordersAll'),
            getColor = document.getElementById('colorPicker'),
            hoverToggle = document.getElementById('hoverToggle'),
            matchedResults = document.getElementById('matchedResults'),
            removeSelectorsBtn = document.getElementById('clearButton'),
            storage = chrome.storage.local,
            removeCustomeSelectors = "",
        noMatches = "None";
        const checkBoxes = document.querySelectorAll('input[type="checkbox"]');

        //Retrieve existing settings
        checkBoxes.forEach((element) => {
            const name = element.name
            storage.get(name, function(items) {
                element.checked = items[name]; // true  OR  false / undefined (=false)
            });
            element.addEventListener('change', () => saveSettings(element))
        });
        
        // //Save or delete settings
        function saveSettings(element) {
            let name = element.name;
            let items = {};
            items[name] = element.checked;
            storage.set(items);
        }

        // check hover toggle
        this.hoverChecked = hoverToggle.checked;

        // hover toggle event listener
        hoverToggle.addEventListener('change', function() {
            // store checked state
            hoverChecked = this.checked;

            // close window if hover is checked
            if (hoverChecked){
                window.close();
            }

            //set hover state in chrome local storage
            chrome.storage.local.set({
                hoverChecked: hoverChecked
            });

            // send hover state
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    hoverChecked: hoverChecked
                });
            });

            // fire outliner
            addHover();
        });

        //Adding Selectors
        chrome.runtime.sendMessage({ fn: "getSelector" }, function(response) {
            if (response === "") {
                removeCustomeSelectors = response.selector;
                noMatches = response.matched;
            } else {
                customSelectors.value = response.selector;
                currentStyle = response.style;
                getColor.value = response.color;
            }
        });
        
        //Pressing Enter on input field triggers click
        customSelectors.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                customSelectorsInput.click();
                return false;
            }
        });

        /* This is broken and needs to be fixed */
        //Pressing Enter on input checkbox field triggers click
        // $('input[type="checkbox"]').on('keyup', function(e, toggleShaders) {
        //     if (e.which == 13) {
        //         $('input[name="checkbox"]').trigger('click');
        //         return false;
        //     }
        // });

        //Sends border or shader style to page
        customSelectorsInput.addEventListener('click', () => {
            //iterates over checkbox and grabs the checked ones and puts them in a string inside of the array
            let currentStyle = [];
            document.querySelectorAll('.feature-styles input[type="checkbox"]:checked').forEach(element => {
                currentStyle.push(element.id);
            })

            var matched = "";
            chrome.runtime.sendMessage({ fn: "setSelections", selector: customSelectors.value, style: currentStyle, data: matched, color: getColor.value });
            //Runs contentscript so background response will activate selectors on current page
            contentScript();

        });

        //Sends border or shader style to all Elements on the page
        allSelectors.addEventListener('click', () => {
            removeSelectorsBtn.focus();

            //iterates over checkbox and grabs the checked ones and puts them in a string inside of the array
            let currentStyle = [];
            document.querySelectorAll('.feature-styles input[type="checkbox"]:checked').forEach(element => {
                currentStyle.push(element.id);
            })

            chrome.runtime.sendMessage({ fn: "setSelections", selector: customSelectors.value, style: currentStyle, color:  getColor.value });
            //Runs allElements script so background response will activate selectors on current page
            allElements();
        });

        // Update Color when color picker is used
        getColor.addEventListener('change', () => {
            chrome.runtime.sendMessage({ fn: "setColor", color: getColor.value });
            updateColor();
        });

        //Grab color and update global css element  when popup opens.
        updateColor();

        //Removing Selectors
        removeSelectorsBtn.addEventListener('click', () => {
            //Need to clear input field
            customSelectors.value = "";
            customSelectors.focus();
            
            let currentStyle = [];
            document.querySelectorAll('.feature-styles input[type="checkbox"]:checked').forEach(element => {
                currentStyle.push(element.id);
            })

            chrome.runtime.sendMessage({ fn: "setSelections", selector: removeCustomeSelectors, style: currentStyle, color: getColor.value });

            //Runs contentscript so background response will activate selectors on current page
            removeClass();
        });

    }
}

app.init();
