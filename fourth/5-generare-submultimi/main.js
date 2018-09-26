let formSubmit = function(event) {
    event.preventDefault();
    let input = +event.target[0].value,
        final = [];
    
    // Number of digits
    for (let i = 0; i <= input; i++) {

        // First digit
        for (let j = 0; j <= input; j++) {

            if (i === 0) {
                final.push([j]);
                continue;
            }

            // Sets for each digit
            for (let m = 0; m <= input - j - i; m++) {
                let subset = [j];
                    k = j + 1 + m;

                // Fill the rest of subset
                while (subset.length < i + 1) {
                    if (k > input) {
                        subset.push(k - 1 - input)
                    } else {
                        subset.push(k);
                    };

                    k++;
                }

                final.push(subset);
            }
        }
    }

    console.log('final ', final)
};

window.addEventListener('submit', formSubmit);