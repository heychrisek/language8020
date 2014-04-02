$(function () {
    $('body').popover({
        selector: '[data-toggle="popover"]'
    });

    $('body').tooltip({
        selector: 'a[rel="tooltip"], [data-toggle="tooltip"]'
    });

    function format(language) {
        if (language.text === "Choose a language to study") return language.text;
        return '<img src="/assets/flags/' + language.id + '.png"> ' + language.text;
        // return "<img src='/assets/flags/ad.png'>"
    }

    $("#language-dropdown").select2({
        formatResult: format,
        formatSelection: format,
        escapeMarkup: function(m) { return m; }
    });
    
    $("#page-dropdown").select2();
});

var pjaxSetup = function(){
    $.pjax.defaults.scrollTo = false;
    $(document).pjax('a[data-pjax]', '[data-pjax-container]', {timeout: 2000});
}

$(document).ready(function(){
    pjaxSetup();
});