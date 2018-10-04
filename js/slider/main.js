var min,
    max,
    currentValueInput, 
    percentage = 0,
    slider, sliderLine, sliderKnob,
    minValueInput, maxValueInput,
    mouseDown,
    valueForm, setterForm, getterForm;

function contentLoadedHandler() {
    slider = document.querySelector('.slider');
    sliderLine = document.querySelector('.slider-line');
    sliderKnob = document.querySelector('.slider-knob');
    minValueInput = document.getElementById('min-slider-input');
    maxValueInput = document.getElementById('max-slider-input');
    valueForm = document.getElementById('valueForm');
    setterForm = document.getElementById('setterForm');
    getterForm = document.getElementById('getterForm');
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

    valueForm.addEventListener("submit", submitForm);
    setterForm.addEventListener("submit", setterFormSubmitHandler);
    getterForm.addEventListener("submit", getterFormSubmitHandler);
}

function moveKnob(event, target) {
    let maxLeft = Math.min(event.x - slider.offsetLeft, sliderLine.offsetLeft + sliderLine.offsetWidth),
        minLeft = Math.max(maxLeft, 0),
        displayPercentage = Math.max(Math.min(event.x - slider.offsetLeft, sliderLine.offsetLeft + sliderLine.offsetWidth - sliderKnob.offsetWidth), 0) / sliderLine.offsetWidth * 100;

    percentage = minLeft / sliderLine.offsetWidth * 100;
    target.style.left = `${ displayPercentage }%`;
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
    return min + ((max - min) * newPercentage / 100);
}

function getPercentage(absolute) {
    let newPercentage =  (absolute + Math.abs(min)) * 100 / (Math.abs(max) + Math.abs(min))

    return newPercentage;
}

function setAbsolute(absoluteValue) {
    let minValue = Math.max(absoluteValue, min),
        knobPercentage = sliderKnob.offsetWidth * 100 / sliderLine.offsetWidth,
        maxValue = Math.min(minValue, max),
        newPercentage = (maxValue + Math.abs(min)) * 100 / (Math.abs(max) + Math.abs(min)),
        displayMaxValue = Math.min(minValue, max - (knobPercentage * (max - min) / 100)),
        displayPercentage = (displayMaxValue + Math.abs(min)) * 100 / (Math.abs(max) + Math.abs(min));

    percentage = newPercentage;
    sliderKnob.style.left = `${ displayPercentage }%`;
    currentValueInput.innerHTML = min + ((max - min) * newPercentage / 100);
}

function setPercentage(percentageValue) {
    let minValue = Math.max(percentageValue, 0),
        knobPercentage = sliderKnob.offsetWidth * 100 / sliderLine.offsetWidth,
        maxValue = Math.min(100, minValue),
        displayMaxPercentage = Math.min(100 - knobPercentage, minValue);

    percentage = maxValue;
    sliderKnob.style.left = `${ displayMaxPercentage }%`;
    currentValueInput.innerHTML = min + ((max - min) * maxValue / 100);
}

function setterFormSubmitHandler(ev) {
    ev.preventDefault();

    let percentageValue = ev.target[0].value,
        absoluteValue = ev.target[1].value;
    
    if (percentageValue) {
        setPercentage(+percentageValue);
    }

    if (absoluteValue) {
        setAbsolute(+absoluteValue)
    }
}

function getterFormSubmitHandler(ev) {
    ev.preventDefault();

    let percentageValue = ev.target[0].value,
        absoluteValue = ev.target[1].value;

    if (absoluteValue) {
        result = getPercentage(+absoluteValue) + '%';
    }

    if (percentageValue) {
        result = getAbsolute(+percentageValue)
    }

    console.log('result ', result)
}

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
