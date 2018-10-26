function DoughnutChart(config) {
  this.data = config.data;

  this.radius = 150;
  this.elementHeight = 300;
  this.elementWidth = 300;
  this.center = [150, 150];

  this.element = document.createElement('div');
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.svg.setAttribute('height', this.elementHeight);
  this.svg.setAttribute('width', this.elementWidth);

  this.tooltip = new Tooltip();

  this.element.classList.add('chart');
  this.element.appendChild(this.tooltip.element);
  this.element.appendChild(this.svg);

  if (config.legend) {
    this.legend = new Legend();
    this.element.appendChild(this.legend.element);
  }

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
    this.svg.appendChild(circle);

    var sliceStartingPoint = [150, 0],
        percentage = this.data.percentage / 100,
        color = getColor();

    // Draw a slice and append it
    var slice = this.drawSlice(percentage, sliceStartingPoint, color, 0);
    this.svg.appendChild(slice.element);
    slice.startAnimation();

    if (this.legend) {
      this.legend.add(color, this.data.label);
    }

    // Add mouse actions listener for tooltip
    slice.element.addEventListener('mouseenter', function(event) {
      this.tooltip.updateText(this.data.label);
      this.tooltip.show();
      this.tooltip.updatePosition([event.offsetX, event.offsetY]);
    }.bind(this));

    slice.element.addEventListener('mousemove', function(event) {
      this.tooltip.updatePosition([event.offsetX, event.offsetY]);
    }.bind(this));

    slice.element.addEventListener('mouseleave', function() {
      this.tooltip.hide();
    }.bind(this));

    // Add center circle in order to have a doughnut appearance
    var centerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    centerCircle.setAttribute('cx', this.radius);
    centerCircle.setAttribute('cy', this.radius);
    centerCircle.setAttribute('r', this.radius * 0.8);
    centerCircle.setAttribute('fill', '#fff');
    this.svg.appendChild(centerCircle);

    // Add text element
    var text = this.createText(this.data.percentage, this.center);
    text.element.style.pointerEvents = 'none';
    text.element.setAttribute('font-size', '60');
    text.element.setAttribute('transform', 'translate(-40, 10)');
    this.svg.appendChild(text.element);
  },
});