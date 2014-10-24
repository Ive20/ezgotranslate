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

function getTranlatedInfo(infoID) {
    var getTranslated = $.post("/translate/gettranslate",
    function (data, status) {
        /* Get tag <div class="tanslated"> in <div id=infoID class="info_line"> */
        var theTargetID = "#" + infoID + " .translated";
        var theTranslated = $(theTargetID);

        /* Emulated get the specific translated */
        var index = undefined;
        for (index in data) {
            var theObject = data[index];
            console.log(theObject.info_id);
            if (theObject.info_id == infoID) {
                theTranslated.html(theObject.translate_result);
                break;
            } else continue;
        }
    }
    , "json");

    getTranslated.fail(function () {
        console.log("translate.js - Get translated info error.")
    });
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
    getTranlatedInfo(infoID);
    
    var ifTranslated = '<div class="if_translated"></div>';
    theInfoLineToWrite.append(ifTranslated);

    var ifVerify = '<div class="if_verify"></div>';
    theInfoLineToWrite.append(ifVerify);
    
}


$(document).ready(function () {
    // Delete test infomation
    $(".info_block").empty();

    var getinfo = $.post("/info/getinfo",
        function (data, status) {
            var index = undefined;
            for (index in data) {
                var theObject = data[index];
                //more funtion code write here
                var index2num = parseInt(index);
                createInfoLine(theObject, index2num + 1);
                console.log(theObject.info_content);
            }
        }
        , "json");

    getinfo.fail(function () {
        console.log("translate.js - Getinfo error.");
    });
})