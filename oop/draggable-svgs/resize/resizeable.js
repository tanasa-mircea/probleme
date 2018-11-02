function Resizeable() {}

Object.assign(Resizeable.prototype, {
  initResizeable: function() {
    this.resizeable = false;

    this.pointSide = 10;
    this.pointStart = 5;

    if (!this.element) {
      throw(new Error('this.element should already exist'));
    }

    if (!this.position) {
      throw(new Error('this.position should already exist'));
    }

    if (!this.resizePoints) {
      this.resizePoints = [];
    }

    this.element.addEventListener('click', this.clickHandler.bind(this));

    this.resizeBorderElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.resizeBorderElement.classList.add('resizeable');
    this.element.appendChild(this.resizeBorderElement);


    this.createPoint(this.startXHandler.bind(this), 'left');
    this.createPoint(this.endXHandler.bind(this), 'right');

    this.createPoint(this.startYHandler.bind(this), 'top');
    this.createPoint(this.endYHandler.bind(this), 'bottom');

    this.createPoint(this.topRightHandler.bind(this), 'topRight');
    this.createPoint(this.topLeftHandler.bind(this), 'topLeft');
    this.createPoint(this.bottomRightHandler.bind(this), 'bottomRight');
    this.createPoint(this.bottomLeftHandler.bind(this), 'bottomLeft');
  },

  resizeHandlerOverride: function() {
    throw(new Error('resizeHandlerOverride should be overwritten'));
  },

  resizeEndHandlerOverride: function() {
    throw(new Error('resizeHandlerOverride should be overwritten'));
  },

  clickHandler: function(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.hasMoved) {
      return;
    }

    this.makeResizeable();
    this.clickOverride();
  },

  clickOverride: function() {
    throw(new Error('Resize click should be overriden'));
  },

  unmakeResizeable: function() {
    this.resizeable = false;

    for (let i = 0; i < this.resizePoints.length; i++) {
      this.resizePoints[i].hide();
    }

    this.resizeBorderElement.classList.add('hidden');
  },

  makeResizeable: function() {
    if (this.resizeable) {
      return;
    };

    this.resizeable = true;
    this.resizeX = 0;
    this.resizeY = 0;

    for (let i = 0; i < this.resizePoints.length; i++) {
      this.resizePoints[i].show();
    }

    this.updateResizePointsPositions();
    this.resizeBorderElement.classList.remove('hidden');
  },

  createPoint: function(moveHandler, direction) {
    var point,
        cursor;

    if (direction === 'left' || direction === 'right') {
      cursor = 'e-resize';
    }

    if (direction === 'top' || direction === 'bottom') {
      cursor = 'n-resize';
    }

    if (direction === 'topRight' || direction === 'bottomLeft') {
      cursor = 'nesw-resize';
    }

    if (direction === 'topLeft' || direction === 'bottomRight') {
      cursor = 'nwse-resize';
    }

    point = new ResizeablePoint(this.pointSide, 0, 0, this.pointStart);
    point.element.classList.add(cursor, 'hidden');
    point.addListener('resizeablePointMove', moveHandler);
    point.addListener('resizeablePointEnd', this.pointEndHandler.bind(this));
    this.resizePoints.push(point);
    this.element.appendChild(point.element);
  },

  pointEndHandler: function() {
    this.position.x = this.position.x + this.resizeX;
    this.position.y = this.resizeY;
    this.position.width -= this.resizeX;
    this.position.height -= this.resizeY;

    this.resizeX = 0;
    this.resizeY = 0;

    this.resizeEndHandlerOverride();
  },

  pointPositions: {
    'left': 0,
    'right': 1,
    'top': 2,
    'bottom': 3,
    'topRight': 4,
    'topLeft': 5,
    'bottomRight': 6,
    'bottomLeft': 7
  },

  updateResizePointsPositions: function() {
    this.resizePoints[this.pointPositions.left].updatePosition(this.resizeX, this.position.height / 2 + this.resizeY / 2);
    this.resizePoints[this.pointPositions.right].updatePosition(this.position.width, this.position.height / 2  + this.resizeY / 2);
    this.resizePoints[this.pointPositions.top].updatePosition(this.position.width / 2 + this.resizeX / 2, this.resizeY );
    this.resizePoints[this.pointPositions.bottom].updatePosition(this.position.width / 2 + this.resizeX / 2, this.position.height );

    this.resizePoints[this.pointPositions.topRight].updatePosition(this.position.width, this.resizeY );
    this.resizePoints[this.pointPositions.topLeft].updatePosition(this.resizeX, this.resizeY );
    this.resizePoints[this.pointPositions.bottomRight].updatePosition(this.position.width, this.position.height );
    this.resizePoints[this.pointPositions.bottomLeft].updatePosition(this.resizeX, this.position.height );

    this.resizeBorderElement.setAttribute('width', this.position.width - this.resizeX);
    this.resizeBorderElement.setAttribute('height', this.position.height - this.resizeY);
    this.resizeBorderElement.setAttribute('x', this.resizeX);
    this.resizeBorderElement.setAttribute('y', this.resizeY);
  },

  startXHandler: function(event) {
    if (event.x + 20 >= this.position.x + this.position.width) {
      return;
    }

    var xDiff = event.x - this.position.x;
    this.resizeX = xDiff;

    this.pointEndHandler();
  },

  endXHandler: function(event) {
    if (event.x - 20 <= this.position.x) {
      return;
    }

    this.position.width = event.x - this.position.x;
    this.resizeEndHandlerOverride();
  },

  startYHandler: function(event) {
    if (event.y + 20 >= this.position.y + this.position.height) {
      return;
    }

    var yDiff = event.y - this.position.y;
    this.resizeY = yDiff;
    this.resizeHandlerOverride();
  },

  endYHandler: function(event) {
    if (event.y - 20 <= this.position.y) {
      return;
    }

    this.position.height = event.y - this.position.y;
    this.resizeHandlerOverride();
  },

  topRightHandler: function(event) {
    if (event.y + 20 >= this.position.y + this.position.height || event.x - 20 <= this.position.x) {
      return;
    }

    var yDiff = event.y - this.position.y;
    this.resizeY = yDiff;

    this.position.width = event.x - this.position.x;

    this.resizeHandlerOverride();
  },

  topLeftHandler: function(event) {
    if (event.y + 20 >= this.position.y + this.position.height || event.x + 20 >= this.position.x + this.position.width) {
      return;
    }

    var yDiff = event.y - this.position.y;
    this.resizeY = yDiff;

    var xDiff = event.x - this.position.x;
    this.resizeX = xDiff;

    this.resizeHandlerOverride();
  },

  bottomRightHandler: function(event) {
    if (event.y - 20 <= this.position.y || event.x - 20 <= this.position.x) {
      return;
    }

    this.position.height = event.y - this.position.y;
    this.position.width = event.x - this.position.x;

    this.resizeHandlerOverride();
  },

  bottomLeftHandler: function(event) {
    if (event.y - 20 <= this.position.y || event.x + 20 >= this.position.x + this.position.width) {
      return;
    }

    this.position.height = event.y - this.position.y;

    var xDiff = event.x - this.position.x;
    this.resizeX = xDiff;

    this.resizeHandlerOverride();
  },
});