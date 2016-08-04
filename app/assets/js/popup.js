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

//first time use - picks border as first style to use
if ($('input[type="checkbox"].checked' != false)) {
    $("#borderererzzz").prop("checked", true);
}
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

function hoverItUp() {
  chrome.tabs.executeScript({
    file: 'assets/js/outliner.js'
  });
}

document.getElementById('clearButton').addEventListener('click', removeClass);

var app = {
    hoverChecked: false,
    init: function() {
        //Cache elements
        var customSelectors = document.getElementById('inputBorders'),
            customSelectorsInput = document.getElementById('submitBorders'),
            toggleShaders = document.getElementById('shaderererzzz'),
            allSelectors = document.getElementById('bordersAll'),
            hoverToggle = document.getElementById('hoverToggle'),
            matchedResults = document.getElementById('matchedResults'),
            removeSelectorsBtn = document.getElementById('clearButton'),
            removeCustomeSelectors = "";
            noMatches = "None";

        // check hover toggle
        this.hoverChecked = hoverToggle.checked;

        // hover toggle event listener
        hoverToggle.addEventListener('change', function() {
            // store checked state
            hoverChecked = this.checked;

            // close window if hover is checked
            if(hoverChecked) window.close();

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
            hoverItUp();
        });

        // check and set hover toggle state
        chrome.storage.local.get('hoverChecked', function(result) {
            result.hoverChecked ? hoverToggle.checked = true : hoverToggle.checked = false;
        });

        //Adding Selectors
        chrome.runtime.sendMessage({ fn: "getSelector" }, function(response) {
            //console.log("got selector" + response.selector);
            if (response === "") {
                removeCustomeSelectors = response.selector;
                noMatches = response.matched;
                //console.log("you are here" + customSelectors.value);
            } else {
                customSelectors.value = response.selector;
                var currentStyle = $('input[type="checkbox"]:checked').attr('id');
                //console.log(currentStyle);
                currentStyle = response.style;
                // let count = $(response.selector).length;
                // console.log(count);
                // count = response.matched;
                // $(matchedResults).text(count);
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
            //turn array into a string
            currentStyle = currentStyle.toString();
            //remove array comma and replace with space
            currentStyle = currentStyle.replace(/,/g, " ");
            //console.log(currentStyle);
            var matched = "";
            chrome.runtime.sendMessage({ fn: "setSelections", selector: customSelectors.value, style: currentStyle, data: matched });
            //Runs contentscript so background respnonse will activate selectors on current page
            contentScript();

           chrome.runtime.sendMessage({ fn: "getSelector" } , function(response) {
                        let matched = $(response.selector).length;
                        $(matchedResults).text(matched);
            });




        });

        //Sends border or shader style to all Elements on the page
        allSelectors.addEventListener('click', function() {
            //console.log('button click' + ' ' + customSelectors.value);
            removeSelectorsBtn.focus();

            //iterates over checkbox and grabs the checked ones and puts them in a string inside of the array
            var currentStyle = [];
            $('.feature-styles input[type="checkbox"]:checked').each(function() {
                currentStyle.push($(this).attr('id'));
            });
            //turn array into a string
            currentStyle = currentStyle.toString();
            //remove array comma and replace with space
            currentStyle = currentStyle.replace(/,/g, " ");

            chrome.runtime.sendMessage({ fn: "setSelections", selector: customSelectors.value, style: currentStyle });
            //Runs allElements script so background respnonse will activate selectors on current page
            allElements();
        });

        //Removing Selectors
        removeSelectorsBtn.addEventListener('click', function() {
            //Need to clear input field
            // console.log('Clear was clicked');
            customSelectors.value = "";
            customSelectors.focus();
            var currentStyle = $('button.is-active').attr('id');
            //console.log('button click' + ' ' + customSelectors.value);
            chrome.runtime.sendMessage({ fn: "setSelections", selector: removeCustomeSelectors, style: currentStyle });
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
