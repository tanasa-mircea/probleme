var paintScreenOne;

function contentLoadedHandler() {
  paintScreenOne = new PaintScreen(70, 70, 10, 10, 5);

  var displayer = document.getElementById('displayer');
  displayer.appendChild(paintScreenOne.matrix.node);

  window.requestAnimationFrame(frameHandler);
}

function frameHandler() {
  for (let i = 0; i < paintScreenOne.matrix.data.length; i++) {
    for (let j = 0; j < paintScreenOne.matrix.data.length; j++) {
      if (paintScreenOne.matrix.data[i][j]) {
        paintScreenOne.matrix.instancesMap[i][j].enable();
      } else {
        paintScreenOne.matrix.instancesMap[i][j].disable();
      }
    }
  }

  window.requestAnimationFrame(frameHandler);
}


document.addEventListener("DOMContentLoaded", contentLoadedHandler);