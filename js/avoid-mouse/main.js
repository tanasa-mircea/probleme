var initPos = [];

function fillMatrix(matrix, config) {
    for (let i = 0; i < config.rows; i++) {
        initPos[i] = [];
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
            matrixElement.style.top = `${positionX}px`;
            matrixElement.style.left = `${positionY}px`;
            initPos[i][j] = {
                x: positionX,
                y: positionY
            }
            matrixElement.id = "m" + "-" + i + "-" + j;

            matrix.appendChild(matrixElement.cloneNode());
        }
    }
}


function draw(config) {
    var newMatrix = document.createElement('div');

    fillMatrix(newMatrix, config);

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
    
    displayer.appendChild(newMatrix);
}


function contentLoadedHandler() {
    document.querySelector('body').appendChild(displayer);
    document.getElementsByTagName("body")[0].addEventListener('mousemove', mouseMoveOnMatrixHandler)
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
            let i = node.id.split("-")[1];
            let j = node.id.split("-")[2];
            
            node.style.left = initPos[i][j].x + "px";
            node.style.top = initPos[i][j].y + "px";
            
        }  else {
            //var angle = Math.atan2(nodeX, nodeY) * (180 / Math.PI),
            var angle = Math.atan2(nodeY - mouseCoords.y, nodeX - mouseCoords.x);
            polarX = mouseCoords.x + Math.floor(150 * Math.cos(angle)),
            polarY = mouseCoords.y + Math.floor(150 * Math.sin(angle));

            node.style.left = polarX + "px";
            node.style.top = polarY + "px";
        }

        // console.log('Math.cos(angle) ', Math.cos(angle))
        // console.log('distance ', distance)
        // console.log('angle ', angle)

        // console.log('polarX ', polarX);
        // console.log('polarY ', polarY);

       // node.style.transform = `translate(${2 * polarX + (Math.sign(polarX) * matrixConfig.radius)}px, ${2 * polarY+(Math.sign(polarY) * matrixConfig.radius)}px)`;
    })
}

// INIT
var matrixConfig = {
        rows: 25,
        columns: 25,
        width: 10,
        height: 10,
        marginX: 3,
        marginY: 3,
        secondaryColor: '#D60D0D',
        radius: 50
    },
    displayer = document.createElement('div');

displayer.classList.add('displayer');
init();

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
