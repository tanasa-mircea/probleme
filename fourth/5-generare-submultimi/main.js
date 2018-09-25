let formSubmit = function(event) {
    event.preventDefault();
    let input = +event.target[0].value,
        isDone = false,
        digits = 1,
        index = 0;

    while (!isDone) {
        let group = [];

        group.push(index);

        let j = 1;

        while (j <= input && group.length < digits) {
            if (j > index) {
                group.push(j);     
            }
 
            j++
        }

        if (group.length === digits) {
            console.log(group);
        }

        if (index === input) {
            digits++;
            index = 0;
        } else {
            index++
        }

        if (digits > input + 1) {
            isDone = true;
        }
    }
};

window.addEventListener('submit', formSubmit);