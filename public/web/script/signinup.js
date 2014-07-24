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
    

    /*Submit*/
    $("#signin").click(function () {
        var login = $("div#signin-windows input");
        var acc = login[0].value;
        var pas = login[1].value;

        $.post("/user/login",
            {
                username: acc,
                password: pas
            },
        function(data){
            var errcode = data.errcode;
            if (errcode === 1) {
                $("#signin").after("<span>登陆失败</span>");
            } else if (errcode === 0) {
                //跳转到会员界面
            }
        },
        "json");
        //alert(acc + "\n" + pas);
    })
});