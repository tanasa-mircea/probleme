let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[1].value,
        inputVector = input.split(','),
        vectorLength = inputVector.length,
        numberOfPositions = +event.target[0].value;

    for (let i = 0; i < numberOfPositions; i++) {
        let temp,
            prev;

        for (let j = 0; j < vectorLength + 1; j++) {
            if (j < vectorLength) {
                temp = inputVector[j];
            }

            if (prev !== undefined) {
                if (j === vectorLength) {
                    inputVector[0] = prev;
                } else {
                    inputVector[j] = prev;
                }
            }

            prev = temp;
        }
    }

    console.log(`Shifted sequence ${inputVector}`);

};



window.addEventListener('submit', formSubmit);