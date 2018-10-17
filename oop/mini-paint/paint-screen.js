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

  // Undo Manager
  this.undoManager = new UndoManager();
  this.undoManager.addListener('undo', this.undoHandler.bind(this));
  this.undoManager.addListener('redo', this.redoHandler.bind(this));
  this.matrix.node.appendChild(this.undoManager.element);

  // Clear Button
  this.clearButton = new Button({ name: 'clear', text: 'Clear'});
  this.clearButton.addListener('buttonClick', this.clearButtonHandler.bind(this));
  this.matrix.node.appendChild(this.clearButton.element);

  // TOOLS (PENCIL ERASER)
  var toolsStyles = {
        backgroundColor: '#00f',
        color: '#fff',
        fontSize: '16px',
        marginBottom: '5px'
      },
      toolsGroupConfig = {
        type: 'radio',
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
  this.toolsGroup = new ButtonGroup(toolsGroupConfig, toolsGroupButtonsConfig);
  this.toolsGroup.addListener('groupChange', this.toolsChangeHandler.bind(this));
  this.matrix.node.appendChild(this.toolsGroup.element);

  // SCREEN CHANGER ( BACKGROUND BORDER )
  var screenChangerStyles = {
        backgroundColor: '#3f3',
        color: '#000',
        fontSize: '20px',
        marginRight: '5px'
      },
      screenChangerGroupConfig = {
        type: 'checkbox',
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

  this.screenChangerGroup = new ButtonGroup(screenChangerGroupConfig, screenChangerGroupButtonsConfig);
  this.screenChangerGroup.addListener('groupChange', this.screenModifierChangeHandler.bind(this));
  this.matrix.node.appendChild(this.screenChangerGroup.element);

  this.mouseDownOverride = this.matrixStartHandler.bind(this);
  this.mouseMoveOverride = this.matrixMoveHandler.bind(this);
  this.mouseUpOverride = this.matrixEndHandler.bind(this);
};

mixin(PaintScreen.prototype, CustomEventTarget.prototype);
mixin(PaintScreen.prototype, MouseActions.prototype);

Object.assign(PaintScreen.prototype, {
  undoHandler: function undoHandler(event) {
    this.matrix.data = event.state.slice();
    localStorage.setItem('paint', JSON.stringify(this.matrix.data));
  },

  redoHandler: function redoHandler(event) {
    this.matrix.data = event.state.slice();
    localStorage.setItem('paint', JSON.stringify(this.matrix.data));
  },

  toolsChangeHandler: function toolsChangeHandler(event) {
    this.toolValue = event.button.config.value;
  },

  screenModifierChangeHandler: function screenModifierChangeHandler(event) {
    console.log('getSelected', this.screenChangerGroup.getSelected());
    console.log('getUnselected', this.screenChangerGroup.getUnselected());

    if (event.button.isSelected()) {
      this.matrix.node.classList.add('matrix--' + event.action);
    } else {
      this.matrix.node.classList.remove('matrix--' + event.action);
    }
  },

  clearButtonHandler: function clearButtonHandler() {
    var dataCopy = JSON.parse( JSON.stringify(this.matrix.data));
    this.undoManager.addAction(dataCopy);

    for (let i = 0; i < this.config.rows; i++) {
      for (let j = 0; j < this.config.columns; j++) {
        this.matrix.data[i][j] = 0;
      }
    }

    localStorage.setItem('paint', JSON.stringify(this.matrix.data));
  },

  // MATRIX LOGIC

  matrixStartHandler: function matrixStartHandler(event) {
    if (!event.target.matches('.pixel')) {
      return;
    }

    var dataCopy = JSON.parse( JSON.stringify(this.matrix.data));
    this.undoManager.addAction(dataCopy);
  },

  matrixMoveHandler: function matrixMoveHandler(event) {
    var row = Math.ceil(event.y * this.config.rows / (this.config.rows * this.config.height));
    var column = Math.ceil(event.x * this.config.columns / (this.config.columns * this.config.width));

    if (!this.matrix.instancesMap[row - 1]) {
      return;
    }

    var current = this.matrix.instancesMap[row - 1][column - 1];

    if (current && !(this.currentAction.length && this.currentAction[this.currentAction.length - 1].item === current)) {
      if (this.toolValue) {
        this.matrix.data[row - 1][column - 1] = 1;
      } else {
        this.matrix.data[row - 1][column - 1] = 0;
      }
    }
  },

  matrixEndHandler: function matrixEndHandler() {
    localStorage.setItem('paint', JSON.stringify(this.matrix.data));
  }
});

function fillMatrix(matrix, config, prevPaint) {
  var instancesMap = [],
      data = [];

  for (let i = 0; i < config.rows; i++) {
    instancesMap[i] = [];
    data[i] = [];

    for (let j = 0; j < config.columns; j++) {
        var newPixel = new Pixel(config.height, config.width);
        data[i][j] = 0;

        if (prevPaint && prevPaint[i][j]) {
          data[i][j] = prevPaint[i][j];
        };

        instancesMap[i].push(newPixel);
        matrix.appendChild(newPixel.element);
      }
  }

  return {
    instancesMap: instancesMap,
    data: data
  };
}

function draw(config, prevPaint) {
  var newMatrix = document.createElement('div'),
      fillResponse = fillMatrix(newMatrix, config, prevPaint),
      final = {
        node: newMatrix,
        data: fillResponse.data,
        instancesMap: fillResponse.instancesMap
      };

  newMatrix.classList.add('matrix');

  newMatrix.style.height = `${config.height * config.rows}px`;
  newMatrix.style.width = `${config.width * config.columns}px`;

  return final;
}