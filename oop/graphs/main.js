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

  this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element.setAttribute('height', radius * 2);
  this.element.setAttribute('width', radius * 2);

  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute('cx', radius);
  circle.setAttribute('cy', radius);
  circle.setAttribute('r', radius);
  this.element.appendChild(circle);

  var prevCoords = [150, 0],
      prevValue = 0,
      total = 0;

  for (let i = 0; i < config.data.length; i++) {
    total += config.data[i].value;
  }

  for (let i = 0; i < config.data.length; i++) {
    var percentage = (config.data[i].value + prevValue) * 100 / total;

    var path = createPath(percentage / 100, radius, prevCoords);
    this.element.appendChild(path.element);


    var text = createText(Math.round(percentage), getTriangleCenter([radius, radius], prevCoords, path.endCoords));
    this.element.appendChild(text.element);

    prevValue += config.data[i].value;
    prevCoords = path.endCoords;
  }
}

function getTriangleCenter(a, b, c) {
  return [
    (a[0] + b[0] + c[0]) / 3,
    (a[1] + b[1] + c[1]) / 3
  ];
}

function createPath(percentage, radius, prevCoords, prevPercentage) {
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // Start from x 150 y 0
  // Draw arc equivalent of value from x 150 y 0 to x 200 y 40
  // Go to chart center
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

  path.setAttribute('fill', getColor());

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
