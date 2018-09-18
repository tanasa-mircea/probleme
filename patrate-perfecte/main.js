let formSubmit = function(event) {
    event.preventDefault();
    let value = event.target[0].value,
        perfectSquares = [];

    for (let index = 2; index < Math.sqrt(value); index++) {
        let square = index * index;

        if (square < value) {
            perfectSquares.push(square);
        }
    }

    console.log('perfectSquares are ', perfectSquares);
    
};

window.addEventListener('submit', formSubmit);