function Shape(height, width, y, x, index) {
  this.index = index;
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "g");
  this.element.classList.add('shape');
  this.backgroundElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.backgroundElement.setAttribute('fill', getColor());
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
    this.fire({ type: 'shapeResize', event: event });
  },

  mouseDownOverride: function() {
    this.hasMoved = false;
  },

  clickOverride: function() {
    this.fire({ type: 'shapeClick', shape: this});
  },

  mouseMoveOverride: function(event) {
    this.hasMoved = true;
    this.movePosition = event.offsetY;
    this.element.setAttribute('transform', `translate(0, ${event.offsetY})`);
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