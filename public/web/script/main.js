/*\
|*| This file is mainly for update user's related information
|*|     - username|email|etc.
|*|     - personal translating history
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
        $("#personal .username").html(username);
    }

    /*
     * Display user email in personal_inf.html
     */
    var email = undefined;
    if (email = SubCookieUtil.get("login", "email")) {
        $(".inf_form .inf_right .emailAddress").html(email);
    }

})