/*\
|*| This is file is mainly for exchanging translate   
|*| infomation - get info from server and insert into the 
|*| after_signin.html, content label - send info which user
|*| create to server.
\*/

/* verify login */
var getLoginCookie = SubCookieUtil.get("login", "state");
if (getLoginCookie == null || getLoginCookie == "false") {
    console.log("main.js Line 10. Illegal login.");
    window.location.href = "../index.html";
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
    console.log("Line 124. Getinfo error.");
})
/* $end after_signin.html dynamic content create */