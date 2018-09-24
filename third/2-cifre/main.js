let formSubmit = function(event) {
    event.preventDefault();
    let input = +event.target[0].value,
        count = 0,
        index = 1;
 
    while (index < input) {
        count += input - index + 1;
        index = index * 10;
    }

    console.log('Counts ', count);
};

window.addEventListener('submit', formSubmit);