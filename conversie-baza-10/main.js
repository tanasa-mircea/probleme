let formSubmit = function(event) {
    event.preventDefault();
    let firstValue = event.target[0].value,
        accumulator = 0,
        valueVector = firstValue.toString().split(''); 

    for (let index = 0; index < valueVector.length; index++) {
        accumulator = accumulator * 2 + +valueVector[index];
    }

    console.log('Number in decimal ', accumulator);
};


window.addEventListener('submit', formSubmit);