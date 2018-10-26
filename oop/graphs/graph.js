function Graph() {
  this.addLegend();
  this.addTooltip();

  this.build();
}

Object.assign(Graph.prototype, {
  build: function() {
    throw new Error('Build should be overridden');
  },

  addLegend: function() {
    if (!this.config) {
      throw new Error('The chart config is missing');
    }

    if (!this.element) {
      throw new Error('The chart element is missing');
    }

    if (this.config.legend) {
      this.legend = new Legend();
      this.element.appendChild(this.legend.element);
    }
  },

  addTooltip: function() {
    this.tooltip = new Tooltip();
    this.element.appendChild(this.tooltip.element);
  },

  drawComponent: function drawComponent() {
    throw new Error('Draw Component should be overridden');
  }
});