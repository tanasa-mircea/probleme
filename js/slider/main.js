function contentLoadedHandler() {
    let slider = document.querySelector('.slider'),
        sliderLine = document.querySelector('.slider-line'),
        sliderKnob = document.querySelector('.slider-knob'),
        mouseDown,
        min = -400, max = 200;

    sliderKnob.addEventListener('mousedown', function mouseDownHandler() {
        mouseDown = this;
        
        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
    })

    sliderLine.addEventListener('click', function sliderLineClick(event) {
        moveKnob(event, sliderKnob);
    })

    function mouseMoveHandler(event) {
        if (mouseDown) {
            moveKnob(event, mouseDown);
        }
    }
    
    function mouseUpHandler(event) {
        if (mouseDown) {
            mouseDown = null;
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
        }
    }

    function moveKnob(event, target) {
        let maxLeft = Math.min(event.x - sliderKnob.offsetWidth / 2, sliderLine.offsetLeft + sliderLine.offsetWidth),
            minLeft = Math.max(maxLeft, 0),
            percentage = minLeft / sliderLine.offsetWidth  * 100;

            target.style.left = `${ percentage - (sliderKnob.offsetWidth / 2 * 100 / sliderLine.offsetWidth) }%`;

            console.log('Current Value ', min + ((max - min) * percentage / 100))
    }
}

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
