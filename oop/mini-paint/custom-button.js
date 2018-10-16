var custombuttonElement = document.createElement('custombutton');

function CustomButton(text) {
  this.element = custombuttonElement.cloneNode();
  this.element.innerHTML = text;

  this.element.addEventListener('click', function() {
    this.fire({
      type: 'customButtonClick'
    });
  }.bind(this));
};

mixin(CustomButton.prototype, CustomEventTarget.prototype);

CustomButton.prototype.disable = function disable() {
  this.element.disabled = true;
};

CustomButton.prototype.enable = function enable() {
  this.element.disabled = false;
};

CustomButton.prototype.isDisabled = function isDisabled() {
  return this.element.disabled;
};
