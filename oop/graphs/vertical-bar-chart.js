function VerticalBarChart(config) {
  this.data = config.data;
  this.elementHeight = 600;
  this.elementWidth = 50;
  this.element = document.createElement('div');
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.svg.setAttribute('height', this.elementHeight);
  this.svg.setAttribute('width', this.elementWidth);
  this.svg.classList.add('vertical-bar-chart');

  this.tooltip = new Tooltip();

  this.total = 0;
  for (let i = 0; i < this.data.length; i++) {
    this.total += this.data[i].value;
  };

  this.element.classList.add('chart');
  this.element.appendChild(this.tooltip.element);
  this.element.appendChild(this.svg);
  this.build(0, 0);
}

mixin(VerticalBarChart.prototype, Graph.prototype);
Object.assign(VerticalBarChart.prototype, {
  build: function build(index, lastPosition) {
    if (index >= this.data.length) {
      return;
    }

    var newBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var height = this.data[index].value * this.elementHeight / this.total;
    var color = getColor();

    newBar.setAttribute('width', 50);
    newBar.setAttribute('height', 0);
    newBar.setAttribute('y', lastPosition);
    newBar.setAttribute('fill', color);
    newBar.classList.add('bar');

    setTimeout(function() {
      newBar.setAttribute('height', height);
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

    return this.build(index + 1, lastPosition + height);
  }
});