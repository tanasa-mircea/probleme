function initMouseHandlers(elements) {
    var mouseDown = false;

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('mousedown', function circleElementHandler(event) {
            mouseDown = this;
        })       
    }

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    function mouseMoveHandler() {
        if (mouseDown) {
            mouseDown.style.left = event.x - mouseDown.offsetParent.offsetLeft - mouseDown.offsetWidth / 2 + 'px';
            mouseDown.style.top = event.y - mouseDown.offsetParent.offsetTop - mouseDown.offsetHeight / 2 + 'px';
        }
    }
    
    function mouseUpHandler() {
        mouseDown = null;
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', mouseUpHandler);
    }
}

function fillMatrix(matrix, config, isMain) {
    for (let i = 0; i < config.rows; i++) {
        for (let j = 0; j < config.columns; j++) {
            var matrixElement = document.createElement('div');
            matrixElement.classList.add('matrix__element');
            
            let positionX = j * config.width + j * config.marginX,
                positionY = i * config.height + i * config.marginY;

            matrixElement.classList.add('matrix__element--static');
            matrixElement.style.height = `${config.height}px`;
            matrixElement.style.width = `${config.width}px`;
            matrixElement.style.marginRight = `${config.marginX}px`;
            matrixElement.style.marginBottom = `${config.marginY}px`;

            if (isMain) {
                let span = document.createElement('span');
                span.innerText = `${i}${j}`;
                matrixElement.appendChild(span);
            }


            matrix.appendChild(matrixElement.cloneNode(true));
        }
    }
}


function draw(config, isMain) {
    var newMatrix = document.createElement('div');

    fillMatrix(newMatrix, config, isMain);

    newMatrix.classList.add('matrix');

    if (isMain) {
        newMatrix.classList.add('main-matrix');
    }

    if (config.additionalMatrixClass) {
        newMatrix.classList.add(config.additionalMatrixClass);
    }

    newMatrix.style.height = `${config.height * config.rows + config.marginY * config.rows}px`;
    newMatrix.style.width = `${config.width * config.columns + config.marginX * config.columns}px`;

    return newMatrix;
}

function init() {
    var config = matrixConfig,
        firstMatrix, secondMatrix;

    firstMatrix = draw(config, true);
    displayer.appendChild(firstMatrix);

    secondMatrix = draw(config);
    displayer.appendChild(secondMatrix);
}


function contentLoadedHandler() {
    document.querySelector('body').appendChild(displayer);
}

// INIT
var matrixConfig = {
        rows: 5,
        columns: 5,
        width: 30,
        height: 30,
        marginX: 3,
        marginY: 3,
    },
    displayer = document.createElement('div');

displayer.classList.add('displayer');
init();

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
