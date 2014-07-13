/*仅测试提交
*/


window.onload = function () {
    var submit = document.getElementById("signin");
    /*处理返回值
    */
    function process(code) {

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
                    var code = httpRequest.responseText;
                    //Test
                    //alert(code);
                } else {
                    //return Error
                }
            } else {
                //return Busy
            }
        }
        httpRequest.open("OPEN", "user/login", true);
        var data = "username:" + account + "&" + "password:" + password;
        httpRequest.send(data);
        //process(code);
        return false;
    }
}
