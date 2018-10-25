function DoughnutChart(config) {
  this.data = config.data;

  this.radius = 150;
  this.elementHeight = 300;
  this.elementWidth = 600;
  this.center = [150, 150];

  this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element.setAttribute('height', this.elementHeight);
  this.element.setAttribute('width', this.elementWidth);

  this.tooltip = new Tooltip();
  this.element.appendChild(this.tooltip.element);

  this.build();
}
mixin(DoughnutChart.prototype, Graph.prototype);
Object.assign(DoughnutChart.prototype, {
  build: function() {
    // Create the circle, set its coords and radius than append it
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', this.center[0]);
    circle.setAttribute('cy', this.center[0]);
    circle.setAttribute('r', this.radius);
    this.element.appendChild(circle);

    var sliceStartingPoint = [150, 0],
        percentage = this.data.percentage / 100,
        color = getColor();

    // Draw a slice and append it
    var path = this.drawSlice(percentage, sliceStartingPoint, color, percentage > 0.5);
    this.element.appendChild(path.element);

    // Add mouse actions listener for tooltip
    path.element.addEventListener('mouseenter', function(event) {
      this.tooltip.updateText(this.data.label);
      this.tooltip.show();
      this.tooltip.updatePosition([event.x, event.y]);
    }.bind(this));

    path.element.addEventListener('mousemove', function(event) {
      this.tooltip.updatePosition([event.x, event.y]);
    }.bind(this));

    path.element.addEventListener('mouseleave', function() {
      this.tooltip.hide();
    }.bind(this));

    // Add center circle in order to have a doughnut appearance
    var centerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    centerCircle.setAttribute('cx', this.radius);
    centerCircle.setAttribute('cy', this.radius);
    centerCircle.setAttribute('r', this.radius * 0.8);
    centerCircle.setAttribute('fill', '#fff');
    this.element.appendChild(centerCircle);

    // Add text element
    var text = this.createText(this.data.percentage, [this.radius, this.radius]);
    text.element.style.pointerEvents = 'none';
    text.element.setAttribute('font-size', '60');
    text.element.setAttribute('transform', 'translate(-40, 10)');
    this.element.appendChild(text.element);
  },
});