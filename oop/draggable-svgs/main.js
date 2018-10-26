document.addEventListener("DOMContentLoaded", function() {
  var mainSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  mainSvg.setAttribute('width', 500);
  mainSvg.setAttribute('height', 500);

  var shapeHeight = 30;
  var distanceBetweenElements = 10;

  document.getElementById('displayer').appendChild(mainSvg);

  for (let i = 0; i < 5; i++) {
    let shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    shape.setAttribute('height', shapeHeight);
    shape.setAttribute('width', 300);
    shape.setAttribute('fill', '#f00');

    shape.setAttribute('y', shapeHeight * i + distanceBetweenElements * i);
    mainSvg.appendChild(shape);
  }

});