let positionElements, number, dataMatrix, currentPositionIndex = 0, firstIterationEnded;
let diskElement = document.createElement('div');
diskElement.classList.add('disk');

function contentLoadedHandler() {
    positionElements = document.querySelectorAll('.position');
}

function formSubmit(event) {
    event.preventDefault();
    number = +event.target[0].value;
    
    dataMatrix = [[], [], []];
    dataMatrix[0] = initFirstPosition(1, number, dataMatrix[0]);
    startMove(0);
    console.log('dataMatrix final ', dataMatrix);
};

function startMove(positionIndex) {
    if (dataMatrix[1].length === number) {
        return;
    }
  
    debugger

    let newDisk = dataMatrix[positionIndex].shift(),
        nextIndex = getNextIndex(positionIndex);
        
    if (!firstIterationEnded && nextIndex === 0) {
        debugger
        dataMatrix[positionIndex].unshift(newDisk)
        return startMove(0);
    }
    
    if (newDisk && tryMoveDisk(newDisk, positionIndex, nextIndex)) {
        if (!firstIterationEnded && dataMatrix[0].length === 0) {
            firstIterationEnded = true;
            return startMove(2);
        };

        return startMove(positionIndex);
    } else {
        return startMove(nextIndex);
    }
};

function getNextIndex(currentIndex) {
    if (currentIndex + 1 > 2) {
        return 0;
    } else {
        return currentIndex + 1;
    }
}

function tryMoveDisk(disk, currentIndex, nextIndex) {
    debugger
    if (nextIndex === currentIndex) {
        dataMatrix[currentIndex].unshift(disk);
        return false;
    }

    if (disk < (dataMatrix[nextIndex][0] || number + 1)) {
        dataMatrix[nextIndex].unshift(disk);
        return true;
    } else {
        return tryMoveDisk(disk, currentIndex, getNextIndex(nextIndex))
    }    
}

function initFirstPosition(index, number, positionVector) {
    if (index > number) {
        return positionVector;
    }
    positionVector.push(index);
    return initFirstPosition(++index, number, positionVector);
};



window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);
