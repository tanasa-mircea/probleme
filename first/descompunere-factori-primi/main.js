let formSubmit = function(event) {
    event.preventDefault();
    let value = event.target[0].value,
        primeFactors = [],
        divider = 2;
        isDone = false;

    while (!isDone) {
        if (value <= 1) {
            isDone = true;
            break;
        }

        if (!checkIfPrime(divider)) {
            divider++;
            continue;
        }

        if (value % divider === 0) {
            value = value / divider;
            primeFactors.push(divider);
        } else {
            divider++;
        }   
    }

    console.log('Prime factors: ', primeFactors);
};

let checkIfPrime = function(number) {
    let isPrime = true;

    if (number < 2) {
        return false;
    }

    for (let index = 2; index <= Math.ceil(number / 2); index++) {
        if (number % index === 0) {
            isPrime = false;
            break;
        }
    }

    return isPrime;
}

window.addEventListener('submit', formSubmit);