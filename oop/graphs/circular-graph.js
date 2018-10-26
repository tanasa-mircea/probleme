function CircularGraph() {
  Graph.call(this);
}

Object.assign(CircularGraph.prototype, Graph.prototype, {
  drawComponent: function drawComponent(dataPercentage, startCoords, color, percentageAcc, sliceClass) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var sweepFlag = 1;

    var endCoords = this.getCircleCoordinatesForPercentage(percentageAcc + dataPercentage, this.radius);
    var iteratablePercentage = 0;

    path.setAttribute('fill', color);
    path.classList.add('pie-slice');

    if (sliceClass) {
      path.classList.add(sliceClass);
    }

    function startAnimation(timeout) {
      setTimeout(function() {
        window.requestAnimationFrame(function frame() {
          iteratablePercentage += dataPercentage / 15;
          var endCoords = this.getCircleCoordinatesForPercentage(percentageAcc + iteratablePercentage, this.radius);

          path.setAttribute('d', `M ${startCoords[0]} ${startCoords[1]}
                                A ${this.center[0]} ${this.center[1]}, 0, ${iteratablePercentage > 0.5 ? 1 : 0} ${sweepFlag}, ${endCoords[0]} ${endCoords[1]}
                                L ${this.center[0]} ${this.center[1]} Z`);

          if (iteratablePercentage < dataPercentage) {
            window.requestAnimationFrame(frame.bind(this));
          }
        }.bind(this));

      }.bind(this), timeout);
    }

    return {
      element: path,
      endCoords: endCoords,
      startAnimation: startAnimation.bind(this)
    };
  },
  createText: function createText(text, coords) {
    var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textElement.innerHTML = text + '%';
    textElement.setAttribute('x', coords[0]);
    textElement.setAttribute('y', coords[1]);
    textElement.setAttribute('transform', `translate(-10, 0)`);

    return {
      element: textElement
    };
  },

  getCircleCoordinatesForPercentage: function(percentage, radius) {
    var radians = 2 * Math.PI * (percentage > 0.5 ? 0.5 - percentage : 1.5 - percentage);
    var x = radius + radius * Math.sin(radians);
    var y = radius + radius * Math.cos(radians);
    return [x, y];
  }
});