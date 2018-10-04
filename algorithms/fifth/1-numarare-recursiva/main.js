let resultElement, input, inputVector, searchedNumber, count;

function contentLoadedHandler() {
    resultElement = document.getElementById('count');
}

function formSubmit(event) {
    event.preventDefault();
    input = event.target[0].value;
    inputVector = input.split(',').map(n => +n);
    searchedNumber = +event.target[1].value;  

    count = recursiveCount(inputVector, searchedNumber, 0, 0);
    resultElement.innerHTML = count;
};

function recursiveCount(vector, number, accumulator, index) {
    if (vector[index] === number) {
        accumulator++;
    }

    if (index > vector.length) {
        return accumulator
    } else {
        return recursiveCount(vector, number, accumulator, ++index)
    }
}

window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);
