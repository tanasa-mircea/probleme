function ShapesContainer(config) {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element.setAttribute('width', 500);
  this.element.setAttribute('height', 500);
  this.config = config;
  this.data = [];
  this.delimiter = new Delimiter(500);

  // generate all shapes and initialize all listeners
  for (let i = 0; i < config.shapesNumber; i++) {
    let shape = new Shape(config.shapeHeight, config.shapeMargin, i);
    shape.initDragNDrop(shape.element);
    shape.addListener('shapeMoveEnd', this.shapeMoveEndHandler.bind(this));
    shape.addListener('shapeMove', this.shapeMoveHandler.bind(this));
    // shape.addListener('shapeResize', this.shapeResizeHandler.bind(this));

    this.data.push(shape);
    this.element.appendChild(shape.element);
  }

  this.element.appendChild(this.delimiter.element);
  this.paintShapes();
}

Object.assign(ShapesContainer.prototype, {
  shapeMoveHandler: function(event) {
    this.delimiter.element.setAttribute('transform', `translate(0, ${Math.max(Math.min(Math.round(event.to + 1), this.data.length), 0) * 40})`);
    this.delimiter.element.classList.remove('hidden');
  },

  shapeMoveEndHandler: function(event) {
    this.data = this.moveItem(this.data, event.from, event.to);
    this.paintShapes();
    this.delimiter.element.classList.add('hidden');
  },

  shapeResizeHandler: function() {
    this.paintShapes();
  },

  paintShapes: function() {
    var previousY = 0;
    for (let i = 0; i < this.data.length; i++) {
      var shape = this.data[i];
      shape.element.setAttribute('transform', `translate(${shape.elementPosition.x}, ${previousY})`);
      previousY += shape.elementPosition.height + shape.margin;
      shape.backgroundElement.setAttribute('height', shape.elementPosition.height);
      shape.backgroundElement.setAttribute('width', shape.elementPosition.width);
    }
  },

  moveItem(arr, from, to) {
    var arrLength = arr.length - 1,
        element = arr.splice(from, 1),
        checkedTo = Math.min(arrLength, Math.round(to));

    arr.splice(checkedTo, 0, element[0]);
    return arr;
  }
});