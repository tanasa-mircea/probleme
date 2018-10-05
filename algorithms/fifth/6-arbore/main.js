let treeElement, treeData, length, angle, index, previous, levelIndex = 0;
let branchElement = document.createElement('div');
let config = {
    branchLength: 100,
    branchDistance: 50
}
branchElement.classList.add('branch');


function contentLoadedHandler() {
    treeElement = document.getElementById('tree');
}

function formSubmit(event) {
    event.preventDefault();
    length = +event.target[0].value;
    angle = +event.target[1].value; 
    
    treeData = [[]];

    // generateTree(levelIndex, 3, 25, treeData);
    // generateTree(levelIndex, length, angle, treeData);
    generateTree(levelIndex, length, 25, treeData);
};

function generateTree(index, maxLength, angle, prevParents) {
    if (index >= maxLength) {
        return true;
    }

    branchElement.style.height = config.branchLength + 'px';    
    let nextParents = fillBranches(prevParents, 0, [], index, angle);
    config.branchLength = config.branchLength * .75;
    config.branchDistance = config.branchDistance * .75;
    return generateTree(++index, maxLength, angle, nextParents)
}

function fillBranches(prevParents, index, nextParents, levelIndex, angle) {
    if (index >= prevParents.length) {
        return nextParents;
    }

    prevParents[index].push([]);
    prevParents[index].push([]);

    nextParents.push(prevParents[index][0]);
    nextParents.push(prevParents[index][1]);
   
    let rotationLeftBranch,
        rotationRightBranch,
        left;
    
    
    if (index < prevParents.length / 2) {
        rotationLeftBranch = -angle + 5 * levelIndex;
        rotationRightBranch = angle + 5 * levelIndex;
        left = 50 - (levelIndex * (config.branchDistance * 100 / treeElement.offsetWidth)) * angle / 10 - (index * config.branchDistance);
    } else {
        rotationLeftBranch = -angle - 5 * levelIndex;
        rotationRightBranch = angle - 5 * levelIndex;
        left = 50 + (levelIndex * (config.branchDistance * 100 / treeElement.offsetWidth)) * angle / 10 + ((prevParents.length - 1 - index) * config.branchDistance) ;
    };

    branchElement.style.top = levelIndex * config.branchLength + 'px';
    console.log('left ', left)
    branchElement.style.left = left + '%';
    // branchElement.style.left = index * 200  + config.branchDistance + 'px';

    let firstBranch = branchElement.cloneNode(),
    secondBranch = branchElement.cloneNode();
    
        
    firstBranch.style.transform = `rotate(${ rotationLeftBranch }deg) translateY(-1px)`;
    secondBranch.style.transform = `rotate(${ rotationRightBranch }deg) translateY(-1px)`;

    treeElement.appendChild(firstBranch);
    treeElement.appendChild(secondBranch);

    return fillBranches(prevParents, ++index, nextParents, levelIndex, angle);
}


window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);
