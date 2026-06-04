const addressBookContentRef = document.getElementsByClassName("contacts-letter");


/**
 * This function is the inital function, when contacts.html is loading and executes the init()-function and furher necessary contacts-functions
 */
async function initContacts() {
    await init();
    renderAddressBook();
    clearActiveContacts();
    hideAllUsers("id");
    adjustUserContact("idName");
    hideNotUsedLetters();
    adjustToWindowSize();
}


/**
 * This function checks the windows inner width and toggles the visibilty of the section "contactFocus"
 */
function adjustToWindowSize() {
    if (window.innerWidth <= 900) {
        if (document.querySelector('.contact-clicked')) {
            document.getElementById("addresbookHideMobile").classList.add("d-none");
            document.getElementById("contactFocus").style.display = "flex";
            document.getElementById("btnsMenuMobile").classList.remove("d-none");
        } else {
            document.getElementById("addresbookHideMobile").classList.remove("d-none");
            document.getElementById("contactFocus").style.display = "none";
            document.getElementById("btnsMenuMobile").classList.add("d-none");
        }
    } else {
        document.getElementById("addresbookHideMobile").classList.remove("d-none");
        document.getElementById("contactFocus").style.display = "flex";
    }
}


/**
 * This function clears the contacts-list for each letter and redirects to the function, that fills the list with contacts
 */
function renderAddressBook() {
    for (let indexLetter = 0; indexLetter < addressBookContentRef.length; indexLetter++) {
        addressBookContentRef[indexLetter].innerHTML = "";
    }
    renderContacts();
}


/**
 * This function extracts the first letter of each contacts name and adds the contact to the corresponding letter (with a template)
 * After that, the contacts profile-badge get its corresponding color
 */
function renderContacts() {
    for (let indexContact = 0; indexContact < contacts.length; indexContact++) {
        let letter = contacts[indexContact].name.charAt(0).toUpperCase();
        document.getElementById("contactsLetter" + letter).innerHTML += getAddressbookContactTemplate(indexContact);
        profileBadgeColor("profileBadge" + indexContact, indexContact);
    }
}


/**
 * This function is executed after the address book finished rendering and iterates through each letter and hides it, if it does not contain any contact
 */
function hideNotUsedLetters() {
    const letterContentRef = document.getElementsByClassName("address-book-letter");
    for (let indexLetter = 0; indexLetter < letterContentRef.length; indexLetter++) {
        if (addressBookContentRef[indexLetter].innerHTML == "") {
            letterContentRef[indexLetter].classList.add("d-none");
        } else {
            letterContentRef[indexLetter].classList.remove("d-none");
        }
    }
}


/**
 * This function removes the 'contact-clicked'-class from all contacts
 */
function clearActiveContacts() {
    document.querySelectorAll('.contact-clicked').forEach(contact => contact.classList.remove("contact-clicked"));
}


/**
 * This function opens the ContactsOverlay (for addding a new or editing an existing contact), background-overlay and overlay-animations)
 */
function openContactsOverlay() {
    clearContactForm();
    document.getElementById("overlayBg").classList.remove("d-none");
    document.getElementById("overlayContact").classList.add("animation-open-overlay");
    document.getElementById("overlayContact").classList.remove("animation-close-overlay");
    document.getElementById("overlayContact").classList.remove("d-none");
    setTimeout(function () {
        document.getElementById("overlayContact").classList.remove("animation-open-overlay");
    }, 2400);
}


/**
 * This function opens the ContactsOverlay 
 */
function closeContactsOverlay() {
    document.getElementById("menuEditDeleteMobile").classList.add("d-none");
    document.getElementById("overlayInvisible").classList.add("d-none");
    document.getElementById("overlayContact").classList.add("animation-close-overlay");
    document.getElementById("overlayContact").classList.remove("animation-open-overlay");
    setTimeout(function () {
        document.getElementById("overlayContact").classList.add("d-none");
        document.getElementById("overlayBg").classList.add("d-none");
    }, 250);
    setTimeout(function () {
        document.getElementById("overlayContact").classList.remove("animation-close-overlay");
    }, 2400);
}


/**
 * This function is used, when the user wants to add a new contact instead of editing one.
 * The contacts-overlay adjusts accordingly.
 */
function adjustOverlayToAdd() {
    document.getElementById("overlayTitleH1").innerHTML = "Add contact";
    document.getElementById("overlayTitleP").innerHTML = "Tasks are better with a team!";
    document.getElementById("overlayProfileBadge").style.backgroundColor = "#D1D1D1";
    document.getElementById("overlayProfileBadge").innerHTML = "<img src='../assets/icons/contacts-overlay-profile-badge-anonymous.svg'>";
    document.getElementById("contactsSubmitBtns").innerHTML = getContactsOverlayAddBtnsTemplate();
}


/**
 * This function is used, when the user wants to edit a contact instead of adding a new one.
 * 
 * @param {number} indexContact - the index of the contact in the contacts-array
 */
function adjustOverlayToEdit(indexContact) {
    document.getElementById("overlayTitleH1").innerHTML = "Edit contact";
    document.getElementById("overlayTitleP").innerHTML = "";
    document.getElementById("addContactName").value = contacts[indexContact].name;
    document.getElementById("addContactMail").value = contacts[indexContact].mail;
    document.getElementById("addContactPhone").value = contacts[indexContact].phone;
    profileBadgeColor("overlayProfileBadge", indexContact);
    document.getElementById("overlayProfileBadge").innerHTML = nameAbbreviation(indexContact);
    document.getElementById("contactsSubmitBtns").innerHTML = getContactsOverlayEditBtnsTemplate(indexContact);
}


/**
 * This function clears the input-values of the contact-overlay-form
 */
function clearContactForm() {
    document.getElementById("addContactName").value = "";
    document.getElementById("addContactMail").value = "";
    document.getElementById("addContactPhone").value = "";
}


/**
 * This function reads out the data of the add-contact-form and sends it to firebase to add a new contact
 */
async function addContact() {
    let contactName = validateNameInput("addContactName");
    let contactMail = validateMailInput("addContactMail");
    if (contactName !== "" && contactMail !== "" && document.getElementById("addContactPhone").value.trim() !== "") {
        disableButton("contactsOverlayCreate");
        await postData("/contacts/", {
            "name": contactName,
            "mail": contactMail,
            "phone": document.getElementById("addContactPhone").value.trim(),
            "color": await assignRandomColor(contacts.length + 1)
        });
        contactSuccessfully("Created");
    } else { checkContactsInputs() }
    if (document.getElementById("addContactPhone").value.trim() == "") { contactsPhoneRequirementUnfullfilled() }
}


/**
 * This function redirects to different functions that are used to display the clicked contact 
 * 
 * @param {string} activity - whether the contact should be added or edited
 * @param {number} indexContact - the index of the contact in the contacts-array (or indexContactUser, if the user is edited)
 */
function contactSuccessfully(activity, indexContact) {
    successfullMsg("contactSuccesfully" + activity);
    initContacts();
    closeContactsOverlay();
    if (activity == "Edited") {
        contactClicked(indexContact);
    }
}


/**
 * This function executes the checkFilledInput-functions for each of the inputs
 */
function checkContactsInputs() {
    checkFilledInput("addContactName");
    checkFilledInput("addContactMail");
    checkFilledInput("addContactPhone");
}


/**
 * This function shows the alertPhone, if the contactPhone-input is empty
 */
function contactsPhoneRequirementUnfullfilled() {
    document.getElementById("alertPhone").classList.remove("invisible");
    setTimeout(function () {
        document.getElementById("alertPhone").classList.add("invisible");
    }, 2400);
}

