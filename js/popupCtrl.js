/**
 * Created by Jake Lin on 5/2/2014.
 */

'use strict';
var duolingoApp = angular.module('duolingoApp', []);

duolingoApp.controller('PopupController', ['$scope', function($scope) {
  // Binding variables
  $scope.notes = [];
  
  // Methods
  $scope.showSpeakButton = function () {
	return true;
    /*
    if ('speechSynthesis' in window) {
      return true;
    } else {
      return false;
    }
	*/
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
    
    var language = detectLanguage(text);
    // Find the voice and set the utterance instance's voice attribute.
	if (language == 'English') {
		msg.voice = 'Google US English';
	}
    // Queue this utterance.
	window.speechSynthesis.speak(msg);
  };
  
  $scope.clickDelete = function (id) {
    chrome.storage.sync.get('notes', function (result){
      var notes = result['notes'];
      delete notes[id];
      chrome.storage.sync.set({'notes': notes}, function() { popup.loadNotes();});
    });
  };

  $scope.changeComment = function (id, comment) {
    chrome.storage.sync.get('notes', function (result){
      var notes = result['notes'];
      notes[id]['c'] = comment;
      chrome.storage.sync.set({'notes': notes}, function() { });
    });
  };

  // Private stuff
  var popup = {};
  popup.loadNotes = function () {
    chrome.storage.sync.get('notes', function (result){
      
      // Flaten the object to an array for bidding.
      var notes = [];
      for(var guid in result['notes']) {
        notes.push(result['notes'][guid]);
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
