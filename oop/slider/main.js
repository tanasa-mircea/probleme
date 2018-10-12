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

// Mixin function
function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function(property) {
        var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
        Object.defineProperty(receiver, property, descriptor);
    });

    return receiver;
}

// Event Target
function CustomEventTarget() {}
CustomEventTarget.prototype = {
    constructor: CustomEventTarget,

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

function DragNDrop() {}

DragNDrop.prototype.initDragNDrop = function initDragNDrop(element) {
    element.addEventListener('mousedown', this.mouseDownHandler.bind(this));
};

DragNDrop.prototype.mouseDownHandler = function mouseDownHandler(event) {
    this.isMouseDown = true;
    this.mouseMoveRef = this.mouseMoveHandler.bind(this);
    this.mouseUpRef = this.mouseUpHandler.bind(this);

    this.fire({
        type: 'dragNDropStart',
        x: event.x
    });

    window.addEventListener('mousemove', this.mouseMoveRef);
    window.addEventListener('mouseup', this.mouseUpRef);
};

DragNDrop.prototype.mouseMoveHandler = function mouseMoveHandler(event) {
    if (this.isMouseDown) {
        this.fire({
            type: 'dragNDropMove',
            x: event.x
        });
    }
};

DragNDrop.prototype.mouseUpHandler = function mouseUpHandler(event) {
    if (this.isMouseDown) {
        this.isMouseDown = false;

        this.fire({
            type: 'dragNDropEnd',
            x: event.x
        });

        window.removeEventListener('mousemove', this.mouseMoveRef);
        window.removeEventListener('mouseup', this.mouseUpRef);
    }
};
mixin(DragNDrop.prototype, CustomEventTarget.prototype);

// Displayer used to display and update currentValue
function Displayer(initialValue) {
    this.node = displayerElement.cloneNode();
    this.configFormNode = configFormElement.cloneNode(true);
    this.configFormAbsNode = configFormAbsElement.cloneNode(true);

    // Only the original forms should be hidden
    this.configFormNode.classList.remove('hidden');
    this.configFormAbsNode.classList.remove('hidden');

    this.configFormAbsNode[0].value = initialValue;

    this.node.appendChild(this.configFormNode);
    this.node.appendChild(this.configFormAbsNode);

    this.configFormNode.addEventListener('submit', function(event) {
        event.preventDefault();
        this.fire({
            type: 'percentageFormSubmit',
            newValue: Number(event.target[0].value)
        });
    }.bind(this));

    this.configFormAbsNode.addEventListener('submit', function(event) {
        event.preventDefault();
        this.fire({
            type: 'absoluteFormSubmit',
            newValue: Number(event.target[0].value)
        });
    }.bind(this));
};

mixin(Displayer.prototype, CustomEventTarget.prototype);

Displayer.prototype.updatePercentageForm = function updateValue(newVal) {
    this.configFormNode[0].value = newVal;
};

Displayer.prototype.updateAbsoluteForm = function updateValue(newVal) {
    this.configFormAbsNode[0].value = newVal;
};

// Line used as layout reference for knob and click handler
function Line() {
    this.node = lineElement.cloneNode();

    this.node.addEventListener('click', function(event) {
        this.fire({
            type: 'lineClick',
            x: event.x
        });
    }.bind(this));
};
mixin(Line.prototype, CustomEventTarget.prototype);

// Knob used to show the percentage and handle dragging
function Knob() {
    this.node = knobElement.cloneNode();

    this.initDragNDrop(this.node);
};
mixin(Knob.prototype, CustomEventTarget.prototype);
mixin(Knob.prototype, DragNDrop.prototype);

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

    this.knob.addListener('positionChange', function knobPositionChangeHandler(event) {
        this.move(event.newDisplayPercentage);
    });

    this.knob.addListener('dragNDropMove', function knobPositionChangeHandler(event) {
        var percentage = this.getPercentageByPosition(event.x);

        this.knob.fire({
            type: 'positionChange',
            newDisplayPercentage: this.getDisplayPercentageByPosition(event.x),
            newPercentage: percentage,
            newValue: this.getAbsoluteByPercentage(percentage)
        });

        this.displayer.fire({
            type: 'positionChange',
            newDisplayPercentage: this.getDisplayPercentageByPosition(event.x),
            newPercentage: percentage,
            newValue: this.getAbsoluteByPercentage(percentage)
        });
    }.bind(this));

    this.displayer.addListener('positionChange', function displayerPositionChangeHandler(event) {
        this.updatePercentageForm(event.newPercentage);
        this.updateAbsoluteForm(event.newValue);
    });

    this.displayer.addListener('percentageFormSubmit', function displayerPositionChangeHandler(event) {
        this.setPercentage(event.newValue);
    }.bind(this));

    this.displayer.addListener('absoluteFormSubmit', function displayerPositionChangeHandler(event) {
        this.setAbsolute(event.newValue);
    }.bind(this));

    this.line.addListener('lineClick', function(event) {
        var percentage = this.getPercentageByPosition(event.x);

        this.knob.fire({
            type: 'positionChange',
            newDisplayPercentage: this.getDisplayPercentageByPosition(event.x),
            newPercentage: percentage,
            newValue: this.getAbsoluteByPercentage(percentage)
        });

        this.displayer.fire({
            type: 'positionChange',
            newDisplayPercentage: this.getDisplayPercentageByPosition(event.x),
            newPercentage: percentage,
            newValue: this.getAbsoluteByPercentage(percentage)
        });
    }.bind(this));
};

