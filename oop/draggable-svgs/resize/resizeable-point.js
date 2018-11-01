function ResizeablePoint(pointSide, x, y) {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.element.classList.add('resize-point');
  this.element.setAttribute('x', x);
  this.element.setAttribute('y', y);
  this.element.setAttribute('fill', '#fff');
  this.element.setAttribute('height', pointSide);
  this.element.setAttribute('width', pointSide);

  this.initResizeMouseActions(this.element);
}

Object.assign(ResizeablePoint.prototype, ResizeMouseActions.prototype, CustomEventTarget.prototype, {
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
      this.element.setAttribute('x', x);
    }

    if (y !== null) {
      this.element.setAttribute('y', y);
    }
  },

  mouseUpOverride: function(event) {
    event.stopPropagation();

    this.fire({
      type: 'resizeablePointEnd',
      x: event.offsetX - 5,
      y: event.offsetY
    });
  },

  hide: function() {
    this.element.classList.add('hidden');
  },

  show: function() {
    this.element.classList.remove('hidden');
  }
});