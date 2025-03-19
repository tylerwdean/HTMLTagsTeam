// Get the formSubmission button
var button = document.getElementById('formSubmission');
const form = document.getElementById("event-form");
const formAlert = document.getElementById("form-alert");

// Default form submission button is disabled
button.disabled = true;

function validateEmail(myInput) {
    // Regular expression to check for valid email
    var regularExpression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (regularExpression.test(myInput)) { // If email input passes the REGEX
        // Deletes the warning below the email input
        document.getElementById("output").textContent = null;

        // Enables the submit button!
        button.disabled = false;

    } else { // If email input doesn't pass the REGEX
        // Display "Invalid email" text
        document.getElementById("output").textContent = "Invalid email";

        // Ensure the button is disabled
        // Used if a correct email was inputted then removed
        button.disabled = true;
    }
}

// Loads items from localStorage when the page is loaded
// If item not in local storage: returns empty string
document.addEventListener('DOMContentLoaded', function () {
    try {
        const savedForm = localStorage.getItem("formData");
        const savedData = JSON.parse(savedForm);
        console.log("Form data pulled from storage: ", savedForm);

        for (const [key, value] of Object.entries(savedData)) {
            const elements = document.getElementsByName(key)

            for (const element of elements) {
                element.value = value || "";
            }
        }
    } catch (error) {
        console.error(error);
    }
});

//store and validate inputs on submits
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Form submitted");

    //check for all the items to have some content
    let formFilled = true;

    //check the event dropdown
    const formData = new FormData(form);

    let formJSON = {};
    for (const [key, value] of formData.entries()) {
        if (key == 'event' && value == "default") formFilled = false;
        if (value == "" || key == "requests") formFilled = false;
        formJSON[key] = value;
    }


    //show the alert if it't not filled
    if (!formFilled) {
        formAlert.removeAttribute('hidden')
    } else {
        formAlert.hidden = true;
    }

    //save form to local storage
    formJSON = JSON.stringify(formJSON);
    localStorage.setItem("formData", formJSON);
    console.log("Form data stored: ", formJSON);
})
