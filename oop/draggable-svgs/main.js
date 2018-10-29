
function Delimiter(width) {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.element.classList.add('hidden');
  this.element.setAttribute('height', 3);
  this.element.setAttribute('fill', '#f00');
  this.element.setAttribute('width', width);
  this.element.setAttribute('y', 0);
  this.element.setAttribute('x', 0);
}

document.addEventListener("DOMContentLoaded", function() {
  var config = {
    shapeHeight: 30,
    shapeMargin: 10,
    shapesNumber: 5
  };

  var mainSvg = new ShapesContainer(config);

  document.getElementById('displayer').appendChild(mainSvg.element);
});

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


function Shape(height, margin, index) {
  this.index = index;
  this.oldIndex = index;

  this.height = height;
  this.margin = margin;

  this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.element.setAttribute('height', height);
  this.element.setAttribute('width', 300);
  this.element.setAttribute('fill', getColor());
}
Object.assign(Shape.prototype, DragNDrop.prototype, CustomEventTarget.prototype, {
  mouseDownOverride: function() {
    this.oldIndex = this.index;
  },

  mouseMoveOverride: function(event) {
    this.element.setAttribute('y', event.offsetY);
    this.index = event.offsetY / (this.height + this.margin);
    this.fire({ type: 'shapeMove', to: this.index });
  },

  mouseUpOverride: function() {
    this.fire({ type: 'shapeMoveEnd', from: this.oldIndex, to: this.index });
  }
});