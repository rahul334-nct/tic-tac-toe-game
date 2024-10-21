let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let messageDiv = document.createElement('div'); // Create a div to show winner message
document.body.insertBefore(messageDiv, document.body.firstChild); // Add it at the top of the body

let turnX = true; // to track if it's X's turn

const WinPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to check if a player has won
const checkWin = () => {
    let boxTexts = Array.from(boxes).map(box => box.innerText);
    for (let pattern of WinPatterns) {
        let [a, b, c] = pattern;
        if (boxTexts[a] && boxTexts[a] === boxTexts[b] && boxTexts[a] === boxTexts[c]) {
            // Highlight winning boxes
            highlightWinningBoxes([a, b, c]);
            return boxTexts[a]; // Return the winner (X or O)
        }
    }
    return null;
};

// Function to highlight winning boxes
const highlightWinningBoxes = (winningBoxes) => {
    winningBoxes.forEach(index => {
        boxes[index].classList.add('win'); // Add 'win' class to the winning boxes
    });
};

// Add event listener to each box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Only allow the move if the box is empty
            box.innerText = turnX ? "X" : "O"; // Assign X or O based on turn
            turnX = !turnX; // Switch turns
            
            let winner = checkWin();
            if (winner) {
                displayWinnerMessage(`${winner} wins!`); // Show winner message
                boxes.forEach(box => box.style.pointerEvents = "none"); // Disable further clicks
            }
        }
    });
});

// Function to display winner message
const displayWinnerMessage = (message) => {
    messageDiv.innerText = message;
    messageDiv.classList.add('winner-message');
};

// Reset the game
resetBtn.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerText = ""; // Clear all boxes
        box.classList.remove('win'); // Remove the win class
        box.style.pointerEvents = "auto"; // Enable clicking again
    });
    messageDiv.innerText = ""; // Clear winner message
    turnX = true; // Reset to X's turn
});
