
//
// About interface design
//  1, gettranslate {info_id} return related_translated_info
//

// Create a block for one sentence with its ID
function createInfoLine(objectToDisplay) {
    var infoID = objectToDisplay.info_id;
    var infoContent = objectToDisplay.info_content;
    var infoLanguage = objectToDisplay.info_language;
    var updatedAt = objectToDisplay.updated_at;
    var createdAt = objectToDisplay.created_at;
    // Get the tag <div class="info_block"> to insert new info line
    var theInfoBlock = $(".info_block");

    var infoLine = '<div id="' + infoID +
                   '" class="info_line" onclick=\"addOperateEvent(this)\"></div>';
    theInfoBlock.append(infoLine);

    var infoIDForjQuerySelector = infoID.replace(/\./g, '\\.');
    var theInfoLineToWrite = $("#" + infoIDForjQuerySelector);

    var lineTranslated = '<div class="line_translate">' + infoContent + '</div>';
    theInfoLineToWrite.append(lineTranslated);

    var translated = '<div class="translated"></div>';
    theInfoLineToWrite.append(translated);

    var ifTranslated = '<div class="if_translated"></div>';
    theInfoLineToWrite.append(ifTranslated);

    var ifVerify = '<div class="if_verify"></div>';
    theInfoLineToWrite.append(ifVerify);

}

// Add event listener for each sentence
function addOperateEvent(target) {
  // Get
  var detail = $(".operate_block .untranslateCharacter .detail");
  var operating = $(".operate_block .operating textarea");
  var remark = $(".operate_block .addExplain textarea");
  // Clear history first
  detail.empty();
  operating.empty();
  remark.empty();
  // Update operate block
  // - Update untranslate content block
  var infoID = target.id;
  var theTargetID = "#" + infoID.replace(/\./g, '\\.')
                        + " .line_translate";
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
    console.log("tarnslate.js - Gettranslate(update) error");
  })
  .always(function() {
    console.log("translate.js - Gettranslate(update) complete");
  })

  // First, this info_line was clicked
  // Then, hook the buttonSave event to this object
  var buttonSave = $(".operate_block .operating .save");
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
        console.log("translate.js - Inserttranslate error.");
      })
      .always(function() {
        console.log("translate.js - Inserttranslate complete.");
      });
    }
  })
}

// $start here
$(document).ready(function() {
  // Delete demo
  $(".info_block").empty();

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
        var infoIDs = theInfo.info_id;
        $.ajax({
          url: '/translate/gettranslate',
          type: 'POST',
        })
        .done(function(contents) {
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
              }
            }
          }
          var theTargetID = "#" + infoIDs.replace(/\./g, '\\.')
                                + " .translated";
          var theTranslated = $(theTargetID);

          theTranslated.html(result);
        })
        .fail(function() {
          console.log("translate.js - Gettranslate error.");
        })
        .always(function() {
          console.log("translate.js - Gettranslate complete.");
        });
      }
    }
  })
  .fail(function() {
    console.log("translate.js - Getinfo error.");
  })
  .always(function() {
    console.log("translate.js - Getinfo complete.");
  });

  // - Submit tranlate content
  var operating = $(".operate_block .operating textarea");
  var buttonSave = $(".operate_block .operating .save");
  var buttonSaveAll = $(".operate_block .operating .saveAll");
  buttonSave.click(function() {
    alert ("Must choose one sentence first.");
  })

  // - Submit Insert remark
  // No interface.
})
// $end start
