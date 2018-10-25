function PieChart(config) {
  this.radius = 150;
  this.elementHeight = 300;
  this.elementWidth = 600;
  this.center = [150, 150];
  this.data = config.data;

  this.legend = new Legend();
  this.tooltip = new Tooltip();

  this.element = document.createElement('div');
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  this.svg.setAttribute('height', this.elementHeight);
  this.svg.setAttribute('width', this.elementWidth);

  this.build();
  this.element.classList.add('chart');
  this.element.appendChild(this.svg);
  this.element.appendChild(this.legend.element);
  this.element.appendChild(this.tooltip.element);
}
mixin(PieChart.prototype, Graph.prototype);
Object.assign(PieChart.prototype, {
  build: function build() {
    // Create the circle, set its coords and radius than append it
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', this.radius);
    circle.setAttribute('cy', this.radius);
    circle.setAttribute('r', this.radius);
    this.svg.appendChild(circle);

    var startCoords = [150, 0],
        percentageAcc = 0,
        total = 0;

    for (let i = 0; i < this.data.length; i++) {
      total += this.data[i].value;
    }

    for (let i = 0; i < this.data.length; i++) {
      var percentage = this.data[i].value * 100 / total,
          color = getColor();

      var slice = this.drawSlice((percentage + percentageAcc) / 100 , startCoords, color, percentage / 100 > 0.5);
      var text = this.createText(Math.round(percentage), getTriangleCenter([this.radius, this.radius], startCoords, slice.endCoords));
      text.element.style.pointerEvents = 'none';

      this.legend.add(color, this.data[i].label);

      this.svg.appendChild(slice.element);
      this.svg.appendChild(text.element);

      percentageAcc += percentage;
      startCoords = slice.endCoords;

      slice.element.addEventListener('mouseenter', function(event) {
        this.tooltip.updateText(this.data[i].label);
        this.tooltip.show();
        this.tooltip.updatePosition([event.offsetX, event.offsetY]);
      }.bind(this));

      slice.element.addEventListener('mousemove', function(event) {
        this.tooltip.updatePosition([event.offsetX, event.offsetY]);
      }.bind(this));

      slice.element.addEventListener('mouseleave', function() {
        this.tooltip.hide();
      }.bind(this));
    }
  },
});