function Legend() {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element.classList.add('legend');
  this.lastYPosition = 0;
}

Object.assign(Legend.prototype, {
  add: function add(color, text) {
    var group = document.createElementNS("http://www.w3.org/2000/svg", "g"),
        colorElement = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
        textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");

    colorElement.setAttribute('height', 15);
    colorElement.setAttribute('width', 30);
    colorElement.setAttribute('fill', color);
    colorElement.setAttribute('y', 0);

    textElement.setAttribute('x', 35);
    textElement.setAttribute('y', 12);
    textElement.innerHTML = text;

    group.setAttribute('transform', `translate(0, ${this.lastYPosition})`);
    group.appendChild(colorElement);
    group.appendChild(textElement);

    this.lastYPosition = this.lastYPosition + 15 + 5;
    this.element.appendChild(group);
  }
});