/*\
|*| This is file is mainly for exchanging translate   
|*| infomation - get info from server and insert into the 
|*| after_signin.html, content label - send info which user
|*| create to server.
\*/

$(document).ready(function () {
    /* verify login */
    var getLoginCookie = SubCookieUtil.get("login", "state");
    if (getLoginCookie == null || getLoginCookie == "false") {
        console.log("main.js - Illegal login.");
        //window.location.href = "../index.html";
    }

    /*
     * Display username in head
     */
    var username = undefined;
    if (username = SubCookieUtil.get("login", "username")) {
        $("#personal .classname").html(username);
    }

    /*
     * Display user email in personal_inf.html
     */
    var email = undefined;
    if (email = SubCookieUtil.get("login", "email")) {
        $(".info_form .inf_right .emailAddress").html(email);
    }

    /* $begin after_signin.html dynamic content create */
    var getinfo = $.post("/info/getinfo",
        function (data, status) {
            var info = JSON.parse(data);
            var index = undefined;
            for (index in info) {
                var theObject = info[index];
                //more funtion code write here
                console.log(theObject.info_content);
            }
        }
        , "json");

    getinfo.fail(function () {
        console.log("main.js - Getinfo error.");
    })
    /* $end after_signin.html dynamic content create */
})