function Tooltip() {
  this.element = document.createElement('div');
  this.element.classList.add('tooltip', 'hidden');
  this.visible = false;
};

Object.assign(Tooltip.prototype, {
  updatePosition: function(coords) {
    // this.element.setAttribute('x', coords[0]);
    // this.element.setAttribute('y', coords[1]);
    this.element.style.transform = `translate(${coords[0] + 10}px, ${coords[1] + 10}px)`;
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