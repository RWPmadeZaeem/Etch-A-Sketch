let containerDiv = document.querySelector('.container');
let userValue = document.getElementById('user-number');
let userSubmit = document.getElementById('user-submit');
let promptText = document.getElementById('prompt');
let copyInput = document.getElementById('copy-input');
let clearButton = document.getElementById('clear-button');

userValue.addEventListener('focus', entryHint);
userValue.addEventListener('keyup', duplicateGrid);
userSubmit.addEventListener('click', makeGrid);
clearButton.addEventListener('click', clearGrid);

// Run makeGrid and draw functions on page load to make default 10x10 grid that is drawable
makeGrid();

// Indicates to the user it's a square grid Y x Y
function duplicateGrid() {
    let userGrid = userValue.value;
    copyInput.textContent = "x " + userGrid;
}

// Save space and clutter on the page with appear/disappearing user instructions for grid size
function entryHint() {
    promptText.textContent = "Enter a number between 2 and 99.";
}

// Makes nested divs that are organized into a grid using CSS flexbox.
// Invalid entries get a warning, the default grid is 10x10, else it is a user-defined resolution.
function makeGrid() {
    let number = userValue.value;
    if (number < 2 || number > 99 || isNaN(number)) {
        promptText.textContent = "Make sure it's a number from 2 to 99!";
    } else {
        promptText.textContent = "";
        copyInput.textContent = "";
        userValue.value = "";
        containerDiv.innerHTML = "";

        for (let i = 0; i < number; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            containerDiv.appendChild(row);
            for (let k = 0; k < number; k++) {
                let column = document.createElement('div');
                column.classList.add('column');
                row.appendChild(column);
            }
        }

        // Call the draw function here to allow drawing after the new grid is made
        draw();
    }
}

// Adds an event listener to all divs with class "column"
// Added in the global scope to allow drawing on page load
// "this" refers to the element triggering the mouseover event listener
function draw() {
    let columns = document.getElementsByClassName("column");
    for (let i = 0; i < columns.length; i++) {
        columns[i].addEventListener("mouseover", changeColor);
    }
}

function changeColor() {
    let blackRadio = document.getElementById('black-pen');
    let redRadio = document.getElementById('red-pen');
    let blueRadio = document.getElementById('blue-pen');
    let rainbow = document.getElementById('rainbow');
    let eraserRadio = document.getElementById('eraser');

    if (blackRadio.checked) {
        this.style.backgroundColor = '#2e2b2b';
    } else if (redRadio.checked) {
        this.style.backgroundColor = '#da2d2d';
    } else if (blueRadio.checked) {
        this.style.backgroundColor = "#3f33dd";
    } else if (eraserRadio.checked) {
        this.style.backgroundColor = '';
    } else if (rainbow.checked) {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        this.style.backgroundColor = "#" + randomColor;
    }
}

// Eraser function loops through all column divs and sets the background to "" in the DOM
function clearGrid() {
    let columns = document.getElementsByClassName("column");
    for (let i = 0; i < columns.length; i++) {
        columns[i].style.backgroundColor = '';
    }
}
