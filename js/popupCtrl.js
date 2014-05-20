/**
 * Created by Jake Lin on 5/2/2014.
 */

'use strict';
var duolingoApp = angular.module('duolingoApp', []);

duolingoApp.controller('PopupController', ['$scope', function($scope) {
  // Binding variables
  $scope.notes = [];
  
  /** Methods **/
  // Check whether display 'Speak' button or not
  $scope.showSpeakButton = function (text) {
	if (typeof popup.showSpeakButton === 'undefined') {
	  if ('speechSynthesis' in window) {
      	popup.showSpeakButton = true;
	  } else {
		popup.showSpeakButton = false;
	  }
	}
	// console.log(popup.showSpeakButton);
	// Check the text, if equals to '♪' then hide the button
	if(typeof text !== 'undefined' && text === '♪') {
	  return false;
	}
	
	return popup.showSpeakButton;
  };
  
  // Check whether display the button.
  $scope.showButton = function (text) {
	// text is not null, undefined or empty or '♪'
	return (text && text !== '♪');
  };
  
  $scope.versionNumber = function () {
    var manifest = chrome.runtime.getManifest();
	return manifest.version;
  };
  
  $scope.clickCopy = function (text) {
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
  };

  $scope.clickSpeak = function (text) {
    // Create a new instance of SpeechSynthesisUtterance.
	var msg = new SpeechSynthesisUtterance();
    
    // Set the text.
	msg.text = text;
    
    guessLanguage.detect(text, function(language) {
      console.log('Detected language of provided text is [' + language + ']');
	  // Find the voice and set the utterance instance's voice attribute.
	  msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == popup.LANGUAGE_MAP[language]; })[0];	  msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == popup.LANGUAGE_MAP[language]; })[0];
	  // Queue this utterance.
	  window.speechSynthesis.speak(msg);
  	});
  };
  
  $scope.clickDelete = function (id) {
    chrome.storage.local.get('notes', function (result){
      var notes = result['notes'];
      delete notes[id];
      chrome.storage.local.set({'notes': notes}, function() { popup.loadNotes();});
    });
  };

  $scope.changeComment = function (id, comment) {
    chrome.storage.local.get('notes', function (result){
      var notes = result['notes'];
      notes[id]['c'] = comment;
      chrome.storage.local.set({'notes': notes}, function() { });
    });
  };

  // Private stuff
  var popup = {}; 
  popup.LANGUAGE_MAP = {
    'en' : 'Google US English',
    'es' : 'Google Español',
    'fr' : 'Google Français',
    'ja' : 'Google 日本人',
    'ko' : 'Google 한국의',
    'zh' : 'Google 中国的',
    'zh_TW' : 'Google 中国的',
	'it' : 'Google Italiano',
	'de' : 'Google Deutsch'
  };

  popup.loadNotes = function () {
    chrome.storage.local.get('notes', function (result){
      
      // Flaten the object to an array for bidding.
      var notes = [];
      for(var guid in result['notes']) {
		var note = result['notes'][guid];
		
		// set the diplay color for the user answer
		if(note.r === true) {
	      note.textColor = 'blue';
		}
		else if (note.r === false) {
		  note.textColor = 'red';
		}
        notes.push(note);
      }
      
      // Sort by created datetime descendingly. 
      $scope.notes = _.sortBy(notes, function(note){
        return -(new Date(note.d));
      });
	  
      $scope.$apply();
    });
  };

  popup.init = function () {
    popup.loadNotes();
  };

  popup.init();
}]);
