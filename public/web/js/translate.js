
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
    theInfoLineToWrite.append(ifTranslated);

    var ifVerify = '<div class="if-verify"></div>';
    theInfoLineToWrite.append(ifVerify);
}

// Add event listener for each sentence
function addOperateEvent(target) {
  // Get
  var detail = $(".operate-block .untranslate-character .detail");
  var operating = $(".operate-block .operating textarea");
  var remark = $(".operate-block .add-explain textarea");
  // Clear history first
  detail.empty();
  operating.empty();
  remark.empty();

  // Update operate block
  // - Update untranslate content block
  var infoID = target.id;
  var theTargetID = "#" + infoID.replace(/\./g, '\\.')
                        + " .line-translate";
  // Why .text() work here?
  var toTranslateContent = $(theTargetID).text();
  $.ajax({
    url: '/translate/gettranslate',
    type: 'POST',
  })
  .done(function(contents) {
    var content = undefined;
    var count = 0;
    for (content = 0; content < contents.length; ++content) {
      var theContent = contents[content];
      ////////////////////////
      //DEBUG
      if (typeof theContent != "object") {
        console.log(theContent);
      }
      ///////////////////////
      else {
        if (infoID === theContent.info_id) {
          ++count;
        }
      }
    }
    toTranslateContent += "[" + count + " record existed]";
    detail.html(toTranslateContent);
  })
  .fail(function() {
    console.log("Gettranslate(update) ajax problem.");
  })
  .always(function() {
    console.log("Gettranslate(update) ajax complete");
  })

  // First, this info_line was clicked
  // Then, hook the buttonSave event to this object
  var buttonSave = $(".operate-block .operating .save");
  // Remove all event,
  // actually, just click event
  buttonSave.off();
  buttonSave.click(function() {
    var submitContent = operating.val();
    if (submitContent === "") {
      // IF empty, return false
      alert ("NULL. INPUT FIRST.");
    } else {
      $.ajax({
        url: '/translate/inserttranslate',
        type: 'POST',
        dataType: 'JSON',
        data: {
          infoid: infoID,
          result: submitContent,
          lanuage: "cns"    // Default: zh_CN
        },
      })
      .done(function(data) {
        console.log("Insert tranlate status: " + data);
      })
      .fail(function() {
        console.log("Insert translate ajax problem.");
      })
      .always(function() {
        console.log("Insert translate ajax complete.");
      });
    }
  });
  // Hook buttonRemark to this boject
  // But no interface.
}

// $start here
$(document).ready(function() {
  // Delete demo
  $(".info-block").empty();

  // Display
  $.ajax({
    url: '/info/getinfo',
    type: 'POST',
  })
  .done(function(infos) {
    var info = undefined;
    for (info = 0; info < infos.length; ++info) {
      var theInfo = infos[info];
      ////////////////////
      //DEBUG
      if (typeof theInfo != "object") {
        console.log(theInfo);
      }
      ////////////////////
      else {
        createInfoLine(theInfo);
        // Get tranlated content
        $.ajax({
          url: '/translate/gettranslate',
          type: 'POST',
        })
        .done(function(contents) {
          // TODO
          // TODO
          // TODO
          // To understand block function
          var infoIDs = theInfo.info_id;
          var result = "No trans";
          var content = undefined;
          for (content = 0; content < contents.length; ++content) {
            var theContent = contents[content];
            //////////////////////
            //DEBUG
            if (typeof theContent != "object") {
              console.log(theContent);
            }
            //////////////////////
            else {
              if (infoIDs === theContent.info_id) {
                result = theContent.translate_result;
                /////////////////////////////
                ///DEBUG
                console.log("infoID: "     + infoIDs + " -> " +
                            "Translated: " + result);
                /////////////////////////////
              }
            }
          }
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
      }
    }
  })
  .fail(function() {
    console.log("Getinfo ajax problem.");
  })
  .always(function() {
    console.log("Getinfo ajax complete.");
  });

  // Forbid submit without choosing nothing
  var operating = $(".operate-block .operating textarea");
  var buttonSave = $(".operate-block .operating .save");
  var buttonSaveAll = $(".operate-block .operating .saveAll");
  buttonSave.click(function() {
    alert ("Must choose one sentence first.");
  });
});
// $end start
