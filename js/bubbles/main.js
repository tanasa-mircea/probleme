var bubblesDensity = 200,
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
        let node = newElement.cloneNode(),
            distance = sourceMaxDistance * Math.sin(initIterator + (Math.random() * i % 4)),
            speed = (maxBubbleSpeed - minBubbleSpeed) * Math.cos(initIterator + (Math.random() * i % 4)),
            size = (maxBubbleSize - minBubbleSize) * Math.sin(initIterator + (Math.random() * i % 4));
        
        node.style.height = maxBubbleSize - Math.abs(size) + 'px';
        node.style.width = maxBubbleSize - Math.abs(size) + 'px';
        node.style.transform = `translate(${ mousePosition.x + distance }px, ${ mousePosition.y }px)`;

        bubbles.push({
            node: node,
            speed: maxBubbleSpeed - Math.abs(speed),
            sourceDistance: distance,
            size: size,
            top: mousePosition.x + distance
        });
        body.appendChild(node);

        initIterator += 0.05 + (Math.random() * 0.05)
    }

    window.requestAnimationFrame(executeFrame.bind(config));
};

function executeFrame() {
    for (let i = 0; i < bubbles.length; i++) {
        let leftChange = 2 * Math.sin(frameIterator + i/4),
            translateX, translateY;
        
        // The bubble it's outside the screen
        if (bubbles[i].top < 0) {
            translateX = mousePosition.x + bubbles[i].sourceDistance;
            translateY = mousePosition.y;
        } else {
            translateX = bubbles[i].left + leftChange;
            translateY = bubbles[i].top - bubbles[i].speed;
        }
        
        // Keep data in order to avoid reading from node
        bubbles[i].left = translateX;
        bubbles[i].top = translateY;
        bubbles[i].node.style.transform = `translate(${ translateX }px, ${ translateY }px)`;
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
