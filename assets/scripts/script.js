// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  var saveButtons = $('.saveBtn');
  var clearButton = $('.clearBtn');
  var timeblocks = $('.time-block');
  var currentDate = $('#currentDay');
  var currentHour = dayjs().format('H');
  console.log(currentHour);
  // test different Hours
  //currentHour = 13;



  // Add a listener for click events on the clear button.
  // This button is used to clear all entries from the calendar 
  clearButton[0].addEventListener('click',()=> clearDay());

  // Add a listener for click events on the save buttons array.
  // Use the id in the parent div of the time-block as a key to save the user input in
  // local storage. 
  saveButtons.each(function (element) {
    saveButtons[element].addEventListener('click', () => {
      var parentDivId = this.parentElement.getAttribute('id');
      var timeTextArea = this.parentElement.children[1];
      console.log(timeTextArea.value);
      localStorage.setItem(parentDivId, timeTextArea.value);
      alert("You entry has been saved");
    })
  });

  // get all elements of class 'row time block' and apply the past, present, or 
  // future class to each time block by comparing the id to the current hour
  
  timeblocks.each(function (element) {
    //console.log(timeblocks[element]);
    var blockId = (timeblocks[element].getAttribute('id'));
    var blockIdHour = parseInt(blockId.substring(5));
    console.log(element);
    console.log(blockIdHour);
    if (blockIdHour == currentHour) {
      timeblocks[element].className += 'present';
    }
    else if (blockIdHour > currentHour) {
      console.log('set future');
      timeblocks[element].className += 'future';
      console.log(timeblocks[element].className);
    }
    else {
      timeblocks[element].className += 'past';
      console.log(timeblocks[element].className);
    }
  })

  // Get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements using the id
  timeblocks.each(function (element) {
    //console.log(timeblocks[element]);
    var divElement = timeblocks[element];
    var blockId = (divElement.getAttribute('id'));
    console.log(blockId);
    var itemText = localStorage.getItem(blockId);
    var timeTextArea = divElement.children[1];
    console.log(timeTextArea);
    //set max lenght of 200 char to limit the amount data user can enter for each time
    timeTextArea.setAttribute("maxlength","200");
    timeTextArea.value = itemText;
  })

  //Display the current date in the header of the page.
  currentDate.text(dayjs().format('dddd, MMMM DD'));

  // Clear all data  out of local storage for the day for each time block
  // This function is called when the clear button is clicked
  function clearDay() {
    console.log("Clear Day");
    var timeblocks = $('.time-block');
    timeblocks.each(function (element) {
      //console.log(timeblocks[element]);
      var divElement = timeblocks[element];
      var blockId = (divElement.getAttribute('id'));
      console.log(blockId);
      localStorage.setItem(blockId,"");
      var timeTextArea = divElement.children[1];
      console.log(timeTextArea);
      timeTextArea.value = "";
    })

  }
});
