function Shape(height, width, y, x, index) {
  this.index = index;
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "g");
  this.element.classList.add('shape');
  this.backgroundElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.backgroundElement.setAttribute('fill', getColor());
  this.backgroundElement.setAttribute('rx', 15);
  this.backgroundElement.setAttribute('ry', 15);
  this.backgroundElement.classList.add('moving');
  this.element.appendChild(this.backgroundElement);
  this.movePosition = 0;
  this.hasMoved = false;

  this.position = {
    x: x,
    y: y,
    width: width,
    height: height
  };

  this.initResizeable(this.element, {});
}
Object.assign(Shape.prototype, DragNDrop.prototype, CustomEventTarget.prototype, Resizeable.prototype, {
  resizeHandlerOverride: function(event) {
    this.updateResizePointsPositions();
    this.fire({ type: 'shapeResize', event: event });
  },

  mouseDownOverride: function(event) {
    this.hasMoved = false;
    this.mouseDragPosition = event.offsetY - this.position.y - 10;
  },

  clickOverride: function() {
    this.fire({ type: 'shapeClick', shape: this});
  },

  mouseMoveOverride: function(event) {
    this.hasMoved = true;
    this.movePosition = event.offsetY;
    var trueY = event.offsetY -  this.mouseDragPosition ;

    this.element.setAttribute('transform', `translate(${this.position.x + 10}, ${trueY})`);
    this.fire({ type: 'shapeMove', from: this.index, positionY: this.movePosition });
  },

  mouseUpOverride: function() {
    if (this.hasMoved) {
      this.fire({ type: 'shapeMoveEnd', from: this.index, positionY: this.movePosition });
    }
  },

  setIndex(index) {
    this.index = index;
  }
});