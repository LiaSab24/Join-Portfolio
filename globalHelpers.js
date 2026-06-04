/* global helpers: colors, badges, validation, feedback, redirects, buttons, sidebar-nav (split from script.js) */

/**
 * This function assigns a random color of the given colors-palette
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function assignRandomColor(indexContact) {
  if (contactColors[indexContact]) {
    return contactColors[indexContact];
  }
  if (availableColors.length === 0) availableColors = [...colors];

  let randomIndex = Math.floor(Math.random() * availableColors.length);
  let assignedColor = availableColors.splice(randomIndex, 1)[0];

  contactColors[indexContact] = assignedColor;
  return assignedColor;
}


/**
 * This function changes the profile-badge-color according to the deposited color for the contact
 * 
 * @param {string} contentRef - the id of the element that should get the deposited color as the background-color
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function profileBadgeColor(contentRef, indexContact) {
  if (indexContact == -1) {
    document.getElementById(contentRef).style.backgroundColor = "#D9D9D9";
  } else {
    document.getElementById(contentRef).style.backgroundColor = contacts[indexContact].color;
  }
}


/**
 * This function extracts the first letter of the contacts first and of the contacts last name and returns them 
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array 
 */
function nameAbbreviation(indexContact) {
  if (indexContact == -1) {
    return "  "
  } else {
    let contactFullName = contacts[indexContact].name.toUpperCase();
    let contactFirstName = contactFullName.substring(0, contactFullName.indexOf(' '));
    let contactLastName = contactFullName.substring(contactFullName.indexOf(' ') + 1);
    let firstLetter = contactFirstName.charAt(0);
    let secondLetter = contactLastName.charAt(0);
    return firstLetter + secondLetter
  }
}


/**
 * This function shows the 'succesfully created/edited/deleted'-message after adding/editing/deleting a contact or task was succesfull
 * 
 * @param {number} msgId - the id of the message that should be shown
 */
async function successfullMsg(msgId) {
  let successAnimation = document.getElementById(msgId);
  successAnimation.style.animationName = "msgSuccesfull";
  setTimeout(function () {
    successAnimation.style.animationName = "";
    init();
  }, 1600);
}


/**
 * This function checks, if a required input is filled in and toggles the "requirement-unfulfilled"-class accordingly
 * @param {string} contentRefId - the id of the element that should be checked
*/
function checkFilledInput(contentRefId) {
  let contentRef = document.getElementById(contentRefId);
  if (contentRefId == "addTaskCategory") {
    checkFilledInputTaskCategory();
  } else {
    if (contentRef.value == "") {
      contentRef.classList.add("requirement-unfulfilled");
      setTimeout(function () {
        contentRef.classList.remove("requirement-unfulfilled");
      }, 2400);
    } else {
      contentRef.classList.remove("requirement-unfulfilled");
    }
  }
}


/**
 * This function checks, if a task-category is chosen and toggles the "requirement-unfulfilled"-class accordingly
*/
function checkFilledInputTaskCategory() {
  let contentRef = document.getElementById("addTaskCategory");
  if (contentRef.placeholder == "Select task category") {
    contentRef.classList.add("requirement-unfulfilled");
    setTimeout(function () {
      contentRef.classList.remove("requirement-unfulfilled");
    }, 2400);
  } else {
    contentRef.classList.remove("requirement-unfulfilled");
  }
}


/**
 * This function toggles the visibilty of the submenu (and its transparent background-overlay) onclick
 */
function toggleSubmenu() {
  document.getElementById("submenuOverlay").classList.toggle("d-none");
}


/**
 * This function redirects the user to the help.html-page and saves the link of the previous visited page in the local storage
 * 
 * @param {url} location - the url of the previous page
 */
function redirectToHelp(location) {
  localStorage.setItem("location", JSON.stringify(location));
  window.location.href = "./help.html"
}


/**
 * This function gets the link of the previous page from the local storage and redirects the user to that page
 */
function redirectToPreviousPage() {
  previousLocation = JSON.parse(localStorage.getItem("location"));
  window.location.href = previousLocation;
}


/**
 * This function hides the entrie of all users except the current one
 * 
 * @param {string} contentRef - the repetetive part of the id that is used to find the element to remove
 */
function hideAllUsers(contentRef) {
  for (let indexUser = 0; indexUser < users.length - 1; indexUser++) {
    let usersInContactsIds = contacts.findIndex(index => index.name === users[indexUser].name).toString();
    let usersEntrie = document.getElementById(contentRef + usersInContactsIds);
    if (usersInContactsIds != indexContactUser) {
      usersEntrie.remove();
    }
  }
}


/**
 * This function adds the addition " (You)" to the currentUser-address book entrie
 * 
 * @param {string} contentRef - the id of the element, that should be changed
 */
function adjustUserContact(contentRef) {
  if (indexContactUser !== -1) {
    document.getElementById(contentRef + indexContactUser).innerHTML += " (You)";
  }
}


/**
 * This function checks, if the mail-input-value is a proper name.
 * It returns the email address or shows an alert accordingly.
 * 
 * @param {string} contentRef - the id of the element
 */
function validateNameInput(contentRef) {
  let nameInput = document.getElementById(contentRef).value;
  let firstChar = Number(nameInput.charAt(0));
  if (nameInput.trim() !== "" && isNaN(firstChar)) {
    return nameInput.trim()
  } else {
    document.getElementById("alertName").classList.remove("invisible");
    setTimeout(function () {
      document.getElementById("alertName").classList.add("invisible");
    }, 2400);
    return ""
  }
}


/**
 * This function checks, if the mail-input-value is a proper email address.
 * It returns the email address or shows an alert accordingly.
 * 
 * @param {string} contentRef - the id of the element
 */
function validateMailInput(contentRef) {
  let mailInput = document.getElementById(contentRef).value;
  let charsBetweenAtAndDot = mailInput.lastIndexOf(".") - mailInput.indexOf("@");
  if (mailInput.includes("@") && mailInput.includes(".") && mailInput.charAt(0) !== "@" && mailInput.charAt(0) !== "." && mailInput.slice(-1) !== "." & mailInput.slice(-1) !== "@" && charsBetweenAtAndDot >= 2) {
    return mailInput.toLowerCase();
  } else {
    document.getElementById("alertMail").classList.remove("invisible");
    setTimeout(function () {
      document.getElementById("alertMail").classList.add("invisible");
    }, 2400);
    return ""
  }
}


/**
 * This function disables a button while a request is loading to prevent double-submits
 *
 * @param {string} buttonId - the id of the button that should be disabled
 */
function disableButton(buttonId) {
  let button = document.getElementById(buttonId);
  if (button) {
    button.disabled = true;
  }
}


/**
 * This function re-enables a button after a request has finished
 *
 * @param {string} buttonId - the id of the button that should be enabled
 */
function enableButton(buttonId) {
  let button = document.getElementById(buttonId);
  if (button) {
    button.disabled = false;
  }
}


/**
 * This function lets the user navigate throught the sidear menu-links without needing to click
 */
function initializeSidebarMenuLinks() {
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
} 


/**
 * This function lets the user navigate throught the sidebar nav-links without needing to click
 */
function initializeSidebarNavLinks() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}
