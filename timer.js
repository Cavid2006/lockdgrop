// Improved function to append number to the display
function appendNumber(number) {
    const display = document.getElementById('calc-display');
    if (display.value === 'Error') {
        display.value = ''; // Clear 'Error' before adding new numbers
    }
    display.value += number;
}

// Improved function to set operator
function setOperator(operator) {
    const display = document.getElementById('calc-display');
    if (display.value !== 'Error') {
        display.value += ` ${operator} `; // Only add operator if there's no error
    }
}

// Function to clear the display
function clearDisplay() {
    document.getElementById('calc-display').value = '';
}

// Improved function to calculate result securely
function calculateResult() {
    const display = document.getElementById('calc-display');
    try {
        // Using safer evaluation than eval
        display.value = Function('"use strict";return (' + display.value + ')')();
    } catch (error) {
        display.value = 'Error'; // Display error on invalid input
    }
}

// Function to toggle calculator display
function toggleCalculator() {
    const calculator = document.getElementById('calculator');
    calculator.style.display = calculator.style.display === 'none' ? 'block' : 'none';
}

// Improved event listener addition with check
if (document.querySelector('.calculator-icon')) {
    document.querySelector('.calculator-icon').addEventListener('click', toggleCalculator);
} else {
    console.error('Calculator icon not found.');
}

// Making the calculator draggable
function makeDraggable() {
    const element = document.getElementById("calculator");
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementById("calculator-header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById("calculator-header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Call makeDraggable on window load to ensure HTML is fully loaded
window.onload = function() {
    makeDraggable();
};
