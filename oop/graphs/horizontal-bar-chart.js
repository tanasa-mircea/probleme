function HorizontalBarChart(config) {
  this.total = 0;
  this.data = config.data;
  this.elementHeight = 50;
  this.elementWidth = 600;

  this.element = document.createElement('div');
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.svg.setAttribute('height', this.elementHeight);
  this.svg.setAttribute('width', this.elementWidth);
  this.svg.classList.add('horizontal-bar-chart');

  this.tooltip = new Tooltip();

  for (let i = 0; i < config.data.length; i++) {
    this.total += config.data[i].value;
  };

  this.element.classList.add('chart');
  this.element.appendChild(this.tooltip.element);
  this.element.appendChild(this.svg);
  this.build(0, 0);
}
mixin(HorizontalBarChart.prototype, Graph.prototype);
Object.assign(HorizontalBarChart.prototype, {
  build: function build(index, lastPosition) {
    if (index >= this.data.length) {
      return;
    }

    var newBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var width = this.data[index].value * this.elementWidth / this.total;
    var color = getColor();

    newBar.setAttribute('height', 50);
    newBar.setAttribute('width', 0);
    newBar.setAttribute('x', lastPosition);
    newBar.setAttribute('fill', color);
    newBar.classList.add('bar');

    setTimeout(function() {
      newBar.setAttribute('width', width);
    }.bind(this), index * 150);

    this.svg.appendChild(newBar);

    newBar.addEventListener('mouseenter', function(event) {
      this.tooltip.updateText(this.data[index].label);
      this.tooltip.show();
      this.tooltip.updatePosition([event.offsetX, event.offsetY]);
    }.bind(this));

    newBar.addEventListener('mousemove', function(event) {
      this.tooltip.updatePosition([event.offsetX, event.offsetY]);
    }.bind(this));

    newBar.addEventListener('mouseleave', function() {
      this.tooltip.hide();
    }.bind(this));

    return this.build(index + 1, lastPosition + width);
  }
});