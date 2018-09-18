let formSubmit = function(event) {
    event.preventDefault();
    let value = event.target[0].value,
          isDivisible = false;

    console.log('submit ', value);

    if (isNaN(value)) {
        console.log('Value is not a number');
        return;
    }

    if (value % 2 === 0) {
        console.log('Value is odd so it\'s not prime')
        return
    }

    for (let index = 2; index < value; index++) {
        if (value % index === 0) {
            isDivisible = true;
            break;
        }
    }

    if (isDivisible) {
        console.log('Value it\'s not prime ')
    } else {
        console.log('Value is prime');
    }
     
};

window.addEventListener('submit', formSubmit);