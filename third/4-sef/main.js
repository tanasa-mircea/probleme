let formSubmit = function(event) {
    event.preventDefault();
    let code = +event.target[0].value,
        // limit = 300,
        // limit = 32767,
        limit = 65534,
        binaryCodeVector = convertToBinary(code);
        count = 0;
    
    console.log('binaryCodeVector ', binaryCodeVector)
    
    for (let index = 0; index <= limit; index++) {
        let bossWannabe = convertToBinary(index);
        debugger

        if (isBoss(bossWannabe)) {
            // console.log('boss ', bossWannabe)
            count++;
        }
    }

    function isBoss(codeVector) {
        let allMatched = true,
            hasZero = false;

        for (let index = 0; index < codeVector.length; index++) {
            let originalCodeIndex = binaryCodeVector[binaryCodeVector.length - 1 - index] || "0",
                testedCodeIndex = codeVector[codeVector.length - 1 - index] || "0"

            debugger

            // if (testedCodeIndex === '0' && hasZero === false) {
            //     hasZero = true;
            // }

            if (testedCodeIndex === '0' && testedCodeIndex !== originalCodeIndex) {
                allMatched = false;
            }
        }
        
        return allMatched;
    }
        
    function convertToBinary(code) {
        let codeToConvert = code,
            isDone = false,
            result = [],
            index = 0;

        result.length = 16;
        
        if (codeToConvert === 0) {
            result[result.length - 1] = '0';
            return result;
        }


        while (!isDone) {
            result[result.length - 1 - index] = '' + Math.floor(codeToConvert % 2)
            isDone = (Math.floor(codeToConvert % 2) === 1 && Math.floor(codeToConvert / 2) === 0);
            codeToConvert = Math.floor(codeToConvert / 2);
            index++;
        }


        return result;
    }

    console.log('count ', count)
};

window.addEventListener('submit', formSubmit);