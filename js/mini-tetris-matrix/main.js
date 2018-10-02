var config = {
        columns: 5,
        figureSide: 40,
        rows: 15,
        speed: 3 / 100
    },
    currentAnimation,
    currentPosition = {
        x: Math.floor(config.columns / 2),
        y: 0,
        roundedY: 0
    },
    playground,
    playgroundModel = [],
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
        for (let j = 0; j < config.columns; j++) {
            let clone = matrixElement.cloneNode();
            clone.id = `m-${i}-${j}`
            playground.appendChild(clone)
            playgroundModel[i] = [];
        }
    }
}


function startGame() {
    isPaused = false;
    window.requestAnimationFrame(frameHandler);
}

function frameHandler() {
    if (isPaused) {
        return;
    }

    if (!currentPosition) {
        currentPosition = {
            x: Math.floor(config.columns / 2),
            y: 0
        }
    }
    
    currentPosition.y += config.speed;

    if (currentPosition.roundedY < Math.floor(currentPosition.y)) {
        let currentNode = document.getElementById(`m-${Math.floor(currentPosition.y)}-${Math.floor(currentPosition.x)}`),
            prevNode = document.getElementById(`m-${Math.floor(currentPosition.y - 1)}-${Math.floor(currentPosition.x)}`);

        prevNode.classList.remove('active');
        currentNode.classList.add('active');
        currentPosition.roundedY = Math.floor(currentPosition.y);
    }

    window.requestAnimationFrame(frameHandler);
}


function pauseGame() {
    if (!currentAnimation) {
        return;
    }

    window.cancelAnimationFrame(currentAnimation);
}

function keydownHandler(event) {
    if (!currentPosition) {
        return;
    };

    if (isPaused) {
        return;
    }

    if (event.keyCode === 39) {
        let prevNode = document.getElementById(`m-${Math.floor(currentPosition.y)}-${Math.floor(currentPosition.x)}`);
        prevNode.classList.remove('active');
        currentPosition.x++;
    }
    
    if (event.keyCode === 37) {
        let prevNode = document.getElementById(`m-${Math.floor(currentPosition.y)}-${Math.floor(currentPosition.x)}`);
        prevNode.classList.remove('active');
        currentPosition.x--;
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