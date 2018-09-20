let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        secondInput = event.target[1].value,
        firstInputVector = input.split(',').map((el) => +el),
        secondInputVector = secondInput.split(',').map((el) => +el),
        allVectors = [].concat(firstInputVector, secondInputVector);
        commonElements = {};

    for (let index = 0; index < allVectors.length; index++) {
        let currentApparitionsValue = commonElements[allVectors[index]];

        commonElements[allVectors[index]] = currentApparitionsValue !== undefined ? true : false;
    }

    console.log(`vector 1 ${firstInputVector} `);
    console.log(`vector 2 ${secondInputVector} `);
    console.log(`commonElements`, commonElements);
};


window.addEventListener('submit', formSubmit);