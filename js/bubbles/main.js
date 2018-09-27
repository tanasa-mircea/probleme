var bubblesDensity = 100,
    bubbles = [],
    sourceMaxDistance = 50,
    minBubbleSize = 5,
    maxBubbleSize = 30,
    minBubbleSpeed = 2,
    maxBubbleSpeed = 10,
    initIterator = 0,
    frameIterator = 0,
    mousePosition = {
        x: 0,
        y: 0
    };

function contentLoadedHandler() {
    let config = {},
        newElement = document.createElement('div'),
        body = document.querySelector('body');

    newElement.classList.add('bubble');
    
    for (let i = 0; i < bubblesDensity; i++) {
        var node = newElement.cloneNode(),
            distance = sourceMaxDistance * Math.sin(initIterator),
            speed = (maxBubbleSpeed - minBubbleSpeed) * Math.cos(initIterator),
            size = (maxBubbleSize - minBubbleSize) * Math.sin(initIterator);
        
        node.style.height = maxBubbleSize - Math.abs(size) + 'px';
        node.style.width = maxBubbleSize - Math.abs(size) + 'px';
        node.style.top = mousePosition.y + 'px';
        node.style.left = mousePosition.x + distance + 'px';

        bubbles.push({
            node: node,
            speed: maxBubbleSpeed - Math.abs(speed),
            sourceDistance: distance,
            size: size    
        });
        body.appendChild(node);

        initIterator += 0.05
    }

    window.requestAnimationFrame(executeFrame.bind(config));
};

function executeFrame() {
    for (let i = 0; i < bubbles.length; i++) {
        leftChange = 10 * Math.sin(frameIterator + i / 20);
        bubbles[i].node.style.left = mousePosition.x + bubbles[i].sourceDistance + leftChange + 'px';

        if (bubbles[i].node.offsetTop < 0) {
            bubbles[i].node.style.top = mousePosition.y + 'px';
        } else {
            bubbles[i].node.style.top = bubbles[i].node.offsetTop - bubbles[i].speed + 'px';
        }


    }

    frameIterator += 0.05
    window.requestAnimationFrame(executeFrame.bind(this));
}

function mouseMoveHandler(event) {
    mousePosition.x = event.x;
    mousePosition.y = event.y;
}

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
window.addEventListener("mousemove", mouseMoveHandler);
