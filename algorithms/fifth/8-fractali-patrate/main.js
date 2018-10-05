let wrapperElement, newNumber, newIndex, middleLeft = 20;
let squareElement = document.createElement('div');
squareElement.classList.add('square');

function contentLoadedHandler() {
    wrapperElement = document.getElementById('wrapper');
    generateFractal(1);
} 

function generateFractal(number) {
    paintSquares(0, number, 0, 0);

    newNumber = number * 4;
    if (newNumber < 100) {
        return generateFractal(newNumber)
    } else {
        return false;
    }
}

function paintSquares(count, number, index, rowCount) {
    if (count >= number) {
        return false;
    }

    if (index >= Math.sqrt(number)) {
        index = index - Math.sqrt(number);
        rowCount++;
    }

    let topIndex = Math.floor(count / (number / 2)),
        squareSide = (600 / Math.sqrt(number)) * 100 / 600;

    console.log(`rowCount ${ rowCount }, index ${ index }, count ${ count }, topIndex ${ topIndex }, number ${ number }`);

    squareElement.style.height = 600 / Math.sqrt(number) + 'px';
    squareElement.style.width = 600 / Math.sqrt(number) + 'px';
    
    if (number === 1) {
        squareElement.style.left = '50%';
        squareElement.style.top = '50%';
        squareElement.style.transform = 'translate(-50%, -50%)';
    } else {
        squareElement.style.left = squareSide / 2 +  index * squareSide  + '%';
        squareElement.style.top = squareSide / 2 + rowCount  * squareSide  +  '%';
    }

    wrapperElement.appendChild(squareElement.cloneNode());

    return paintSquares(++count, number, ++index, rowCount);
}

window.addEventListener("DOMContentLoaded", contentLoadedHandler);
