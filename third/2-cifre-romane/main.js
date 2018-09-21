let formSubmit = function(event) {
    event.preventDefault();
    let input = +event.target[0].value,
        dictionary = {
            1: 'I',
            4: 'IV',
            5: 'V',
            9: 'IX',
            10: 'X',
            40: 'XL',
            50: 'L',
            90: 'XC',
            100: 'C',
            400: 'CD',
            500: 'D',
            900: 'CM',
            1000: 'M',
        },
        dictionaryArray = Object.keys(dictionary),
        step = 1,
        final = "";

    while (input > 0) {
        let current = dictionaryArray[dictionaryArray.length - step],
            division = Math.floor(input / current);

        if (division > 0) {
            input = input - (division * dictionaryArray[dictionaryArray.length - step]);
            
            for (let index = 0; index < division; index++) {
                final += dictionary[current];        
            }
        }

        step++;
    }

    console.log('final ', final);
};

window.addEventListener('submit', formSubmit);