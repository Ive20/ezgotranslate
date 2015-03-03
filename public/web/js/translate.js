
//
// About interface design
//  1, gettranslate {info_id} return related_translated_info
//

// class InfoLine
//
function InfoLine(objectToDisplay) {
    this.infoID       = objectToDisplay.info_id;
    this.infoContent  = objectToDisplay.info_content;
    this.infoLanguage = objectToDisplay.info_language;
    this.updatedAt    = objectToDisplay.updated_at;
    this.createdAt    = objectToDisplay.created_at;
}

InfoLine.prototype = {
    constructor: InfoLine,

    generateSnippet: function(elementValue,
                            classValue,
                            idValue,
                            eventValue,
                            eventHandler) {
        if (elementValue === null) return false;
        else {
            var propertys = null;

            if (idValue !== null) {
                var theId = 'id="' + idValue + '" ';
                // If has class, use +=
                (propertys === null) ? propertys =  theId
                                     : propertys += theId;
            }

            if (classValue !== null) {
                var theClass = 'class="' + classValue +'" ';
                (propertys === null) ? propertys =  theClass
                                     : propertys += theClass;
            }

            if (eventValue !== null) {
                var theEvent = eventValue + '=' + '"' +
                               eventHandler + '" ';

                (propertys === null) ? propertys = theEvent
                                     : propertys += theEvent;
            }

            var theSnippet = undefined;
            if (propertys === null) {
                theSnippet = '<'  + elementValue + '>' +
                             '</' + elementValue + '>';
            } else {
                theSnippet = '<' + elementValue + ' ' + propertys + '>' +
                             '</' + elementValue + '>';
            }

            return theSnippet;
        }
    },

    appendToInfoBlock: function() {
        // Get target
        var infoBlock = $(".translate-block .info-block");

        var theInfoLine = this.generateSnippet('div',
                                               'info-line',
                                               this.infoID,
                                               'onclick',
                                               'addOperateEvent(this)');
        infoBlock.append(theInfoLine);

        var infoIDForjQuerySelector = this.infoID.replace(/\./g, '\\.');
        var theInfoLineToWrite = $('#' + infoIDForjQuerySelector);

        var lineTranslate = this.generateSnippet('div',
                                                 'line-translate',
                                                 null, null, null);
        theInfoLineToWrite.append(lineTranslate);

        var translated = this.generateSnippet('div',
                                              'translated',
                                              null, null, null);
        theInfoLineToWrite.append(translated);

        var ifTranslated = this.generateSnippet('div',
                                                'if-translated',
                                                null, null, null);
        theInfoLineToWrite.append(ifTranslated);

        var ifVerify = this.generateSnippet('div',
                                            'if-verify',
                                            null, null, null);
        theInfoLineToWrite.append(ifVerify);
        // TODO
        // TODO
    }
}

// Create a block for one sentence with its ID
function createInfoLine(objectToDisplay) {
    var infoID = objectToDisplay.info_id;
    var infoContent = objectToDisplay.info_content;
    var infoLanguage = objectToDisplay.info_language;
    var updatedAt = objectToDisplay.updated_at;
    var createdAt = objectToDisplay.created_at;

    // Get the tag <div class="info_block">
    // to insert new info line
    var theInfoBlock = $(".translate-block .info-block");

    var infoLine = '<div id="' +
                   infoID +
                   '" class="info-line" ' +
                   'onclick=\"addOperateEvent(this)\">' +
                   '</div>';
    theInfoBlock.append(infoLine);

    var infoIDForjQuerySelector = infoID.replace(/\./g, '\\.');
    var theInfoLineToWrite = $("#" + infoIDForjQuerySelector);

    var lineTranslated = '<div class="line-translate">' +
                         infoContent +
                         '</div>';
    theInfoLineToWrite.append(lineTranslated);

    var translated = '<div class="translated"></div>';
    theInfoLineToWrite.append(translated);

    var ifTranslated = '<div class="if-translated"></div>';
    //theInfoLineToWrite.append(ifTranslated);

    var ifVerify = '<div class="if-verify"></div>';
    //theInfoLineToWrite.append(ifVerify);
}

