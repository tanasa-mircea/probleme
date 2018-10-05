let positionElements,
    wrapperElement,
    number,
    dataMatrix,
    currentPositionIndex = 0,
    firstIterationEnded,
    disksVector = [],
    diskHeight = 10,
    positionHeight = 200;

let diskElement = document.createElement('div');
diskElement.classList.add('disk');

function contentLoadedHandler() {
    wrapperElement = document.getElementById('wrapper');
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
    
    let newDisk = dataMatrix[positionIndex].shift(),
        nextIndex = getNextIndex(positionIndex);

    if (newDisk) {
        paintDiskShift(newDisk);
    }
        
    // if (!firstIterationEnded && nextIndex === 0) {
    //     dataMatrix[positionIndex].unshift(newDisk)
    //     paintDiskToNewPosition(newDisk, positionIndex, number);
    //     return startMove(0);
    // }
    
    if (newDisk && tryMoveDisk(newDisk, positionIndex, nextIndex)) {
        // if (!firstIterationEnded && dataMatrix[0].length === 0) {
        //     firstIterationEnded = true;
        //     return startMove(2);
        // };

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
    if (nextIndex === currentIndex) {
        dataMatrix[currentIndex].unshift(disk);
        paintDiskToNewPosition(disk, nextIndex, dataMatrix[currentIndex].length - 1);
        return false;
    }

    if (disk < (dataMatrix[nextIndex][0] || number + 1)) {
        dataMatrix[nextIndex].unshift(disk);
        paintDiskToNewPosition(disk, nextIndex, dataMatrix[nextIndex].length - 1);
        return true;
    } else {
        return tryMoveDisk(disk, currentIndex, getNextIndex(nextIndex))
    }    
}

function initFirstPosition(index, number, positionVector) {
    if (index > number) {
        return positionVector;
    }
    let diskClone = diskElement.cloneNode();
    
    positionVector.push(index);
    disksVector.push(diskClone);

    diskClone.style.width = `${ index * 5 }%`;
    diskClone.style.left = `${ 0 * 33.3 + 16.5}%`;
    diskClone.style.bottom = `${(number - index) * diskHeight + 5}px`;

    wrapperElement.appendChild(diskClone);
    return initFirstPosition(++index, number, positionVector);
};

function paintDiskShift(index) {
    debugger
    let currentDisk = disksVector[index - 1];
    currentDisk.style.bottom = `${ positionHeight + 2 * diskHeight}px`;
}

function paintDiskToNewPosition(index, nextIndex, dataIndex) {
    debugger
    let currentDisk = disksVector[index - 1];
    currentDisk.style.left = `${ nextIndex * 33.3 + 16.5}%`;
    currentDisk.style.bottom = `${ dataIndex * diskHeight + 5}px`;
}

window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);
