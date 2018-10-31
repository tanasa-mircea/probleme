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
  },

  createPoint: function(moveHandler, direction, position) {
    var point,
        resizeablePointSide = 10;


    if (direction === 'horizontal') {
      var positionY = this.position.height / 2 - 5,
          positionX;

      if (position === 'first') {
        positionX = -5;
      }

      if (position === 'second') {
        positionX = this.position.width - 5;
      }

      point = new ResizeablePoint(resizeablePointSide, positionX, positionY);
      point.element.classList.add('e-resize');
    }

    if (direction === 'vertical') {
      var positionY,
          positionX = this.position.width / 2 - 5;

      if (position === 'first') {
        positionY = -5;
      }

      if (position === 'second') {
        positionY = this.position.height - 5;
      }

      point = new ResizeablePoint(resizeablePointSide, positionX, positionY);
      point.element.classList.add('n-resize');
    }

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
  },

  startXHandler: function(event) {
    if (event.x >= this.position.x + this.position.width) {
      return;
    }

    this.resizePoints[0].updatePosition(event.x, null);
    var xDiff = event.x - this.position.x;
    this.position.x = event.x;
    this.position.width = this.position.width - xDiff;
    this.resizeHandlerOverride();
  },

  endXHandler: function(event) {
    if (event.x <= this.position.x) {
      return;
    }

    this.resizePoints[1].updatePosition(event.x, null);
    this.position.width = event.x - this.position.x;
    this.resizeHandlerOverride();
  },

  startYHandler: function(event) {
    if (event.y >= this.position.y + this.position.height) {
      return;
    }

    var yDiff = event.y - this.position.y;
    this.resizePoints[2].updatePosition(null, event.y);
    this.position.y = event.y;
    this.position.height = this.position.height - yDiff;
    this.resizeHandlerOverride();
  },

  endYHandler: function(event) {
    if (event.y <= this.position.y) {
      return;
    }

    this.resizePoints[3].updatePosition(null, event.y);
    this.position.height = event.y - this.position.y;
    this.resizeHandlerOverride();
  },
});