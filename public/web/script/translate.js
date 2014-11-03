/*\
|*| This is file is mainly for exchanging translate   
|*| infomation - get info from server and insert into the 
|*| after_signin.html, content label - send info which user
|*| create to server.
\*/

/*
 * About interface design
 *  1, gettranslate {info_id} return related_translated_info
 */

/* Get translate info and save to sessionStorage */
function getInfo() {
    var getinfo = $.post("/info/getinfo",
        function (data, status) {
            sessionStorage.setItem("transInfo", JSON.stringify(data));
        }
        , "json");

    getinfo.fail(function () {
        console.log("translate.js - Getinfo error.");
    });
}

/* Get translated info and save to sessionStorage */
function getTranslated() {
    var getTranslated = $.post("/translate/gettranslate",
    function (data, status) {
        /* Emulated get the specific translated */
        sessionStorage.setItem("translated", JSON.stringify(data));
    }
    , "json");

    getTranslated.fail(function () {
        console.log("translate.js - Get translated info error.")
    });
}

/*
 * If ID's info has translated THEN return ID's Object ELSE return false
 * COMMENT: Am not sure whether this has bug
 */
function hasTranslated(infoID) {
    // Must refresh brefore find translated
    // #BUG Here, there must be many request
    //getTranslated();

    var translatedSession = sessionStorage.getItem("translated");
    var translated = JSON.parse(translatedSession);

    var index = undefined;
    for (index in translated) {
        var theObject = translated[index];
        if (theObject.info_id === infoID)
            return theObject;
    }

    return false;
}

function displayTranlatedInfo(infoID) {
        var theTargetID = "#" + infoID + " .translated";
        var theTranslated = $(theTargetID);

        var theObject = hasTranslated(infoID);
        if (theObject) {
            theTranslated.html(theObject.translate_result);
        }
}

function createInfoLine(objectToDisplay, msgCount) {
    var infoID = objectToDisplay.info_id;
    var infoContent = objectToDisplay.info_content;
    var infoLanguage = objectToDisplay.info_language;
    var updatedAt = objectToDisplay.updated_at;
    var createdAt = objectToDisplay.created_at;

    /* Get the tag <div class="info_block"> to insert new info line */
    var theInfoBlock = $(".info_block");

    var infoLine = '<div id="' + infoID + '" class="info_line"></div>';
    theInfoBlock.append(infoLine);

    var infoIDForjQuerySelector = infoID.replace(/\./g, '\\.');
    var theInfoLineToWrite = $("#" + infoIDForjQuerySelector);

    var lineNumbers = '<div class="line_numbers">' + msgCount + '</div>';
    theInfoLineToWrite.append(lineNumbers);

    var lineTranslated = '<div class="line_translate">' + infoContent + '</div>';
    theInfoLineToWrite.append(lineTranslated);

    var translated = '<div class="translated"></div>';
    theInfoLineToWrite.append(translated);
    displayTranlatedInfo(infoID);
    
    var ifTranslated = '<div class="if_translated"></div>';
    theInfoLineToWrite.append(ifTranslated);

    var ifVerify = '<div class="if_verify"></div>';
    theInfoLineToWrite.append(ifVerify);
    
}

function showNotrans(infoID) {
    var theObject = hasTranslated(infoID);
    if (!theObject) {
        var data = JSON.parse(sessionStorage.getItem("transInfo"));
        var index = undefined;
        for (index in data) {
            var theObject = data[index];
            if (theObject.info_id === infoID) {
                var theTarget = $(".untranslateCharacter .detail");
                theTarget.html(theObject.info_content);
            }
        }
    }
}

$(document).ready(function () {
    // Delete test infomation
    $(".info_block").empty();

    getInfo();
    getTranslated();
    var data = JSON.parse(sessionStorage.getItem("transInfo"));
    var index = undefined;
    for (index in data) {
        var theObject = data[index];
        var index2num = parseInt(index);
        createInfoLine(theObject, index2num + 1);
        console.log(theObject.info_content);
    }

    /* About operate */
    var transLists = $(".info_line");
    var index = undefined;
    for (index in transLists) {
        var theTarget = transLists[index];
        var theId = theTarget.id;
        theTarget.onclick = showNotrans(theId);
    }
})

