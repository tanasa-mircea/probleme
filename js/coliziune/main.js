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

function contentLoadedHandler() {
    var elements = document.querySelectorAll('.patrat'),
        circleElements = document.querySelectorAll('.circle')
        animationConfig = {
            firstElement: elements[0],
            secondElement: elements[1],
            firstCircleElement: circleElements[0],
            secondCircleElement: circleElements[1]
        }
    
    initMouseHandlers([...elements, ...circleElements]);

    window.requestAnimationFrame(init.bind(animationConfig));
    // init.call(animationConfig);
};

function init() {
    isColiding(this.firstElement, this.secondElement);
    isColidingCircle(this.firstCircleElement, this.secondCircleElement);

    window.requestAnimationFrame(init.bind(this));
}

function isColidingCircle(firstElement, secondElement) {
    let colision = false,
        firstElementData = {
            center: [firstElement.offsetLeft + firstElement.offsetWidth / 2, firstElement.offsetTop + firstElement.offsetHeight / 2],
            radius: firstElement.offsetWidth / 2
        },
        secondElementData = {
            center: [secondElement.offsetLeft + secondElement.offsetWidth / 2, secondElement.offsetTop + secondElement.offsetHeight / 2],
            radius: secondElement.offsetWidth / 2
        },
        distanceBetweenCenters = Math.pow(secondElementData.center[0] - firstElementData.center[0], 2) + Math.pow(secondElementData.center[1] - firstElementData.center[1], 2),
        sumOfRadius = Math.pow(firstElementData.radius + secondElementData.radius, 2);

    if (distanceBetweenCenters < sumOfRadius) {
        colision = true;
    }

    if (colision) {
        secondElement.style.backgroundColor = "#dd0"
    } else {
        secondElement.style.backgroundColor = null;
    } 
}

function isColiding(firstElement, secondElement) {
    let colisionY = false,
        colisionX = false,
        firstElementData = {
            left: firstElement.offsetLeft,
            right: firstElement.offsetLeft + firstElement.offsetWidth,
            top: firstElement.offsetTop,
            bottom: firstElement.offsetTop + firstElement.offsetHeight
        },
        secondElementData = {
            left: secondElement.offsetLeft,
            right: secondElement.offsetLeft + secondElement.offsetWidth,
            top: secondElement.offsetTop,
            bottom: secondElement.offsetTop + secondElement.offsetHeight
        };

    if (secondElementData.left < firstElementData.right && secondElementData.right > firstElementData.left) {
        colisionX = true;
    }
    
    if (secondElementData.bottom > firstElementData.top && secondElementData.top < firstElementData.bottom) {
        colisionY = true
    }

    if (colisionX && colisionY) {
        secondElement.style.backgroundColor = "#dd0"
    } else {
        secondElement.style.backgroundColor = null;
    }

    return colisionX && colisionY;
}
  
document.addEventListener("DOMContentLoaded", contentLoadedHandler);
document.addEventListener("click", contentLoadedHandler);
