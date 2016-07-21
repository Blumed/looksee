//first time use - picks border as first style to use
if (!$('.selector-style.-border').hasClass('is-active')) {
    $('.bordererer').addClass('is-active');
}

function currentVisual() {
    var $stylez = $('.selector-style.-border, .selector-style.-shade, .selector-style.-both'),
        $bordered = $('.bordererer').hasClass('is-active'),
        $shaded = $('.shadererer').hasClass('is-active'),
        $bothed = $('.bothememem').hasClass('is-active'),
        $border = $('.selector-style.-border'),
        $shade = $('.selector-style.-shade'),
        $both = $('.selector-style.-both');

    //Wipe text clean before adding
    $stylez.addClass('is-hidden');

    if ($bordered) {
        $border.removeClass('is-hidden');
    }
    if ($shaded) {
        $shade.removeClass('is-hidden');
    }
    if ($bothed) {
        $both.removeClass('is-hidden');
    }
};
currentVisual();


$('.selector-styles button').on('click', function() {
    $('.selector-styles button').removeClass('is-active');
    $(this).addClass('is-active');
    currentVisual();
});

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
            removeSelectorsBtn = document.getElementById('clear'),
            removeCustomeSelectors = "";

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-80689849-1']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = 'https://ssl.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        })();

        //Adding Selectors
        chrome.runtime.sendMessage({ fn: "getSelector" }, function(response) {
            //console.log("got selector" + response.selector);
            if (response === "") {
                removeCustomeSelectors = response.selector;
                //console.log("you are here" + customSelectors.value);
            } else {
                customSelectors.value = response.selector;
                var currentStyle = $('button.is-active').attr('id');
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
            var currentStyle = $('button.is-active').attr('id');

            chrome.runtime.sendMessage({ fn: "setSelections", selector: customSelectors.value, style: currentStyle });
            //Runs contentscript so background respnonse will activate selectors on current page
            contentScript();
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
