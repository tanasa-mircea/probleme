let treeElement, trunkElement, treeData, length, angle = 25,
    index, levelIndex = 0;
let branchX, branchY, branchAngle;
let branchElement = document.createElement('div');
let config = {
    branchLength: 100,
    branchDistance: 50
};
let branchModel = {
  originX: 0,
  originY: 0,
  height: config.branchLength,
  angleAccumulator: angle,
  angle: angle,
  branches: []
};
branchElement.classList.add('branch');

function contentLoadedHandler() {
  trunkElement = document.createElement('div');
  trunkElement.classList.add('trunk');

  treeElement = document.getElementById('tree');
  formSubmit()
}

function formSubmit(event) {
  // event.preventDefault();
  // length = +event.target[0].value;
  // angle = +event.target[1].value;

  trunkElement.style.height = config.branchLength + 'px';
  treeElement.appendChild(trunkElement);

  treeData = [{
    originX: trunkElement.offsetLeft,
    originY: trunkElement.offsetTop - trunkElement.offsetHeight,
    height: config.branchLength,
    angleAccumulator: 0,
    angle: 0,
    branches: []
  }];
  branchModel.angleAccumulator = angle;

  // generateTree(levelIndex, 2, 25, treeData);
  generateTree(levelIndex, 6, 25, treeData);
};

function generateTree(index, maxLength, angle, prevParents) {
  if (index >= maxLength) {
      return true;
  }

  let nextParents = fillBranches(prevParents, 0, [], index, angle);
  return generateTree(++index, maxLength, angle, nextParents);
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

  leftBranch.style.height = prevParents[index].height + 'px';
  rightBranch.style.height = prevParents[index].height + 'px';

  leftAngle = prevParents[index].angle - angle;
  rightAngle = prevParents[index].angle + angle;

  leftBranch.style.transform = `rotate(${ leftAngle }deg)`;
  rightBranch.style.transform = `rotate(${ rightAngle }deg)`;


  treeElement.appendChild(leftBranch);
  treeElement.appendChild(rightBranch);

  branchModel.angleAccumulator = prevParents[index].angleAccumulator + angle;
  branchModel.height = prevParents[index].height;
  // branchModel.height = prevParents[index].height * 0.9;

  // debugger
  branchModel.angle = leftAngle;
  branchModel.originX = branchX - Math.abs(prevParents[index].height * Math.sin(toRadians(leftAngle)));
  branchModel.originY = branchY - branchModel.height * Math.cos(toRadians(leftAngle));
  prevParents[index].branches.push(Object.assign({}, branchModel));
  nextParents.push(Object.assign({}, branchModel));

  // debugger

  branchModel.angle = rightAngle;
  branchModel.originX = branchX + prevParents[index].height * Math.sin(toRadians(branchModel.angle));
  branchModel.originY = branchY - branchModel.height * Math.cos(toRadians(branchModel.angle));
  prevParents[index].branches.push(Object.assign({}, branchModel));
  nextParents.push(Object.assign({}, branchModel));

  // debugger

  return fillBranches(prevParents, ++index, nextParents, levelIndex, angle);
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);