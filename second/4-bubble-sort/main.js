let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(','),
        hasSwaped;

    do {
        hasSwaped = false;

        for (let index = 0; index < inputVector.length; index++) {
            let current = +inputVector[index],
                next = +inputVector[index + 1];
            
            if (next && current > next) {
                let temp = current;
                inputVector[index] = next;
                inputVector[index + 1] = temp;
                hasSwaped = true;
            }
        }
    } while (hasSwaped);


    console.log(`new vector: ${inputVector}`);
};

window.addEventListener('submit', formSubmit);