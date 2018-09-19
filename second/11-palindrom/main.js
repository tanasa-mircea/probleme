let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputArray = '' + input.split(''),
        inputArrayLength = inputArray.length - 1,
        isPalindrom = true;

    for (let index = 0; index < inputArrayLength / 2; index++) {
        if (inputArray[index] !== inputArray[inputArrayLength - index] ) {
            console.log('The input isn\'t palindrom');
            isPalindrom = false;
            break;
        }
    }

    if (isPalindrom) {
        console.log('The input is palindrom');
    }
};

window.addEventListener('submit', formSubmit);