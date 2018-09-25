let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(','),
        vectorLength = inputVector.length;

    for (let index = 0; index < inputVector.length / 2; index++) {
        let temp = inputVector[index];
        inputVector[index] = inputVector[vectorLength - 1 - index];
        inputVector[vectorLength - 1 - index] = temp;
    }

    console.log(`Inverted vector ${inputVector}`);
};

window.addEventListener('submit', formSubmit);