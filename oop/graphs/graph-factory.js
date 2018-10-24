function GraphFactory() {
  this.create = function create(type, config) {
    var graph;

    if (type === 'pie') {
      graph = new PieChart(config);
    }

    if (type === 'doughnut') {
      graph = new DoughnutChart(config);
    }

    if (type === 'horizontalBar') {
      graph = new HorizontalBarChart(config);
    }

    return graph;
  };
}
