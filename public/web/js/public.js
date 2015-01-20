

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

    //
    // This part is mainly for update user's related information
    //     - username|email|etc.
    //     - personal translating history
    //

    // Check whether login
    var getLoginCookie = SubCookieUtil.get("login", "state");
    if (getLoginCookie == null || getLoginCookie == "false") {
        console.log("main.js - Illegal login.");
        // window.location.href = "../index.html";
    }

    //
    // Display username in head
    //
    var username = undefined;
    if (username = SubCookieUtil.get("login", "username")) {
        $("#personal .username").html(username);
    }

    //
    // Display user email in personal-inf.html
    //
    var email = undefined;
    if (email = SubCookieUtil.get("login", "email")) {
        $(".inf_form .inf_right .emailAddress").html(email);
    }


    // Create formStatus Object to record the info. filled
    // IF info. wrong value = false
    // ELSE value = true
    //
    // Handle login event
    //
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
                    // Get user info and save to session
                    var user = {
                        username : acc,
                        email : data.email,
                        translate : data.translate,
                        sex : data.sex,
                        location : data.location,
                        nickname: data.nickname,
                        state : "true"
                    }
                    SubCookieUtil.setAll("login", user, null, "/");
                    // Jump to private page
                    window.location.href = "web/after-signin.html";
                }
            },
        "json");

        jqxhr.fail(function () {
            $("#signin_remind").empty().html("登陆失败");
            console.log("index.js - Login ajax problem.");
        });
    });

    // Handle register event
    //
    $("#signup").click(function () {
        var register = $(".container_up #signin-windows input");

        //checkForm(){}
        var acc = register[0].value;
        var email = register[1].value;
        var name = register[2].value;
        var pas = register[3].value;
        var confirmPas = register[4].value;    // Need confirm

        // Check whether hasuser
        var checkUsername = $.post("/user/hasuser",
            {
                username: acc
            },
            function(data, status) {
                var errcode = data.errcode;
                //
                // IF hasuser return false to stop excute $.post("user/register")
                //
                if(errcode == 1) {
                    $("#signup_remind").empty().html("用户名已注册");
                    console.log("hasuser");
                    return false;
                } else if (errcode == 0) {
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
                            // Jump to private page
                            //window.location.href = "web/after signin.html";
                            $("#signup_remind").empty().html("注册成功,请登陆");
                        }
                    },
                    "json");

                    jqxhr.fail(function () {
                        $("#signup_remind").empty().html("注册失败");
                        console.log("index.js - Register ajax problem.");
                    });
                }
            },
            "json");
        checkUsername.fail(function () {
            console.log("index.js - Hasuser ajax problem.");
        });
    });

    // Handle logout event
    //
    $("#personal .p_nav_last").click(function () {
       var jqxhr =  $.post("/user/logout",
            function (data, status) {
                var errcode = data.errcode;
                if (errcode == 1) {
                    alert("登出失败");
                } else {
                    SubCookieUtil.unsetAll("Login", "/");
                    window.location.href = "../index.html";
                }
            },
            "json");

       jqxhr.fail(function () {
           console.log("index.js - Logout failed");
       });
    });


});
