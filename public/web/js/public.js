


$(document).ready(function () {

    //
    // This part for sign in or sign up
    //
    $(".container-signin .switch").click(function () {
        $(".container-signin").attr("style", "display:none;");
        $(".container-signup").attr("style", "display:block;"); 
    });
    $(".container-signup .switch").click(function () {
        $(".container-signup").attr("style", "display:none;");
        $(".container-signin").attr("style", "display:block;");
    });
    $(".close").click(function () {
        $(".container-signin").attr("style", "display:none;");
        $(".container-signup").attr("style", "display:none;");
    });
    $(".su").click(function () {
        $(".container-signup").attr("style", "display:block;");
    });
    $(".si").click(function () {
        $(".container-signin").attr("style", "display:block;");
    });

    //
    // When hover #personal, show personal-menu
    //
    $("#personal").hover(function () {
        $("#personal ul").show();
        $("#personal").css("background-color", "#3f87eb");
    },
    function () {
        $("#personal ul").hide();
        $("#personal").css("background-color", "#6babe9");
    });

    //
    //  For switch personal setting
    //
    $(".first-head").click(function () {
        $(".change-hp").css("display", "block");
        $(".change-inf").css("display", "none");
        $(".safety").css("display", "none");
        $(".first-head").css({
            "background-color": "#3f87eb",
            "color": "#fff"
        });
        $(".second-personal").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
        $(".last-safe").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
    });
    $(".second-personal").click(function () {
        $(".change-hp").css("display", "none");
        $(".change-inf").css("display", "block");
        $(".safety").css("display", "none");
        $(".second-personal").css({
            "background-color": "#3f87eb",
            "color": "#fff"
        });
        $(".first-head").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
        $(".last-safe").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
    });
    $(".last-safe").click(function () {
        $(".change-hp").css("display", "none");
        $(".change-inf").css("display", "none");
        $(".safety").css("display", "block");
        $(".last-safe").css({
            "background-color": "#3f87eb",
            "color": "#fff"
        });
        $(".second-personal").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
        $(".first-head").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
    });
});