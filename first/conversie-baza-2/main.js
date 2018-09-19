let formSubmit = function(event) {
    event.preventDefault();
    let inputValue = event.target[0].value,
        result = '',
        isDone = false;

    console.log('first value ', inputValue);

    while (!isDone) {
        result = Math.floor(inputValue % 2) + result;
        isDone = (Math.floor(inputValue % 2) === 1 && Math.floor(inputValue / 2) === 0);
        inputValue = Math.floor(inputValue / 2);
    }

    console.log('result ', result)
};


window.addEventListener('submit', formSubmit);