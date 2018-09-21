let formSubmit = function(event) {
    event.preventDefault();
    let input = +event.target[0].value,
        inputClone = input;
        count = 0,
        index = 0;
 
    while (inputClone > 0) {
        debugger
        
        inputClone = Math.floor(inputClone / 10);


        count += input % 10 ;


        index++;
    }

    console.log('Counts ', count);
};

window.addEventListener('submit', formSubmit);