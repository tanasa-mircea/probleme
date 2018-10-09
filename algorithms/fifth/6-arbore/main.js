let treeElement, trunkElement, treeData, length, angle,
    index, levelIndex = 0;
let branchX, branchY, branchAngle;
let branchElement = document.createElement('div');
let config = {
    branchLength: 100,
    branchDistance: 50,
    branchScale: .8
};
let branchModel = {
  originX: 0,
  originY: 0,
  height: config.branchLength,
  angle: angle,
  branches: []
};
branchElement.classList.add('branch');

function contentLoadedHandler() {
  trunkElement = document.createElement('div');
  trunkElement.classList.add('trunk');

  treeElement = document.getElementById('tree');
}

function formSubmit(event) {
  event.preventDefault();
  length = +event.target[0].value;
  angle = +event.target[1].value;

  treeElement.style.height =  '90vh';
  trunkElement.style.height = config.branchLength + 'px';
  trunkElement.style.left = treeElement.offsetWidth / 2 + 'px';

  while (treeElement.firstChild) {
    treeElement.removeChild(treeElement.firstChild);
  }

  treeElement.appendChild(trunkElement);

  treeData = [{
    originX: trunkElement.offsetLeft,
    originY: trunkElement.offsetTop - trunkElement.offsetHeight,
    height: config.branchLength,
    angle: 0,
    branches: []
  }];

  generateTree(levelIndex, length, angle, treeData);
};

function animateBranches(index, branches) {
  if (index >= branches.length) {
    return;
  }

  branches[index].node.style.height = branches[index].prevHeight + 'px';

  return animateBranches(++index, branches);
}

function generateTree(index, maxLength, angle, prevParents) {
  if (index >= maxLength) {
      return true;
  }

  let nextParents = fillBranches(prevParents, 0, [], index, angle);

  setTimeout(() => {
    animateBranches(0, nextParents);
    return generateTree(++index, maxLength, angle, nextParents);
  }, 200);
}

function fillBranches(prevParents, index, nextParents, levelIndex, angle) {
  if (index >= prevParents.length) {
      return nextParents;
  }

  // Set position
  branchX = prevParents[index].originX;
  branchY = prevParents[index].originY;

  branchElement.style.left = branchX + 'px';
  branchElement.style.top = branchY + 'px';

  let leftBranch = branchElement.cloneNode(),
      rightBranch = branchElement.cloneNode(),
      rightAngle, leftAngle;

  leftBranch.style.height = 0 + 'px';
  rightBranch.style.height = 0 + 'px';
  // leftBranch.style.height = prevParents[index].height + 'px';
  // rightBranch.style.height = prevParents[index].height + 'px';

  leftAngle = prevParents[index].angle - angle;
  rightAngle = prevParents[index].angle + angle;

  leftBranch.style.transform = `rotate(${ leftAngle }deg)`;
  rightBranch.style.transform = `rotate(${ rightAngle }deg)`;

  treeElement.appendChild(leftBranch);
  treeElement.appendChild(rightBranch);

  branchModel.prevHeight = prevParents[index].height;
  branchModel.height = Math.floor(prevParents[index].height * config.branchScale);

  branchModel.angle = leftAngle;
  branchModel.originX = branchX + prevParents[index].height * Math.sin(toRadians(branchModel.angle));
  branchModel.originY = branchY - branchModel.height * Math.cos(toRadians(branchModel.angle));
  branchModel.node = leftBranch;
  prevParents[index].branches.push(Object.assign({}, branchModel));
  nextParents.push(Object.assign({}, branchModel));

  branchModel.angle = rightAngle;
  branchModel.originX = branchX + prevParents[index].height * Math.sin(toRadians(branchModel.angle));
  branchModel.originY = branchY - branchModel.height * Math.cos(toRadians(branchModel.angle));
  branchModel.node = rightBranch;
  prevParents[index].branches.push(Object.assign({}, branchModel));
  nextParents.push(Object.assign({}, branchModel));

  return fillBranches(prevParents, ++index, nextParents, levelIndex, angle);
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);