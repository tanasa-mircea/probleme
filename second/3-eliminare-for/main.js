let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(',').map(el => +el),
        limit = +event.target[1].value,
        index = 0;

    while (index < inputVector.length) {
        if (inputVector[index] < limit) {
            unshiftVector(index);
            inputVector.length--;
        } else {
            index++;
        }
    }

    function unshiftVector(startIndex) {
        for (let index = startIndex; index < inputVector.length; index++) {
            if (inputVector[index + 1]) {
                let temp = inputVector[index];
                inputVector[index] = inputVector[index + 1]
                inputVector[index + 1] = temp;
            }
        }
    }

    console.log(`new vector after ${inputVector}`);
};

window.addEventListener('submit', formSubmit);