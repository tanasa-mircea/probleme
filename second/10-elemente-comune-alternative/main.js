let formSubmit = function(event) {
    event.preventDefault();
    let input = event.target[0].value,
        secondInput = event.target[1].value,
        firstInputVector = input.split(',').map((el) => +el),
        secondInputVector = secondInput.split(',').map((el) => +el),
        commonElements = {};

    for (let index = 0; index < firstInputVector.length; index++) {
        console.log('commonElements[firstInputVector[index]] ', commonElements[firstInputVector[index]]);
        commonElements[firstInputVector[index]] = commonElements[firstInputVector[index]] !== undefined ? true : false;
    }
    
    for (let index = 0; index < secondInputVector.length; index++) {
        console.log('commonElements[secondInputVector[index]] ', commonElements[secondInputVector[index]]);
        commonElements[secondInputVector[index]] = commonElements[secondInputVector[index]] !== undefined ? true : false;
    }

    console.log(`vector 1 ${firstInputVector} `);
    console.log(`vector 2 ${secondInputVector} `);
    console.log(`commonElements`, commonElements);
};


window.addEventListener('submit', formSubmit);