function GraphFactory() {
  this.create = function create(type, config) {
    if (type === 'pie') {
      return new PieChart(config);
    }

    if (type === 'doughnut') {
      return new DoughnutChart(config);
    }
    if (type === 'horizontalBar') {
      return new HorizontalBarChart(config);
    }

    if (type === 'verticalBar') {
      return new VerticalBarChart(config);
    }
  };
}

var factory = new GraphFactory();
