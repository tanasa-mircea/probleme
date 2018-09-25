let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split('');

    for (let index = 0; index < inputVector.length; index++) {
        let currentChar = input.charCodeAt(index);

        if (currentChar >= 97 && currentChar <= 122) {
            inputVector[index] = String.fromCharCode(currentChar - 32);
        }     
    }

    console.log(`Uppercased string ${inputVector.join('')}`);
};

window.addEventListener('submit', formSubmit);