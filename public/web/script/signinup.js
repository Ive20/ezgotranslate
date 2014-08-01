$(document).ready(function(){
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


    /*login*/
    $("#signin").click(function () {
        //function checkForm(){}
        var login = $(".container_in #signin-windows input");
        var acc = login[0].value;
        var pas = login[1].value;

        var jqxhr = $.post("/user/login",
            {
                username: acc,
                password: pas
            },
            function (data, status) {
                alert("Status: " + status + "\nData: " + data);
                var errcode = data.errcode;
                alert(errcode);
                if (errcode === 1) {
                    $("#signin").after("<span>登陆失败</span>");
                } else if (errcode === 0) {
                    //跳转到会员界面
                    alert("Success");
                }
            },
        "json");
        jqxhr.fail(function () { alert("Request fail!"); });
        //alert(acc + "\n" + pas);
    })

    /*register*/
    $("#signup").click(function () {
        //checkForm(){}
        var register = $(".container_up #signin-windows input");
        var acc = register[0].value;
        var email = register[1].value;
        var pas = register[3].value;

        var jqxhr = $.post("/user/register",
            {
                username: acc,
                password: pas,
                email: email
            },
            function (data, status) {
                alert("Status: " + status + "\nData: " + data);
                var errcode = data.errcode;
                alert(errcode);
                if (errcode === 1) {
                    $("#signup").after("<span>注册失败</span>");
                } else if (errcode === 0) {
                    //跳转到会员界面
                    alert("Success");
                }
            },
            "json");
        jqxhr.fail(function () { alert("Request fail!") });
        //Test
        //alert(acc + "\n" + pas + "\n" + email);
    });
})
