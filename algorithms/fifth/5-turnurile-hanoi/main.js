let positionElements,
    wrapperElement,
    number,
    dataMatrix,
    firstIterationEnded,
    disksVector = [],
    diskHeight = 10,
    positionHeight = 200,
    animationsQueue = [];

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
    disksVector = [];

    let diskElements = document.querySelectorAll('.disk');
    for (let i = 0; i < diskElements.length; i++) {
        wrapperElement.removeChild(diskElements[i]);
    }

    dataMatrix[0] = initFirstPosition(1, number, dataMatrix[0]);

    moveDisks(number, 0, 2, 1);
    executeAnimation(0, animationsQueue);
};

function executeAnimation(index, animationsQueue) {
    if (index >= animationsQueue.length) {
        return false;
    }


    setTimeout(function() {
        currentAnimation = animationsQueue[index];
        currentAnimation.function.apply(this, currentAnimation.params);

        return executeAnimation(++index, animationsQueue);
    }, 300);
}

function moveDisks(disc, sourcePosition, auxPosition, destinationPosition) {
    if (disc > 0) {
        moveDisks(disc - 1, sourcePosition, destinationPosition, auxPosition);

        var slicedDisk = dataMatrix[sourcePosition].shift();
        dataMatrix[destinationPosition].unshift(slicedDisk);

        // paintDiskShift(disc - 1);
        animationsQueue.push({
            function: paintDiskShift,
            params: [disc - 1]
        });

        // paintDiskToNewPosition(disc - 1, destinationPosition, dataMatrix[destinationPosition].length - 1);
        animationsQueue.push({
            function: paintDiskToNewPosition,
            params: [disc - 1, destinationPosition, dataMatrix[destinationPosition].length - 1]
        });

        console.log("Move disc " + (disc - 1) + " from " + sourcePosition + " to " + destinationPosition );
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
