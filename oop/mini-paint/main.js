var paintScreenOne;

function contentLoadedHandler() {
  paintScreenOne = new PaintScreen(70, 70, 10, 10, 5);

  var displayer = document.getElementById('displayer');
  displayer.appendChild(paintScreenOne.matrix.node);
}


document.addEventListener("DOMContentLoaded", contentLoadedHandler);