let wrapperElement, newNumber, squareSide;
let squareElement = document.createElement('div');
squareElement.classList.add('square');

let iterationsNumber = 4,
    initSquareSize = 400;

function contentLoadedHandler() {
    wrapperElement = document.getElementById('wrapper');
    generateFractal(1);
}

function generateFractal(number) {
    paintSquares(0, number, 0, 0);

    newNumber = number * 4;
    if (newNumber <= Math.pow(4, iterationsNumber)) {
        return generateFractal(newNumber);
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

    squareSide = (initSquareSize / Math.sqrt(number)) * 100 / initSquareSize;
    squareElement.style.height = initSquareSize / Math.sqrt(number) + 'px';
    squareElement.style.width = initSquareSize / Math.sqrt(number) + 'px';
    squareElement.style.borderColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16);

    if (number === 1) {
        squareElement.style.left = '50%';
        squareElement.style.top = '50%';
        squareElement.style.borderWidth = '10px';
    } else {
        squareElement.style.borderWidth = `${10 - Math.sqrt(number)}px`;
        squareElement.style.left = squareSide / 2 +  index * squareSide  + '%';
        squareElement.style.top = squareSide / 2 + rowCount  * squareSide  +  '%';
    }
    let clone = squareElement.cloneNode();

    wrapperElement.appendChild(clone);

    setTimeout(() => {
        clone.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 500 + Math.random() * 1000);

    return paintSquares(++count, number, ++index, rowCount);
}

window.addEventListener("DOMContentLoaded", contentLoadedHandler);
