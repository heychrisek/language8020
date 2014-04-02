// $.getScript( languageID + "/words", function( data, textStatus, jqxhr ) {
//   console.log( data ); // Data returned
//   console.log( textStatus ); // Success
//   console.log( jqxhr.status ); // 200
//   console.log( "Load was performed." );
// });


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