mixin(Slider.prototype, CustomEventTarget.prototype);

Slider.prototype.constructor = Slider;

Slider.prototype.getPercentageByPosition = function getPercentageByPosition(eventX) {
    var maxLeft = Math.min(eventX - this.node.offsetLeft, this.line.node.offsetLeft + this.line.node.offsetWidth);
    var minLeft = Math.max(maxLeft, 0);

    return minLeft / this.line.node.offsetWidth * 100;
};

Slider.prototype.getDisplayPercentageByPosition = function getDisplayPercentageByPosition(eventX) {
    var maxLeft = Math.min(eventX - this.node.offsetLeft - this.knob.node.offsetWidth / 2, this.line.node.offsetLeft + this.line.node.offsetWidth - this.knob.node.offsetWidth),
        minLeft = Math.max(maxLeft, 0);

    return minLeft / this.line.node.offsetWidth * 100;
};

Slider.prototype.getAbsoluteByPercentage = function getAbsoluteByPercentage(percentage) {
    return this.min + ((this.max - this.min) * percentage / 100);
};

Slider.prototype.setAbsolute = function setAbsolute(absoluteValue) {
    let minValue = Math.max(absoluteValue, this.min),
        knobPercentage = this.knob.node.offsetWidth * 100 / this.line.node.offsetWidth,
        maxValue = Math.min(minValue, this.max),
        newPercentage = (maxValue + Math.abs(this.min)) * 100 / (Math.abs(this.max) + Math.abs(this.min)),
        displayMaxValue = Math.min(minValue, this.max - (knobPercentage * (this.max - this.min) / 100)),
        displayPercentage = (displayMaxValue + Math.abs(this.min)) * 100 / (Math.abs(this.max) + Math.abs(this.min));

    this.knob.fire({
        type: 'positionChange',
        newDisplayPercentage: displayPercentage,
        newPercentage: newPercentage,
        newValue: maxValue
    });

    this.displayer.fire({
        type: 'positionChange',
        newDisplayPercentage: displayPercentage,
        newPercentage: newPercentage,
        newValue: maxValue
    });
};

Slider.prototype.setPercentage = function setPercentage(percentageValue) {
    let minValue = Math.max(percentageValue, 0),
        knobPercentage = this.knob.node.offsetWidth * 100 / this.line.node.offsetWidth,
        maxValue = Math.min(100, minValue),
        displayMaxPercentage = Math.min(100 - knobPercentage, minValue);

    this.knob.fire({
        type: 'positionChange',
        newDisplayPercentage: displayMaxPercentage,
        newPercentage: maxValue,
        newValue: this.getAbsoluteByPercentage(maxValue)
    });

    this.displayer.fire({
        type: 'positionChange',
        newDisplayPercentage: displayMaxPercentage,
        newPercentage: maxValue,
        newValue: this.getAbsoluteByPercentage(maxValue)
    });
};