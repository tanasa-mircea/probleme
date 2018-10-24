function GraphFactory() {
  this.create = function create(type, config) {
    var graph;

    if (type === 'pie') {
      graph = new PieChart(config);
    }

    return graph;
  };
}
