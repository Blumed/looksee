//first time use - picks border as first style to use
if ($('input[type="checkbox"].checked' != false)) {
    $("#borderererzzz").prop("checked", true);
}

function makeItSoNumberOne() {
    chrome.tabs.executeScript({
        file: 'debuggerer.js'
    });
}

function makeItSoNumberTwo() {
    chrome.tabs.executeScript({
        file: 'shadererer.js'
    });
}

function contentScript() {
    chrome.tabs.executeScript({
        file: 'contentScript.js'
    });
}

function allElements() {
    chrome.tabs.executeScript({
        file: 'allElements.js'
    });
}

function removeClass() {
    chrome.tabs.executeScript({
        file: 'remove.js'
    });
}

document.getElementById('clear').addEventListener('click', removeClass);

var app = {
    init: function() {
        //Cache elements
        var customSelectors = document.getElementById('inputBorders'),
            customSelectorsInput = document.getElementById('submitBorders'),
            allSelectors = document.getElementById('bordersAll'),
            removeSelectorsBtn = document.getElementById('clear'),
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
                console.log(currentStyle);
                currentStyle = response.style;
            }

        });

        //Pressing Enter on input field triggers click
        $(customSelectors).on('keyup', function(e) {

            if (e.which == 13) {
                $(customSelectorsInput).trigger('click');
                return false;
            }

        });

        //Sends border or shader style to page
        customSelectorsInput.addEventListener('click', function() {
            //console.log('button click' + ' ' + customSelectors.value);

            var currentStyle = $('input[type="checkbox"]:checked').attr('id');

            chrome.runtime.sendMessage({ fn: "setSelections", selector: customSelectors.value, style: currentStyle });
            //Runs contentscript so background respnonse will activate selectors on current page
            contentScript();
        });

        //Sends border or shader style to all Elements on the page
        allSelectors.addEventListener('click', function() {
            //console.log('button click' + ' ' + customSelectors.value);
            var currentStyle = $('input[type="checkbox"]:checked').attr('id');

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
