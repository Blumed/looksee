// Standard Google Universal Analytics code
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-81115441-1']);
_gaq.push(['_trackPageview', '/options.html']);

var console = chrome.extension.getBackgroundPage().console;

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();


var console = chrome.extension.getBackgroundPage().console;

function contentScript() {
    chrome.tabs.executeScript({
        file: 'assets/js/contentScript.js'
    });
}

function allElements() {
    chrome.tabs.executeScript({
        file: 'assets/js/allElements.js'
    });
}

function removeClass() {
    chrome.tabs.executeScript({
        file: 'assets/js/remove.js'
    });
}

function addHover() {
    chrome.tabs.executeScript({
        file: 'assets/js/outliner.js'
    });
}

function updateColor() {
    chrome.tabs.executeScript({
        file: 'assets/js/updateColor.js'
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

        //Retrieve existing settings
        $('*:checkbox').each(function(index, element) {
            var name = this.name;
            storage.get(name, function(items) {
                element.checked = items[name]; // true  OR  false / undefined (=false)
            });
        });

        $('*:checkbox').on('change', saveSettings);

        //Save or delete settings
        function saveSettings() {
            var name = this.name;
            var items = {};
            items[name] = this.checked;
            storage.set(items, function() {
                // console.log("saved");
            });

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
            //console.log("got selector" + response.selector);
            if (response === "") {
                removeCustomeSelectors = response.selector;
                noMatches = response.matched;
                //console.log("you are here" + customSelectors.value);
            } else {
                // var currentStyle = $('input[type="checkbox"]:checked').attr('id');
                // console.log(currentStyle + '  ' + response.color );
                customSelectors.value = response.selector;
                currentStyle = response.style;
                getColor.value = response.color;
            }
        });
        

        //Pressing Enter on input field triggers click
        $(customSelectors).on('keyup', function(e, customSelectors) {
            if (e.which == 13) {
                $(customSelectorsInput).trigger('click');
                return false;
            }
        });

        //Pressing Enter on input checkbox field triggers click
        $('input[type="checkbox"]').on('keyup', function(e, toggleShaders) {
            if (e.which == 13) {
                $('input[type="checkbox"]').trigger('click');
                return false;
            }
        });

        //Sends border or shader style to page
        customSelectorsInput.addEventListener('click', function() {
            //console.log('button click' + ' ' + customSelectors.value);

            //iterates over checkbox and grabs the checked ones and puts them in a string inside of the array
            var currentStyle = [];
            $('.feature-styles input[type="checkbox"]:checked').each(function() {
                currentStyle.push($(this).attr('id'));
            });

            var matched = "";
            chrome.runtime.sendMessage({ fn: "setSelections", selector: customSelectors.value, style: currentStyle, data: matched, color: getColor.value });
            //Runs contentscript so background respnonse will activate selectors on current page
            contentScript();

        });

        //Sends border or shader style to all Elements on the page
        allSelectors.addEventListener('click', function() {
            // console.log('button click' + ' ' + customSelectors.value + ' ' + getColor.value);
            removeSelectorsBtn.focus();

            //iterates over checkbox and grabs the checked ones and puts them in a string inside of the array
            var currentStyle = [];
            $('.feature-styles input[type="checkbox"]:checked').each(function() {
                currentStyle.push($(this).attr('id'));
            });

            chrome.runtime.sendMessage({ fn: "setSelections", selector: customSelectors.value, style: currentStyle, color:  getColor.value });
            //Runs allElements script so background respnonse will activate selectors on current page
            allElements();
        });

        // Update Color when color picker is used
        getColor.addEventListener('change', function() {
            chrome.runtime.sendMessage({ fn: "setColor", color: getColor.value });
            updateColor();
        });

        //Grab color and update global css element  when popup opens.
        updateColor();

        //Removing Selectors
        removeSelectorsBtn.addEventListener('click', function() {
            //Need to clear input field
            // console.log('Clear was clicked');
            customSelectors.value = "";
            customSelectors.focus();
            var currentStyle = $('button.is-active').attr('id');
            //console.log('button click' + ' ' + customSelectors.value);
            chrome.runtime.sendMessage({ fn: "setSelections", selector: removeCustomeSelectors, style: currentStyle, color: getColor.value });
            // console.log('clear clicked');

            //Runs contentscript so background respnonse will activate selectors on current page
            removeClass();
        });

    }
}

app.init();

//Tracking Events on Buttons and Inputs
function trackButtonClicked(e) {
    _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};
var trackingSelectors = document.querySelectorAll('button, input');
for (var i = 0; i < trackingSelectors.length; i++) {
    trackingSelectors[i].addEventListener('click', trackButtonClicked);
}
