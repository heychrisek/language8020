$(function () {
    $('body').popover({
        selector: '[data-toggle="popover"]'
    });

    $('body').tooltip({
        selector: 'a[rel="tooltip"], [data-toggle="tooltip"]'
    });

    function format(language) {
        if (language.id === "") return language.text;
        return '<img src="/assets/flags/' + language.id + '.png"> ' + language.text;
    }

    $("#language-dropdown").select2({
        formatResult: format,
        formatSelection: format,
        escapeMarkup: function(m) { return m; }
    });
    
    $("#page-dropdown").select2();
    
    $("#nav-language-dropdown").select2();
});

var pjaxSetup = function(){
    $.pjax.defaults.scrollTo = false;
    $(document).pjax('a[data-pjax]', '[data-pjax-container]', {timeout: 2000});
    $(document).on("click", "a[data-pjax]", function(){
        $("#outer-background-container").fadeOut();
    });
};

$(document).ready(function(){
    pjaxSetup();
});

// for background image changing

// $.ajax({
//     url: img-url;
//     success: function(){
//         #outer-background-container.fadeOut();
//         #outer-background-container.fadeIn();
//     };
// });