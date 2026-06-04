// contactsInteractions.js
// contact click, edit, delete & input-filter logic (split from contacts.js)

/**
 * This function redirects to different functions that are used to display the clicked contact 
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function contactClicked(indexContact) {
    if (window.innerWidth <= 900) {
        document.getElementById("addresbookHideMobile").classList.add("d-none");
        document.getElementById("contactFocus").style.display = "flex";
        document.getElementById("addNewContactBtnMobile").classList.add("d-none");
        document.getElementById("btnsMenuMobile").classList.remove("d-none");
        document.getElementById("arrowBackwardsMobile").classList.remove("d-none");
    }
    clearActiveContacts();
    highlightContact(indexContact);
    updateFocusedContact(indexContact);
    document.getElementById("menuEditDeleteMobile").innerHTML = getContactsMenuMobileTemplate(indexContact)
}


/**
 * This function closes the focused contact and shows the addressbook again
 */
function mobileArrowBackwards() {
    document.getElementById("contactFocus").style.display = "none";
    document.getElementById("addresbookHideMobile").classList.remove("d-none");
    document.getElementById("btnsMenuMobile").classList.add("d-none");
    document.getElementById("addNewContactBtnMobile").classList.remove("d-none");
}


/**
 * This function toggles the visibilty of the delete-/edit-contact-menu for mobile
 */
function toggleEditDeleteMenuMobile() {
    document.getElementById("menuEditDeleteMobile").classList.toggle("d-none");
    document.getElementById("overlayInvisible").classList.toggle("d-none");
}


/**
 * This function adds the 'contact-clicked'-class to the clicked contact (userfeedback)
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function highlightContact(indexContact) {
    document.getElementById("id" + indexContact).classList.add("contact-clicked");
}


/** 
 * This function shows the clicked contact in a large view
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function updateFocusedContact(indexContact) {
    let focusedContactRef = document.getElementById("focusedContactInformation");
    focusedContactRef.innerHTML = "";
    setTimeout(() => {
        focusedContactRef.innerHTML = getFocusedContactTemplate(indexContact);
        profileBadgeColor("focusedProfileBadge", indexContact);
        focusedContactRef.classList.add("animation-focused-contact");
        if (indexContact == indexContactUser) {
            adjustUserContact("idFocusedName");
            document.getElementById("deleteBtnContacts").classList.add("d-none");
        }
    }, 250)
    focusedContactRef.classList.remove("animation-focused-contact");
}


/**
 * This function reads out the data of the add-contact-form and sends it to firebase to replace the previous contacts-data
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
async function saveEditContact(indexContact) {
    let contactName = validateNameInput("addContactName");
    let contactMail = validateMailInput("addContactMail");
    let phoneFilled = document.getElementById("addContactPhone").value.trim() !== "";
    if (indexContact === indexContactUser) {
        saveEditContactUser();
    } else if (contactName !== "" && contactMail !== "" && phoneFilled) {
        await updateContactData(indexContact, contactName, contactMail);
    } else { checkContactsInputs() }
    if (!phoneFilled) { contactsPhoneRequirementUnfullfilled() }
}


/**
 * This function disables the save-button and sends the edited contact-data to firebase
 *
 * @param {number} indexContact - the index of the contact in the contacts-array
 * @param {string} contactName - the validated contact name
 * @param {string} contactMail - the validated contact email
 */
async function updateContactData(indexContact, contactName, contactMail) {
    disableButton("contactsOverlaySave");
    await putData("/contacts/" + contacts[indexContact].url, {
        "name": contactName,
        "mail": contactMail,
        "phone": document.getElementById("addContactPhone").value.trim(),
        "color": contacts[indexContact].color
    });
    contactSuccessfully("Edited", indexContact);
}


/**
 * This function checks if the inputs are valide and saves the edited contact
 */
async function saveEditContactUser() {
    let userName = validateNameInput("addContactName");
    let userMail = validateMailInput("addContactMail");
    if (userName !== "" && userMail !== "" && document.getElementById("addContactPhone").value.trim() !== "") {
        await editContactUser(userName, userMail);
        contactSuccessfully("Edited", indexContactUser);
    } else { checkContactsInputs() }
    if (document.getElementById("addContactPhone").value.trim() == "") { contactsPhoneRequirementUnfullfilled(); }
}


/**
 * This function sends the data of the add-contact-form to firebase to replaces the previous data (for users and contacts)
 * 
 * @param {string} userName - the name of the edited user
 * @param {string} userMail - the mail address of the edited user
 */
async function editContactUser(userName, userMail) {
    await putData("/users/" + users[currentUser].url, {
        "name": userName,
        "mail": userMail,
        "password": users[currentUser].password
    });
    await putData("/contacts/" + contacts[indexContactUser].url, {
        "name": userName,
        "mail": userMail,
        "phone": document.getElementById("addContactPhone").value.trim(),
        "color": contacts[indexContactUser].color
    });
}


/**
 * This function sends the path of the contact that should be deleted to firebase
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
async function deleteContact(indexContact) {
    await deleteData("/contacts/" + contacts[indexContact].url);
    successfullMsg("contactSuccesfullyDeleted");
    document.getElementById("focusedContactInformation").innerHTML = "";
    initContacts();
    if (window.innerWidth <= 1000) {
        mobileArrowBackwards();
    }
}


/**
 * This function checks if the pressed key is a N umber and returns it if true.
 * Like this, only numbers (and "+") are valide inputs
 */
function onlyAllowNumbers(event) {
    if (!isNaN(event.key) || event.key == "Backspace") {
        return event.key;
    } else if (event.key == "+" && document.getElementById("addContactPhone").value.includes("+") == false) {
        return event.key;
    } else {
        event.preventDefault()
    }
}


/**
 * This function checks if the pressed key is a not space and returns it if true.
 * Furthermore it only returns '@' if the input does not already contain it.
 */
function onlyAllowMailAddress(event) {
    if (event.key == " ") {
        event.preventDefault();
    } else if (event.key == "@" && document.getElementById("addContactMail").value.includes("@")) {
        event.preventDefault();
    } else {
        return event.key;
    }
}
