function VerticalBarChart(config) {
  this.data = config.data;
  this.config = config;

  this.chartHeight = 600;
  this.chartWidth = 50;
  this.element = document.createElement('div');
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.svg.setAttribute('height', this.chartHeight);
  this.svg.setAttribute('width', this.chartWidth);
  this.svg.classList.add('vertical-bar-chart');


  this.element.classList.add('chart');
  this.element.appendChild(this.svg);

  if (config.chartClass) {
    this.element.classList.add(config.chartClass);
  }

  Graph.call(this);
}

Object.assign(VerticalBarChart.prototype, Graph.prototype, {
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

    return this.build(index + 1, lastPosition + newBar.height);
  },

  drawComponent: function drawComponent(index, lastPosition) {
    var newBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var height = this.data[index].percentage * this.chartHeight / 100;
    var color = getColor();

    newBar.setAttribute('width', 50);
    newBar.setAttribute('height', 0);
    newBar.setAttribute('y', lastPosition);
    newBar.setAttribute('fill', color);
    newBar.classList.add('bar');

    if (this.legend) {
      this.legend.add(color, this.data[index].label);
    }

    setTimeout(function() {
      newBar.setAttribute('height', height);
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
      height: height
    };
  }
});