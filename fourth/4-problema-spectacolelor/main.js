let formSubmit = function(event) {
    event.preventDefault();
    let showsList = [
            ['12 30', '16 30'],
            ['15 0', '18 0'],
            ['10 0', '18 30'],
            ['18 0', '20 45'],
            ['12 15', '13 0']
        ],
        finalList = [];

    for (let index = 0; index < showsList.length; index++) {
        let currentTimes = showsList[index],
            endTime = currentTimes[1].split(' '),
            currentList = [currentTimes];

        for (let j = 0; j < showsList.length; j++) {
            if (index === j) {
                continue;
            }

            let nextTimes = showsList[j],
            nextStartTime = nextTimes[0].split(' '),
            nextEndTime = nextTimes[1].split(' ');
            
            if (+endTime[0] < +nextStartTime[0]) {
                currentList.push(nextTimes);
                endTime = nextEndTime;
            }

            if (+endTime[0] === +nextStartTime[0] && +endTime[1] <= +nextStartTime[1]) {
                currentList.push(nextTimes);
                endTime = nextEndTime;
            }
        }


        if (currentList.length > finalList.length) {
            finalList = currentList;
        }
    }

    console.log('Final list is ', finalList)
};



window.addEventListener('submit', formSubmit);