function Delimiter(width) {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.element.classList.add('hidden');
  this.element.setAttribute('height', 3);
  this.element.setAttribute('fill', '#f00');
  this.element.setAttribute('width', width);
  this.element.setAttribute('y', 0);
  this.element.setAttribute('x', 0);
}