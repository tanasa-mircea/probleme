function PieChart(config) {
  this.radius = 150;
  this.elementHeight = 300;
  this.elementWidth = 300;
  this.center = [150, 150];
  this.config = config;
  this.data = config.data;

  this.element = document.createElement('div');
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  this.svg.setAttribute('height', this.elementHeight);
  this.svg.setAttribute('width', this.elementWidth);

  this.element.classList.add('chart');
  this.element.appendChild(this.svg);

  if (config.chartClass) {
    this.element.classList.add(config.chartClass);
  }

  this.listeners = [];

  CircularGraph.call(this);
}
Object.assign(PieChart.prototype, CircularGraph.prototype, {
  build: function build() {
    // Create the circle, set its coords and radius than append it
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', this.radius);
    circle.setAttribute('cy', this.radius);
    circle.setAttribute('r', this.radius);
    this.svg.appendChild(circle);

    var textGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var startCoords = [150, 0],
        percentageAcc = 0;

    for (let i = 0; i < this.data.length; i++) {
      var percentage = this.data[i].percentage,
          color = getColor();

      let slice = this.drawComponent(percentage / 100 , startCoords, color, percentageAcc / 100, this.data[i].additionalClass);
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

      let mouseEnterListener = function(event) {
        this.tooltip.updateText(this.data[i].label);
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
    }

    this.svg.appendChild(textGroup);
  },
});

