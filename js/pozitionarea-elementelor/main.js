function fillMatrix(matrix, config) {
    for (let i = 0; i < config.rows; i++) {
        for (let j = 0; j < config.columns; j++) {
            var matrixElement = document.createElement('div');
            matrixElement.classList.add('matrix__element');
            
            if (config.position === 'absolute') {
                let positionX = j * config.width + j * config.marginX,
                    positionY = i * config.height + i * config.marginY;

                matrixElement.classList.add('matrix__element--abs');
                matrixElement.style.transform = `translate(${positionX}px, ${positionY}px)`;
            } else {
                matrixElement.classList.add('matrix__element--static');
                matrixElement.style.marginRight = `${config.marginX}px`;
                matrixElement.style.marginBottom = `${config.marginY}px`;
            }

            matrixElement.style.height = `${config.height}px`;
            matrixElement.style.width = `${config.width}px`;
            
            
            if (config.coloringLayout === 'even-line' && i % 2 !== 0) {
                matrixElement.style.backgroundColor = config.secondaryColor;
            }

            if (config.coloringLayout === 'diagonal' && i === j) {
                matrixElement.style.backgroundColor = config.secondaryColor;
            }

            if (config.coloringLayout === 'chess' && (i % 2 === j % 2)) {
                matrixElement.style.backgroundColor = config.secondaryColor;
            }

            if (config.coloringLayout === 'above-main-diagonal' && i < j) {
                matrixElement.style.backgroundColor = config.secondaryColor;
            }

            if (config.coloringLayout === 'above-secondary-diagonal' && (i + j >= (config.rows + config.columns) / 2) ) {
                matrixElement.style.backgroundColor = config.secondaryColor;
            }

            matrix.appendChild(matrixElement.cloneNode());
        }
    }
}

function fillMatrixWithRows(matrix, config) {
    for (let i = 0; i < config.rows; i++) {
        let rowElement = document.createElement('div');
        rowElement.classList.add('row');

        for (let j = 0; j < config.columns; j++) {
            var matrixElement = document.createElement('div');
            matrixElement.classList.add('matrix__element');
            rowElement.appendChild(matrixElement);
            
            if (config.position === 'absolute') {
                let positionX = j * config.width + j * config.marginX,
                    positionY = i * config.height + i * config.marginY;

                matrixElement.classList.add('matrix__element--abs');
                matrixElement.style.transform = `translate(${positionX}px, ${positionY}px)`;
            } else {
                matrixElement.classList.add('matrix__element--static');
                matrixElement.style.marginRight = `${config.marginX}px`;
                matrixElement.style.marginBottom = `${config.marginY}px`;
            }

            matrixElement.style.height = `${config.height}px`;
            matrixElement.style.width = `${config.width}px`;
        }

        matrix.appendChild(rowElement);
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

    config.position = 'absolute';
        
    // With JS
    config.coloringLayout = 'even-line';
    newMatrix = draw(config);
    displayer.appendChild(newMatrix);

    config.coloringLayout = 'diagonal';
    newMatrix = draw(config);
    displayer.appendChild(newMatrix);

    config.coloringLayout = 'chess';
    newMatrix = draw(config);
    displayer.appendChild(newMatrix);

    config.coloringLayout = 'above-main-diagonal';
    newMatrix = draw(config);
    displayer.appendChild(newMatrix);

    config.coloringLayout = 'above-secondary-diagonal';
    newMatrix = draw(config);
    displayer.appendChild(newMatrix);

    // With CSS
    config.coloringLayout = '';
    config.position = 'static';
    
    config.withRows = true;
    config.additionalMatrixClass = 'even-line';
    newMatrix = draw(config)
    displayer.appendChild(newMatrix);
    
    config.withRows = false;
    config.additionalMatrixClass = 'diagonal';
    newMatrix = draw(config)
    displayer.appendChild(newMatrix);
    
    config.withRows = true;
    config.additionalMatrixClass = 'chess';
    newMatrix = draw(config)
    displayer.appendChild(newMatrix);
    
    config.withRows = false;
    config.additionalMatrixClass = 'above-main-diagonal';
    newMatrix = draw(config)
    displayer.appendChild(newMatrix);
    
    config.additionalMatrixClass = 'above-secondary-diagonal';
    newMatrix = draw(config)
    displayer.appendChild(newMatrix);
}

var formSubmit = function(event) {
    event.preventDefault(); 
    matrixConfig = {
        rows: +event.target[0].value,
        columns: +event.target[1].value,
        width: +event.target[2].value,
        height: +event.target[3].value,
        marginY: +event.target[4].value,
        marginX: +event.target[5].value,
        secondaryColor: '#D60D0D'
    };

    while (displayer.firstChild) {
        displayer.removeChild(displayer.firstChild)
    }

    init();
    document.querySelector('body').appendChild(displayer);
}

function contentLoadedHandler() {
    document.querySelector('body').appendChild(displayer);
}

// INIT
var matrixConfig = {
        rows: 10,
        columns: 10,
        width: 15,
        height: 15,
        marginX: 5,
        marginY: 5,
        secondaryColor: '#D60D0D'
    },
    displayer = document.createElement('div');

displayer.classList.add('displayer');
init();

document.addEventListener('submit', formSubmit);
document.addEventListener("DOMContentLoaded", contentLoadedHandler);
