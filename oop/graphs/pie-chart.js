function PieChart(config) {
  var radius = 150;

  this.legend = new Legend({ coords: [400, 100]});

  this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element.setAttribute('height', 600);
  this.element.setAttribute('width', 600);

  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute('cx', radius);
  circle.setAttribute('cy', radius);
  circle.setAttribute('r', radius);
  this.element.appendChild(circle);

  var prevCoords = [150, 0],
      prevPercentage = 0,
      total = 0;

  for (let i = 0; i < config.data.length; i++) {
    total += config.data[i].value;
  }

  for (let i = 0; i < config.data.length; i++) {
    var percentage = config.data[i].value * 100 / total;
    var color = getColor();

    this.legend.add(color, config.data[i].label);

    var path = createPath(percentage / 100, radius, prevCoords, prevPercentage / 100, color);
    this.element.appendChild(path.element);

    var text = createText(Math.round(percentage), getTriangleCenter([radius, radius], prevCoords, path.endCoords));
    this.element.appendChild(text.element);

    prevPercentage += percentage;
    prevCoords = path.endCoords;
  }

  this.element.appendChild(this.legend.element);
}
mixin(PieChart.prototype, Graph.prototype);


function createPath(percentage, radius, prevCoords, prevPercentage, color) {
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // Start from x 150 y 0
  // Draw arc equivalent of value from x 150 y 0 to x 200 y 40
  // Go to chart center
  percentage = percentage + prevPercentage;

  var newPercentage = .5 - percentage;
  var largeArcFlag = 0;
  var sweepFlag = 1;

  if (percentage > 0.5) {
    sweepFlag = 1;
    newPercentage = 1.5 - percentage;
  }

  var radians = 2 * Math.PI * newPercentage;
  var endCoords = getCoordinatesForPercentage(radians, radius);

  path.setAttribute('d', `M ${prevCoords[0]} ${prevCoords[1]}
                          A ${radius} ${radius}, 0, ${largeArcFlag} ${sweepFlag}, ${endCoords[0]} ${endCoords[1]}
                          L ${radius} ${radius} Z`);

  path.setAttribute('fill', color);

  return {
    element: path,
    endCoords: endCoords
  };
}

function createText(innerText, coords) {
  var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.innerHTML = innerText + '%';
  text.setAttribute('x', coords[0]);
  text.setAttribute('y', coords[1]);
  text.setAttribute('transform', `translate(-12, 0)`);

  return {
    element: text
  };
}

function getCoordinatesForPercentage(degrees, radius) {
  var x = radius + radius * Math.sin(degrees);
  var y = radius + radius * Math.cos(degrees);
  return [x, y];
}