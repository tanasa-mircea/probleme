function Shape(height, margin, index) {
  this.index = index;
  this.oldIndex = index;

  this.height = height;
  this.width = 300;
  this.margin = margin;

  this.element = document.createElementNS("http://www.w3.org/2000/svg", "g");
  this.backgroundElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.backgroundElement.setAttribute('fill', getColor());
  this.element.appendChild(this.backgroundElement);

  this.elementPosition = {
    x: 0,
    y: this.index * this.height + this.index * this.margin,
    width: this.width,
    height: this.height
  };

  // this.initResizeable(this.element, {});
}
Object.assign(Shape.prototype, DragNDrop.prototype, CustomEventTarget.prototype, Resizeable.prototype, {
  resizeHandlerOverride: function(event) {
    this.fire({ type: 'shapeResize', event: event });
  },

  mouseDownOverride: function() {
    this.oldIndex = this.index;
  },

  mouseMoveOverride: function(event) {
    this.element.setAttribute('transform', `translate(0, ${event.offsetY})`);
    this.index = event.offsetY / (this.height + this.margin);
    console.log('index ', this.index);
    this.fire({ type: 'shapeMove', to: this.index });
  },

  mouseUpOverride: function() {
    this.fire({ type: 'shapeMoveEnd', from: this.oldIndex, to: this.index });
  }
});