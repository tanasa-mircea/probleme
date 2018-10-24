function Graph() {}

Object.assign(Graph.prototype, {
  mouseEnterOverride: function() {
    throw new Error('mouseEnterOverride should be overridden');
  },

  mouseLeaveOverride: function() {
    throw new Error('mouseEnterOverride should be overridden');
  }
});