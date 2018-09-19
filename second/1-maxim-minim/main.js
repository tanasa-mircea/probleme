let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(','),
        min,
        max = 0;

        console.log(`Input vector is ${inputVector}`)

    for (let index = 0; index < inputVector.length; index++) {
        if (+inputVector[index] > max) {
            max = inputVector[index];
        }

        if (!min || +inputVector[index] < min) {
            min = inputVector[index];
        }
    }

    console.log(`Min is ${min} and max is ${max}`);


};

window.addEventListener('submit', formSubmit);