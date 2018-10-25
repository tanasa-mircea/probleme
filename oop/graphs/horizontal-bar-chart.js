function HorizontalBarChart(config) {
  this.total = 0;
  this.data = config.data;
  this.elementHeight = 50;
  this.elementWidth = 600;
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element.setAttribute('height', this.elementHeight);
  this.element.setAttribute('width', this.elementWidth);

  this.tooltip = new Tooltip();

  for (let i = 0; i < config.data.length; i++) {
    this.total += config.data[i].value;
  };

  this.build(0, 0);
  this.element.appendChild(this.tooltip.element);
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

    newBar.setAttribute('height', '50');
    newBar.setAttribute('width', width);
    newBar.setAttribute('x', lastPosition);
    newBar.setAttribute('fill', color);

    this.element.appendChild(newBar);

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