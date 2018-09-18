let formSubmit = function(event) {
    event.preventDefault();
    let value = event.target[0].value;

    console.log('submit ', value);
    
    if (!value || !isNaN(value)) {
        console.log('invalid value');
        return;
    }

    let valueArray = value.split(''),
        valueArrayLength = valueArray.length - 1,
        isPalindrom = true;

    console.log('value array ', valueArray);
    console.log('value array length ', valueArrayLength);

    for (let index = 0; index < valueArrayLength / 2; index++) {
        console.log('index', index);

        if (valueArray[index] !== valueArray[valueArrayLength - index] ) {
            console.log('The value isn\'t palindrom');
            isPalindrom = false;
            break;
        }
    }

    if (isPalindrom) {
        console.log('The value is palindrom');
    }
};

window.addEventListener('submit', formSubmit);