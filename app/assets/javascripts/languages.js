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

var checkLanguageSelection = function(){
  languageCode = $("#s2id_language-dropdown").select2("val");
  numWords = $($(".select2-chosen")[1]).text();
  if (languageCode != "" && numWords != "Per page") {
    $("#show-words").removeClass("disabled");
  } else {
    $("#show-words").addClass("disabled");
  }
};

var bindLanguageSubmitButton = function(){
    $("body").on("change", "#homepage", checkLanguageSelection);
}


$(document).ready(function(){
    pjaxSetup();
    bindLanguageSubmitButton();
});
