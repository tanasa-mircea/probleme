let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[1].value,
        inputVector = [0,1,2,3,4,5],
        // inputVector = input.split(''),
        vectorLength = inputVector.length,
        // numberOfPositions = event.target[0].value;
        numberOfPositions = 2,
        prevIndex = 0, temp

    for (let index = 0; index < vectorLength; index++) {
        debugger
        if (index + numberOfPositions < vectorLength) {
            temp = inputVector[index + numberOfPositions];
            // inputVector[index + numberOfPositions] = inputVector[index];
        } else {
            temp = inputVector[index + numberOfPositions - vectorLength];
            // inputVector[index + numberOfPositions - vectorLength] = inputVector[index];
        }
        
        // inputVector[index] = temp;
        console.log('index ', index);
        console.log('temp ', temp);
    }

    console.log(`Shifted sequence ${inputVector}`);
};



window.addEventListener('submit', formSubmit);