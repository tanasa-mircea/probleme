function Delimiter(width) {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.element.classList.add('hidden');
  this.element.setAttribute('height', 3);
  this.element.setAttribute('fill', '#f00');
  this.element.setAttribute('width', width);
  this.element.setAttribute('y', 0);
  this.element.setAttribute('x', 0);

  this.x = 0;
  this.y = 0;
}

Object.assign(Delimiter.prototype, {
  setY: function(y) {
    this.y = y;
    this.element.setAttribute('transform', `translate(${this.x}, ${this.y})`);
  },

  hide: function() {
    this.element.classList.add('hidden');
  },

  show: function() {
    this.element.classList.remove('hidden');
  }
});