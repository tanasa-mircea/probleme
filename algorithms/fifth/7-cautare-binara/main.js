let resultElement, vector, number;

function contentLoadedHandler() {
    resultElement = document.getElementById('result');
}

function formSubmit(event) {
    event.preventDefault();
    vector = event.target[0].value.split(',').map(n => +n);
    number = +event.target[1].value; 
    
    result = binarySearch(vector, number);
    resultElement.innerHTML = result;
};

function binarySearch(vector, number) {
    let vectorMiddle = Math.floor((vector.length - 1) / 2),
        newVector;

    if (vector[vectorMiddle] === number) {
        return true;
    }

    if (number < vector[vectorMiddle]) {
        newVector = vector.slice(0, vectorMiddle);
    }

    if (number > vector[vectorMiddle]) {
        newVector = vector.slice(vectorMiddle + 1);
    }

    if (newVector.length === 0) {
        return false;
    }

    if (newVector.length === 1 && newVector[0] !== number) {
        return false;
    }

    return binarySearch(newVector, number)
}


window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);
