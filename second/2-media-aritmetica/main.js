let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(','),
        sum = 0;

    for (let index = 0; index < inputVector.length; index++) {
        sum += +inputVector[index];
    }

    console.log(`Media aritmetica: ${sum / inputVector.length}`);


};

window.addEventListener('submit', formSubmit);