var lineElement = document.createElement('div');
lineElement.classList.add('slider-line');

var displayerElement = document.createElement('div');
displayerElement.classList.add('displayer');

var knobElement = document.createElement('div');
knobElement.classList.add('slider-knob');

var sliderElement = document.createElement('div');
sliderElement.classList.add('slider');

// Event Manager
function EventTarget() {}
EventTarget.prototype = {

    constructor: EventTarget,

    addListener: function(type, listener) {
        // create an array if it doesn't exist
        if (!this.hasOwnProperty("_listeners")) {
            this._listeners = [];
        }

        if (typeof this._listeners[type] == "undefined") {
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    },

    fire: function(event) {
        if (!event.target) {
            event.target = this;
        }

        if (!event.type) {
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners && this._listeners[event.type] instanceof Array) {
            var listeners = this._listeners[event.type];
            for (var i=0, len=listeners.length; i < len; i++) {
                listeners[i].call(this, event);
            }
        }
    },
    removeListener: function(type, listener){
        if (this._listeners && this._listeners[type] instanceof Array) {
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
};

// Displayer used to display and update currentValue
function Displayer(initialValue, parent) {
    this.node = displayerElement.cloneNode();
    this.node.innerHTML = 'Value: ' + initialValue;
    this.parent = parent;

    this.parent.addListener('positionChange', function displayerPositionChangeHandler(event) {
        this.updateValue(event.newValue);
    }.bind(this));
};

Displayer.prototype.updateValue = function updateValue(newVal) {
    this.node.innerHTML = 'Value: ' + newVal;
};


// Line used as layout reference for knob and click handler
function Line(parent) {
    this.node = lineElement.cloneNode();
    this.parent = parent;

    this.node.addEventListener('click', function(event) {
        var percentage = this.parent.getPercentageByPosition(event.x);

        this.parent.fire({
            type: 'positionChange',
            newPercentage: this.parent.getDisplayPercentageByPosition(event.x),
            newValue: this.parent.getAbsoluteByPercentage(percentage)
        });
    }.bind(this));
};

// Knob used to show the percentage and handle dragging
function Knob(parent) {
    this.node = knobElement.cloneNode();
    this.parent = parent;
    this.isMouseDown = false;

    this.parent.addListener('positionChange', function knobPositionChangeHandler(event) {
        this.move(event.newPercentage);
    }.bind(this));

    this.node.addEventListener('mousedown', function(event) {
        this.isMouseDown = true;

        window.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
        window.addEventListener('mouseup', this.mouseUpHandler.bind(this));
    }.bind(this));
};

Knob.prototype.mouseMoveHandler = function mouseMoveHandler(event) {
    if (this.isMouseDown) {
        var percentage = this.parent.getPercentageByPosition(event.x);

        this.parent.fire({
            type: 'positionChange',
            newPercentage: this.parent.getDisplayPercentageByPosition(event.x),
            newValue: this.parent.getAbsoluteByPercentage(percentage)
        });
    }
};

Knob.prototype.mouseUpHandler = function mouseUpHandler() {
    if (this.isMouseDown) {
        this.isMouseDown = false;

        window.removeEventListener('mousemove', this.mouseMoveHandler.bind(this));
        window.removeEventListener('mouseup', this.mouseUpHandler.bind(this));
    }
};

Knob.prototype.move = function(percentage) {
    this.node.style.left = percentage + '%';
};

// Slider - The main component
function Slider(min, max) {
    this.node = sliderElement.cloneNode();
    this.min = min;
    this.max = max;

    this.line = new Line(this);
    this.knob = new Knob(this);
    this.displayer = new Displayer(this.min, this);

    this.node.appendChild(this.line.node);
    this.node.appendChild(this.knob.node);
    this.node.appendChild(this.displayer.node);
};

mixin(Slider.prototype, EventTarget.prototype);

Slider.prototype.constructor = Slider;

Slider.prototype.getPercentageByPosition = function getPercentageByPosition(eventX) {
    var maxLeft = Math.min(eventX - this.node.offsetLeft, this.line.node.offsetLeft + this.line.node.offsetWidth);
    var minLeft = Math.max(maxLeft, 0);

    return minLeft / this.line.node.offsetWidth * 100;
};

Slider.prototype.getDisplayPercentageByPosition = function getDisplayPercentageByPosition(eventX) {
    var maxLeft = Math.min(eventX - this.node.offsetLeft, this.line.node.offsetLeft + this.line.node.offsetWidth - this.knob.node.offsetWidth),
        minLeft = Math.max(maxLeft, 0);

    return minLeft / this.line.node.offsetWidth * 100;
};

Slider.prototype.getAbsoluteByPercentage = function getAbsoluteByPercentage(percentage) {
    return this.min + ((this.max - this.min) * percentage / 100);
};

Slider.prototype.setAbsolute = function setAbsolute(absoluteValue) {
    let minValue = Math.max(absoluteValue, this.min),
        knobPercentage = sliderKnob.offsetWidth * 100 / sliderLine.offsetWidth,
        maxValue = Math.min(minValue, this.max),
        newPercentage = (maxValue + Math.abs(this.min)) * 100 / (Math.abs(this.max) + Math.abs(this.min)),
        displayMaxValue = Math.min(minValue, this.max - (knobPercentage * (this.max - this.min) / 100)),
        displayPercentage = (displayMaxValue + Math.abs(this.min)) * 100 / (Math.abs(max) + Math.abs(this.min));

    this.fire({
        type: 'positionChange',
        newPercentage: displayPercentage,
        newValue: displayMaxValue
    });
};

Slider.prototype.setPercentage = function setPercentage(percentageValue) {
    let minValue = Math.max(percentageValue, 0),
        knobPercentage = sliderKnob.offsetWidth * 100 / sliderLine.offsetWidth,
        maxValue = Math.min(100, minValue),
        displayMaxPercentage = Math.min(100 - knobPercentage, minValue);

    this.fire({
        type: 'positionChange',
        newPercentage: displayMaxPercentage,
        newValue: maxValue
    });
};

// Initialize Sliders
function contentLoadedHandler() {
    wrapperElement = document.getElementById('wrapper');

    var sliderOne = new Slider(-400, 200);
    wrapperElement.appendChild(sliderOne.node);
    var sliderTwo = new Slider(0, 300);
    wrapperElement.appendChild(sliderTwo.node);
    var sliderThree = new Slider(200, 950);
    wrapperElement.appendChild(sliderThree.node);
}

// Mixin function
function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function(property) {
        var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
        Object.defineProperty(receiver, property, descriptor);
    });

    return receiver;
}

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
