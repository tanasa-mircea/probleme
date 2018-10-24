var config = {
  data: [
    {
      label: 'Test1',
      value: 25,
      additionalClass: 'test-class'
    }, {
      label: 'Test2',
      value: 100
    }, {
      label: 'Test3',
      value: 25
    }, {
      label: 'Test3',
      value: 50
    }, {
      label: 'Test3',
      value: 60
    }
  ]
};

function Legend(config) {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "g");
  this.lastYPosition = 0;

  if (config.coords) {
    this.element.setAttribute('transform', `translate(${config.coords[0]}, ${config.coords[1]})`);
  }
}

Object.assign(Legend.prototype, {
  add: function add(color, text) {
    var group = document.createElementNS("http://www.w3.org/2000/svg", "g"),
        colorElement = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
        textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");

    colorElement.setAttribute('height', 15);
    colorElement.setAttribute('width', 30);
    colorElement.setAttribute('fill', color);
    colorElement.setAttribute('y', 0);

    textElement.setAttribute('x', 35);
    textElement.setAttribute('y', 10);
    textElement.innerHTML = text;

    group.setAttribute('transform', `translate(0, ${this.lastYPosition})`);
    group.appendChild(colorElement);
    group.appendChild(textElement);

    this.lastYPosition = this.lastYPosition + 15 + 5;
    this.element.appendChild(group);
  }
});

function Graph() {}
Object.assign(Graph.prototype, {
  mouseEnterOverride: function() {
    throw new Error('mouseEnterOverride should be overridden');
  },

  mouseLeaveOverride: function() {
    throw new Error('mouseEnterOverride should be overridden');
  }
});

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

function getTriangleCenter(a, b, c) {
  return [
    (a[0] + b[0] + c[0]) / 3,
    (a[1] + b[1] + c[1]) / 3
  ];
}

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


function getColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

mixin(PieChart.prototype, Graph.prototype);

function GraphFactory() {
  this.create = function create(type, config) {
    var graph;

    if (type === 'pie') {
      graph = new PieChart(config);
    }

    return graph;
  };
}

document.addEventListener("DOMContentLoaded", function() {
  var graphFactory = new GraphFactory();
  var chart = graphFactory.create('pie', config);

  document.getElementById('displayer').appendChild(chart.element);
});
