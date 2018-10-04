let resultElement, input, inputVector, length, subsets;

function contentLoadedHandler() {
    resultElement = document.getElementById('count');
}

function formSubmit(event) {
    event.preventDefault();
    length = +event.target[0].value;


    subsets = recursiveGeneration(length, [generateFirstValue(length)], 1);
    console.log('subsets', subsets)
};

function generateFirstValue(length) {
    let firstValue = [];

    for (let index = 0; index < length; index++) {
        firstValue.push(0);
    }

    return firstValue
}

function recursiveGeneration(length, accumulator, index) {
    let newSubset = binaryAdd(accumulator[index - 1]);
    
    if (newSubset.length > length) {
        return accumulator;
    } else {
        accumulator.push(binaryAdd(accumulator[index - 1]));
        return recursiveGeneration(length, accumulator, ++index);
    }
}

function binaryAdd(vectorParam) {
    let isDone = false,
        index = 0,
        vector = vectorParam.slice();

    while (!isDone) {
        if (vector[index] + 1 > 1) {
            vector[index] = 0;
            index++;
        } else {
            vector[index] = 1;
            isDone = true;
        }
    }
    
    return vector;
}

window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);
