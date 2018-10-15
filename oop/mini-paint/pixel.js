var pixelElement = document.createElement('div');
pixelElement.classList.add('pixel');

function Pixel(height, width, initialValue) {
  this.element = pixelElement.cloneNode();
  this.element.style.height = `${height}px`;
  this.element.style.width = `${width}px`;
  this.state = initialValue || 0;
}

Pixel.prototype = {
  enable: function enable() {
    this.state = 1;
    this.element.classList.add('active');
  },

  disable: function disable() {
    this.state = 0;
    this.element.classList.remove('active');
  },

  isActive: function isActive() {
    return Boolean(this.state);
  }
};