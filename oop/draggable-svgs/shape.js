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