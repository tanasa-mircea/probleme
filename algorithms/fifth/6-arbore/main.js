let treeElement, treeData, length, angle, index, previous, levelIndex = 0;
let branchElement = document.createElement('div');
let config = {
    branchLength: 50,
    branchDistance: 20
}
branchElement.classList.add('branch');
branchElement.style.width = config.branchLength + 'px';


function contentLoadedHandler() {
    treeElement = document.getElementById('tree');
}

function formSubmit(event) {
    event.preventDefault();
    lenght = +event.target[0].value;
    angle = +event.target[1].value; 
    
    treeData = [[]];

    generateTree(levelIndex, lenght, treeData);

    console.log('treeData ', treeData);
};

function generateTree(index, maxLength, prevParents) {
    debugger;

    if (index >= maxLength) {
        return true;
    }

    
    let nextParents = fillBranches(prevParents, 0, [], index);
    return generateTree(++index, maxLength, nextParents)
}

function fillBranches(prevParents, index, nextParents, levelIndex) {
    debugger;

    if (index >= prevParents.length) {
        return nextParents;
    }

    prevParents[index].push([]);
    prevParents[index].push([]);

    nextParents.push(prevParents[index][0])
    nextParents.push(prevParents[index][1])

    
    branchElement.style.top = levelIndex * config.branchLength + 'px';
    branchElement.style.left = prevParents.length / index * config.branchDistance + 'px';

    let firstBranch = branchElement.cloneNode(),
        secondBranch = branchElement.cloneNode();
        
    firstBranch.classList.add('left');
    secondBranch.classList.add('right');

    treeElement.appendChild(firstBranch);
    treeElement.appendChild(secondBranch);

    return fillBranches(prevParents, ++index, nextParents, levelIndex);
}


window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);
