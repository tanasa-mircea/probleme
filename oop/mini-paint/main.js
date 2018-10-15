var paintScreenOne;

function contentLoadedHandler() {
  paintScreenOne = new PaintScreen(20, 20, 10, 10);

  var displayer = document.getElementById('displayer');
  displayer.appendChild(paintScreenOne.matrix.node);

  window.requestAnimationFrame(frameAnimationHandler);
}

function frameAnimationHandler() {
  var matrixData = paintScreenOne.matrix.data;
  for (let index = 0; index < paintScreenOne.config.rows; index++) {
    for (let j = 0; j < paintScreenOne.config.columns; j++) {
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