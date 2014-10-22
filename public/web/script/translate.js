/*\
|*| This is file is mainly for exchanging translate   
|*| infomation - get info from server and insert into the 
|*| after_signin.html, content label - send info which user
|*| create to server.
\*/

$(document).ready(function () {

    /* $begin after_signin.html dynamic content create */
    var getinfo = $.post("/info/getinfo",
        function (data, status) {
            var index = undefined;
            for (index in data) {
                var theObject = data[index];
                //more funtion code write here
                console.log(theObject.info_content);
            }
        }
        , "json");

    getinfo.fail(function () {
        console.log("translate.js - Getinfo error.");
    })
    /* $end after_signin.html dynamic content create */
})