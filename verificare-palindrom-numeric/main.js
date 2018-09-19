let formSubmit = function(event) {
    event.preventDefault();
    let input = +event.target[0].value,
        inputCopy = input;
        invertedNumber = 0;

    while (inputCopy >= 1) {
        invertedNumber = invertedNumber * 10 + (inputCopy % 10);
        inputCopy = Math.floor(inputCopy / 10);
    }

    if (invertedNumber === input) {
        console.log('Is palindrom');
        return;
    }

    console.log('Is not palindrom');
};

window.addEventListener('submit', formSubmit);