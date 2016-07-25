// Standard Google Universal Analytics code
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-81115441-1']);
_gaq.push(['_trackPageview']);

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

document.getElementById('clearButton').addEventListener('click', removeClass);

var app = {
    init: function() {
        //Cache elements
        var customSelectors = document.getElementById('inputBorders'),
            customSelectorsInput = document.getElementById('submitBorders'),
            toggleShaders = document.getElementById('shaderererzzz'),
            allSelectors = document.getElementById('bordersAll'),
            removeSelectorsBtn = document.getElementById('clearButton'),
            removeCustomeSelectors = "";


        //Adding Selectors
        chrome.runtime.sendMessage({ fn: "getSelector" }, function(response) {
            //console.log("got selector" + response.selector);
            if (response === "") {
                removeCustomeSelectors = response.selector;
                //console.log("you are here" + customSelectors.value);
            } else {
                customSelectors.value = response.selector;

                var currentStyle = $('input[type="checkbox"]:checked').attr('id');
                //console.log(currentStyle);
                currentStyle = response.style;
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
            chrome.runtime.sendMessage({ fn: "setSelections", selector: customSelectors.value, style: currentStyle });
            //Runs contentscript so background respnonse will activate selectors on current page
            contentScript();
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