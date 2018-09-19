let formSubmit = function(event) {
    event.preventDefault();
    let value = event.target[0].value,
        sum = 0;

    while (value > 0) {
        sum += value % 10;
        value = Math.floor(value / 10);
    }

    console.log('Sum is ', sum);
    
};

window.addEventListener('submit', formSubmit);