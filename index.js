// Get the formSubmission button
var button = document.getElementById('formSubmission');
const form = document.getElementById("event-form");
const formAlert = document.getElementById("form-alert");
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".navLinks");//Contains different navLinks
let currentPic = 0;


//change the navigation bar on scroll
window.addEventListener('scroll', updateLinks)
document.getElementById('cycle-img').addEventListener('click', (e) => cycleImage(e, 1));
document.getElementById('back-cycle-img').addEventListener('click', (e) => cycleImage(e, 0));
document.getElementById('scroll-top').addEventListener('click', (e) => {
    e.preventDefault();
    scrollToTop();
});

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

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

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

//function based on team 5's work, but heavily modified for our project
function updateLinks() {
    //Gets most visible section
    const mostVisibleSection = getMostVisibleSection();
    const sectionId = mostVisibleSection.id;//Collects the most visible section's id

    //Removes the underline from each navLink
    navLinks.forEach((link) => {
        link.className = "navLinks text-white text-decoration-none";
        //if the link is the one for the most visible section, underline it
        if (link.getAttribute('href') == `#${sectionId}`) {
            link.className = "navLinks text-white text-decoration-underline";
        }
    });
}

function cycleImage(e, cycleForward) {
    e.preventDefault();

    if (cycleForward == 1) {
        currentPic = (currentPic + 1) % 3;
    } else {
        currentPic = (currentPic + 2) % 3; // Same as (currentPic - 1 + 3) % 3
    }

    const link = document.getElementById('fortitude-link');
    const img = document.getElementById('fortitude-img');
    let imgArray = null;
    console.log("cylcing image");
    //get the JSON data to load the images
    fetch('imageLinks.json')
        .then((response) => response.json())
        .then((json) => {
            imgArray = json;
            console.log(imgArray);
            link.setAttribute('href', imgArray[currentPic].src);
            img.setAttribute('src', imgArray[currentPic].url);
        });
}

const loadButton = document.getElementById("load-section-btn");

loadButton.addEventListener('click', (e) => {
    e.preventDefault();
    loadSection();
    loadButton.hidden = true;
})



function loadSection() {
    const newSection = document.createElement('section');
    newSection.className = "mb-5";
    newSection.id = "dynamic-section";
    newSection.innerHTML = `
        <hr/>
        <h3>Surprise!</h3>
        <p>We actually just ran out of more content to load, come back again soon!</p>
        <button class="btn btn-success mb-5" onclick="removeSection(this)">Remove</button>
    `;
    document.getElementById('main').appendChild(newSection);
}

function removeSection(button) {
    // Find the parent section and remove it
    const sectionToRemove = button.closest('section');
    sectionToRemove.remove();
    loadButton.hidden = false;
}

//pause play button
const pausePlayButton = document.getElementById("PausePlay");
const video = document.getElementById("video");

pausePlayButton.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        pausePlayButton.textContent = "Pause";
    }
    else {
        video.pause();
        pausePlayButton.textContent = "Play";
    }
});

const slider = document.getElementById("video_volume");

video_volume.addEventListener("input", () => {
    video.volume = slider.value;
})

function handleCaptions(videoElement, captions) {
    const captionContainer = document.getElementById("captionContainer");
    
    // Listen for time updates on the video
    videoElement.addEventListener('timeupdate', function() {
        // Get current video time
        const currentTime = videoElement.currentTime;
        
        // Find matching caption for current time
        const currentCaption = captions.find(caption => 
            currentTime >= caption.start && currentTime <= caption.end
        );
        
        // Display the caption if there's an active one
        if (currentCaption) {
            captionContainer.textContent = currentCaption.text;
        } else {
            captionContainer.textContent = ""; // Clear if no caption is active
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById("video");
    
    // Fetch captions from JSON file
    fetch('./captions.json')
        .then(response => response.json())
        .then(captions => {
            handleCaptions(videoElement, captions);
    })
    .catch(error => console.error("Error loading captions:", error));
});