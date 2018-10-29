document.addEventListener("DOMContentLoaded", function() {
  var config = {
    shapeHeight: 30,
    shapeMargin: 10,
    shapesNumber: 5
  };

  var mainSvg = new ShapesContainer(config);
  document.getElementById('displayer').appendChild(mainSvg.element);
});



