let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(',').map(el => +el),
        limit = +event.target[1].value,
        index = 0;

    while (index < inputVector.length) {
        if (inputVector[index] < limit) {
            inputVector.splice(index, 1)
        } else {
            index++;
        }
    }

    console.log(`new vector: ${inputVector}`);
};

window.addEventListener('submit', formSubmit);