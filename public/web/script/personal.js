$(document).ready(function () {
    // presonal menu
    $("#personal").hover(function () {
        $("#personal ul").stop().slideDown();
    }
    , function () {
        $("#personal ul").stop().slideUp("fast");
    });

    // personal setting
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