function VerticalBarChart(config) {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element.setAttribute('height', 600);
  this.element.setAttribute('width', 50);

  this.tooltip = new Tooltip();

  var total = 0;
  for (let i = 0; i < config.data.length; i++) {
    total += config.data[i].value;
  };


  generateBars(0, config.data, 0, 600, this.element, total, this.tooltip);
  this.element.appendChild(this.tooltip.element);
}
mixin(VerticalBarChart.prototype, Graph.prototype);

function generateBars(index, data, lastPosition, containerHeight, container, total, tooltip) {
  console.log(index);
  console.log(index >= data.length);
  if (index >= data.length) {
    return;
  }

  var newBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  var height = data[index].value * containerHeight / total;
  var color = getColor();

  newBar.setAttribute('width', '50');
  newBar.setAttribute('height', height);
  newBar.setAttribute('y', lastPosition);
  newBar.setAttribute('fill', color);

  container.appendChild(newBar);

  newBar.addEventListener('mouseenter', function(event) {
    tooltip.updateText(data[index].label);
    tooltip.show();
    tooltip.updatePosition([event.offsetX, event.offsetY]);
  });

  newBar.addEventListener('mousemove', function(event) {
    tooltip.updatePosition([event.offsetX, event.offsetY]);
  });

  newBar.addEventListener('mouseleave', function() {
    tooltip.hide();
  });

  return generateBars(index + 1, data, lastPosition + height, containerHeight, container, total, tooltip);
}