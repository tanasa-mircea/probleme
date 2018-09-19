let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(','),
        newVector = [],
        limit = event.target[1].value;

    for (let index = 0; index < inputVector.length; index++) {
        if (inputVector[index] >= limit) {
            newVector.push(inputVector[index]);
        }
    }

    console.log(`new vector: ${newVector}`);
};

window.addEventListener('submit', formSubmit);