function ShapesContainer(config) {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element.setAttribute('width', 1200);
  this.element.setAttribute('height', 1200);
  this.config = config;
  this.data = [];
  this.clickedShape;
  this.delimiter = new Delimiter(1200);
  this.resizeManager = new ResizeManager();

  this.resizeManager.addListener('resizeControllerEnd', this.resizeControllerEndHandler.bind(this));

  // generate all shapes and initialize all listeners
  for (let i = 0; i < config.shapesNumber; i++) {
    let shape = new Shape(config.shapeHeight, 300, 0, 0, i);

    shape.addListener('shapeMoveEnd', this.shapeMoveEndHandler.bind(this));
    shape.addListener('shapeMove', this.shapeMoveHandler.bind(this));
    shape.addListener('shapeClick', this.shapeClickHandler.bind(this));

    this.data.push(shape);
    this.element.appendChild(shape.element);
  }

  this.element.appendChild(this.delimiter.element);
  this.element.appendChild(this.resizeManager.element);

  this.paintShapes();

  document.addEventListener('click', this.documentClickHandler.bind(this));
}

Object.assign(ShapesContainer.prototype, {
  documentClickHandler: function(event) {
    console.log('event ', event);
    if (event.target.matches('.shape') || event.target.matches('.resize-point') || event.target.matches('.resizeable-group')) {
      return;
    }

    if (this.clickedShape) {
      this.clickedShape = null;
      this.resizeManager.hide();
    }
  },

  resizeControllerEndHandler: function() {
    this.paintShapes();
  },

  shapeMoveHandler: function(event) {
    if (event.shouldMoveInFront) {
      this.element.insertBefore(event.shape.element, this.delimiter.element);
    }

    var nextIndex = this.searchForNewIndex(event.from, event.positionY);
    this.resizeManager.updateSelectedItemPosition(null, event.trueY);

    if (nextIndex === event.from) {
      this.delimiter.hide();

      return;
    }

    var newPosition;

    if (nextIndex > event.from) {
      newPosition = this.data[nextIndex].position.y + this.data[nextIndex].position.height + this.config.shapeMargin * 1.25;
    } else {
      if (nextIndex === 0) {
        newPosition = 5;
      } else {
        newPosition = this.data[nextIndex].position.y + this.config.shapeMargin / 2;
      }
    }

    this.delimiter.setY(newPosition);
    this.delimiter.show();
  },

  shapeMoveEndHandler: function(event) {
    var nextIndex = this.searchForNewIndex(event.from, event.positionY);
    this.data = this.moveItem(this.data, event.from, nextIndex);
    this.delimiter.hide();
    this.paintShapes();

    this.resizeManager.updateSelectedItemPosition(null, null);
  },

  shapeClickHandler: function(event) {
    if (this.clickedShape === event.shape) {
      return;
    }

    this.clickedShape = event.shape;

    this.resizeManager.show();
    this.resizeManager.resetPosition(event.shape);
  },

  paintShapes: function() {
    var previousY = 0;

    for (let i = 0; i < this.data.length; i++) {
      var shape = this.data[i];
      shape.setIndex(i);
      shape.position.y = previousY;

      shape.element.setAttribute('transform', `translate(${this.config.shapeMargin + shape.position.x}, ${this.config.shapeMargin + previousY})`);
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