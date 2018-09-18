// Metoda descompunerii

let formSubmit = function(event) {
    event.preventDefault();
    let firstValue = event.target[0].value,
        secondValue = event.target[1].value,
        firstPrimeFactors = getPrimeFactors(firstValue),
        secondPrimeFactors = getPrimeFactors(secondValue),
        commonFactors = [];

    for (let index = 0; index < firstPrimeFactors.length; index++) {
        let indexOfInSecond = secondPrimeFactors.indexOf(firstPrimeFactors[index]);
        
        if (indexOfInSecond >= 0) {
            commonFactors.push(firstPrimeFactors[index]);

            secondPrimeFactors.splice(indexOfInSecond, 1);
            firstPrimeFactors.splice(index, 1);
        }
    }
    
    commonFactors = commonFactors.concat(firstPrimeFactors, secondPrimeFactors);
    let cmmmc = commonFactors.reduce(function(acc, divider) {
        return acc * divider;
    }, 1)

    console.log('cmmmc ', cmmmc);
};

let getPrimeFactors = function(number) {
    primeFactors = [],
    divider = 2;
    isDone = false;

    while (!isDone) {
        if (number <= 1) {
            isDone = true;
            break;
        }

        if (!checkIfPrime(divider)) {
            divider++;
            continue;
        }

        if (number % divider === 0) {
            number = number / divider;
            primeFactors.push(divider);
        } else {
            divider++;
        }   
    }

    return primeFactors;
}

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