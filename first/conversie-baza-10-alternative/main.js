let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        accumulator = 0,
        step = 0;

    while (input > 0) {
        accumulator = accumulator + Math.pow(2, step) * (input % 10);
        input = Math.floor(input / 10);
        step++;
    }

    console.log('Number in decimal ', accumulator);
};


window.addEventListener('submit', formSubmit);