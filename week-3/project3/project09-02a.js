"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-02

      Project to read field values from web storage
      Author: Ammar Ahmed
      Date: 2026-11-06

      Filename: project09-02a.js
*/

/* Page Objects */

let riderName = document.getElementById("riderName");
let ageGroup = document.getElementById("ageGroup");
let bikeOption = document.getElementById("bikeOption");
let routeOption = document.getElementById("routeOption");
let accOption = document.getElementById("accOption");
let region = document.getElementById("region");
let miles = document.getElementById("miles");
let comments = document.getElementById("comments");


/* Show the saved rider data when the Submit button is clicked. */
document.getElementById("submitButton").onclick = showData;

function showData() {
   // Save each form field for the current browser tab's session.
   sessionStorage.setItem("riderName", riderName.value);
   sessionStorage.setItem("ageGroup", ageGroup.value);
   sessionStorage.setItem("bikeOption", bikeOption.value);
   sessionStorage.setItem("routeOption", routeOption.value);
   sessionStorage.setItem("accOption", accOption.value);
   sessionStorage.setItem("region", region.value);
   sessionStorage.setItem("miles", miles.value);
   sessionStorage.setItem("comments", comments.value);

   // Navigate to the summary page in the same tab.
   location.href = "project09-02b.html";
}
