$(document).ready(function () {
    $("#personal").hover(function () {
        $("#personal ul").stop().slideDown();
    }
    , function () {
        $("#personal ul").stop().slideUp("fast");
    });
});