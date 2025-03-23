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