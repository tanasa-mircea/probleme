function initMouseHandlers() {
    var mouseDownClone = false,
        mouseDown = null,
        currentMatrix = null;

    window.addEventListener('mousedown', function circleElementHandler(event) {
        if (event.target.matches('.main-matrix .matrix__element:not(.invisible)')) {
            currentMatrix = event.target.offsetParent;
            mouseDownClone = event.target.cloneNode(true);
            mouseDown = event.target;
            
            event.target.classList.add('dragged')
            mouseDownClone.style.left = event.x - currentMatrix.offsetLeft - 4 - event.offsetX + 'px';
            mouseDownClone.style.top = event.y - currentMatrix.offsetTop - 1 - event.offsetY + 'px';
            mouseDownClone.dataset.offsetX = event.offsetX;
            mouseDownClone.dataset.offsetY = event.offsetY;
            mouseDownClone.classList.add('absolute')
            mouseDownClone.classList.add('clone')
            
            currentMatrix.appendChild(mouseDownClone);
        }

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
    })       


    function mouseMoveHandler(event) {
        if (mouseDownClone) {
            if (secondMatrixSelected && event.target !== secondMatrixSelected) {
                secondMatrixSelected.classList.remove('dragged');
            }

            if (event.target.matches('.matrix:not(.main-matrix) .matrix__element:not(.clone)')) {
                secondMatrixSelected = event.target;
                event.target.classList.add('dragged');
            }

            mouseDownClone.style.left = event.x - currentMatrix.offsetLeft - 4 -mouseDownClone.dataset.offsetX + 'px';
            mouseDownClone.style.top = event.y - currentMatrix.offsetTop - 1 - mouseDownClone.dataset.offsetY + 'px';
        }
    }
    
    function mouseUpHandler(event) {
        if (mouseDownClone) {
            if (event.target.matches('.matrix:not(.main-matrix) .matrix__element:not(.clone)')) {
                event.target.classList.remove('dragged');
                mouseDown.classList.add('invisible');
                mouseDownClone.classList.remove('absolute');
                event.target.offsetParent.replaceChild(mouseDownClone, event.target);
            } else {
                currentMatrix.removeChild(mouseDownClone);
            }

            mouseDown.classList.remove('dragged');
            mouseDownClone = null;
            currentMatrix = null;


            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
        } else {
            if (event.target.matches('.matrix:not(.main-matrix) .matrix__element.clone')) {
                let originalNode = document.querySelector(`.main-matrix [data-original=${event.target.dataset.original}]`);
                originalNode.classList.remove('invisible');
                event.target.offsetParent.replaceChild(plainMatrixElement.cloneNode(true), event.target);
            }
        }

    }
}

function fillMatrix(matrix, config, isMain) {
    for (let i = 0; i < config.rows; i++) {
        for (let j = 0; j < config.columns; j++) {
            var matrixElement = plainMatrixElement.cloneNode(true);
            
            let positionX = j * config.width + j * config.marginX,
                positionY = i * config.height + i * config.marginY;

            if (isMain) {
                matrixElement.dataset.original = `m-${i}-${j}`;
                let span = document.createElement('span');
                span.innerText = `${i}${j}`;
                matrixElement.appendChild(span);
            }


            matrix.appendChild(matrixElement);
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

var matrixConfig = {
        rows: 5,
        columns: 5,
        width: 30,
        height: 30,
        marginX: 3,
        marginY: 3,
    },
    displayer = document.createElement('div'),
    plainMatrixElement = document.createElement('div'),
    secondMatrixSelected;

    
plainMatrixElement.classList.add('matrix__element');
plainMatrixElement.style.height = `${matrixConfig.height}px`;
plainMatrixElement.style.width = `${matrixConfig.width}px`;
plainMatrixElement.style.marginLeft = `${matrixConfig.marginX}px`;
plainMatrixElement.style.marginBottom = `${matrixConfig.marginY}px`;

displayer.classList.add('displayer');
init();
initMouseHandlers();


document.addEventListener("DOMContentLoaded", contentLoadedHandler);
