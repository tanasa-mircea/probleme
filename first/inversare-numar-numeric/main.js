let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        invertedNumber = 0;

    while (input >= 1) {
        invertedNumber = invertedNumber * 10 + (input % 10);
        input = Math.floor(input / 10);
    }

    console.log('Inverted number: ', invertedNumber);
};

window.addEventListener('submit', formSubmit);