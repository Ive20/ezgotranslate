/*仅测试提交
*/
window.onload = function () {
    var submit = document.getElementById("signin");
    /*在网页中显示是否登陆成功
    */
    function showCode(code) {
        if (code == 1) {
            /*登陆失败*/

        } else if (code == 0) {
            /*登陆成功*/

        } else {
            /*看看解析是否正确*/
            alert("Parse error");
        }
    }
    /*在网页中显示服务器繁忙
    */
    function showSrvBusy() {

    }

    function getHTTPObject() {
        if (XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (ActiveXObject) {
            try { return new ActiveXObject("Msxml2.XMLHTTP"); }
            catch (e) { };
            try { return new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e) { };
        }
    }

    submit.onclick = function () {
        var signin = document.getElementById("signin-windows");
        var info = signin.getElementsByTagName("input");
        var account = info[0].value;
        var password = info[1].value;
        //alert(account+password);

        var httpRequest = getHTTPObject();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    var codeInJSON = httpRequest.responseText;
                    var code = JSON.parse(codeInJSON);
                    showCode(code.errcode);
                } else {
                    alert("Require invalid");
                }
            } else {
                //return Busy
                //showSrvBusy();
            }
        }
        httpRequest.open("POST", "user/login", true);
        /*enctype is text/plain*/
        httpRequest.setRequestHeader("Content-Type", "text\/plain");
        var data = "username:" + account + "\n" + "password:" + password;
        /*enctype is application/x-www-form-urlencoded or text/plain(default)*/
        //var data = "username:" + account + "&" + "password:" + password;
        httpRequest.send(data);
        return false;
    }
}
