/**
 * Created by Jake Lin on 5/2/2014.
 */
 
function addToNotes(info, tab) {
  // console.log("item " + info.menuItemId + " was clicked");
  // console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));

  chrome.tabs.executeScript(null, { file: "js/jquery-2.1.0.min.js" }, function() {
    chrome.tabs.executeScript(null, { file: "js/contextScript.addToNotes.js" }, function (result) {
      console.log(result);
    });
   });
}

var showForPages = ["https://www.duolingo.com/skill/*", "http://www.duolingo.com/skill/*"];
var contexts = ["page","selection","link","editable","image","video","audio"];
                
chrome.contextMenus.create({"title": "Add to Duolingo Notes", 
                            "documentUrlPatterns":showForPages,
                            "contexts":contexts,
                            "onclick": addToNotes});
