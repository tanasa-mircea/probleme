let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        secondInput = event.target[1].value,
        firstInputVector = input.split(',').map((el) => +el),
        secondInputVector = secondInput.split(',').map((el) => +el),
        commonElements = [];

    for (let index = 0; index < firstInputVector.length; index++) {
        let indexOfInSecond = secondInputVector.indexOf(firstInputVector[index]);

        if (indexOfInSecond >= 0) {
            secondInputVector.splice(indexOfInSecond, 1);
            commonElements.push(firstInputVector[index]);
        }
    }

    console.log(`commonElements `, commonElements);
};

window.addEventListener('submit', formSubmit);