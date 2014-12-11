/*\
|*| This JS file is mainly to save some useful functions
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

/*
 * Load js in body
 */
function loadScript(url){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}

/*
 * Load js snippet
 * - for DEBUG in Chrome console
 */
function loadScriptS(jsSnippets) {
    //var jsCode = "window.onload = function(){"
    //        + jsSnippets + "}";
    var jsCode = jsSnippets;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = jsCode;
    document.body.appendChild(script);
}

/*
 * Load css in head
 */
function loadStyles(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}

/* subCookieUtil object
 * - document.cookie=data=name=xxx&phone=123456
 */
var SubCookieUtil = {
    get: function (name, subName) {
        var subCookies = this.getAll(name);
        if (subCookies) {
            return subCookies[subName];
        } else {
            return null;
        }
    },

    getAll: function (name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd,
            subCookies,
            i, len,     // add self
            parts,
            result = {};

        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);

            if (cookieValue.length > 0) {
                subCookies = cookieValue.split("&");

                for (i = 0, len = subCookies.length; i < len; i++) {
                    parts = subCookies[i].split("=");
                    result[decodeURIComponent(parts[0])] =
                        decodeURIComponent(parts[1]);
                }

                return result;
            }
        }

        return null;
    },

    set: function (name, subName, value, expires, path, domain, secure) {
        var subcookies = this.getAll(name) || {};
        subcookies[subName] = value;
        this.setAll(name, subcookies, expires, path, domain, secure);
    },

    setAll: function (name, subcookies, expires, path, domain, secure) {

        var cookieText = encodeURIComponent(name) + "=",
            subcookieParts = [],
            subName;

        for (subName in subcookies) {
            if (subName.length > 0 && subcookies.hasOwnProperty(subName)) {
                subcookieParts.push(encodeURIComponent(subName) + "=" +
                    encodeURIComponent(subcookies[subName]));
            }
        }

        if (subcookieParts.length > 0) {
            cookieText += subcookieParts.join("&");

            if (expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
            }

            if (path) {
                cookieText += "; path=" + path;
            }

            if (domain) {
                cookieText += "; domain=" + domain;
            }

            if (secure) {
                cookieText += "; secure";
            }
        } else {
            cookieText += "; expires=" + (new Date(0)).toGMTString();
        }

        document.cookie = cookieText;
    },

    unset: function (name, subName, path, domain, secure) {
        var subcookies = this.getAll(name);
        if (subcookies) {
            delete subcookies[subName];
            this.setAll(name, subcookies, null, path, domain, secure);
        }
    },

    unsetAll: function (name, path, domain, secure) {
        this.setAll(name, null, new Date(0), path, domain, secure);
    }
};

/*
 * SubSessionUtil object
 */
