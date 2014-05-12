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

if($('#app .listen')[0] !== undefined){
  // Type what you hear
  var type = 'listen'; 
  var question = '&#x1f50a;';
  var userAnswer = $('#graded-word-input').text();
  var duolingoAnswer = $('#grade .lighter').text();
  var right = ($('#grade .icon-wrong-big')[0] === undefined);
}
else if ($('#app .translate')[0] !== undefined){
  // Text translation
  var type = 'translate'; 
  var question = $('#session-element-container .text-to-translate .token').text();
  var userAnswer = $('#graded-text-input').text();
  var duolingoAnswer = $('#grade .lighter').text();
  var right = ($('#grade .icon-wrong-big')[0] === undefined);
}
else if ($('#app .name')[0] !== undefined){
  // Type what you see (pictures)
  var type = 'name'; 
}
else if ($('#app .judge')[0] !== undefined){
  // Multiple choice with text
  var type = 'judge'; 
}
else if ($('#app .select')[0] !== undefined){
  // Multiple choice with text and pictures
  var type = 'select'; 
}
else if ($('#app .reverse_speak')[0] !== undefined){
  // Say something after translating it to the language you're learning
  var type = 'reverse_speak'; 
}
else if ($('#app .speak')[0] !== undefined){
  // Read something in the language you're learning
  var type = 'speak'; 
}
else if ($('#app .form')[0] !== undefined){
  // Fill in the blank using a drop down
  var type = 'form'; 
}

console.log("type: " + type + ", question: " + question + ", userAnswer:" + userAnswer + ", duolingoAnswer:" + duolingoAnswer + ", right:" + right);
if (question && userAnswer && duolingoAnswer) {
  chrome.storage.sync.get('notes', function (result){
    var notes = result['notes'] || {};
    var id = guid();
    notes[id] = {id: id, d:Date.now(), t: type, q:question, ua:userAnswer, da:duolingoAnswer, r: right, c: ''};
    
    chrome.storage.sync.set({'notes': notes}, function() {});
  });
}
