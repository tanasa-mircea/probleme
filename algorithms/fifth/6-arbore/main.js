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
      branches: []
  }];
  branchModel.angleAccumulator = angle;

  // generateTree(levelIndex, 2, 25, treeData);
  generateTree(levelIndex, 3, 25, treeData);
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

  debugger

  branchElement.style.left = branchX + 'px';
  branchElement.style.top = branchY + 'px';

  let leftBranch = branchElement.cloneNode(),
      rightBranch = branchElement.cloneNode();

  leftBranch.style.height = prevParents[index].height + 'px';
  rightBranch.style.height = prevParents[index].height + 'px';

  if (index < prevParents.length / 2) {
      leftBranch.style.transform = `rotate(${ -angle + prevParents[index].angleAccumulator }deg)`;
      rightBranch.style.transform = `rotate(${ angle + prevParents[index].angleAccumulator }deg)`;
  } else {
      leftBranch.style.transform = `rotate(${ -angle - prevParents[index].angleAccumulator }deg)`;
      rightBranch.style.transform = `rotate(${ angle - prevParents[index].angleAccumulator }deg)`;
  }

  treeElement.appendChild(leftBranch);
  treeElement.appendChild(rightBranch);

  branchModel.angleAccumulator += angle;
  branchModel.height = branchModel.height * 0.8;
  branchModel.originX = branchX + prevParents[index].height * Math.sin(toRadians(angle));
  branchModel.originY = branchY - prevParents[index].height * Math.cos(toRadians(angle));
  prevParents[index].branches.push(Object.assign({}, branchModel));

  branchModel.originX = branchX - prevParents[index].height * Math.sin(toRadians(angle));
  branchModel.originY = branchY - prevParents[index].height * Math.cos(toRadians(angle));
  prevParents[index].branches.push(Object.assign({}, branchModel));

  nextParents.push(prevParents[index].branches[0]);
  nextParents.push(prevParents[index].branches[1]);

  return fillBranches(prevParents, ++index, nextParents, levelIndex, angle);
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);