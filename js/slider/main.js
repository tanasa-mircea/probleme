var min,
    max,
    currentValueInput, 
    percentage = 0,
    slider, sliderLine, sliderKnob,
    minValueInput, maxValueInput,
    mouseDown;

function contentLoadedHandler() {
    slider = document.querySelector('.slider');
    sliderLine = document.querySelector('.slider-line');
    sliderKnob = document.querySelector('.slider-knob');
    minValueInput = document.getElementById('min-slider-input');
    maxValueInput = document.getElementById('max-slider-input');
    mouseDown;
    
    currentValueInput = document.getElementById('current-value-input');
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

    let valueForm = document.getElementById('valueForm'),
    setterForm = document.getElementById('setterForm'),
    getterForm = document.getElementById('getterForm')

    valueForm.addEventListener("submit", submitForm);
    setterForm.addEventListener("submit", setterFormSubmitHandler);
    getterForm.addEventListener("submit", getterFormSubmitHandler);
}

function moveKnob(event, target) {
    let maxLeft = Math.min(event.x - slider.offsetLeft, sliderLine.offsetLeft + sliderLine.offsetWidth),
        minLeft = Math.max(maxLeft, 0);

    percentage = minLeft / sliderLine.offsetWidth * 100;
    target.style.left = `${ percentage }%`;
    currentValueInput.innerHTML = min + ((max - min) * percentage / 100);
}

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

function submitForm(ev) {
    ev.preventDefault();

    min = +document.getElementById('min-slider-input').value; 
    max = +document.getElementById('max-slider-input').value;
    currentValueInput.innerHTML = min + ((max - min) * percentage / 100);
}

function getAbsolute(newPercentage) {
    percentage = newPercentage;
    sliderKnob.style.left = `${ percentage }%`;
    currentValueInput.innerHTML = min + ((max - min) * percentage / 100);

    return min + ((max - min) * percentage / 100);
}

function getPercentage(absolute) {
    let newPercentage =  (absolute + Math.abs(min)) * 100 / (Math.abs(max) + Math.abs(min))
    percentage = newPercentage;
    sliderKnob.style.left = `${ percentage }%`;
    currentValueInput.innerHTML = absolute;

    return newPercentage;
}

function setterFormSubmitHandler(ev) {
    ev.preventDefault();

    let percentage = ev.target[0].value,
        absolute = ev.target[1].value,
        result;
    
    if (percentage) {
        result = getAbsolute(+percentage);
        console.log('result getAbsolute', percentage, result)
    }

    if (absolute) {
        result = getPercentage(+absolute);
        console.log('result getPercentage ', absolute, result)
    }
}

function getterFormSubmitHandler(ev) {
    ev.preventDefault();

}

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