// Compare function
// Compare info via update time
function cmpInfoViaUpdateTime(info1, info2) {
    if (info1.updated_at < info2.updated_at) {
        return 1;
    } else if (info1.updated_at > info2.updated_at) {
        return -1;
    } else {
        return 0;
    }
}

// Search object in array
function objectArrayIndexOf(objectArray,
                            searchItem,
                            objectProperty) {
    var i = undefined;
    for (i = 0; i < objectArray.length; ++i) {
        var theObject = objectArray[i];
        if (theObject[objectProperty] === searchItem) {
            return i;
        }
    }
    return -1;
}

// Add event listener for each sentence
function addOperateEvent(target) {
    // Get operate target
    var detail = $(".operate-block .untranslate-character .detail");
    var operating = $(".operate-block .operating .input-block");
    var comment = $(".operate-block .add-explain .input-block");
    // Clear history first
    detail.empty();
    operating.empty();
    comment.empty();

    // Update operate block
    // - Update untranslate content block
    var infoID = target.id;
    var targetInfoLineID = "#" + infoID.replace(/\./g, '\\.');
    var theTargetID = targetInfoLineID + " .line-translate";

    // div with .text() to get value
    var toTranslateContent = $(theTargetID).text();
    var translatedContents = [];
    // To save the latest translate
    var contentToShow = undefined;

    // Update contentToShow
    $.ajax({
        url: '/translate/gettranslate',
        type: 'POST'
    })
    .done(function(contents) {
        var content = undefined;
        // Get translated content from back-end
        // Now, back-end return all translated content
        for (content = 0; content < contents.length; ++content) {
            var theContent = contents[content];
            ////////////////////////
            //DEBUG
            if (typeof theContent != "object") {
                console.log(theContent);
            }
            ///////////////////////
            else {
                // Filter via info_id
                if (theContent.info_id === infoID) {
                    translatedContents.push(theContent);
                }
            }
        }
        // Display toTranslate content
        detail.html(toTranslateContent);

        // Display hasTranslate content
        var count = translatedContents.length;
        console.log(infoID + " has " + count + " history.");
        // IF history > 1, display the latest one
        if (count >= 1) {
            // Sort via update_at time
            translatedContents.sort(cmpInfoViaUpdateTime);
            contentToShow = translatedContents[0].translate_result;
            operating.html(contentToShow);
            ///////////////////////////
            ///DEBUG
            console.log(contentToShow);
            ///////////////////////////
        }
    })
    .fail(function() {
        console.log("Gettranslate(update) ajax problem.");
    })
    .always(function() {
        // When contentToShow update ajax finished
        // Hook buttonSave event to this object
        var buttonSave = $(".operate-block .operating .save");
        // Remove all event bound to save-button before
        // Actually, just click event
        buttonSave.off();
        buttonSave.click(function() {
            var submitContent = operating.text();
            if (submitContent === "") {
                // IF empty, return false
                alert("Nothing to save.");
            } else if (submitContent === contentToShow) {
                // No modify, refuse save
                alert("Nothing changed.")
            } else if (objectArrayIndexOf(translatedContents,
                                          submitContent,
                                          'translate_result') != -1) {
                // IMPROVED - should be finished in backend
                // Check whether translate exist
                alert("This translate has existed.");
            } else {
                // Submit new or update translate
                $.ajax({
                    url: '/translate/inserttranslate',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {
                        infoid: infoID,
                        result: submitContent,
                        lanuage: "cns"    // Default: zh_CN
                    }
                })
                .done(function(data) {
                    var errcode = data.errcode;

                    if (errcode === 1) {
                        alert("Save failed.");
                        //////////////////////////////////////////////////
                        ///DEBUG
                        console.log("Insert translate interface problem.");
                        //////////////////////////////////////////////////
                    } else {
                        // Update info-line
                        var targetInfoLine = $(targetInfoLineID + " .translated");

                        targetInfoLine.html(submitContent);
                    }
                })
                .fail(function() {
                    alert("Save failed.");console.log("Insert translate ajax problem.");
                })
                .always(function() {
                    console.log("Insert translate ajax complete.");
                });
            }
        });

        // Hook the buttonSubmit event to this object
        var buttonSubmit = $(".operate-block .add-explain .commit");
        // Remove all event bound to submit-button before
        // Actually, just click event
        buttonSubmit.off();
        buttonSubmit.click(function(){
            // Prepare
            var submitComment = comment.text();

            if (submitComment === '') {
                // IF no comment, return false
                alert("Please leave a comment first.");
            } else {
                // ajax
                // But no interface now
                ///////////////////////////
                ///DEBUG
                console.log("comment: " + submitComment);
                ///////////////////////////
            }
        });
        // $end contentToShow update ajax
        console.log("Gettranslate(update) ajax complete");
    });

  // $start handle contentToShow update ajax not done
  // IF ajax not finish, bind busy-remind event
  var buttonSave = $(".operate-block .operating .save");
  // Remove all event bound to save-button before
  // Actually, just click event
  buttonSave.off();
  buttonSave.click(function() {
      alert("Busy. Try again later.");
  });

  // Hook the buttonSubmit event to this object
  var buttonSubmit = $(".operate-block .add-explain .commit");
  // Remove all event bound to submit-button before
  // Actually, just click event
  buttonSubmit.off();
  buttonSubmit.click(function(){
      alert("Busy. Try again later.");
  });
  // $end handle contentToShow update ajax not done
}

