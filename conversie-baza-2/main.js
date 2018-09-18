let formSubmit = function(event) {
    event.preventDefault();
    let firstValue = event.target[0].value,
        finalNumber = [],
        isDone = false;

    console.log('first value ', firstValue);

    while (!isDone) {
        finalNumber.push(Math.floor(firstValue % 2));
        isDone = (Math.floor(firstValue % 2) === 1 && Math.floor(firstValue / 2) === 0);
        firstValue = Math.floor(firstValue / 2);
    }

    console.log('finalNumber ', finalNumber.reverse().join(''))
};


window.addEventListener('submit', formSubmit);