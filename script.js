let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGamebtn = document.querySelector("#newbtn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = false; // false = X's turn, true = O's turn

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Reset game
const resetGame = () => {
    turnO = false; // X always starts
    enableBoxes();
    msgcontainer.classList.add("hide");
};

// Add click events
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

// Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winner");
    }
};

// Show winner
const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");

    // highlight winning boxes
    pattern.forEach((index) => {
        boxes[index].classList.add("winner");
    });

    disableBoxes();
};

// Check winner or draw
const checkWinner = () => {
    let isDraw = true;

    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val, pattern);
                return; // winner found
            }
        }
    }

    // check draw (if all boxes filled and no winner)
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        msg.innerText = "It's a Draw!";
        msgcontainer.classList.remove("hide");
        disableBoxes();
    }
};

// Button events
newGamebtn.addEventListener("click", resetGame);