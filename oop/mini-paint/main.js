var paintScreenOne;

function contentLoadedHandler() {
  paintScreenOne = new PaintScreen(70, 70, 10, 10, 5);

  var displayer = document.getElementById('displayer');
  displayer.appendChild(paintScreenOne.matrix.node);

  window.requestAnimationFrame(frameHandler);
}

function frameHandler() {
  paintScreenOne.paint();

  window.requestAnimationFrame(frameHandler);
}


document.addEventListener("DOMContentLoaded", contentLoadedHandler);