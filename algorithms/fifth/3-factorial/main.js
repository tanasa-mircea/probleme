let resultElement, input, inputVector, number, result;

function contentLoadedHandler() {
    resultElement = document.getElementById('result');
}

function formSubmit(event) {
    event.preventDefault();
    number = +event.target[0].value;

    result = recursiveFactorial(number, 1, 1);
    resultElement.innerHTML = result;
};

function recursiveFactorial(number, result, index) {
    if (index > number) {
        return result;
    } else {
        result = result * index;
        return recursiveFactorial(number, result, ++index);
    }
}


window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);
