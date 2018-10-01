var min, max;

function contentLoadedHandler() {
    let sliderLine = document.querySelector('.slider-line'),
        sliderKnob = document.querySelector('.slider-knob'),
        minValueInput = document.getElementById('min-slider-input'),
        maxValueInput = document.getElementById('max-slider-input'),
        currentValueInput = document.getElementById('current-value-input'),
        mouseDown;
        
    min = +minValueInput.value;
    max = +maxValueInput.value;

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
    
    function mouseUpHandler() {
        if (mouseDown) {
            mouseDown = null;
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
        }
    }

    function moveKnob(event, target) {
        let maxLeft = Math.min(event.x - sliderKnob.offsetWidth / 2, sliderLine.offsetLeft + sliderLine.offsetWidth),
            minLeft = Math.max(maxLeft, 0),
            percentage = minLeft / sliderLine.offsetWidth * 100;

            target.style.left = `${ percentage }%`;

            currentValueInput.innerHTML = min + ((max - min) * percentage / 100);
    }
}

function submitForm(ev) {
    ev.preventDefault();

    min = +document.getElementById('min-slider-input').value; 
    max = +document.getElementById('max-slider-input').value;
}

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
document.addEventListener("submit", submitForm);
