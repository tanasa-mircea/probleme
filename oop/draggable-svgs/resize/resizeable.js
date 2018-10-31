function Resizeable() {

}

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
  },

  resizeHandlerOverride: function() {
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
    this.element.classList.add('resizeable');

    this.createPoint(this.startXHandler.bind(this), 'horizontal', 'first');
    this.createPoint(this.endXHandler.bind(this), 'horizontal', 'second');

    this.createPoint(this.startYHandler.bind(this), 'vertical', 'first');
    this.createPoint(this.endYHandler.bind(this), 'vertical', 'second');

    this.createPoint(this.topRightHandler.bind(this), 'both', 'top-right');
    this.createPoint(this.topLeftHandler.bind(this), 'both', 'top-left');
    this.createPoint(this.bottomRightHandler.bind(this), 'both', 'bottom-right');
    this.createPoint(this.bottomLeftHandler.bind(this), 'both', 'bottom-left');
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
    this.resizePoints.push(point);
    this.element.appendChild(point.element);
  },

  unmakeResizeable: function() {
    this.resizeable = false;
    this.element.classList.remove('resizeable');

    for (let i = 0; i < this.resizePoints.length; i++) {
      const point = this.resizePoints[i];
      this.element.removeChild(point.element);
    }

    this.resizePoints = [];
  },

  updateResizePointsPositions: function() {
    this.resizePoints[0].updatePosition(-5, this.position.height / 2 - 5);
    this.resizePoints[1].updatePosition(this.position.width - 5, this.position.height / 2 - 5);
    this.resizePoints[2].updatePosition(this.position.width / 2 - 5, -5);
    this.resizePoints[3].updatePosition(this.position.width / 2 - 5, this.position.height - 5);

    this.resizePoints[4].updatePosition(this.position.width - 5, - 5);
    this.resizePoints[5].updatePosition(- 5, - 5);
    this.resizePoints[6].updatePosition(this.position.width - 5, this.position.height - 5);
    this.resizePoints[7].updatePosition(- 5, this.position.height - 5);
  },

  startXHandler: function(event) {
    if (event.x >= this.position.x + this.position.width) {
      return;
    }

    var xDiff = event.x - this.position.x;
    this.position.x = event.x;
    this.position.width = this.position.width - xDiff;
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
    this.position.y = event.y;
    this.position.height = this.position.height - yDiff;
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

    this.resizePoints[4].updatePosition(event.x, event.y);

    this.position.height = event.y - this.position.y;
    this.position.width = event.x - this.position.x;

    this.resizeHandlerOverride();
  },

  topLeftHandler: function(event) {
    if (event.y >= this.position.y + this.position.height || event.x >= this.position.x + this.position.width) {
      return;
    }

    this.resizePoints[5].updatePosition(event.x, event.y);

    this.position.height = event.y - this.position.y;

    var xDiff = event.x - this.position.x;
    this.position.x = event.x;
    this.position.width = this.position.width - xDiff;

    this.resizeHandlerOverride();
  },

  bottomRightHandler: function(event) {
    if (event.y <= this.position.y || event.x <= this.position.x) {
      return;
    }

    this.resizePoints[6].updatePosition(event.x, event.y);

    this.position.height = event.y - this.position.y;
    this.position.width = event.x - this.position.x;

    this.resizeHandlerOverride();
  },

  bottomLeftHandler: function(event) {
    if (event.y <= this.position.y || event.x >= this.position.x + this.position.width) {
      return;
    }

    this.resizePoints[7].updatePosition(event.x, event.y);

    this.position.height = event.y - this.position.y;
    var xDiff = event.x - this.position.x;
    this.position.x = event.x;
    this.position.width = this.position.width - xDiff;

    this.resizeHandlerOverride();
  },
});