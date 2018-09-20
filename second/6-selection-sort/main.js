let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        inputVector = input.split(',').map((elem) => {
            return +elem;
        });

    for (let index = 0; index < inputVector.length; index++) {
        let minIndex = findMin(index);
        
        if (minIndex !== index) {
            let temp = inputVector[index];
            inputVector[index] = inputVector[minIndex];
            inputVector[minIndex] = temp;
        }
    }

    
    function findMin(startIndex) {
        let min = inputVector[startIndex],
            minIndex = startIndex;

        for (let index = startIndex + 1; index < inputVector.length; index++) {
            if (inputVector[index] < min) {
                min = inputVector[index];
                minIndex = index;
            }
        }

        return minIndex;
    };

    console.log(`new vector final : ${inputVector}`);
};

window.addEventListener('submit', formSubmit);