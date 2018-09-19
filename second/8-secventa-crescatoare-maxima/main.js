let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(','),
        longestSequence = "",
        longestSequenceIndex,

        currentSequence = "",
        currentSequenceIndex = "";

    for (let index = 0; index < inputVector.length; index++) {
        let current = +inputVector[index],
            next = +inputVector[index + 1];
        
        if (next && current === next - 1) {
            currentSequenceIndex = currentSequence ? currentSequenceIndex : index;
            currentSequence = currentSequence + current;
        } else {
            currentSequence = "";
        }

        if (currentSequence.length > longestSequence.length) {
            longestSequence = currentSequence;
            longestSequenceIndex = currentSequenceIndex;
        }
    }

    console.log(`vector: ${inputVector}`);
    console.log(`longestSequence: ${longestSequence}`);
    console.log(`longestSequenceIndex: ${longestSequenceIndex}`);
};

window.addEventListener('submit', formSubmit);