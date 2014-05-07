/**
 * Created by Jake Lin on 4/30/2014.
 */

function guid() {
  function _p8(s) {
    var p = (Math.random().toString(16)+"000000000").substr(2,8);
    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

var value0 = $('#session-element-container .text-to-translate .token').text();
var value1 = $('#grade .lighter').text();
if (value0 && value1) {
  chrome.storage.sync.get('notes', function (result){
    var notes = result['notes'] || {};
    var id = guid();
    notes[id] = {id: id, d:Date.now(), v0:value0, v1:value1, c: ''};
    chrome.storage.sync.set({'notes': notes}, function() {});
  });
}
