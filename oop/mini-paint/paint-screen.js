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
  this.initMouseActions(this.matrix.node);
  this.currentAction = [];
  this.toolValue = 1;

  this.undoStateManager = new Stiva(30);
  this.redoStateManager = new Stiva(30);

  // ACTIONS (UNDO REDO CLEAR)
  var actionsStyles = {
        backgroundColor: '#0f0',
        fontSize: '18px',
        marginRight: '5px'
      },
      actionsGroupConfig = {
        style: {
          display: 'flex',
          alignItems: 'flex-start',
          marginRight: '5px'
        }
      },
      actionsGroupButtonsConfig = [
        {
          name: 'undo',
          text: 'Undo',
          customStyle: actionsStyles
        }, {
          name: 'redo',
          text: 'Redo',
          customStyle: actionsStyles
        }, {
          name: 'clear',
          text: 'Clear',
          customStyle: actionsStyles
        }
      ];

  this.actionsGroup = new ButtonGroup(actionsGroupConfig, actionsGroupButtonsConfig);
  this.actionsGroup.addListener('groupChange', function(event) {
    this[event.action + 'ButtonHandler']();
  }.bind(this));

  // TOOLS (PENCIL ERASER)
  var toolsStyles = {
        backgroundColor: '#00f',
        color: '#fff',
        fontSize: '16px',
        marginBottom: '5px'
      },
      toolsGroupConfig = {
        style: {
          display: 'flex',
          flexDirection: 'column'
        }
      },
      toolsGroupButtonsConfig = [
        {
          name: 'pencil',
          text: 'Pencil',
          selected: true,
          value: 1,
          customStyle: toolsStyles
        }, {
          name: 'eraser',
          text: 'Eraser',
          selected: false,
          value: 0,
          customStyle: toolsStyles
        }
      ];

  this.toolsGroup = new RadioGroup(toolsGroupConfig, toolsGroupButtonsConfig);
  this.toolsGroup.addListener('groupChange', function(event) {
    this.toolValue = event.button.config.value;
  }.bind(this));

  // SCREEN CHANGER ( BACKGROUND BORDER )
  var screenChangerStyles = {
        backgroundColor: '#3f3',
        color: '#000',
        fontSize: '20px',
        marginRight: '5px'
      },
      screenChangerGroupConfig = {
        style: {
          display: 'flex',
          alignItems: 'flex-start'
        }
      },
      screenChangerGroupButtonsConfig = [
        {
          name: 'black-bg',
          text: 'Black Background',
          selected: false,
          customStyle: screenChangerStyles
        }, {
          name: 'big-border',
          text: 'Big Border',
          selected: false,
          customStyle: screenChangerStyles
        }
      ];

  this.screenChangerGroup = new CheckboxGroup(screenChangerGroupConfig, screenChangerGroupButtonsConfig);
  this.screenChangerGroup.addListener('groupChange', function(event) {
    if (event.button.isSelected()) {
      this.matrix.node.classList.add('matrix--' + event.action);
    } else {
      this.matrix.node.classList.remove('matrix--' + event.action);
    }
  }.bind(this));


  this.actionsGroup.disable();
  this.matrix.node.appendChild(this.actionsGroup.element);
  this.matrix.node.appendChild(this.toolsGroup.element);
  this.matrix.node.appendChild(this.screenChangerGroup.element);

  this.mouseDownOverride = this.matrixMoveHandler.bind(this);
  this.mouseMoveOverride = this.matrixMoveHandler.bind(this);
  this.mouseUpOverride = this.matrixEndHandler.bind(this);
};

mixin(PaintScreen.prototype, CustomEventTarget.prototype);
mixin(PaintScreen.prototype, MouseActions.prototype);

Object.assign(PaintScreen.prototype, {
  undoButtonHandler: function undoButtonHandler() {
    if (this.undoStateManager.isEmpty()) {
      return;
    };

    var state = this.undoStateManager.pop();

    if (this.undoStateManager.isEmpty()) {
      this.actionsGroup.disable([{ name: 'undo' }]);
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

    this.actionsGroup.enable([{ name: 'redo' }]);

    localStorage.setItem('paint', JSON.stringify(this.matrix.data));
  },

  redoButtonHandler: function redoButtonHandler() {
    if (this.redoStateManager.isEmpty()) {
      return;
    }

    var state = this.redoStateManager.pop();

    if (this.redoStateManager.isEmpty()) {
      this.actionsGroup.disable([{ name: 'redo' }]);
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

    this.actionsGroup.enable([{ name: 'undo' }]);

    localStorage.setItem('paint', JSON.stringify(this.matrix.data));
  },

  clearButtonHandler: function clearButtonHandler() {
    var matrixData = paintScreenOne.matrix.data,
        newState = [];

    for (let index = 0; index < this.config.rows; index++) {
      for (let j = 0; j < this.config.columns; j++) {
        newState.push({
          item: matrixData[index][j],
          prevValue: matrixData[index][j].state,
          nextValue: 0
        });

        matrixData[index][j].disable();
      }
    }

    this.undoStateManager.push(newState);

    this.actionsGroup.enable([{ name: 'undo' }]);
    this.actionsGroup.disable([{ name: 'clear' }]);

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


      this.actionsGroup.enable([{ name: 'undo' }, { name: 'clear' }]);
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

        if (prevPaint && prevPaint[i][j].state) {
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