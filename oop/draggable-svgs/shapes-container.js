function ShapesContainer(config) {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element.setAttribute('width', 500);
  this.element.setAttribute('height', 500);
  this.config = config;
  this.data = [];
  this.delimiter = new Delimiter(500);

  for (let i = 0; i < config.shapesNumber; i++) {
    let shape = new Shape(config.shapeHeight, config.shapeMargin, i);
    shape.initDragNDrop(shape.element);
    shape.addListener('shapeMoveEnd', this.shapeMoveEndHandler.bind(this));
    shape.addListener('shapeMove', this.shapeMoveHandler.bind(this));

    this.data.push(shape);
    this.element.appendChild(shape.element);
  }

  this.element.appendChild(this.delimiter.element);
  this.paintShapes(this.data);
}

Object.assign(ShapesContainer.prototype, {
  shapeMoveHandler: function(event) {
    this.delimiter.element.setAttribute('y', Math.min(Math.floor(event.to + 1), this.data.length) * 40 - 5);
    this.delimiter.element.classList.remove('hidden');
  },

  shapeMoveEndHandler: function(event) {
    this.data = this.moveItem(this.data, event.from, event.to);
    this.paintShapes(this.data);
    this.delimiter.element.classList.add('hidden');
  },

  paintShapes: function(data) {
    for (let i = 0; i < data.length; i++) {
      var shape = data[i];
      shape.element.setAttribute('y', i * shape.height + i * shape.margin);
    }
  },

  moveItem(arr, from, to) {
    var element = arr.splice(from, 1),
        checkedTo = Math.floor(Math.min(arr.length - 1, to));

    arr.splice(checkedTo, 0, element[0]);
    return arr;
  }
});