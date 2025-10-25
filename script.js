//         I, Smriti Manandhar (Student ID: 000922444), hereby certify that this work is my own, 
//         and it has been completed independently for the purposes of this assignment. 
//         I confirm that all the solutions provided are my original work.
// Accessing DOM elements
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
let score = 0;

// Default bubble speed
let speed = 2;
const speedControl = document.getElementById("speedControl");
const speedValue = document.getElementById("speedValue");

// Update speed when the slider is adjusted
speedControl.addEventListener("input", (event) => {
    speed = parseInt(event.target.value);
    speedValue.textContent = speed;
});

// Function to create a new bubble
function createBubble() {
    let bubble = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    let size = Math.random() * 30 + 20; // Random size between 20 and 50
    let x = Math.random() * (window.innerWidth - size * 2) + size; // Random X position
    let y = window.innerHeight; // Start position at the bottom
    
    // Set attributes for the bubble (position and size)
    bubble.setAttribute("cx", x);
    bubble.setAttribute("cy", y);
    bubble.setAttribute("r", size);
    bubble.setAttribute("class", "bubble");

    // Event listener for when the bubble is clicked (pop the bubble)
    bubble.addEventListener("pointerdown", (event) => {
        event.preventDefault(); // Prevent unwanted interactions
        score++; // Increase score
        scoreDisplay.textContent = score; // Update score display
        bubble.remove(); // Remove the bubble from the game area
    });

    // Add the bubble to the game area and start its animation
    gameArea.appendChild(bubble);
    animateBubble(bubble);
}

// Function to animate a bubble (move it upwards)
function animateBubble(bubble) {
    let interval = setInterval(() => {
        let currentY = parseFloat(bubble.getAttribute("cy"));
        if (currentY <= -50) { // If bubble moves off-screen, remove it
            bubble.remove();
            clearInterval(interval); // Stop the animation
        } else {
            bubble.setAttribute("cy", currentY - speed); // Move bubble upwards
        }
    }, 20);
}

// Event listener for the reset button (reset the game)
document.getElementById("resetButton").addEventListener("click", () => {
    score = 0; // Reset the score
    scoreDisplay.textContent = score; // Update score display
    gameArea.innerHTML = ""; // Remove all bubbles from the game area
});

// Start creating bubbles at regular intervals (every 1000 ms)
setInterval(createBubble, 1000);
