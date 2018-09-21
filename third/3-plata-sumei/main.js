let formSubmit = function(event) {
    event.preventDefault();
    let sumToPay = +event.target[0].value,
        banknoteBase = +event.target[1].value,
        banknotes = [],
        summary = {};

    for (let index = 0; index < 100; index++) {
        let newBanknote = Math.pow(banknoteBase, index);
        
        if (newBanknote > sumToPay) {
            break;
        }

        banknotes.push(newBanknote);
    }

    let whileIndex = banknotes.length - 1;
    while (sumToPay > 0) {
        let currentBanknote = banknotes[whileIndex];
            division = Math.floor(sumToPay / currentBanknote);
        
        if (division > 0) {
            summary[currentBanknote] = division;
            sumToPay -= division * currentBanknote;
        }
        
        whileIndex--;
    }

    console.log('Summary ', summary);

};

window.addEventListener('submit', formSubmit);