let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(','),
        longestSequence = "",
        longestSequenceIndex,

        currentSequence = "",
        currentSequenceIndex,
        prevIndex;

    for (let index = 0; index < inputVector.length; index++) {
        let current = +inputVector[index],
            next = +inputVector[index + 1];

        if (next && current < next) {
            if (prevIndex === undefined || currentSequenceIndex !== prevIndex) {
                currentSequenceIndex = currentSequence ? currentSequenceIndex : index;
                console.log("19", currentSequenceIndex);
            }
            
            currentSequence = currentSequence + current;
        } else {
            currentSequence = "";
            currentSequenceIndex = undefined;
        }

        if (currentSequence.length > longestSequence.length) {
            
            longestSequence = currentSequence;

            if (longestSequenceIndex !== currentSequenceIndex) {
                console.log("33", currentSequenceIndex);
                longestSequenceIndex = currentSequenceIndex;
            }
        }

        prevIndex = currentSequenceIndex;
    }

    console.log(`vector: ${inputVector}`);
    console.log(`longestSequence: ${longestSequence}`);
    console.log(`longestSequenceIndex: ${longestSequenceIndex}`);
};

window.addEventListener('submit', formSubmit);