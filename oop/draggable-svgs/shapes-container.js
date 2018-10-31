function ShapesContainer(config) {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element.setAttribute('width', 500);
  this.element.setAttribute('height', 500);
  this.config = config;
  this.data = [];
  this.clickedShape;
  this.delimiter = new Delimiter(500);

  // generate all shapes and initialize all listeners
  for (let i = 0; i < config.shapesNumber; i++) {
    let shape = new Shape(config.shapeHeight, 300, 0, 0, i);

    shape.initDragNDrop(shape.element);
    shape.addListener('shapeMoveEnd', this.shapeMoveEndHandler.bind(this));
    shape.addListener('shapeMove', this.shapeMoveHandler.bind(this));
    shape.addListener('shapeResize', this.shapeResizeHandler.bind(this));
    shape.addListener('shapeClick', this.shapeClickHandler.bind(this));

    this.data.push(shape);
    this.element.appendChild(shape.element);
  }

  this.element.appendChild(this.delimiter.element);
  this.paintShapes();

  document.addEventListener('click', this.documentClickHandler.bind(this));
}

Object.assign(ShapesContainer.prototype, {
  documentClickHandler: function(event) {
    if (event.target.matches('.shape') || event.target.matches('resize-point')) {
      return;
    }

    if (this.clickedShape) {
      this.clickedShape.unmakeResizeable();
    }
  },

  shapeMoveHandler: function(event) {
    var nextIndex = this.searchForNewIndex(event.from, event.positionY);

    if (nextIndex === event.from) {
      return;
    }

    var newPosition;

    if (nextIndex > event.from) {
      newPosition = this.data[nextIndex].position.y + this.data[nextIndex].position.height + this.config.shapeMargin / 2;
    } else {
      newPosition = this.data[nextIndex].position.y - this.config.shapeMargin / 2;
    }



    this.delimiter.element.setAttribute('transform', `translate(0, ${newPosition})`);
    this.delimiter.element.classList.remove('hidden');
  },

  shapeMoveEndHandler: function(event) {

    var nextIndex = this.searchForNewIndex(event.from, event.positionY);
    this.data = this.moveItem(this.data, event.from, nextIndex);
    this.delimiter.element.classList.add('hidden');
    this.paintShapes();
  },

  shapeResizeHandler: function() {
    this.paintShapes();
  },

  shapeClickHandler: function(event) {
    if (this.clickedShape && this.clickedShape !== event.shape) {
      this.clickedShape.unmakeResizeable();
    }

    this.clickedShape = event.shape;
  },


  paintShapes: function() {
    var previousY = 0;

    for (let i = 0; i < this.data.length; i++) {
      var shape = this.data[i];
      shape.setIndex(i);
      shape.position.y = previousY;

      shape.element.setAttribute('transform', `translate(${10 + shape.position.x}, ${10 + previousY})`);
      previousY += shape.position.height + this.config.shapeMargin;

      shape.element.setAttribute('height', shape.position.height);
      shape.element.setAttribute('width', shape.position.width);

      shape.backgroundElement.setAttribute('height', shape.position.height);
      shape.backgroundElement.setAttribute('width', shape.position.width);
    }
  },

  searchForNewIndex: function(currentIndex, positionCheck) {
    var currentItem = this.data[currentIndex],
        nextItem = this.data[currentIndex + 1],
        prevItem = this.data[currentIndex - 1];

    if (!currentItem) {
      return currentIndex;
    }

    if (prevItem && positionCheck < prevItem.position.y) {
      return this.searchForNewIndex(prevItem.index, positionCheck);
    }

    if (nextItem && positionCheck > nextItem.position.y) {
      return this.searchForNewIndex(nextItem.index, positionCheck);
    }

    return currentIndex;
  },

  moveItem(arr, from, to) {
    var arrLength = arr.length - 1,
        element = arr.splice(from, 1),
        checkedTo = Math.min(arrLength, Math.round(to));

    arr.splice(checkedTo, 0, element[0]);
    return arr;
  }
});