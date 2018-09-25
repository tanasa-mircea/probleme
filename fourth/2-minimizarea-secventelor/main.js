let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(''),
        vectorLength = inputVector.length,
        currentSequenceCount = 0,
        currentSequenceElement = '',
        minimizedSequence = '';

    for (let index = 0; index < vectorLength; index++) {
        let current = inputVector[index],
            next = inputVector[index + 1];
    
        if (next && current === next && current !== currentSequenceElement) {
            currentSequenceElement = current;
        }

        if (next && current === next) {
            currentSequenceCount++;
        } else {
            if (currentSequenceCount > 0) {
                minimizedSequence += currentSequenceElement + ++currentSequenceCount;
            } else {
                minimizedSequence += current;
            }

            currentSequenceElement = "";
            currentSequenceCount = 0;
        }
    }

    console.log(`Minimized sequence ${minimizedSequence}`);
};

window.addEventListener('submit', formSubmit);