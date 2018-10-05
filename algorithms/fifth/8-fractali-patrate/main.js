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
        translateOffset = (600 / number) * 100 / 600;

    console.log(`rowCount ${ rowCount }, index ${ index }, count ${ count }, topIndex ${ topIndex }, number ${ number }, translateOffset ${ translateOffset }`);

    squareElement.style.height = 600 / number + 'px';
    squareElement.style.width = 600 / number + 'px';
    squareElement.style.left = middleLeft + index * (middleLeft / number) + (index * 5) + '%';
    squareElement.style.top = middleLeft + rowCount  * (middleLeft / number) + (topIndex * 5) +  '%';
    wrapperElement.appendChild(squareElement.cloneNode());

    return paintSquares(++count, number, ++index, rowCount);
}

window.addEventListener("DOMContentLoaded", contentLoadedHandler);
