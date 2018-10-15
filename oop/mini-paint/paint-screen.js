function PaintScreen(rows, columns, elementHeight, elementWidth, radius) {
  this.config = {
    rows: rows,
    columns: columns,
    height: elementHeight,
    width: elementWidth,
    radius: radius
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

  this.pencilTool = new Tool('Pencil', true);
  this.eraserTool = new Tool('Eraser', false);

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

  this.mouseDownOverride = this.matrixMoveHandler.bind(this);
  this.mouseMoveOverride = this.matrixMoveHandler.bind(this);
  this.mouseUpOverride = this.matrixEndHandler.bind(this);
};

mixin(PaintScreen.prototype, CustomEventTarget.prototype);
mixin(PaintScreen.prototype, DragNDrop.prototype);

Object.assign(PaintScreen.prototype, {
  // TOOLS LOGIC
  pencilToolChange: function pencilToolChange(event) {
    this.toolValue = 1;
  },

  eraserToolChange: function eraserToolChange(event) {
    this.toolValue = 0;
  },

  // BUTTONS LOGIc

  undoButtonHandler: function undoButtonHandler() {
    if (this.undoStateManager.isEmpty()) {
      return;
    };

    var state = this.undoStateManager.pop();

    if (this.undoStateManager.isEmpty()) {
      this.undoButton.disable();
    }

    for (let index = 0; index < state.length; index++) {
      if (state[index].prevValue) {
        state[index].item.enable();
      } else {
        state[index].item.disable();
      }

      state[index].prevValue = state[index].nextValue;
      state[index].nextValue = state[index].item.state;
    }

    this.redoStateManager.push(state);

    if (this.redoButton.isDisabled()) {
      this.redoButton.enable();
    }

    localStorage.setItem('paint', JSON.stringify(this.matrix.data));
  },

  redoButtonHandler: function redoButtonHandler() {
    if (this.redoStateManager.isEmpty()) {
      return;
    }

    var state = this.redoStateManager.pop();

    if (this.redoStateManager.isEmpty()) {
      this.redoButton.disable();
    }

    for (let index = 0; index < state.length; index++) {
      if (state[index].prevValue) {
        state[index].item.enable();
      } else {
        state[index].item.disable();
      }

      state[index].prevValue = state[index].nextValue;
      state[index].nextValue = state[index].item.state;
    }

    this.undoStateManager.push(state);

    if (this.undoButton.isDisabled()) {
      this.undoButton.enable();
    }

    localStorage.setItem('paint', JSON.stringify(this.matrix.data));
  },

  clearButtonHandler: function clearButtonHandler() {
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
  },

  // MATRIX LOGIC

  matrixMoveHandler: function matrixMoveHandler(event) {
    var row = Math.ceil(event.y * this.config.rows / (this.config.rows * this.config.height));
    var column = Math.ceil(event.x * this.config.columns / (this.config.columns * this.config.width));

    if (!this.matrix.data[row - 1]) {
      return;
    }

    var current = this.matrix.data[row - 1][column - 1];

    if (current && !(this.currentAction.length && this.currentAction[this.currentAction.length - 1].item === current)) {
      this.currentAction.push({
        item: current,
        prevValue: current.state,
        nextValue: this.toolValue
      });

      if (this.toolValue) {
        current.enable();
      } else {
        current.disable();
      }
    }
  },

  matrixEndHandler: function matrixEndHandler() {
    if (this.currentAction.length > 0) {
      this.undoStateManager.push(this.currentAction);

      if (this.undoButton.isDisabled()) {
        this.undoButton.enable();
      }
    }

    localStorage.setItem('paint', JSON.stringify(this.matrix.data));

    this.currentAction = [];
  }
});

function fillMatrix(matrix, config, prevPaint) {
  var matrixData = [];

  for (let i = 0; i < config.rows; i++) {
    matrixData[i] = [];
    for (let j = 0; j < config.columns; j++) {
        var newPixel = new Pixel(config.height, config.width);

        if (prevPaint && prevPaint[i][j].value) {
           newPixel.enable();
        };

        matrixData[i].push(newPixel);
        matrix.appendChild(newPixel.element);
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