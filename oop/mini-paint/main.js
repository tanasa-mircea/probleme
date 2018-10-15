var paintScreenOne;

function contentLoadedHandler() {
  paintScreenOne = new PaintScreen();

  var displayer = document.getElementById('displayer');
  displayer.appendChild(paintScreenOne.matrix.node);

  window.requestAnimationFrame(frameAnimationHandler);
}

function frameAnimationHandler() {
  var matrixData = paintScreenOne.matrix.data;
  for (let index = 0; index < matrixConfig.rows; index++) {
    for (let j = 0; j < matrixConfig.columns; j++) {
      if (matrixData[index][j].value) {
        matrixData[index][j].node.classList.add('active');
      } else {
        matrixData[index][j].node.classList.remove('active');
      }
    }
  }

  window.requestAnimationFrame(frameAnimationHandler);
}


document.addEventListener("DOMContentLoaded", contentLoadedHandler);