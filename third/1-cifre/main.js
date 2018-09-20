let formSubmit = function(event) {
    event.preventDefault();
    let secventa = "12345678910111213141516171819202122".split('');
    let digits = 1;
    let step = 0;

    while (secventa.length > 0) {
        let current = +secventa.slice(0, digits).join(''),
            next = +secventa.slice(digits, digits * 2).join('');
            
        secventa.splice(0, digits);

        if (current > next) {
            digits++;
        }
    
        step++;
    }

    console.log('Number of steps ', step);
};

window.addEventListener('submit', formSubmit);