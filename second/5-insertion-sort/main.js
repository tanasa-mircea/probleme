let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(',').map(function(el) {
            return +el;
        })

    for (let index = 0; index < inputVector.length; index++) {
        for (let j = index - 1; j >= 0; j--) {
            if (inputVector[j + 1] < inputVector[j]) {
                let temp = inputVector[j + 1];
                inputVector[j + 1] = inputVector[j];
                inputVector[j] = temp;
                console.log('inputVector ', inputVector);
            } else {
                break;
            }
        }
    }

    console.log(`new vector: ${inputVector}`);
};

window.addEventListener('submit', formSubmit);