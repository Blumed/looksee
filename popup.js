$('.selector-styles button').on('click', function(){
    $('.selector-styles button').removeClass('is-active');
    $(this).addClass('is-active');
});
//var console = chrome.extension.getBackgroundPage().console;

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

// document.getElementById('borderererzzz').addEventListener('click', makeItSoNumberOne);
// document.getElementById('shaderererzzz').addEventListener('click', makeItSoNumberTwo);
// document.getElementById('bothemememzzz').addEventListener('click', makeItSoNumberThree);
document.getElementById('clear').addEventListener('click', removeClass);

var app = {
    init: function() {
        //Cache elements
        var customSelectors = document.getElementById('inputBorders'),
            customSelectorsInput = document.getElementById('submitBorders'),
            removeSelectorsBtn = document.getElementById('clear'),
            removeCustomeSelectors = "";

        //Adding Selectors
        chrome.runtime.sendMessage({ fn: "getSelector" }, function(response) {
           //console.log("got selector" + response.selector);
            if(response === "") {
               removeCustomeSelectors = response.selector;
               //console.log("you are here" + customSelectors.value);
            }
            else {
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
if($('.bordererer.is-active')){
    $('.selector-styles .selector-style.-shade, .selector-styles .selector-style.-both').addClass('is-hidden');
}

//Color Picker

    $('input.color').colorPicker({
        draggable: false
    });

var color    = $('#colorpicker').val();
    hexcolor = $('#hexcolor');
    hexcolor.html(color);
$('#colorpicker').on('change', function() {
    hexcolor.html(this.value);
});
