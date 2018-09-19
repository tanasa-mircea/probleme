let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(','),
        appearanceState = {};

    for (let index = 0; index < inputVector.length; index++) {
        let current = inputVector[index];
        appearanceState[current] = appearanceState[current] ? ++appearanceState[current] : 1;
    }

    console.log(`Appearance state `, appearanceState);
};

window.addEventListener('submit', formSubmit);