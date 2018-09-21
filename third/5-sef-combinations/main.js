let formSubmit = function(event) {
    event.preventDefault();
    let code = +event.target[0].value,
        numberOfZeros = convertToBinary(code);
        count = 0;
    
    console.log('code ', code.toString(2));
    console.log('Nr zero ', numberOfZeros);

    for (let index = 1; index <= numberOfZeros; index++) {
        count += factorial(numberOfZeros) / (factorial(index) * factorial(numberOfZeros - index));
    }

    function factorial(number) {
        let result = 1;

        for (let index = 2; index <= number; index++) {
            result = result * index;
        }

        return result;
    }
        
    function convertToBinary(codeToConvert) {
        let isDone = false,
            result = [],
            index = 0,
            numberOfZero = 0;

        result.length = 16;

        for (var i = 0; i < 16; i++) {
            result[i] = 0;
        }
        
        if (codeToConvert === 0) {
            result[result.length - 1] = 0;
            return numberOfZero;
        }

        while (!isDone) {
            result[result.length - 1 - index] = Math.floor(codeToConvert % 2)

            if (result[result.length - 1 - index] === 0) {
                numberOfZero++;
            }

            isDone = (Math.floor(codeToConvert % 2) === 1 && Math.floor(codeToConvert / 2) === 0);
            codeToConvert = Math.floor(codeToConvert / 2);
            index++;

        }

        return numberOfZero;
    }

    console.log('count ', count);
};

window.addEventListener('submit', formSubmit);