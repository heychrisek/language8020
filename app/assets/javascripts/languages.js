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

// Allow browsing words without refreshing the page

var paginate = function(id, page, perPage, callback) {
    $.getScript( "/languages/" + id + "/words?page=" + page + "&per_page=" + perPage, callback);
};

var bindNextAndPreviousLinks = function(){
    $('body').on('click', '.next-link', function(e){
        e.stopPropagation();
        e.preventDefault();
        paginate(languageID, page + 1, perPage, function(){$('.display-words').html(divString)});
    })
    $('body').on('click', '.previous-link', function(e){
        e.stopPropagation();
        e.preventDefault();
        paginate(languageID, page - 1, perPage, function(){$('.display-words').html(divString)});
    })
};

$(document).ready(function(){
    bindNextAndPreviousLinks();
});