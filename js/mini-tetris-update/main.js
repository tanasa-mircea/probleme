var config = {
        columns: 5,
        figureSide: 40,
        rows: 15,
        speed: 3 / 100
    },
    currentAnimation,
    currentFigure,
    playground,
    playgroundData = {},
    isPaused = false,
    shouldReset = false,
    score = 0,
    scoreElement,
    currentSpeed = config.speed;

function contentLoadedHandler() {
    playground = document.getElementById('playground');
    scoreElement = document.getElementById('playground-score');

    initPlayground();
    startGame();
}

function initPlayground() {
    playground.style.height = config.rows * config.figureSide + 'px';
    playground.style.width = config.columns * config.figureSide + 'px';
    playgroundData.matrix = [];
    
    for (let i = 0; i < config.columns; i++) {
        playgroundData.matrix[i] = [];
    }
}

function Figure(layoutId) {
    this.node = document.createElement('div');
    this.node.classList.add('figure');
    
    this.node.style.height = config.figureSide + 'px';
    this.node.style.width = config.figureSide + 'px';

    this.positionX = Math.floor(config.columns / 2);
    this.positionY = 0;

    this.node.style.left = this.positionX * config.figureSide + 'px';
}

Figure.prototype.move = function(direction) {
    let newPositionX = this.positionX + direction;

    if (newPositionX < 0 || newPositionX >= config.columns) {
        newPositionX = this.positionX;
    } 

    if (playgroundData.matrix[newPositionX][config.rows - 1 - Math.floor(this.positionY)]) {
        return;
    }

    this.node.style.left  = newPositionX * config.figureSide + 'px';
    this.positionX = newPositionX;
}

function startGame() {
    isPaused = false;

    if (shouldReset) {
        while (playground.firstChild) {
            playground.removeChild(playground.firstChild);
        }
    
        for (let i = 0; i < config.columns; i++) {
            playgroundData.matrix[i] = [];
        }

        currentFigure = null;

        shouldReset = false;
        score = 0;
        scoreElement.innerHTML = score;
    };

    currentAnimation = window.requestAnimationFrame(frameHandler);
}

function frameHandler() {
    if (isPaused) {
        currentAnimation = null;

        return;
    }

    if (!currentFigure) {
        currentFigure = new Figure(Math.round(Math.random() * 5));
        playground.appendChild(currentFigure.node);
    }

    let newPositionY = currentFigure.positionY + currentSpeed,
        lastColumnElement = playgroundData.matrix[currentFigure.positionX][config.rows - 1 - Math.floor(currentFigure.positionY)];    
        
    if (newPositionY > (lastColumnElement ? lastColumnElement.positionY : config.rows)) {
        findPlaceForFigure(currentFigure);
        currentFigure = null;
    } else {
        currentFigure.positionY = newPositionY;
        currentFigure.node.style.top = Math.floor(newPositionY) * config.figureSide + 'px';
    }

    currentAnimation = window.requestAnimationFrame(frameHandler);
}

function findPlaceForFigure(figure) {
    let figureColumn = playgroundData.matrix[figure.positionX],
        currentYIndex;
        wasNotFound = true,
        isCompleted = true;

    for (let i = 0; i < config.rows; i++) {
        if (!figureColumn[i]) {
            figure.node.style.top = (config.rows -1 - i) * config.figureSide + 'px';
            figure.positionY = config.rows - 1 - i;
            currentYIndex = i;
            figureColumn[i] = figure;
            wasNotFound = false;
            break;
        }
    }

    for (let i = 0; i < config.columns; i++) {
        if (!playgroundData.matrix[i][currentYIndex]) {
            isCompleted = false;
        }
    }

    if (isCompleted) {
        shiftMatrix(currentYIndex);
        score++;
        scoreElement.innerHTML = score;
    }

    if (wasNotFound) {
        console.log('score ', score);
        isPaused = true;
        shouldReset = true;
        pauseGame();
    }
}

function shiftMatrix(currentYIndex) {
    for (let i = 0; i < config.columns; i++) {
        for (let j = 0; j < playgroundData.matrix[i].length; j++) {
            if (currentYIndex === j) {
                playground.removeChild(playgroundData.matrix[i][currentYIndex].node);
                playgroundData.matrix[i][currentYIndex] = null;
                continue;
            };

            let figure = playgroundData.matrix[i][j];
            
            figure.positionY++;
            figure.node.style.top = figure.positionY * config.figureSide + 'px';
        }
        
    }

    for (let i = 0; i < config.columns; i++) {
        playgroundData.matrix[i].shift();
    }
}

function pauseGame() {
    if (!currentAnimation) {
        return;
    }

    window.cancelAnimationFrame(currentAnimation);
}

function keydownHandler(event) {
    if (!currentFigure) {
        return;
    };

    if (isPaused) {
        return;
    }

    if (event.keyCode === 39) {
        currentFigure.move(1);
    }
    
    if (event.keyCode === 37) {
        currentFigure.move(-1);
    }

    if (event.keyCode === 40) {
        currentSpeed = 1;
    }   
}

function keyupHandler(event) {
    if (event.keyCode === 40) {
        currentSpeed = config.speed;
    }
}

function inputChangeHandler(event) {
    if (event.target.matches('#speed-input')) {
        config.speed = +event.target.value / 100;
        currentSpeed = config.speed;
    }
}

function clickHandler(event) {
    if (event.target.matches('.game-control')) {
        console.log(event.target.attrs)

        let action = event.target.dataset.action;

        if (action === 'reset') {
            isPaused = true;
            shouldReset = true;
            
            setTimeout(function configUpdateTimeout() {
                startGame();
            }, 100)
        }

        if (action === 'pause') {
            isPaused = true;
        }

        if (action === 'start' && !currentAnimation) {
            startGame();
        }
    }
}

function submitHandler(event) {
    event.preventDefault();

    if (event.target.matches('#playground-config')) {
        isPaused = true;
        shouldReset = true;

        config.rows = +event.target[0].value;
        config.columns = +event.target[1].value;
        config.figureSide = +event.target[2].value;


        setTimeout(function configUpdateTimeout() {
            initPlayground();
            startGame();
        }, 100)

        
    }


}

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);
document.addEventListener("change", inputChangeHandler);
document.addEventListener("click", clickHandler);
document.addEventListener("submit", submitHandler);