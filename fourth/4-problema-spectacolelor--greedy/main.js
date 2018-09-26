let formSubmit = function(event) {
    event.preventDefault();
    let showsList = [
            ['12 30', '16 30', '1'],
            ['15 0', '18 0', '2'],
            ['10 0', '18 30', '3'],
            ['18 0', '20 45', '4'],
            ['12 15', '13 0', '5']
        ],
        finalList = [];

    // Sort shows
    sortShows(showsList);
    finalList.push(showsList[0][2]);

    for (let index = 1, last = 0; index < showsList.length; index++) {
        let currentStart = showsList[index][0].split(' '),
            prevFinal = showsList[last][1].split(' ');

        if (+currentStart[0] > prevFinal[0]) {
            finalList.push(showsList[index][2]);
        }
    }

    console.log('Final list is ', finalList)
};

function sortShows(showsList) {
    do {
        hasSwaped = false;

        for (let index = 0; index < showsList.length; index++) {
            let current = showsList[index][1].split(' ')[0],
                next = showsList[index + 1] && showsList[index + 1][1].split(' ')[0];

            if (next && current > next) {
                let temp = showsList[index];
                showsList[index] = showsList[index + 1];
                showsList[index + 1] = temp;
                hasSwaped = true;
            }
        }
    } while (hasSwaped);

}



window.addEventListener('submit', formSubmit);