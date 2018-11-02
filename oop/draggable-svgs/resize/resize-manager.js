function ResizeManager() {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "g");
  this.element.classList.add('hidden');
  this.pointSide = 10;
  this.pointStart = 5;
  this.resizePoints = [];

  this.resizeBorderElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.resizeBorderElement.classList.add('resizeable');
  this.element.appendChild(this.resizeBorderElement);
  this.position = {};

  this.createPoint(this.leftHandler.bind(this), 'left');
  this.createPoint(this.rightHandler.bind(this), 'right');

  this.createPoint(this.topHandler.bind(this), 'top');
  this.createPoint(this.bottomHandler.bind(this), 'bottom');

  this.createPoint(this.topRightHandler.bind(this), 'topRight');
  this.createPoint(this.topLeftHandler.bind(this), 'topLeft');
  this.createPoint(this.bottomRightHandler.bind(this), 'bottomRight');
  this.createPoint(this.bottomLeftHandler.bind(this), 'bottomLeft');
}

Object.assign(ResizeManager.prototype, CustomEventTarget.prototype, {
  resizeHandlerOverride: function() {
    this.updateResizePosition();
  },

  resizeEndHandlerOverride: function() {
  },

  show: function() {
    this.element.classList.remove('hidden');
  },

  hide: function() {
    this.element.classList.add('hidden');
  },

  updateElement: function(element) {
    this.selectedElement = element;
    this.position = Object.assign({}, element.position);
    this.resizeX = 0;
    this.resizeY = 0;

    this.element.setAttribute('transform', `translate(${this.position.x + 10}, ${this.position.y + 10})`);
    this.updateResizePosition();
  },

  updateResizePosition: function() {
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

  createPoint: function(moveHandler, direction) {
    var point,
        cursor;

    point = new ResizeablePoint(this.pointSide, 0, 0, this.pointStart);

    if (direction === 'left' || direction === 'right') {
      cursor = 'e-resize';
    }

    if (direction === 'top' || direction === 'bottom') {
      cursor = 'n-resize';
      point.addListener('resizeablePointEnd', this.pointEndHandler.bind(this));
    }

    if (direction === 'topRight' || direction === 'bottomLeft') {
      cursor = 'nesw-resize';
      point.addListener('resizeablePointEnd', this.pointEndHandler.bind(this));
    }

    if (direction === 'topLeft' || direction === 'bottomRight') {
      cursor = 'nwse-resize';
      point.addListener('resizeablePointEnd', this.pointEndHandler.bind(this));
    }

    point.element.classList.add(cursor);
    point.addListener('resizeablePointMove', moveHandler);
    this.resizePoints.push(point);
    this.element.appendChild(point.element);
  },

  resizeElement: function() {
    this.position.x = this.position.x + this.resizeX;
    this.position.width -= this.resizeX;
    this.position.height -= this.resizeY;

    this.element.setAttribute('transform', `translate(${ this.position.x + this.resizeX + 10 }, ${ this.position.y - this.resizeY + 10 })`);

    this.resizeX = 0;
    this.resizeY = 0;

    this.selectedElement.resize(this.position);
  },

  pointEndHandler: function(event) {
    this.resizeElement();
    this.fire({ type: 'resizeControllerEnd' });
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

  leftChange: function(event) {
    if (event.x + 20 >= this.position.x + this.position.width) {
      return;
    }

    var xDiff = event.x - this.position.x;
    this.resizeX = xDiff;
  },

  rightChange: function(event) {
    if (event.x - 20 <= this.position.x) {
      return;
    }

    this.position.width = event.x - this.position.x;
  },

  topChange: function(event) {
    if (event.y + 20 >= this.position.y + this.position.height) {
      return;
    }

    var yDiff = event.y - this.position.y;
    this.resizeY = yDiff;

  },

  bottomChange: function(event) {
    if (event.y - 20 <= this.position.y) {
      return;
    }

    this.position.height = event.y - this.position.y;
  },

  leftHandler: function(event) {
    this.leftChange(event);
    this.resizeHandlerOverride();
    this.resizeElement();
  },

  rightHandler: function(event) {
    this.rightChange(event);
    this.resizeHandlerOverride();
    this.resizeElement();
  },

  topHandler: function(event) {
    this.topChange(event);
    this.resizeHandlerOverride();
  },

  bottomHandler: function(event) {
    this.bottomChange(event);
    this.resizeHandlerOverride();
  },

  topRightHandler: function(event) {
    this.topChange(event);
    this.rightChange(event);
    this.resizeHandlerOverride();
  },

  topLeftHandler: function(event) {
    this.topChange(event);
    this.leftChange(event);
    this.resizeHandlerOverride();
  },

  bottomRightHandler: function(event) {
    this.bottomChange(event);
    this.rightChange(event);
    this.resizeHandlerOverride();
  },

  bottomLeftHandler: function(event) {
    this.bottomChange(event);
    this.leftChange(event);
    this.resizeHandlerOverride();
  },
});