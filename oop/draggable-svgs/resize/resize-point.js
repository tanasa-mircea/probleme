function ResizeablePoint(pointSide, x, y, pointStart) {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.element.classList.add('resize-point');
  this.element.setAttribute('x', x);
  this.element.setAttribute('y', y);
  this.element.setAttribute('fill', '#fff');
  this.element.setAttribute('height', pointSide);
  this.element.setAttribute('width', pointSide);
  this.pointStart = pointStart;

  this.initDragNDrop();
}

Object.assign(ResizeablePoint.prototype, DragNDrop.prototype, CustomEventTarget.prototype, {
  mouseDownOverride: function(event) {
    event.stopPropagation();
  },

  mouseMoveOverride: function(event) {
    event.stopPropagation();

    this.fire({
      type: 'resizeablePointMove',
      x: event.offsetX,
      y: event.offsetY
    });
  },

  updatePosition(x, y) {
    if (x !== null) {
      this.element.setAttribute('x', x - this.pointStart);
    }

    if (y !== null) {
      this.element.setAttribute('y', y - this.pointStart);
    }
  },

  mouseUpOverride: function(event) {
    event.stopPropagation();

    this.fire({
      type: 'resizeablePointEnd',
      x: event.offsetX,
      y: event.offsetY
    });
  },
});