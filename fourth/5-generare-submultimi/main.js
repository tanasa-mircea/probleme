let formSubmit = function(event) {
    event.preventDefault();
    let input = +event.target[0].value,
        final = [[]];

    for (let i = 0; i <= input; i++) {
        for (let j = 0, len=final.length; j < len; j++) {
            let newSubset = final[j].concat([i]);

            final.push(newSubset);
        }
    }

    console.log('final ', final)
};

window.addEventListener('submit', formSubmit);