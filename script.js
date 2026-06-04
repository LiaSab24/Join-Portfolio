const BASE_URL = "https://join-424-project-default-rtdb.europe-west1.firebasedatabase.app/"

let users = [];
let tasks = [];
let contacts = [];
let currentUser;
let indexContactUser;

let filteredContacts = [];
let filteredTasks = [];

let previousLocation;

const colors = [
  "#ff7a00", // Vivid Orange
  "#ff5eb3", // Deep Pink 
  "#6e52ff", // Lavender Blue
  "#9327ff", // Violet
  "#00bee8", // Sky Blue
  "#1fd7c1", // Turquoise
  "#ff745e", // Coral
  "#ffa335", // Amber 
  "#fc71ff", // Fuchsia
  "#ffc701", // Golden Yellow
  "#0038ff", // Royal Blue
  "#c3ff2b", // Lime Green
  "#ffe625", // Sun Yellow
  "#ff4646", // Red 
  "#ffbb2b", // Goldenrod 
  "#462f8a"
];

let availableColors = [...colors];
let contactColors = {};


/**
 * This function is the global initialisation-function for all pages and executes the loading-screen-function and the fetch-data-function
 */
async function init() {
  await fetchDataJson();
  userIndexInContactsArray();
  if (document.getElementById("header")) {
    headerUser();
  }
  initializeSidebarMenuLinks();
  initializeSidebarNavLinks();
  setActiveMenuLink();
}


/**
 * This function fetches the data from the base-URL and transforms it into .json-format
 */
async function fetchDataJson() {
  let joinData = await fetch(BASE_URL + ".json");
  let joinDataJson = await joinData.json();
  filArrays(joinDataJson);
}


/**
 * This function fills the users-, tasks-, and contacts-arrays with the beforehand fetched data
 * 
 * @param {Object} joinDataJson - the fetched object containing the users-, tasks-, and contacts-data
 */
function filArrays(joinDataJson) {
  users = Object.values(joinDataJson.users);
  for (let indexUser = 0; indexUser < users.length; indexUser++) {
    users[indexUser].url = Object.keys(joinDataJson.users)[indexUser];
  }
  tasks = Object.values(joinDataJson.tasks);
  for (let indexTask = 0; indexTask < tasks.length; indexTask++) {
    tasks[indexTask].url = Object.keys(joinDataJson.tasks)[indexTask];
  }
  contacts = Object.values(joinDataJson.contacts);
  for (let indexContact = 0; indexContact < contacts.length; indexContact++) {
    contacts[indexContact].url = Object.keys(joinDataJson.contacts)[indexContact];
  }
  currentUser = joinDataJson.currentUser.userId;
}


/**
 * This function iterates through the contacts-array and finds the index of the contact of the current user
 */
function userIndexInContactsArray() {
  let userMail = users[currentUser].mail;
  indexContactUser = contacts.map(function (element) {
    return element.mail;
  }).indexOf(userMail);
}


/**
 * This function adjusts the "headerPbBadge" to the currentUser
 */
function headerUser() {
  document.getElementById("headerPbBadge").innerHTML = nameAbbreviation(indexContactUser);
  if (indexContactUser == -1) {
    document.getElementById("headerPbBadge").innerHTML = "YOU";
  }
}


/**
 * This function adds the "active"-class to sidebar-link of the current page
 */
function setActiveMenuLink() {
  let location = window.location.href;
  let currentPage = (name) => {
    if (location.includes(name)) {
      return location;
    }
  }

  switch (location) {
    case currentPage("summary"):
      document.getElementById("summaryLink").classList.add("active"); break;
    case currentPage("add_task"):
      document.getElementById("addTaskLink").classList.add("active"); break;
    case currentPage("board"):
      document.getElementById("boardLink").classList.add("active"); break;
    case currentPage("contacts"):
      document.getElementById("contactsLink").classList.add("active"); break;
    case currentPage("privacy_policy"):
      document.getElementById("privacyPolicyLink").classList.add("active"); break;
    case currentPage("legal_notice"):
      document.getElementById("legalNoticeLink").classList.add("active"); break;
  }
}


/**
 * This function is used for the addUser()-, addTask()- and addContact()-function to transfer the added data to firebase
 * 
 * @param {string} path - the path, where the data should be added in firebase (users, tasks, contacts)
 * @param {object} data - an object, that contains all the key-value-pairs that should be added to firebase
 */
async function postData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data)
  });
  await init();
  return resonseToJson = await response.json();
}


/**
 * This function changes edited data in firebase
 * 
 * @param {string} path - the path, where the data should be edited in firebase
 * @param {object} data - an object, that contains all the key-value-pairs that should replace the previous object in firebase
 */
async function putData(path = "", data = {}) {
  if (document.getElementById("overviewOverlay")) {
    if (!document.getElementById("overviewOverlay").classList.contains("d-none")) {
      data = data.subtasks;
    }
  }
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data)
  });
  await init();
  return resonseToJson = await response.json();
}


/**
 * This function changes edited data in firebase
 * 
 * @param {string} path - the path, where the data should be deleted in firebase
 */
async function deleteData(path = "") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
  await init();
  return resonseToJson = await response.json();
}