// $start here
$(document).ready(function() {
    // Delete demo
    $(".info-block").empty();

    // Get second block target
    var numberOfSentence = $(".second-block .number-of-sentences .numbers");
    var untranslate = $(".second-block .untranslate .numbers");
    var unreview = $(".second-block .unreview .numbers");
    // Reset
    numberOfSentence.html(0);
    untranslate.html(0);
    unreview.html(0);

    // List translate info in translate-block info-block
    $.ajax({
        url: '/info/getinfo',
        type: 'POST'
    })
    .done(function(infos) {
        var info = undefined;
        for (info = 0; info < infos.length; ++info) {
            var theInfo = infos[info];
            // Update numbers of sentences
            numberOfSentence.html(infos.length);
            ////////////////////
            //DEBUG
            if (typeof theInfo != "object") {
                console.log(theInfo);
            }
            ////////////////////
            else {
                // Now, using createInfoLine
                // Later, I prefer new InfoLine()
                createInfoLine(theInfo);
                // Get tranlated content
                /*
                $.ajax({
                    url: '/translate/searchtranslate',
                    type: 'POST'
                })
                .done(function(contents) {
                    var infoIDs = theInfo.info_id;
                    var result = "No trans";
                    var content = undefined;

                    var theTargetID = "#" + infoIDs.replace(/\./g, '\\.')
                                    + " .translated";
                    var theTranslated = $(theTargetID);

                    // Clear first when insert translated content
                    theTranslated.empty();
                    theTranslated.html(result);
                })
                .fail(function() {
                    console.log("Gettranslate ajax problem.");
                })
                .always(function() {
                    console.log("Gettranslate ajax complete.");
                });
                */
            }
        }
    })
    .fail(function() {
        console.log("Getinfo ajax problem.");
    })
    .always(function() {
        console.log("Getinfo ajax complete.");
    });

    // Forbid submit when choosing nothing
    var buttonSave = $(".operate-block .operating .save");
    buttonSave.click(function() {
        alert("Must choose one sentence first.");
    });

    var buttonSubmit = $(".operate-block .add-explain .commit");
    buttonSubmit.click(function(){
        alert("Must choose one sentence first.");
    });

    // Handle buttonSaveAll
    // on_buttonSaveAll_click = save all translate
    var buttonSaveAll = $(".operate-block .operating .save-all");
    buttonSaveAll.click(function(){
        //TODO
        alert("[DOING]This part has't been done.");
    });
});
// $end start
