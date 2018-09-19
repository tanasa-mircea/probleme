let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(',').map((elem) => {
            return +elem;
        });

    for (let step = 0; inputVector.length - step > 0; step++) {
    
        for (let index = step + 1; index < inputVector.length; index++) {
            if (inputVector[index] && inputVector[step] > inputVector[index]) {
                let temp = inputVector[index];
                inputVector[index] = inputVector[step];
                inputVector[step] = temp;
            }
        }
    }

    console.log(`new vector final : ${inputVector}`);
};

window.addEventListener('submit', formSubmit);