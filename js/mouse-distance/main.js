function fillMatrix(matrix, config) {
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


            matrix.appendChild(matrixElement.cloneNode());
        }
    }
}


function draw(config) {
    var newMatrix = document.createElement('div');

    if (config.withRows) {
        fillMatrixWithRows(newMatrix, config);
    } else {
        fillMatrix(newMatrix, config);
    }

    newMatrix.classList.add('matrix');

    if (config.additionalMatrixClass) {
        newMatrix.classList.add(config.additionalMatrixClass);
    }

    newMatrix.style.height = `${config.height * config.rows + config.marginY * config.rows}px`;
    newMatrix.style.width = `${config.width * config.columns + config.marginX * config.columns}px`;

    return newMatrix;
}

function init() {
    var config = matrixConfig,
        newMatrix;

    // With JS
    newMatrix = draw(config);
    newMatrix.addEventListener('mousemove', mouseMoveOnMatrixHandler)
    // newMatrix.addEventListener('mouseenter', mouseMoveOnMatrixHandler)
    displayer.appendChild(newMatrix);
}


function contentLoadedHandler() {
    document.querySelector('body').appendChild(displayer);
}

function mouseMoveOnMatrixHandler(event) {
    var mouseCoords = {
            x: event.x,
            y: event.y
        },
        matrixElements = this.querySelectorAll('.matrix__element');
    

    matrixElements.forEach(function(node) {
        node.style.backgroundColor = '#3A69CD';

        var distance = Math.sqrt(Math.pow(mouseCoords.x - node.offsetLeft, 2) + Math.pow(mouseCoords.y - node.offsetTop, 2));

        if (distance < matrixConfig.radius) {
            node.style.backgroundColor = '#0c0';
        }
    })
}

// INIT
var matrixConfig = {
        rows: 20,
        columns: 20,
        width: 10,
        height: 10,
        marginX: 3,
        marginY: 3,
        secondaryColor: '#D60D0D',
        radius: 40
    },
    displayer = document.createElement('div');

displayer.classList.add('displayer');
init();

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
