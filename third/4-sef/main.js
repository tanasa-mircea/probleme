let formSubmit = function(event) {
    event.preventDefault();
    let code = +event.target[0].value,
        // limit = 32767,
        limit = 65535,
        searchedCodeVector = convertToBinary(code);
        count = 0;
    
    console.log('searchedCodeVector ', searchedCodeVector)
    
    for (let index = 0; index <= limit; index++) {
        let bossWannabe = convertToBinary(index);

        if (isBoss(bossWannabe)) {
            count++;
        }
    }

    function isBoss(bossWannabe) {
        let allMatched = true,
            hasZero = false;

        for (let index = 0; index < bossWannabe.length; index++) {
            let originalCodeIndex = searchedCodeVector[searchedCodeVector.length - 1 - index] || 0,
                testedCodeIndex = bossWannabe[bossWannabe.length - 1 - index] || 0

            if (testedCodeIndex === 0 && testedCodeIndex !== originalCodeIndex) {
                allMatched = false;
            }
        }

        return allMatched;
    }
        
    function convertToBinary(codeToConvert) {
        let isDone = false,
            result = [],
            index = 0;

        result.length = 16;
        
        if (codeToConvert === 0) {
            result[result.length - 1] = 0;
            return result;
        }

        while (!isDone) {
            result[result.length - 1 - index] = Math.floor(codeToConvert % 2)
            isDone = (Math.floor(codeToConvert % 2) === 1 && Math.floor(codeToConvert / 2) === 0);
            codeToConvert = Math.floor(codeToConvert / 2);
            index++;
        }

        return result;
    }

    console.log('count ', count)
};

window.addEventListener('submit', formSubmit);