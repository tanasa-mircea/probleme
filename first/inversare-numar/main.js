let formSubmit = function(event) {
    event.preventDefault();
    let value = event.target[0].value;

    if (isNaN(value)) {
        console.log('Value is not a number');
        return;
    }

    // let valueArray = value.toString().split(''),
    //     invertedArray = [];
    // console.log('valueArray ', valueArray);

    // for (let index = valueArray.length - 1; index >= 0; index--) {
    //     invertedArray.push(valueArray[index]);
    // }

    // console.log('inverted ', invertedArray.join(''));

    let invertedValueString = '';

    while (value > 0) {
        invertedValueString += value % 10;
        value = Math.floor(value / 10);
    }

    console.log('invertedValueString ', invertedValueString);
};

window.addEventListener('submit', formSubmit);