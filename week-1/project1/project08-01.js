"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-01

      Project to create a timer object
      Author: Ammar Ahmed
      Date:   October 22, 2026

      Filename: project08-01.js
*/

/*--------------- Object Code --------------------*/

// Create a timer object with starting minutes, seconds, and no active interval.
function timer(min, sec) {
   this.minutes = Number(min);
   this.seconds = Number(sec);
   this.timeID = null;
}

// Use the prototype method to start or pause the same timer instance.
timer.prototype.runPause = function(timer, minBox, secBox) {
   if (timer.timeID !== null) {
      // An interval exists, so pause the countdown.
      window.clearInterval(timer.timeID);
      timer.timeID = null;
   } else if (timer.minutes > 0 || timer.seconds > 0) {
      // No interval is running, so update the timer every second.
      timer.timeID = window.setInterval(countdown, 1000);
   }

   function countdown() {
      if (timer.seconds > 0) {
         timer.seconds -= 1;
      } else if (timer.minutes > 0) {
         timer.minutes -= 1;
         timer.seconds = 59;
      } else {
         // The timer has reached 0:0.
         window.clearInterval(timer.timeID);
         timer.timeID = null;
      }

      // Show the remaining time in the two input boxes.
      minBox.value = timer.minutes;
      secBox.value = timer.seconds;

      // Stop as soon as 0:0 appears, without an extra one-second delay.
      if (timer.minutes === 0 && timer.seconds === 0 && timer.timeID !== null) {
         window.clearInterval(timer.timeID);
         timer.timeID = null;
      }
   }
};







/*---------------Interface Code -----------------*/

/* Interface Objects */
let minBox = document.getElementById("minutesBox");
let secBox = document.getElementById("secondsBox");
let runPauseTimer = document.getElementById("runPauseButton");



// Create the timer using the initial values from the web page.
let myTimer = new timer(minBox.value, secBox.value);

// Keep the timer object in sync with manual changes to the inputs.
minBox.onchange = function() {
   myTimer.minutes = Number(minBox.value);
};

secBox.onchange = function() {
   myTimer.seconds = Number(secBox.value);
};

// Start or pause the countdown when the button is clicked.
runPauseTimer.onclick = function() {
   myTimer.runPause(myTimer, minBox, secBox);
};
