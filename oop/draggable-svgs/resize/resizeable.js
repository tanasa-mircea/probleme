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

    var resizeablePointXStart = new ResizeablePoint(0, this.position.height / 2 - 5);
    this.element.appendChild(resizeablePointXStart.element);
    resizeablePointXStart.addListener('resizeablePointMove', this.startXHandler.bind(this));
    this.resizePoints.push(resizeablePointXStart);

    var resizeablePointXEnd = new ResizeablePoint(this.position.width - 5, this.position.height / 2 - 5);
    this.element.appendChild(resizeablePointXEnd.element);
    resizeablePointXEnd.addListener('resizeablePointMove', this.endXHandler.bind(this));
    this.resizePoints.push(resizeablePointXEnd);

    var resizeablePointYStart = new ResizeablePoint(this.position.width / 2 - 5, 0);
    this.element.appendChild(resizeablePointYStart.element);
    resizeablePointYStart.addListener('resizeablePointMove', this.startYHandler.bind(this));
    this.resizePoints.push(resizeablePointYStart);

    var resizeablePointYEnd = new ResizeablePoint(this.position.width / 2 - 5, this.position.height - 5);
    this.element.appendChild(resizeablePointYEnd.element);
    resizeablePointYEnd.addListener('resizeablePointMove', this.endYHandler.bind(this));
    this.resizePoints.push(resizeablePointYEnd);
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

  updateResizePointsPositions: function() {
    this.resizePoints[0].updatePosition(0, this.position.height / 2 - 5);
    this.resizePoints[1].updatePosition(this.position.width - 5, this.position.height / 2 - 5);
    this.resizePoints[2].updatePosition(this.position.width / 2 - 5, 0);
    this.resizePoints[3].updatePosition(this.position.width / 2 - 5, this.position.height - 5);
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