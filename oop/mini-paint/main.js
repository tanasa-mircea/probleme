var matrixConfig = {
  rows: 100,
  columns: 100,
  width: 10,
  height: 10,
  secondaryColor: '#D60D0D',
  radius: 1
};

function PaintScreen() {
  this.matrix = draw(matrixConfig);
  this.initDragNDrop(this.matrix.node);

  this.addListener('dragNDropStart', this.matrixMoveHandler.bind(this));
  this.addListener('dragNDropMove', this.matrixMoveHandler.bind(this));
};
mixin(PaintScreen.prototype, CustomEventTarget.prototype);
mixin(PaintScreen.prototype, DragNDrop.prototype);

PaintScreen.prototype.matrixMoveHandler = function matrixMoveHandler(event) {
  var row = Math.ceil(event.y * matrixConfig.rows / (matrixConfig.rows * matrixConfig.height));
  var column = Math.ceil(event.x * matrixConfig.columns / (matrixConfig.columns * matrixConfig.width));
  var current = this.matrix.data[Math.min(row - 1, matrixConfig.rows - 1)][column - 1];

  if (current) {
    current.node.style.backgroundColor = '#0c0';
  }
};

function fillMatrix(matrix, config) {
  var matrixElement = document.createElement('div');
  matrixElement.classList.add('matrix__element');
  matrixElement.style.height = `${config.height}px`;
  matrixElement.style.width = `${config.width}px`;

  var matrixData = [];

  for (let i = 0; i < config.rows; i++) {
    matrixData[i] = [];
    for (let j = 0; j < config.columns; j++) {
        var nodeClone = matrixElement.cloneNode();

          let positionX = j * config.width,
              positionY = i * config.height;

          nodeClone.style.top = `${positionX}px`;
          nodeClone.style.left = `${positionY}px`;

          matrixData[i].push({
              node: nodeClone,
              x: positionX,
              farX: positionX + config.width,
              y: positionY,
              farY: positionX + config.height
          });
          matrixElement.id = "m" + "-" + i + "-" + j;

          matrix.appendChild(nodeClone);
      }
  }

  return matrixData;
}


function draw(config) {
  var newMatrix = document.createElement('div'),
      final = {
        node: newMatrix,
        data: fillMatrix(newMatrix, config)
      };

  newMatrix.classList.add('matrix');

  newMatrix.style.height = `${config.height * config.rows}px`;
  newMatrix.style.width = `${config.width * config.columns}px`;

  return final;
}

function contentLoadedHandler() {
  var paintScreenOne = new PaintScreen();

  var displayer = document.getElementById('displayer');
  displayer.appendChild(paintScreenOne.matrix.node);

}

document.addEventListener("DOMContentLoaded", contentLoadedHandler);