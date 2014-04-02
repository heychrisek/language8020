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

    $("#language-dropdown").select2();
    
    $("#page-dropdown").select2();

});