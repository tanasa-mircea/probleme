function PieChart(config) {
  this.radius = 150;
  this.elementHeight = 300;
  this.elementWidth = 300;
  this.center = [150, 150];
  this.data = config.data;

  this.tooltip = new Tooltip();

  this.element = document.createElement('div');
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  this.svg.setAttribute('height', this.elementHeight);
  this.svg.setAttribute('width', this.elementWidth);

  this.element.classList.add('chart');
  this.element.appendChild(this.svg);
  this.element.appendChild(this.tooltip.element);

  if (config.legend) {
    this.legend = new Legend();
    this.element.appendChild(this.legend.element);
  }

  this.build();
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

    var textGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var startCoords = [150, 0],
        percentageAcc = 0,
        total = 0;

    for (let i = 0; i < this.data.length; i++) {
      total += this.data[i].value;
    }

    for (let i = 0; i < this.data.length; i++) {
      var percentage = this.data[i].value * 100 / total,
          color = getColor();

      var slice = this.drawSlice(percentage / 100 , startCoords, color, percentageAcc / 100);

      var angleAcc = 2 * Math.PI * percentageAcc / 100;
      var angle = 2 * Math.PI * percentage / 2 / 100;
      var textCoords = [150 + 75 * Math.sin(angleAcc + angle), 150 - 75 * Math.cos(angleAcc + angle)];

      var text = this.createText(Math.round(percentage), textCoords);
      text.element.style.pointerEvents = 'none';

      if (this.legend) {
        this.legend.add(color, this.data[i].label);
      }

      this.svg.appendChild(slice.element);
      textGroup.appendChild(text.element);

      slice.startAnimation(300 * i);

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

    this.svg.appendChild(textGroup);
  },
});

