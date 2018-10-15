function PaintScreen(rows, columns, elementHeight, elementWidth) {
  this.config = {
    rows: rows,
    columns: columns,
    height: elementHeight,
    width: elementWidth
  };

  localStoragePaint = JSON.parse(localStorage.getItem('paint'));

  this.matrix = draw(this.config, localStoragePaint);
  this.initDragNDrop(this.matrix.node);
  this.currentAction = [];
  this.toolValue = 1;

  this.undoStateManager = new Stiva(30);
  this.redoStateManager = new Stiva(30);

  this.undoButton = new Button('Undo');
  this.redoButton = new Button('Redo');
  this.clearButton = new Button('Clear');

  this.undoButton.disable();
  this.redoButton.disable();

  this.pencilTool = new Tool('Pencil', 'pencil', true);
  this.eraserTool = new Tool('Eraser', 'eraser', false);

  this.matrix.node.appendChild(this.pencilTool.element);
  this.matrix.node.appendChild(this.eraserTool.element);

  this.matrix.node.appendChild(this.undoButton.element);
  this.matrix.node.appendChild(this.redoButton.element);
  this.matrix.node.appendChild(this.clearButton.element);

  this.undoButton.addListener('customButtonClick', this.undoButtonHandler.bind(this));
  this.redoButton.addListener('customButtonClick', this.redoButtonHandler.bind(this));
  this.clearButton.addListener('customButtonClick', this.clearButtonHandler.bind(this));

  this.pencilTool.addListener('toolChange', this.pencilToolChange.bind(this));
  this.eraserTool.addListener('toolChange', this.eraserToolChange.bind(this));

  this.addListener('dragNDropStart', this.matrixMoveHandler.bind(this));
  this.addListener('dragNDropMove', this.matrixMoveHandler.bind(this));
  this.addListener('dragNDropEnd', this.matrixEndHandler.bind(this));
};

mixin(PaintScreen.prototype, CustomEventTarget.prototype);
mixin(PaintScreen.prototype, DragNDrop.prototype);

PaintScreen.prototype.pencilToolChange = function pencilToolChange(event) {
  this.toolValue = 1;
};

PaintScreen.prototype.eraserToolChange = function eraserToolChange(event) {
  this.toolValue = 0;
};

PaintScreen.prototype.undoButtonHandler = function undoButtonHandler() {
  if (this.undoStateManager.isEmpty()) {
    return;
  };

  var state = this.undoStateManager.pop();

  if (this.undoStateManager.isEmpty()) {
    this.undoButton.disable();
  }

  for (let index = 0; index < state.length; index++) {
    state[index].item.value = state[index].prevValue;
    state[index].prevValue = state[index].nextValue;
    state[index].nextValue = state[index].item.value;
  }

  this.redoStateManager.push(state);

  if (this.redoButton.isDisabled()) {
    this.redoButton.enable();
  }

  localStorage.setItem('paint', JSON.stringify(this.matrix.data));
};

PaintScreen.prototype.redoButtonHandler = function redoButtonHandler() {
  if (this.redoStateManager.isEmpty()) {
    return;
  }

  var state = this.redoStateManager.pop();

  if (this.redoStateManager.isEmpty()) {
    this.redoButton.disable();
  }

  for (let index = 0; index < state.length; index++) {
    state[index].item.value = state[index].prevValue;
    state[index].prevValue = state[index].nextValue;
    state[index].nextValue = state[index].item.value;
  }

  this.undoStateManager.push(state);

  if (this.undoButton.isDisabled()) {
    this.undoButton.enable();
  }

  localStorage.setItem('paint', JSON.stringify(this.matrix.data));
};

PaintScreen.prototype.clearButtonHandler = function clearButtonHandler() {
  var matrixData = paintScreenOne.matrix.data,
      newState = [];

  for (let index = 0; index < this.config.rows; index++) {
    for (let j = 0; j < this.config.columns; j++) {
      newState.push({
        item: matrixData[index][j],
        prevValue: matrixData[index][j].value,
        nextValue: 0
      });
      matrixData[index][j].value = 0;
    }
  }

  this.undoStateManager.push(newState);

  if (this.undoButton.isDisabled()) {
    this.undoButton.enable();
  }

  localStorage.setItem('paint', JSON.stringify(this.matrix.data));
};

PaintScreen.prototype.matrixMoveHandler = function matrixMoveHandler(event) {
  var row = Math.ceil(event.y * this.config.rows / (this.config.rows * this.config.height));
  var column = Math.ceil(event.x * this.config.columns / (this.config.columns * this.config.width));
  if (!this.matrix.data[row - 1]) {
    return;
  }

  var current = this.matrix.data[row - 1][column - 1];

  if (current && !(this.currentAction.length && this.currentAction[this.currentAction.length - 1].item === current)) {
    this.currentAction.push({
      item: current,
      prevValue: current.value,
      nextValue: this.toolValue
    });

    current.value = this.toolValue;
  }
};

PaintScreen.prototype.matrixEndHandler = function matrixEndHandler() {
  if (this.currentAction.length > 0) {
    this.undoStateManager.push(this.currentAction);

    if (this.undoButton.isDisabled()) {
      this.undoButton.enable();
    }
  }

  localStorage.setItem('paint', JSON.stringify(this.matrix.data));

  this.currentAction = [];
};

function fillMatrix(matrix, config, prevPaint) {
  var matrixElement = document.createElement('div');
  matrixElement.classList.add('matrix__element');
  matrixElement.style.height = `${config.height}px`;
  matrixElement.style.width = `${config.width}px`;

  var matrixData = [];

  for (let i = 0; i < config.rows; i++) {
    matrixData[i] = [];
    for (let j = 0; j < config.columns; j++) {
        var nodeClone = matrixElement.cloneNode(),
            elementData = {
              node: nodeClone
            };

          if (prevPaint) {
            elementData.value = prevPaint[i][j].value;
          } else {
            elementData.value = 0;
          }

          matrixData[i].push(elementData);
          matrix.appendChild(nodeClone);
      }
  }

  return matrixData;
}

function draw(config, prevPaint) {
  var newMatrix = document.createElement('div'),
      final = {
        node: newMatrix,
        data: fillMatrix(newMatrix, config, prevPaint)
      };

  newMatrix.classList.add('matrix');

  newMatrix.style.height = `${config.height * config.rows}px`;
  newMatrix.style.width = `${config.width * config.columns}px`;

  return final;
}