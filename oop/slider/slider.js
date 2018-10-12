
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

  this.knob.addListener('dragNDropMove', function knobPositionChangeHandler(event) {
      var percentage = this.getPercentageByPosition(event.x);

      this.knob.move(this.getDisplayPercentageByPosition(event.x));
      this.displayer.updatePercentageForm(percentage);
      this.displayer.updateAbsoluteForm(this.getAbsoluteByPercentage(percentage));
  }.bind(this));

  this.displayer.addListener('percentageFormSubmit', function displayerPositionChangeHandler(event) {
      this.setPercentage(event.newValue);
  }.bind(this));

  this.displayer.addListener('absoluteFormSubmit', function displayerPositionChangeHandler(event) {
      this.setAbsolute(event.newValue);
  }.bind(this));

  this.line.addListener('lineClick', function(event) {
      var percentage = this.getPercentageByPosition(event.x);

      this.knob.move(this.getDisplayPercentageByPosition(event.x));
      this.displayer.updatePercentageForm(percentage);
      this.displayer.updateAbsoluteForm(this.getAbsoluteByPercentage(percentage));
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

    this.knob.move(displayPercentage);
    this.displayer.updatePercentageForm(newPercentage);
    this.displayer.updateAbsoluteForm(maxValue);
};

Slider.prototype.setPercentage = function setPercentage(percentageValue) {
  let minValue = Math.max(percentageValue, 0),
      knobPercentage = this.knob.node.offsetWidth * 100 / this.line.node.offsetWidth,
      maxValue = Math.min(100, minValue),
      displayMaxPercentage = Math.min(100 - knobPercentage, minValue);

    this.knob.move(displayMaxPercentage);
    this.displayer.updatePercentageForm(maxValue);
    this.displayer.updateAbsoluteForm(maxValue);
};