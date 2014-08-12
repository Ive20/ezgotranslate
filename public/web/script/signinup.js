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
    /* Create formStatus Object to record the info. filled
     * IF info. wrong value = false
     * ELSE value = true
     */
    /* $begin formStatus */
    function formStatus() {
        this.acc = true;
        this.pass = true;
        this.email = true;
        this.remind = true;
    }
    /* $end formStatus */
    var signInForm = new formStatus();
    var signUpForm = new formStatus();
    /* Login */
    $("#signin").click(function () {
        var login = $(".container_in #signin-windows input");
        /* Clear error remind info. */
        if (!signInForm.remind) {
            $(".container_in #remove").remove();
            signInForm.remind = true;
        }
        //function checkForm(){}
        var acc = login[0].value;
        var pas = login[1].value;
        var jqxhr = $.post("/user/login",
            {
                username: acc,
                password: pas
            },
            function (data, status) {
                //alert("Status: " + status + "\nData: " + data);
                var errcode = data.errcode;
                //alert(errcode);
                if (errcode == 1) {
                    $("#signin").after("<span id = \"remove\">登陆失败</span>");
                    signInForm.remind = false;
                } else if (errcode == 0) {
                    /* Jump to private page */
                    $(".container_in").attr("style", "display: none;");
                    alert("Success");
                }
            },
        "json");
        jqxhr.fail(function () { alert("Request fail!"); });
        //alert(acc + "\n" + pas);
    })

    /* Register */
    $("#signup").click(function () {
        var register = $(".container_up #signin-windows input");
        /* Clear error remind info. */
        if (!signUpForm.remind) {
            $(".container_up #remove").remove();
            signUpForm.remind = true;
        }
        //checkForm(){}
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
                if (errcode == 1) {
                    $("#signup").after("<span id = \"remove\">注册失败</span>");
                    signUpForm.remind = false;
                } else if (errcode == 0) {
                    /* Jump to private page */
                    $(".container_up").attr("style", "display: none");
                    alert("Success");
                }
            },
            "json");
        jqxhr.fail(function () { alert("Request fail!") });
    });
})