var config = {
        columns: 5,
        figureSide: 40,
        rows: 15,
        speed: 5 / 100
    },
    currentAnimation,
    currentPosition = {
        x: Math.floor(config.columns / 2),
        y: 0,
        roundedY: 0
    },
    previousPosition, nextPosition,
    playground,
    playgroundModel = [],
    playgroundNodes = [],
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
    let matrixElement = document.createElement('div');
    matrixElement.classList.add('matrix-element');
    matrixElement.style.height = config.figureSide + 'px';
    matrixElement.style.width = config.figureSide + 'px';

    playground.style.height = config.rows * config.figureSide + 'px';
    playground.style.width = config.columns * config.figureSide + 'px';
    
    for (let i = 0; i < config.rows; i++) {
        playgroundNodes[i] = [];
        playgroundModel[i] = [];

        for (let j = 0; j < config.columns; j++) {
            let clone = matrixElement.cloneNode();
            clone.id = `m-${i}-${j}`
            playground.appendChild(clone)
            playgroundNodes[i][j] = clone;
            playgroundModel[i][j] = 0;
        }
    }

    playgroundModel[currentPosition.y][currentPosition.x] = 1;
    previousPosition = Object.assign({}, currentPosition);


    // playgroundModel[currentPosition.y][currentPosition.x] = 1;
}


function startGame() {
    isPaused = false;

    if (shouldReset) {
        for (let i = 0; i < config.rows; i++) {
            for (let j = 0; j < config.columns; j++) {
                playgroundModel[i][j] = 0;
            }        
        }
    }

    repaint();
    window.requestAnimationFrame(frameHandler);
}

function frameHandler() {
    if (isPaused) {
        return;
    }

    if (!currentPosition) {
        currentPosition = {
            x: Math.floor(config.columns / 2),
            y: 0,
            roundedY: 0
        }

        previousPosition = Object.assign({}, currentPosition);
        playgroundModel[currentPosition.y][currentPosition.x] = 1;
    }

    currentPosition.y += currentSpeed;
    nextPosition = playgroundModel[currentPosition.roundedY + 1] && playgroundModel[currentPosition.roundedY + 1][currentPosition.x];

    if (currentPosition.roundedY === 0 && nextPosition) {
        shouldReset = true;
        repaint();
        return;
    }

    if (currentPosition.roundedY >= config.rows - 1 || nextPosition) {
        previousPosition = null;
        currentPosition = null;
    }

    if (currentPosition) {
        currentPosition.roundedY = Math.floor(currentPosition.y);

        playgroundModel[currentPosition.roundedY][currentPosition.x] = 1;

        if (previousPosition && (previousPosition.roundedY !== currentPosition.roundedY || previousPosition.x !== currentPosition.x) ) {
            playgroundModel[previousPosition.roundedY][previousPosition.x] = 0;
        }
        
        repaint();
        checkIfLineCompleted();
        previousPosition = Object.assign({}, currentPosition);
    }
    
    window.requestAnimationFrame(frameHandler);
}

function repaint() {
    for (let i = 0; i < config.rows; i++) {
        for (let j = 0; j < config.columns; j++) {
            let element = playgroundNodes[i][j];

            if (playgroundModel[i][j]) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        }        
    }
}

function checkIfLineCompleted() {
    let isLineComplete = true;

    for (let i = 0; i < config.columns; i++) {
        if (!playgroundModel[config.rows - 1][i]) {
            isLineComplete = false;
        }
    }

    if (isLineComplete) {
        for (let i = config.rows - 1; i >= 0 ; i--) {
            for (let j = 0; j < config.columns; j++) {
                playgroundModel[i][j] = playgroundModel[i - 1] ? playgroundModel[i - 1][j] : 0;
            }        
        }

        score++;
        scoreElement.innerHTML = score;
    }
}

function keydownHandler(event) {
    if (!currentPosition) {
        return;
    };

    if (isPaused) {
        return;
    }

    if (event.keyCode === 39) {
        let itemOnRight = playgroundModel[currentPosition.roundedY + 1] && playgroundModel[currentPosition.roundedY + 1][currentPosition.x + 1];

        if (!itemOnRight) {
            currentPosition.x = Math.min(++currentPosition.x, config.columns - 1);
            repaint();
        }
    }
    
    if (event.keyCode === 37) {
        let itemOnLeft = playgroundModel[currentPosition.roundedY + 1] && playgroundModel[currentPosition.roundedY + 1][currentPosition.x - 1];

        if (!itemOnLeft) {
            currentPosition.x = Math.max(--currentPosition.x, 0);
            repaint();
        }
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
        let action = event.target.dataset.action;

        if (action === 'reset') {
            isPaused = true;
            shouldReset = true;
            currentPosition = null;
            
            setTimeout(function configUpdateTimeout() {
                startGame();
            }, 100)
        }

        if (action === 'pause') {
            isPaused = true;
        }

        if (action === 'start' && isPaused) {
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

        initPlayground();
        startGame();    
    }
}

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);
document.addEventListener("change", inputChangeHandler);
document.addEventListener("click", clickHandler);
document.addEventListener("submit", submitHandler);