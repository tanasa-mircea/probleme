let formSubmit = function(event) {
    event.preventDefault();
    let code = +event.target[0].value,
        // limit = 100,
        limit = 32767,
        binaryCode = convertToBinary(code),
        binaryCodeVector = binaryCode.split('');
        count = 0;
    
    console.log('binaryCodeVector ', binaryCodeVector)
    
    for (let index = 0; index <= limit; index++) {
        let bossWannabe = convertToBinary(index).split('');

        console.log('bossWannabe ', bossWannabe);

        if (isBoss(bossWannabe)) {
            console.log('boss ', bossWannabe)
            count++;
        }
    }

    function isBoss(codeVector) {
        let allMatched = true,
            hasZero = false;

        for (let index = 0; index < codeVector.length; index++) {
            let originalCodeIndex = binaryCodeVector[binaryCodeVector.length - 1 - index] || "0",
                testedCodeIndex = codeVector[codeVector.length - 1 - index]

            if (testedCodeIndex === '0' && hasZero === false) {
                hasZero = true;
            }

            if (testedCodeIndex !== originalCodeIndex) {
                allMatched = false;

                break;
            }
        }
        
        return hasZero && allMatched;
    }
        
    function convertToBinary(code) {
        let codeToConvert = code,
            isDone = false,
            result = '';
        
        if (codeToConvert === 0) {
            return '0';
        }

        while (!isDone) {
            result = Math.floor(codeToConvert % 2) + result;
            isDone = (Math.floor(codeToConvert % 2) === 1 && Math.floor(codeToConvert / 2) === 0);
            codeToConvert = Math.floor(codeToConvert / 2);
        }


        return result;
    }

    console.log('count ', count)
};

window.addEventListener('submit', formSubmit);