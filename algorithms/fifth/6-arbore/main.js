let treeElement, trunkElement, treeData, length, angle,
    index, levelIndex = 0;
let branchX, branchY, branchAngle;
let branchElement = document.createElement('div');
let config = {
    branchLength: 100,
    branchScale: .8,
    transitionTime: 200
};
let branchModel = {
  originX: 0,
  originY: 0,
  height: 0,
  angle: 0,
  branches: []
};
branchElement.classList.add('branch');
branchElement.style.transition = `height ${ config.transitionTime }ms`;
var debugPoint;

function contentLoadedHandler() {
  trunkElement = document.createElement('div');
  trunkElement.classList.add('trunk');
  treeElement = document.getElementById('tree');

  a = document.createElement('div');
  a.classList.add('debugPoint');
  document.body.appendChild(a);
  debugPoint = document.getElementsByClassName('debugPoint')[0];

}

function formSubmit(event) {
  event.preventDefault();
  length = 6;//+event.target[0].value;
  angle = 45;//+event.target[1].value;
  config.branchLength = +event.target[2].value;
  config.branchScale = +event.target[3].value;

  branchModel.height = config.branchLength;
  branchModel.angle = angle;

  treeElement.style.height = '90vh';
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

// function animateBranches(index, branches) {
//   if (index >= branches.length) {
//     return;
//   }

//   branches[index].node.style.height = branches[index].prevHeight + 'px';

//   return animateBranches(++index, branches);
// }

function generateTree(index, maxLength, angle, prevParents) {
  if (index >= maxLength) {
      return true;
  }

  let nextParents = fillBranches(prevParents, 0, [], index, angle);

  setTimeout(() => {
    //animateBranches(0, nextParents);
    return generateTree(++index, maxLength, angle, nextParents);
  }, config.transitionTime);
}

function fillBranches(prevParents, index, nextParents, levelIndex, angle) {
  if (index >= prevParents.length) {
      return nextParents;
  }

  // Set position
  branchX = prevParents[index].originX;
  branchY = prevParents[index].originY;
  var point = debugPoint.cloneNode();
  treeElement.appendChild(point);

  // Common styling and options
  branchElement.style.left = (branchX - 1.5) + 'px';
  branchElement.style.top = branchY + 'px';
  point.style.left = (branchX - 2.5) + 'px';
  point.style.top = (branchY - 2.5)+ 'px';

  branchModel.prevHeight = prevParents[index].height;
  branchModel.height = Math.floor(prevParents[index].height * config.branchScale);

  let leftBranch = branchElement.cloneNode(),
      rightBranch = branchElement.cloneNode(),
      rightAngle, leftAngle;


  // TODO: Delete
  let distanceToPoint = branchModel.height / Math.cos(toRadians(angle));

  // Left Branch Options
  leftBranch.style.height =  prevParents[index].height + 'px';
  leftBranch.style.marginTop =  (-1 * prevParents[index].height) + 'px';
  leftAngle = prevParents[index].angle - angle;
  leftBranch.style.transform = `rotate(${ leftAngle }deg)`;
  treeElement.appendChild(leftBranch);

  branchModel.angle = leftAngle;
  branchModel.originX = branchX + prevParents[index].height * Math.cos(toRadians(90 - branchModel.angle));
  branchModel.originY = branchY - branchModel.prevHeight * Math.sin(toRadians(90 - branchModel.angle));
  branchModel.node = leftBranch;

  nextParents.push(Object.assign({}, branchModel));

// Right Branch Options
  rightBranch.style.height =  prevParents[index].height + 'px';
  rightBranch.style.marginTop =  (-1 * prevParents[index].height) + 'px';
  //rightBranch.style.height = 0 + 'px';
  rightAngle = prevParents[index].angle + angle;
  rightBranch.style.transform = `rotate(${ rightAngle }deg)`;
  treeElement.appendChild(rightBranch);

  branchModel.angle = rightAngle;
  branchModel.originX = branchX + prevParents[index].height * Math.cos(toRadians(90 - branchModel.angle));
  branchModel.originY = branchY - branchModel.prevHeight * Math.sin(toRadians(90 - branchModel.angle));
  branchModel.node = rightBranch;

  nextParents.push(Object.assign({}, branchModel));

  return fillBranches(prevParents, ++index, nextParents, levelIndex, angle);
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

window.addEventListener('submit', formSubmit);
window.addEventListener("DOMContentLoaded", contentLoadedHandler);