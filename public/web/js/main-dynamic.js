


$(document).ready(function () {

    //
    // This part for sign in or sign up
    //
    $(".container_in .switch").click(function () {
        $(".container_in").attr("style", "display:none;");
        $(".container_up").attr("style", "display:block;"); 
    });
    $(".container_up .switch").click(function () {
        $(".container_up").attr("style", "display:none;");
        $(".container_in").attr("style", "display:block;");
    });
    $(".close").click(function () {
        $(".container_in").attr("style", "display:none;");
        $(".container_up").attr("style", "display:none;");
    });
    $(".su").click(function () {
        $(".container_up").attr("style", "display:block;");
    });
    $(".si").click(function () {
        $(".container_in").attr("style", "display:block;");  
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
    $(".first_head").click(function () {
        $(".change_hp").css("display", "block");
        $(".change_inf").css("display", "none");
        $(".safety").css("display", "none");
        $(".first_head").css({
            "background-color": "#3f87eb",
            "color": "#fff"
        });
        $(".second_personal").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
        $(".last_safe").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
    });
    $(".second_personal").click(function () {
        $(".change_hp").css("display", "none");
        $(".change_inf").css("display", "block");
        $(".safety").css("display", "none");
        $(".second_personal").css({
            "background-color": "#3f87eb",
            "color": "#fff"
        });
        $(".first_head").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
        $(".last_safe").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
    });
    $(".last_safe").click(function () {
        $(".change_hp").css("display", "none");
        $(".change_inf").css("display", "none");
        $(".safety").css("display", "block");
        $(".last_safe").css({
            "background-color": "#3f87eb",
            "color": "#fff"
        });
        $(".second_personal").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
        $(".first_head").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
    });
});