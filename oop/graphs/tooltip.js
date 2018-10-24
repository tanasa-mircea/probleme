function Tooltip() {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "text");
  this.visible = true;
};

Object.assign(Tooltip.prototype, {
  updatePosition: function(coords) {
    this.element.setAttribute('x', coords[0]);
    this.element.setAttribute('y', coords[1]);
  },

  show: function() {
    this.visible = true;
    this.element.classList.remove('hidden');
  },

  hide: function() {
    this.visible = false;
    this.element.classList.add('hidden');
  },

  updateText: function(text) {
    this.element.innerHTML = text;
  }
});