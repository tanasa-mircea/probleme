let resultElement, number, dataMatrix, currentRow;
let plainSquare = document.createElement('div');
plainSquare.classList.add('square');
let breakElement = document.createElement('br');

function contentLoadedHandler() {
    resultElement = document.getElementById('result');
}

function formSubmit(event) {
    event.preventDefault();
    number = +event.target[0].value;

    while (resultElement.firstChild) {
        resultElement.removeChild(resultElement.firstChild);
    }

    dataMatrix = generateMatrix(1, number, []);
};

function generateMatrix(index, number, matrix) {
    if (index > number * 2 - 1) {
        return matrix;
    }

    if (index > number) {
        matrix.push(generateRow(number - index % number, []))
    } else {
        matrix.push(generateRow(index, []))
    }

    return generateMatrix(++index, number, matrix);
}

function generateRow(howMany, accumulator) {
    if (accumulator.length >= howMany) {
        resultElement.appendChild(breakElement.cloneNode())
        return accumulator;
    }

    accumulator.push(1);
    resultElement.appendChild(plainSquare.cloneNode());
    return generateRow(howMany, accumulator);
}


window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);
