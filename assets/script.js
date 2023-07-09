// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
//$(function () {
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.
//});

//this finds the time using dayjs
$(function () {
  var hour = dayjs().format("HH");

  //updates header every second.
  //no code, no app 👇
  setInterval(setColor, 1000);
  setInterval(updateHeader, 1000);
  saveEvent();
  getEvent();

  //gives me the date in the header
  function updateHeader() {
    var currentDay = $("#currentDay");
    var date = dayjs().format("ddd. MMMM D, YYYY");
    var time = dayjs().format("hh:mm:ss A");

    //an if, else I added to show that during the day 😎
    //and during the night time 😴 based on military time
    //initially wanted the date and time spaced out,
    //then I thought... emojis.
    if (hour > 10 && hour < 20) {
      currentDay.text(date + " 😎 " + time);
    } else {
      currentDay.text(date + " 😴 " + time);
    }
    //currentDay.text(date + " || " + time);
  }

  //we begin to create the function to set the colors
  function setColor() {
    $(".time-block").each(function () {
      var timeBlock = this.id;

      //sets an if, else statment to set the class for the timeblocks
      //effecting the color for each block at the given time
      if (timeBlock === hour) {
        $(this).addClass("present");
      } else if (timeBlock > hour) {
        $(this).addClass("future");
      } else {
        $(this).addClass("past");
      }
    });
  }

  //saves to local storage through eventlistener
  function saveEvent() {
    $(".btn").on("click", function () {
      var key = $(this).parent().attr("id");
      var value = $(this).siblings("textarea").val();
      localStorage.setItem(key, value);
    });
  }

  //retrieves stored data or 'gets' data and adds to the textarea
  function getEvent() {
    $(".time-block").each(function () {
      var key = $(this).attr("id");
      var value = localStorage.getItem(key);
      $(this).children("textarea").val(value);
    });
  }
});
