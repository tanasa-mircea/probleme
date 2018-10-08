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

    moveDisks(number, 0, 2, 1);
};

function moveDisks(disc, sourcePosition, auxPosition, destinationPosition) {
    if (disc > 0) {     
        moveDisks(disc - 1, sourcePosition, destinationPosition, auxPosition);

        var slicedDisk = dataMatrix[sourcePosition].shift();
        dataMatrix[destinationPosition].unshift(slicedDisk);

        paintDiskShift(disc - 1);
        debugger;
        
        
        paintDiskToNewPosition(disc - 1, destinationPosition, dataMatrix[destinationPosition].length - 1);
        debugger;
        
        console.log("Move disc " + (disc - 1) + " from " + sourcePosition + " to " + destinationPosition + ' slicedDisk ' + slicedDisk);
        moveDisks(disc - 1, auxPosition, sourcePosition, destinationPosition);
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
    let currentDisk = disksVector[index];
    currentDisk.style.bottom = `${ positionHeight + 2 * diskHeight}px`;
}

function paintDiskToNewPosition(index, nextIndex, dataIndex) {
    let currentDisk = disksVector[index];
    currentDisk.style.left = `${ nextIndex * 33.3 + 16.5}%`;
    currentDisk.style.bottom = `${ dataIndex * diskHeight + 5}px`;
}

window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);
