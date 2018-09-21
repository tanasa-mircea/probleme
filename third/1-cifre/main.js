let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        sequenceString = "",
        digits = 1,
        count = 0;

    console.log('sequenceString ', sequenceString);

    for (let index = 1; index <= +input; index++) {
        sequenceString += index;
    }

    let sequence = sequenceString.split('');

    while (sequence.length > 0) {
        let current = +sequence.slice(0, digits).join(''),
            next = +sequence.slice(digits, digits * 2).join('');
            
        sequence.splice(0, digits);

        if (current > next) {
            digits++;
        }
    
        count++;
    }

    console.log('Counts ', count);
};

window.addEventListener('submit', formSubmit);