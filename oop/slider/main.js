var configFormElement, configFormAbsElement;

// Mock elements
var lineElement = document.createElement('div');
lineElement.classList.add('slider-line');

var displayerElement = document.createElement('div');
displayerElement.classList.add('displayer');

var knobElement = document.createElement('div');
knobElement.classList.add('slider-knob');

var sliderElement = document.createElement('div');
sliderElement.classList.add('slider');

document.addEventListener("DOMContentLoaded", contentLoadedHandler);

// Initialize Sliders
function contentLoadedHandler() {
    wrapperElement = document.getElementById('wrapper');
    configFormElement = document.getElementsByClassName('config-form')[0];
    configFormAbsElement = document.getElementsByClassName('config-form-abs')[0];

    var sliderOne = new Slider(-400, 200);
    wrapperElement.appendChild(sliderOne.node);
    var sliderTwo = new Slider(0, 300);
    wrapperElement.appendChild(sliderTwo.node);
    var sliderThree = new Slider(200, 950);
    wrapperElement.appendChild(sliderThree.node);
}