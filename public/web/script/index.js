/*\
|*| This JS file is mainly to provide login|register|logout
|*| functions.
\*/

/*
 * includeJs() - include other Js doc
 */
function includeJs(path) {
    var sobj = document.createElement('script');
    sobj.type = "text/javascript";
    sobj.src = path;
    var headobj = document.getElementsByTagName('head')[0];
    headobj.appendChild(sobj);
}

/* Simulate success login via cookie */
includeJs("web/script/function.js");
if (SubCookieUtil.getAll("login") == null) {
    var login = {
        username: "reimondo",
        state: "false"
    }
    subCookieUtil.setAll("login", login);
} 

$(document).ready(function () {
    /* Create formStatus Object to record the info. filled
     * IF info. wrong value = false
     * ELSE value = true
     */
    /* Login */
    $("#signin").click(function () {
        var login = $(".container_in #signin-windows input");

        //function checkForm(){}
        var acc = login[0].value;
        var pas = login[1].value;

        var jqxhr = $.post("/user/login",
            {
                username: acc,
                password: pas
            },
            function (data, status) {
                var errcode = data.errcode;
                if (errcode == 1) {
                    $("#signin_remind").empty().html("登陆失败");
                } else if (errcode == 0) {
                    /* Get user info and save to session */
                    //Just for test.
                    SubCookieUtil.set("login", "state", "true");

                    /* Jump to private page */
                    window.location.href = "web/after signin.html";
                }
            },
        "json");

        jqxhr.fail(function () {
            $("#signin_remind").empty().html("登陆失败");
            console.log("Line 46. Ajax problem.");
        });
    })

    /* Register */
    $("#signup").click(function () {
        var register = $(".container_up #signin-windows input");

        //checkForm(){}
        var acc = register[0].value;
        var email = register[1].value;
        var name = register[2].value;
        var pas = register[3].value;
        var confirmPas = register[4].value;    //need confirm
        
        /* Check whether hasuser */
        var checkUsername = $.post("/user/hasuser",
            {
                username: acc
            },
            function(data, status) {
                var errcode = data.errcode;
                /*
                 * IF hasuser return false to stop excute $.post("user/register")
                 */
                if(errcode == 1) {
                    $("#signup_remind").empty().html("用户名已注册");
                    console.log("hasuser");
                    return false;
                }
            },
            "json");

        var jqxhr = $.post("/user/register",
            {
                username: acc,
                password: pas,
                email: email
            },
            function (data, status) {
                var errcode = data.errcode;
                if (errcode == 1) {
                    $("#signup_remind").empty().html("注册失败");
                } else if (errcode == 0) {
                    /* Jump to private page */
                    window.location.href = "web/after signin.html";
                }
            },
            "json");
        jqxhr.fail(function () {
            $("#signup_remind").empty().html("注册失败");
            console.log("Line 88. Ajax problem.");
        });
    })

    /* Logout */
    $("#personal .p_nav_last").click(function () {
       var jqxhr =  $.post("/user/logout",
            function (data, status) {
                var errcode = data.errcode;
                if (errcode == 1) {
                    alert("登出失败");
                } else {
                    subCookieUtil.set("login", state, "false");
                    window.location.href = "../index.html";
                }
            },
            "json");
        
       jqxhr.fail(function () {
           console.log("Line 97. Logout failed");
       })
    })

})