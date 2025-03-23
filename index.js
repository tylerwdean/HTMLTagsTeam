// Get the formSubmission button
var button = document.getElementById('formSubmission');

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
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('firstName').value = localStorage.getItem('firstName') || '';
    document.getElementById('confirmationSaint').value = localStorage.getItem('confirmationSaint') || '';
    document.getElementById('lastName').value = localStorage.getItem('lastName') || '';
    document.getElementById('email').value = localStorage.getItem('email') || '';
});

// gets the items in eventform when the submit button is clicked
document.getElementById('eventForm').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Save the form data to localStorage
    localStorage.setItem("firstName", this.firstName.value);
    localStorage.setItem("confirmationSaint", this.confirmationSaint.value);
    localStorage.setItem("lastName", this.lastName.value);
    localStorage.setItem("email", this.email.value);   
});