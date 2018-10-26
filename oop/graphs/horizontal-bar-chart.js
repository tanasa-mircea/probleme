function HorizontalBarChart(config) {
  this.config = config;
  this.data = config.data;

  this.chartHeight = 50;
  this.chartWidth = 600;

  this.element = document.createElement('div');
  this.element.classList.add('chart');

  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.svg.setAttribute('height', this.chartHeight);
  this.svg.setAttribute('width', this.chartWidth);
  this.svg.classList.add('horizontal-bar-chart');

  this.element.appendChild(this.svg);

  if (config.chartClass) {
    this.element.classList.add(config.chartClass);
  }

  Graph.call(this);
}

Object.assign(HorizontalBarChart.prototype, Graph.prototype, {
  build: function build(index, lastPosition) {
    if (!index && !lastPosition) {
      index = 0;
      lastPosition = 0;
    }

    if (index >= this.data.length) {
      return;
    }

    var newBar = this.drawComponent(index, lastPosition);

    this.svg.appendChild(newBar.element);

    return this.build(index + 1, lastPosition + newBar.width);
  },

  drawComponent: function drawComponent(index, lastPosition) {
    let newBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var width = this.data[index].percentage * this.chartWidth / 100;
    var color = getColor();

    if (this.legend) {
      this.legend.add(color, this.data[index].label);
    }

    newBar.setAttribute('height', 50);
    newBar.setAttribute('width', 0);
    newBar.setAttribute('x', lastPosition);
    newBar.setAttribute('fill', color);
    newBar.classList.add('bar');

    setTimeout(function() {
      newBar.setAttribute('width', width);
    }.bind(this), index * 150);

    let mouseEnterListener = function(event) {
      this.tooltip.updateText(this.data[index].label);
      this.tooltip.show();
      this.tooltip.updatePosition([event.offsetX, event.offsetY]);

      newBar.addEventListener('mousemove', mouseMoveListener);
      newBar.addEventListener('mouseleave', mouseLeaveListener);
    }.bind(this);

    let mouseMoveListener = function(event) {
      this.tooltip.updatePosition([event.offsetX, event.offsetY]);
    }.bind(this);

    let mouseLeaveListener = function() {
      this.tooltip.hide();

      newBar.removeEventListener('mousemove', mouseMoveListener);
      newBar.removeEventListener('mouseleave', mouseLeaveListener);
    }.bind(this);

    newBar.addEventListener('mouseenter', mouseEnterListener);

    return {
      element: newBar,
      width: width
    };
  }
});