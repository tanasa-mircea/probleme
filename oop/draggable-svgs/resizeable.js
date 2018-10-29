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

    this.element.addEventListener('click', this.makeResizeable.bind(this));
  },

  resizeHandlerOverride: function() {
    throw(new Error('resizeHandlerOverride should be overwritten'));
  },

  makeResizeable: function() {
    if (this.resizeable) {
      return;
    };

    this.resizeable = true;
    this.element.classList.add('resizeable');

    var resizeablePointXStart = new ResizeablePoint(0, this.height / 2 - 5);
    this.element.appendChild(resizeablePointXStart.element);
    resizeablePointXStart.addListener('resizeablePointMove', this.startXHandler.bind(this));
    this.resizePoints.push(resizeablePointXStart);

    var resizeablePointXEnd = new ResizeablePoint(this.width - 5, this.height / 2 - 5);
    this.element.appendChild(resizeablePointXEnd.element);
    resizeablePointXEnd.addListener('resizeablePointMove', this.endXHandler.bind(this));
    this.resizePoints.push(resizeablePointXEnd);

    var resizeablePointYStart = new ResizeablePoint(this.width / 2 - 5, 0);
    this.element.appendChild(resizeablePointYStart.element);
    resizeablePointYStart.addListener('resizeablePointMove', this.startYHandler.bind(this));
    this.resizePoints.push(resizeablePointYStart);

    var resizeablePointYEnd = new ResizeablePoint(this.width / 2 - 5, this.height - 5);
    this.element.appendChild(resizeablePointYEnd.element);
    resizeablePointYEnd.addListener('resizeablePointMove', this.endYHandler.bind(this));
    this.resizePoints.push(resizeablePointYEnd);
  },

  unmakeResizeable: function() {
    this.resizeable = false;
  },

  startXHandler: function(event) {
    if (event.x >= this.elementPosition.x + this.elementPosition.width) {
      return;
    }

    this.resizePoints[0].updatePosition(event.x, null);
    this.elementPosition.x = event.x;
    this.resizeHandlerOverride();
  },

  endXHandler: function(event) {
    if (event.x <= this.elementPosition.x) {
      return;
    }

    this.resizePoints[1].updatePosition(event.x, null);
    this.elementPosition.width = event.x - this.elementPosition.x;
    this.resizeHandlerOverride();
  },

  startYHandler: function(event) {
    if (event.y >= this.elementPosition.y + this.elementPosition.width) {
      return;
    }

    this.resizePoints[2].updatePosition(null, event.y);
    this.elementPosition.y = event.y;
    this.resizeHandlerOverride();
  },

  endYHandler: function(event) {
    if (event.y <= this.elementPosition.y) {
      return;
    }

    this.resizePoints[3].updatePosition(null, event.y);
    this.elementPosition.height = event.y - this.elementPosition.y;
    this.resizeHandlerOverride();
  },
});