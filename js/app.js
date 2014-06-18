/**
 * Created by Jake Lin on 5/2/2014.
 */

function addToNotes(info, tab) {
  chrome.tabs.executeScript(null, { file: "js/jquery-2.1.0.min.js" }, function() {
    chrome.tabs.executeScript(null, { file: "js/contextScript.addToNotes.js" }, function (result) {
      // console.log(result);
    });
   });
}

var showForPages = ["https://www.duolingo.com/skill/*", "http://www.duolingo.com/skill/*","https://www.duolingo.com/practice/*", "http://www.duolingo.com/practice/*"];
var contexts = ["page","selection","link","editable","image","video","audio"];

chrome.contextMenus.create({"title": "Add to Duolingo Notes",
                            "documentUrlPatterns":showForPages,
                            "contexts":contexts,
                            "onclick": addToNotes});

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
  if (command == "add-to-notes") {
    addToNotes();
  }
});

// Migrate all data from chrome.storage.sync to chrome.storage.local due to storage limit problem.
// Can be removed in the future.
console.log("Migration starts"); // TODO: will be removed
chrome.storage.sync.get('notes', function (result){
  var notes = result['notes'];
  console.log("notes");
  console.log(notes);
  if (notes) {
    chrome.storage.local.set({'notes': notes}, function() {});
    chrome.storage.sync.set({'notes': null}, function() {});
  }
});
