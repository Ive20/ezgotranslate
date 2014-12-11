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

function createInfoLine(objectToDisplay){
    var infoID = objectToDisplay.info_id;
    var infoContent = objectToDisplay.info_content;
    var infoLanguage = objectToDisplay.info_language;
    var updatedAt = objectToDisplay.updated_at;
    var createdAt = objectToDisplay.created_at;
    /* Get the tag <div class="info_block"> to insert new info line */
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

function addOperateEvent(target){
  var detail = $(".operate_block .untranslateCharacter .detail");
  var operating = $(".operate_block .operating textarea");
  var remark = $(".operate_block .addExplain textarea");
  detail.empty();
  operating.empty();
  remark.empty();
  // Update operate block
  // - Update untranslate content block
  var infoID = target.id;
  var theTargetID = "#" + infoID + ".line_translate";
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
          toTranslateContent += "[" + count + " record]";
        }
      }
    }
    detail.html(toTranslateContent);
  })
  .fail(function() {
    console.log("tarnslate.js - Gettranslate(update) error");
  })
  .always(function() {
    console.log("translate.js - Gettranslate(update) complete");
  })
}

$(document).ready(function(){
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
                result = theContent.translated_result;
              }
            }
          }
          var theTargetID = "#" + infoIDs + ".translated";
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
  var saveButton = $(".operate_block .operating .save");
  saveButton.click(function(){
    var submitContent = operating.text();
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
          lanuage: "cns"
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

  // - Submit Insert remark
  // No interface.
})

