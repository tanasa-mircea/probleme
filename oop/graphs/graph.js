function Graph() {
  this.build();
}

Object.assign(Graph.prototype, {
  build: function() {
    throw new Error('Build should be overridden');
  },

  drawComponent: function drawComponent() {
    throw new Error('Draw Component should be overridden');
  }
});