function Resizeable() {}

Object.assign(Resizeable.prototype, {
  initResizeable: function(element) {
    this.resizeable = false;

    if (!this.element) {
      this.element = element;
    }

    if (!this.resizePoints) {
      this.resizePoints = [];
    }

    this.element.addEventListener('click', this.clickHandler.bind(this));

    this.resizeBorderElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.resizeBorderElement.classList.add('resizeable');

    this.element.appendChild(this.resizeBorderElement);
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

  makeResizeable: function() {
    if (this.resizeable) {
      return;
    };

    this.resizeable = true;
    this.resizeX = 0;
    this.resizeY = 0;

    this.createPoint(this.startXHandler.bind(this), 'horizontal', 'first');
    this.createPoint(this.endXHandler.bind(this), 'horizontal', 'second');

    this.createPoint(this.startYHandler.bind(this), 'vertical', 'first');
    this.createPoint(this.endYHandler.bind(this), 'vertical', 'second');

    this.createPoint(this.topRightHandler.bind(this), 'both', 'top-right');
    this.createPoint(this.topLeftHandler.bind(this), 'both', 'top-left');
    this.createPoint(this.bottomRightHandler.bind(this), 'both', 'bottom-right');
    this.createPoint(this.bottomLeftHandler.bind(this), 'both', 'bottom-left');

    this.resizeBorderElement.setAttribute('height', this.position.height);
    this.resizeBorderElement.setAttribute('width', this.position.width);
    this.resizeBorderElement.classList.remove('hidden');
  },

  createPoint: function(moveHandler, direction, position) {
    var point,
        resizeablePointSide = 10,
        cursor,
        positionX, positionY;


    if (direction === 'horizontal') {
      positionY = this.position.height / 2 - 5;

      if (position === 'first') {
        positionX = -5;
      }

      if (position === 'second') {
        positionX = this.position.width - 5;
      }

      cursor = 'e-resize';
    }

    if (direction === 'vertical') {
      positionX = this.position.width / 2 - 5;

      if (position === 'first') {
        positionY = -5;
      }

      if (position === 'second') {
        positionY = this.position.height - 5;
      }

      cursor = 'n-resize';
    }

    if (direction === 'both') {

      if (position === 'top-right') {
        positionY = - 5;
        positionX = this.position.width - 5;
        cursor = 'nesw-resize';
      }

      if (position === 'top-left') {
        positionY = -5;
        positionX = -5;
        cursor = 'nwse-resize';
      }

      if (position === 'bottom-right') {
        positionY = this.position.height - 5;
        positionX = this.position.width -5;
        cursor = 'nwse-resize';
      }

      if (position === 'bottom-left') {
        positionY = this.position.height - 5;
        positionX = -5;
        cursor = 'nesw-resize';
      }
    }

    point = new ResizeablePoint(resizeablePointSide, positionX, positionY);
    point.element.classList.add(cursor);
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

  unmakeResizeable: function() {
    this.resizeable = false;

    for (let i = 0; i < this.resizePoints.length; i++) {
      const point = this.resizePoints[i];
      this.element.removeChild(point.element);
    }

    this.resizePoints = [];
    this.resizeBorderElement.classList.add('hidden');
  },

  updateResizePointsPositions: function() {
    this.resizePoints[0].updatePosition(this.resizeX - 5, this.position.height / 2 - 5 + this.resizeY / 2);
    this.resizePoints[1].updatePosition(this.position.width - 5, this.position.height / 2 - 5 + this.resizeY / 2);
    this.resizePoints[2].updatePosition(this.position.width / 2 - 5 + this.resizeX / 2, this.resizeY - 5);
    this.resizePoints[3].updatePosition(this.position.width / 2 - 5 + this.resizeX / 2, this.position.height - 5);

    this.resizePoints[4].updatePosition(this.position.width - 5, this.resizeY - 5);
    this.resizePoints[5].updatePosition(this.resizeX - 5, this.resizeY - 5);
    this.resizePoints[6].updatePosition(this.position.width - 5, this.position.height - 5);
    this.resizePoints[7].updatePosition(this.resizeX- 5, this.position.height - 5);

    this.resizeBorderElement.setAttribute('width', this.position.width - this.resizeX);
    this.resizeBorderElement.setAttribute('height', this.position.height - this.resizeY);
    this.resizeBorderElement.setAttribute('x', this.resizeX);
    this.resizeBorderElement.setAttribute('y', this.resizeY);
  },

  startXHandler: function(event) {
    if (event.x >= this.position.x + this.position.width) {
      return;
    }

    var xDiff = event.x - this.position.x;
    this.resizeX = xDiff;
    this.resizeHandlerOverride();
  },

  endXHandler: function(event) {
    if (event.x <= this.position.x) {
      return;
    }

    this.position.width = event.x - this.position.x;
    this.resizeHandlerOverride();
  },

  startYHandler: function(event) {
    if (event.y >= this.position.y + this.position.height) {
      return;
    }

    var yDiff = event.y - this.position.y;
    this.resizeY = yDiff;
    this.resizeHandlerOverride();
  },

  endYHandler: function(event) {
    if (event.y <= this.position.y) {
      return;
    }

    this.position.height = event.y - this.position.y;
    this.resizeHandlerOverride();
  },

  topRightHandler: function(event) {
    if (event.y >= this.position.y + this.position.height || event.x <= this.position.x) {
      return;
    }

    var yDiff = event.y - this.position.y;
    this.resizeY = yDiff;

    this.position.width = event.x - this.position.x;

    this.resizeHandlerOverride();
  },

  topLeftHandler: function(event) {
    if (event.y >= this.position.y + this.position.height || event.x >= this.position.x + this.position.width) {
      return;
    }

    var yDiff = event.y - this.position.y;
    this.resizeY = yDiff;

    var xDiff = event.x - this.position.x;
    this.resizeX = xDiff;

    this.resizeHandlerOverride();
  },

  bottomRightHandler: function(event) {
    if (event.y <= this.position.y || event.x <= this.position.x) {
      return;
    }

    this.position.height = event.y - this.position.y;
    this.position.width = event.x - this.position.x;

    this.resizeHandlerOverride();
  },

  bottomLeftHandler: function(event) {
    if (event.y <= this.position.y || event.x >= this.position.x + this.position.width) {
      return;
    }

    this.position.height = event.y - this.position.y;

    var xDiff = event.x - this.position.x;
    this.resizeX = xDiff;

    this.resizeHandlerOverride();
  },
});