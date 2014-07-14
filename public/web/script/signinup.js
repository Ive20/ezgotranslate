$(document).ready(function () {
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
    
});