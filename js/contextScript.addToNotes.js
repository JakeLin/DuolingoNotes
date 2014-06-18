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

var type = undefined, question = undefined, userAnswer = undefined, duolingoAnswer = undefined, correct = undefined;

console.log('add to notes');

if($('#app.listen')[0] !== undefined){
  // Type what you hear
  type = 'listen';
  question = '♪';
  userAnswer = $('#graded-word-input').text();
}
else if ($('#app.translate')[0] !== undefined){
  // Text translation
  type = 'translate';
  question = $('#session-element-container .text-to-translate .token').text();
  userAnswer = $('#graded-text-input').text();
}
else if ($('#app.name')[0] !== undefined){
  // Type what you see (pictures)
  type = 'name';
  question = [];
  $('.list-tilted-images li').each(function( index ) {
    var bg = $(this).css('background-image');
    bg = bg.replace('url(','').replace(')','');
    question.push(bg);
    // console.log( bg );
  });

  userAnswer = $('#graded-word-input').text();
}
else if ($('#app.judge')[0] !== undefined){
  // Multiple choice with text
  type = 'judge';
  question = $('.judge-row .col-left').text();
  userAnswer = $('.judge-row .col-right .white-label.active').text();
}
else if ($('#app.select')[0] !== undefined){
  // Multiple choice with text and pictures
  type = 'select';
  question = $('.challenge-select .player').text();
  userAnswer = $('.challenge-select .select-images li.selected .select-images-frame').css('background-image');
  userAnswer = userAnswer.replace('url(','').replace(')','');

  duolingoAnswer = $('.challenge-select .select-images li.correct .select-images-frame').css('background-image');
  duolingoAnswer = duolingoAnswer.replace('url(','').replace(')','');
}
else if ($('#app.reverse_speak')[0] !== undefined){
  // Say something after translating it to the language you're learning
  type = 'reverse_speak';
  question = $('#original-text').text();
  duolingoAnswer = userAnswer = '♪';
}
else if ($('#app.speak')[0] !== undefined){
  // Read something in the language you're learning
  type = 'speak';
  question = $('#original-text').text();
  duolingoAnswer = userAnswer = '♪';
}
else if ($('#app.form')[0] !== undefined){
  // Fill in the blank using a drop down
  type = 'form';
}

correct = ($('#grade .icon-wrong-big')[0] === undefined);
if(!duolingoAnswer) {
  duolingoAnswer = $('#grade .lighter').text();
}

if(correct === true && !duolingoAnswer){
  duolingoAnswer = userAnswer;
}

console.log("type: " + type + ", question: " + question + ", userAnswer:" + userAnswer + ", duolingoAnswer:" + duolingoAnswer + ", correct:" + correct);
if (question && userAnswer && duolingoAnswer) {
  chrome.storage.local.get('notes', function (result){
    var notes = result['notes'] || {};
    var id = guid();
    notes[id] = {id: id, d:Date.now(), t: type, q:question, ua:userAnswer, da:duolingoAnswer, r: correct, c: ''};
    console.log(notes[id]);
    chrome.storage.local.set({'notes': notes}, function() {});
  });
}
