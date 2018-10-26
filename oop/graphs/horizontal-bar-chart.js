function HorizontalBarChart(config) {
  this.config = config;
  this.data = config.data;

  this.elementHeight = 50;
  this.elementWidth = 600;

  this.element = document.createElement('div');
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.svg.setAttribute('height', this.elementHeight);
  this.svg.setAttribute('width', this.elementWidth);
  this.svg.classList.add('horizontal-bar-chart');


  this.element.classList.add('chart');
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
    var newBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var width = this.data[index].percentage * this.elementWidth / 100;
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

    return {
      element: newBar,
      width: width
    };
  }
});