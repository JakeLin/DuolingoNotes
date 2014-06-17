// Using Jquery inside the controller is considered as bad practice in Angular JS
// Use a separate file to place Jquery stuff. Do things quickly but they should be done in Controller.
$(function() {
  $('#exportToCsv').click(function(){
     $('#notesTable').table2CSV({header:['Question','Duolingo\'s answer','Your answer','Comments']});
  });
});
