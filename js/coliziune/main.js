function contentLoadedHandler() {
    var elements = document.querySelectorAll('.patrat'),
        circleElements = document.querySelectorAll('.circle')
        animationConfig = {
            firstElement: elements[0],
            secondElement: elements[1],
            firstCircleElement: circleElements[0],
            secondCircleElement: circleElements[1]
        }
    
    window.requestAnimationFrame(init.bind(animationConfig));
    init.call(animationConfig);
};

function init() {
    isColiding(this.firstElement, this.secondElement);
    isColiding(this.firstCircleElement, this.secondCircleElement);

    window.requestAnimationFrame(init.bind(this));
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
