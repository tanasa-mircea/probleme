let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(','),
        palindroms = [];

    for (let index = 0; index < inputVector.length - 1; index++) {
        let subvectorLength = inputVector.length - index;
            numberOfPossibleStartPositions = index + 1;
        
        for (let j = 0; j < numberOfPossibleStartPositions; j++) {
            let subvector = inputVector.slice(j, subvectorLength + j);
            
            if (isPalindrom(subvector)) {
                palindroms.push(subvector);
            }
        }   
    }

    console.log('Palindroms are ', palindroms)

    
};

function isPalindrom(vector) {
    let isPalindrom = true;

    for (let index = 0; index < vector.length / 2; index++) {

        if (vector.length < 2 || vector[index] !== vector[vector.length - 1 - index]) {
            isPalindrom = false;
            break;
        }
    }

    return isPalindrom;
}

window.addEventListener('submit', formSubmit);