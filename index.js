// Get the formSubmission button
var button = document.getElementById('formSubmission');
const form = document.getElementById("event-form");
const formAlert = document.getElementById("form-alert");
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".navLinks");//Contains different navLinks

console.log(sections);
console.log(navLinks);

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
        //see if the loaded email is valid
        validateEmail(savedData.email);
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
        if (value == "" && key != "requests") formFilled = false;
        formJSON[key] = value;
    }


    //show the alert if it't not filled
    if (!formFilled) {
        formAlert.removeAttribute('hidden');
        formAlert.setAttribute('class', 'alert alert-warning');
        formAlert.innerHTML = 'Please ensure all fields are filled';
    } else {
        formAlert.removeAttribute('hidden');
        formAlert.setAttribute('class', 'alert alert-success');
        formAlert.innerHTML = 'Form submitted! Thank you!';
    }

    //save form to local storage
    formJSON = JSON.stringify(formJSON);
    localStorage.setItem("formData", formJSON);
    console.log("Form data stored: ", formJSON);
})

//change the navigation bar on scroll
window.addEventListener('scroll', updateLinks)


//Function written by Team 5- This will find the section which takes up the most amount of the window
function getMostVisibleSection() {
    //Set initial variables to nothing
    let mostVisible = null;
    let maxVisibleArea = 0;

    //Checks the height for each section
    sections.forEach((section) => {//Loops through each section
        const rect = section.getBoundingClientRect();//Get size of each section

        //Checks the visible height and returns 0 or the amount of the section which is on the screen
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));

        //Checks if a sections visibility is greater than the maxVisibleArea variable which starts at 0
        if (visibleHeight > maxVisibleArea) {
            maxVisibleArea = visibleHeight;
            mostVisible = section;//Changes which section is considered most visible
        }
    })

    if (window.scrollY < 100) {
        mostVisible = document.getElementById("registration")
    }

    //Returns the most visible section
    return mostVisible;
}

//function written by team 5 - updates the links in the navbar
function updateLinks() {
    //Gets most visible section
    const mostVisibleSection = getMostVisibleSection();
    const sectionId = mostVisibleSection.id;//Collects the most visible section's id

    //Removes the underline from each navLink
    navLinks.forEach((link) => {
        link.className = "navLinks text-white text-decoration-none";
        if (link.getAttribute('href') == `#${sectionId}`) {
            console.log("Underlining");
            link.className = "navLinks text-white text-decoration-underline";
        }
    });
}