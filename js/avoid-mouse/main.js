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
    displayer.appendChild(newMatrix);
}


function contentLoadedHandler() {
    document.querySelector('body').appendChild(displayer);
}

function mouseMoveOnMatrixHandler(event) {
    var mouseCoords = {
            x: event.x - this.offsetLeft,
            y: event.y - this.offsetTop
        },
        matrixElements = this.querySelectorAll('.matrix__element');
    
    matrixElements.forEach(function(node) {
        node.style.transform = '';
        var nodeX = node.offsetLeft + matrixConfig.width / 2,
            nodeY = node.offsetTop + matrixConfig.height / 2,
            
            distance = Math.sqrt(Math.pow(mouseCoords.x - nodeX, 2) + Math.pow(mouseCoords.y - nodeY, 2));

        if (distance > matrixConfig.radius) {
            return;
        }

        var angle = Math.atan2(nodeX, nodeY) * 180 / Math.PI,
            polarX = distance * Math.cos(angle),
            polarY = distance * Math.sin(angle);

        console.log('angle ', angle);
        console.log('polar ', polarX, polarY);
        console.log('nodeX ', nodeX, nodeY);

        node.style.transform = `translate(${polarX * 5}px, ${polarY * 5}px)`;
    })
}

// INIT
var matrixConfig = {
        rows: 10,
        columns: 10,
        width: 10,
        height: 10,
        marginX: 3,
        marginY: 3,
        secondaryColor: '#D60D0D',
        radius: 20
    },
    displayer = document.createElement('div');

displayer.classList.add('displayer');
init();

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
