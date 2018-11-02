function ResizeableElement() {}

Object.assign(ResizeableElement.prototype, {
  initResizeableElement: function() {
    this.element.addEventListener('click', this.clickHandler.bind(this));
  },

  clickHandler: function(event) {
    event.stopPropagation();
   this.clickOverride();
  },

  clickOverride: function() {
    throw(new Error('Click should be overriden by the resizeable element'));
  }
});