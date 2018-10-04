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
    dataMatrix = fillMatrix(number - 2, dataMatrix);
    console.log('dataMatrix ', dataMatrix);   
};

function paintRow(row, index) {
    if (index > row.length) {
        resultElement.appendChild(breakElement.cloneNode())
        return;
    }

    resultElement.appendChild(plainSquare.cloneNode());
    return paintRow(row, ++index)
}

function fillMatrix(index, dataMatrix) {
    if (index < 0) {
        return dataMatrix
    };

    currentRow = dataMatrix[index];
    dataMatrix.push(currentRow);
    paintRow(currentRow, 1);
    return fillMatrix(--index, dataMatrix);
}

function generateMatrix(index, number, matrix) {
    if (index > number) {
        return matrix;
    }

    matrix.push(generateRow(index, []))
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
