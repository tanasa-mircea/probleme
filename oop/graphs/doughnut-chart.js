function DoughnutChart(config) {
  this.data = config;
  this.config = config;

  this.radius = 150;
  this.chartHeight = 300;
  this.chartWidth = 300;
  this.center = [150, 150];

  this.element = document.createElement('div');
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.svg.setAttribute('height', this.chartHeight);
  this.svg.setAttribute('width', this.chartWidth);

  this.element.classList.add('chart');
  this.element.appendChild(this.svg);

  if (config.chartClass) {
    this.element.classList.add(config.chartClass);
  }

  CircularGraph.call(this);
}

Object.assign(DoughnutChart.prototype, CircularGraph.prototype, {
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
    var slice = this.drawComponent(percentage, sliceStartingPoint, color, 0);
    this.svg.appendChild(slice.element);
    slice.startAnimation();

    if (this.legend) {
      this.legend.add(color, this.data.label);
    }

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

    let mouseEnterListener = function(event) {
      this.tooltip.updateText(this.data.label);
      this.tooltip.show();
      this.tooltip.updatePosition([event.offsetX, event.offsetY]);

      slice.element.addEventListener('mousemove', mouseMoveListener);
      slice.element.addEventListener('mouseleave', mouseLeaveListener);
    }.bind(this);

    let mouseMoveListener = function(event) {
      this.tooltip.updatePosition([event.offsetX, event.offsetY]);
    }.bind(this);

    let mouseLeaveListener = function() {
      this.tooltip.hide();

      slice.element.removeEventListener('mousemove', mouseMoveListener);
      slice.element.removeEventListener('mouseleave', mouseLeaveListener);
    }.bind(this);

    slice.element.addEventListener('mouseenter', mouseEnterListener);
  },
});