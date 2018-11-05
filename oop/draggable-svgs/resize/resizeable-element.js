function ResizeableElement() {}

Object.assign(ResizeableElement.prototype, {
  initResizeableElement: function() {
    this.element.addEventListener('click', this.clickHandler.bind(this));
  },

  clickHandler: function(event) {
    event.stopPropagation();
    event.preventDefault();
    this.clickOverride();
  },

  clickOverride: function() {
    throw(new Error('Click should be overriden by the resizeable element'));
  },

  resize: function(position) {
    throw(new Error('Click should be overriden by the resizeable element'));
  }
});