var min,
    max,
    currentValueInput,
    percentage = 0,
    slider, sliderLine, sliderKnob,
    minValueInput, maxValueInput,
    mouseDown,
    valueForm, setterForm, getterForm;

// Event Manager
function EventTarget() {}
EventTarget.prototype = {

    constructor: EventTarget,

    addListener: function(type, listener) {

        // create an array if it doesn't exist
        if (!this.hasOwnProperty("_listeners")) {
            this._listeners = [];
        }

        if (typeof this._listeners[type] == "undefined"){
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    },

    fire: function(event) {
        if (!event.target){
            event.target = this;
        }

        if (!event.type){ // falsy
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners && this._listeners[event.type] instanceof Array){
            var listeners = this._listeners[event.type];
            for (var i=0, len=listeners.length; i < len; i++){
                listeners[i].call(this, event);
            }
        }
    },
    removeListener: function(type, listener){
        if (this._listeners && this._listeners[type] instanceof Array){
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
};

// Displayer used to display and update currentValue
var displayerElement = document.createElement('div');
displayerElement.classList.add('displayer');

function Displayer(initialValue) {
    this.node = displayerElement.cloneNode();
    this.node.innerHTML = 'Value: ' + initialValue;

    this.addListener('positionChange', function displayerPositionChangeHandler(event) {
        this.updateValue(event.newPercentage);
    }.bind(this));
};
Displayer.prototype.updateValue = function updateValue(newVal) {
    this.node.innerHTML = 'Value: ' + newVal;
};

// Line used as layout reference for knob and click handler
var lineElement = document.createElement('div');
lineElement.classList.add('slider-line');

function Line() {
    this.node = lineElement.cloneNode();
};

// Knob used to show the percentage
var knobElement = document.createElement('div');
knobElement.classList.add('slider-knob');

function Knob() {
    this.node = knobElement.cloneNode();

    this.addListener('positionChange', function knobPositionChangeHandler(event) {
        this.move(event.newPercentage);
    }.bind(this));
};
Knob.prototype.move = function(percentage) {
    this.node.style.left = percentage + '%';
};

// Slider
var sliderElement = document.createElement('div');
sliderElement.classList.add('slider');

function Slider(min, max) {
    this.node = sliderElement.cloneNode();
    this.min = min;
    this.max = max;

    this.line = new Line();
    this.knob = new Knob();
    this.displayer = new Displayer(this.min);

    this.percentage = 0;
    this.isMouseDown = false;

    this.node.appendChild(this.line.node);
    this.node.appendChild(this.knob.node);
    this.node.appendChild(this.displayer.node);

    this.node.addEventListener('click', function(event) {
        let maxLeft = Math.min(event.x - this.node.offsetLeft, this.line.node.offsetLeft + this.line.node.offsetWidth),
            minLeft = Math.max(maxLeft, 0),
            displayPercentage = Math.max(Math.min(event.x - this.node.offsetLeft, this.line.node.offsetLeft + this.line.node.offsetWidth - this.knob.node.offsetWidth), 0) / this.line.node.offsetWidth * 100;

        percentage = minLeft / this.line.node.offsetWidth * 100;
        var newVal = this.min + ((this.max - this.min) * this.percentage / 100);

        this.fire({
            type: 'positionChange',
            newPercentage: percentage,
            newVal: newVal
        });
    }.bind(this));

    this.node.addEventListener('mousedown', function(event) {
        this.isMouseDown = true;

        window.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
        window.addEventListener('mouseup', this.mouseUpHandler.bind(this));
    }.bind(this));
};


Slider.prototype = Object.create(EventTarget.prototype);
Slider.prototype.constructor = Slider;

Slider.prototype.mouseMoveHandler = function mouseMoveHandler() {
    if (this.isMouseDown) {
        let maxLeft = Math.min(event.x - this.node.offsetLeft, this.line.node.offsetLeft + this.line.node.offsetWidth),
        minLeft = Math.max(maxLeft, 0),
        displayPercentage = Math.max(Math.min(event.x - this.node.offsetLeft, this.line.node.offsetLeft + this.line.node.offsetWidth - this.knob.node.offsetWidth), 0) / this.line.node.offsetWidth * 100;

        percentage = minLeft / this.line.node.offsetWidth * 100;
        var newVal = this.min + ((this.max - this.min) * percentage / 100);

        this.displayer.updateValue(newVal);
        this.knob.move(displayPercentage);
    }
};

Slider.prototype.mouseUpHandler = function mouseUpHandler() {
    if (this.isMouseDown) {
        this.isMouseDown = false;

        // TODO: fix this
        window.removeEventListener('mousemove', this.mouseMoveHandler.bind(this));
        window.removeEventListener('mouseup', this.mouseUpHandler.bind(this));
    }
};

Slider.prototype.getAbsolute = function getAbsolute(newPercentage) {
    return min + ((max - min) * newPercentage / 100);
};

Slider.prototype.getPercentage = function getPercentage(absolute) {
    let newPercentage =  (absolute + Math.abs(min)) * 100 / (Math.abs(max) + Math.abs(min));

    return newPercentage;
};

Slider.prototype.setAbsolute = function setAbsolute(absoluteValue) {
    let minValue = Math.max(absoluteValue, min),
        knobPercentage = sliderKnob.offsetWidth * 100 / sliderLine.offsetWidth,
        maxValue = Math.min(minValue, max),
        newPercentage = (maxValue + Math.abs(min)) * 100 / (Math.abs(max) + Math.abs(min)),
        displayMaxValue = Math.min(minValue, max - (knobPercentage * (max - min) / 100)),
        displayPercentage = (displayMaxValue + Math.abs(min)) * 100 / (Math.abs(max) + Math.abs(min));

    percentage = newPercentage;
    sliderKnob.style.left = `${ displayPercentage }%`;
    currentValueInput.innerHTML = min + ((max - min) * newPercentage / 100);
};

Slider.prototype.setPercentage = function setPercentage(percentageValue) {
    let minValue = Math.max(percentageValue, 0),
        knobPercentage = sliderKnob.offsetWidth * 100 / sliderLine.offsetWidth,
        maxValue = Math.min(100, minValue),
        displayMaxPercentage = Math.min(100 - knobPercentage, minValue);

    percentage = maxValue;
    sliderKnob.style.left = `${ displayMaxPercentage }%`;
    currentValueInput.innerHTML = min + ((max - min) * maxValue / 100);
};

// Get initial min/max values and initialize Sliders
function contentLoadedHandler() {
    wrapperElement = document.getElementById('wrapper');
    valueForm = document.getElementById('valueForm');

    min = Number(valueForm[0].value);
    max = Number(valueForm[1].value);

    var sliderOne = new Slider(min, max);
    wrapperElement.appendChild(sliderOne.node);
    var sliderTwo = new Slider(min, max);
    wrapperElement.appendChild(sliderTwo.node);
    var sliderThree = new Slider(min, max);
    wrapperElement.appendChild(sliderThree.node);

    valueForm.addEventListener("submit", submitForm);
}

// Min and max form submit
function submitForm(ev) {
    ev.preventDefault();

    min = Number(ev.target[0].value);
    max = Number(ev.target[1].value);
}

// Mixin function
function mixin(receiver, supplier) {
    if (Object.getOwnPropertyDescriptor) {
        Object.keys(supplier).forEach(function(property) {
            var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
            Object.defineProperty(receiver, property, descriptor);
        });

    } else {

        for (var property in supplier) {
            if (supplier.hasOwnProperty(property)) {
                receiver[property] = supplier[property];
            }
        }
    }

    return receiver;
}

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
