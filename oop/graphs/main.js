var config = {
  data: [
    {
      label: 'Test1',
      value: 25,
      additionalClass: 'test-class'
    },
    {
      label: 'Test2',
      value: 100
    },
    {
      label: 'Test3',
      value: 45
    },
    {
      label: 'Test4',
      value: 30
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

function PieChart() {
  var radius = 150;
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element.setAttribute('height', radius * 2);
  this.element.setAttribute('width', radius * 2);

  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute('cx', radius);
  circle.setAttribute('cy', radius);
  circle.setAttribute('r', radius);
  this.element.appendChild(circle);

  var slices = [{
    percentage: .4
  }, {
    percentage: .3
  }, {
    percentage: .2
  }];

  var prevCoords = [150, 0];

  for (let i = 0; i < slices.length; i++) {
    var path = createPath(slices[i], radius, prevCoords);
    prevCoords[0] = path.endCoords[0];
    prevCoords[1] = path.endCoords[1];
    this.element.appendChild(path.element);

    var breakpoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    breakpoint.setAttribute('cx', prevCoords[0]);
    breakpoint.setAttribute('cy', prevCoords[1]);
    breakpoint.setAttribute('r', 5);
    breakpoint.setAttribute('fill', '#f00');
    this.element.appendChild(breakpoint);
  }
}

function createPath(slice, radius, startingCoords) {
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // Start from x 150 y 0
  // Draw arc equivalent of value from x 150 y 0 to x 200 y 40
  // Go to chart center
  var slicePercentage = slice.percentage;
  var newPercentage = .5 - slicePercentage;
  var largeArcFlag = 0;
  var sweepFlag = 1;

  if (slicePercentage > 0.5) {
    largeArcFlag = 1;
    sweepFlag = 1;
    newPercentage = 1.5 - slicePercentage;
  }

  console.log('startingCoords ', startingCoords);

  var initialCoords = getCoordinatesForPercentage(0, radius, startingCoords);
  var endCoords = getCoordinatesForPercentage(newPercentage, radius, startingCoords);

  path.setAttribute('d', `M 150 0 A 150 150, 0, ${largeArcFlag} ${sweepFlag}, ${endCoords[0]} ${endCoords[1]} L ${radius} ${radius} Z`);
  path.setAttribute('fill', getColor());

  return {
    element: path,
    endCoords: endCoords
  };
}

function getCoordinatesForPercentage(percentage, radius, startingCoords) {
  var x = radius + radius * Math.sin(2 * Math.PI * percentage);
  var y = radius + radius * Math.cos(2 * Math.PI * percentage);
  return [x, y];
}

function getColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

mixin(PieChart.prototype, Graph.prototype);

function GraphFactory() {
  this.create = function create(type) {
    var graph;

    if (type === 'pie') {
      graph = new PieChart();
    }

    return graph;
  };
}

var graphFactory = new GraphFactory();
var chart = graphFactory.create('pie');

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('displayer').appendChild(chart.element);
});
