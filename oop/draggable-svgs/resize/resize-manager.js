function ResizeManager() {
  // Create the group that will contain the border and the points
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "g");
  this.element.classList.add('hidden', 'resizeable-group');

  // Constants
  this.pointSide = 10;
  this.pointStart = 5;

  this.minHeightWidth = 15;

  this.resizePoints = [];
  // Group and points positions
  this.position = {};

  this.resizeBorderElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.resizeBorderElement.classList.add('resizeable');
  this.element.appendChild(this.resizeBorderElement);

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
  // Called at a point movement
  resizeHandler: function() {
    this.updateResizePosition();
  },

  show: function() {
    this.element.classList.remove('hidden');
  },

  hide: function() {
    this.element.classList.add('hidden');
  },

  // Called when the clicked element is changed
  resetPosition: function(element) {
    this.selectedElement = element;
    this.position = Object.assign({}, element.position);
    this.resizeX = 0;
    this.resizeY = 0;

    this.element.setAttribute('transform', `translate(${this.position.x + 10}, ${this.position.y + 10})`);
    this.updateResizePosition();
  },

  updateSelectedItemPosition: function(offsetX, offsetY) {
    if (!this.selectedElement) {
      return;
    }

    this.position = Object.assign({}, this.selectedElement.position);

    var positionX = this.position.x + 10;
    var positionY = this.position.y + 10;

    if (!isNaN(offsetX) && offsetX !== null) {
      positionX = offsetX;
    }

    if (!isNaN(offsetY) && offsetY !== null) {
      positionY = offsetY;
    }

    this.element.setAttribute('transform', `translate(${positionX}, ${positionY})`);
    this.updateResizePosition();
  },

  // Set the positions of the resize border and points
  updateResizePosition: function() {
    this.resizePoints[this.pointPositions.left].updatePosition(this.resizeX, this.position.height / 2 + this.resizeY / 2);
    this.resizePoints[this.pointPositions.right].updatePosition(this.position.width, this.position.height / 2  + this.resizeY / 2);
    this.resizePoints[this.pointPositions.top].updatePosition(this.position.width / 2 + this.resizeX / 2, this.resizeY);
    this.resizePoints[this.pointPositions.bottom].updatePosition(this.position.width / 2 + this.resizeX / 2, this.position.height );

    this.resizePoints[this.pointPositions.topRight].updatePosition(this.position.width, this.resizeY);
    this.resizePoints[this.pointPositions.topLeft].updatePosition(this.resizeX, this.resizeY);
    this.resizePoints[this.pointPositions.bottomRight].updatePosition(this.position.width, this.position.height );
    this.resizePoints[this.pointPositions.bottomLeft].updatePosition(this.resizeX, this.position.height );

    this.resizeBorderElement.setAttribute('width', this.position.width - this.resizeX);
    this.resizeBorderElement.setAttribute('height', this.position.height - this.resizeY);
    this.resizeBorderElement.setAttribute('x', this.resizeX);
    this.resizeBorderElement.setAttribute('y', this.resizeY);
  },

  // Trigger selected element resize
  resizeElement: function() {
    this.position.x = this.position.x + this.resizeX;
    this.position.width -= this.resizeX;
    this.position.height -= this.resizeY;

    this.element.setAttribute('transform', `translate(${ this.position.x + 10 }, ${ this.position.y + 10 })`);

    this.resizeX = 0;
    this.resizeY = 0;

    this.selectedElement.resize(this.position);
  },

  pointEndHandler: function(event) {
    this.resizeElement();
    this.updateResizePosition();
    this.fire({ type: 'resizeControllerEnd' });
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
    if (event.x + this.minHeightWidth >= this.position.x + this.position.width) {
      return;
    }

    var xDiff = event.x - this.position.x;
    this.resizeX = xDiff;
  },

  rightChange: function(event) {
    if (event.x - this.minHeightWidth <= this.position.x) {
      return;
    }

    this.position.width = event.x - this.position.x;
  },

  topChange: function(event) {
    if (event.y + this.minHeightWidth >= this.position.y + this.position.height) {
      return;
    }


    var yDiff = event.y - this.position.y;
    this.resizeY = yDiff;
  },

  bottomChange: function(event) {
    if (event.y - this.minHeightWidth <= this.position.y) {
      return;
    }

    this.position.height = event.y - this.position.y;
  },

  leftHandler: function(event) {
    this.leftChange(event);
    this.resizeHandler();
    this.resizeElement();
  },

  rightHandler: function(event) {
    this.rightChange(event);
    this.resizeHandler();
    this.resizeElement();
  },

  topHandler: function(event) {
    this.topChange(event);
    this.resizeHandler();
  },

  bottomHandler: function(event) {
    this.bottomChange(event);
    this.resizeHandler();
  },

  topRightHandler: function(event) {
    this.topChange(event);
    this.rightChange(event);
    this.resizeHandler();
  },

  topLeftHandler: function(event) {
    this.topChange(event);
    this.leftChange(event);
    this.resizeHandler();
  },

  bottomRightHandler: function(event) {
    this.bottomChange(event);
    this.rightChange(event);
    this.resizeHandler();
  },

  bottomLeftHandler: function(event) {
    this.bottomChange(event);
    this.leftChange(event);
    this.resizeHandler();
  },
});