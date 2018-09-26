let formSubmit = function(event) {
    event.preventDefault();
    let input = +event.target[0].value,
        maxNumberOfSubsets = Math.pow(2, input + 1),
        configurations = [],
        final = [];

    // Generate possible configurations
    for (let index = 0; index < maxNumberOfSubsets; index++) {
        if (!configurations[index - 1]) {
            configurations.push([0,0,0]);
            continue;
        } 

        // Generate new configuration
        let newConfiguration = binaryAdd(configurations[index - 1].slice(0));
        configurations.push(newConfiguration);
        
        // Generate subset based on new configuration
        let subset = [];
        for (let j = 0; j < newConfiguration.length; j++) {
            if (newConfiguration[j]) {
                subset.push(j)
            }
        }

        final.push(subset);
    }

    console.log('final ', final)

};

function binaryAdd(vector) {
    let isDone = false,
        index = 0;

    while (!isDone) {
        if (vector[index] + 1 > 1) {
            vector[index] = 0;
            index++;
        } else {
            vector[index] = 1;
            isDone = true;
        }
    }
    
    return vector;
}    


window.addEventListener('submit', formSubmit);