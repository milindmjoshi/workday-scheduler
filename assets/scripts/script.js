// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var saveButtons = $('.saveBtn');
      console.log(saveButtons);
      saveButtons.each(function(element){
          saveButtons[element].addEventListener('click',()=>  {
            var parentDivId = this.parentElement.getAttribute('id');
            var timeTextArea = this.parentElement.children[1];
            console.log(timeTextArea.value);
            localStorage.setItem(parentDivId,timeTextArea.value);
        })
      });
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

      var currentHour = dayjs().format('H');
      console.log(currentHour);
      // test different Hours
      currentHour = 13;

      // get all elements of class 'row time block'
      var timeblocks = $('.time-block');
      console.log(timeblocks);
      timeblocks.each(function(element){
          //console.log(timeblocks[element]);
          var blockId = (timeblocks[element].getAttribute('id'));
          var blockIdHour = parseInt(blockId.substring(5));
          console.log(element);
          console.log(blockIdHour);
          if (blockIdHour == currentHour){
            timeblocks[element].className += 'present';
          }
          else if (blockIdHour > currentHour){
            console.log('set future');
            timeblocks[element].className += 'future';
            console.log(timeblocks[element].className);
          }
          else{
            timeblocks[element].className += 'past';
            console.log(timeblocks[element].className);
          }
      })
       
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  timeblocks.each(function(element){
    //console.log(timeblocks[element]);
    var divElement = timeblocks[element];
    var blockId = (divElement.getAttribute('id'));
    console.log(blockId);
    var itemText = localStorage.getItem(blockId);
    var timeTextArea = divElement.children[1];
    console.log(timeTextArea);
    timeTextArea.value = itemText;
  })
    
  // TODO: Add code to display the current date in the header of the page.
  var currentDate = $('#currentDay');
   currentDate.text(dayjs().format('dddd, MMMM DD'));
});
