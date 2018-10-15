var buttonElement = document.createElement('button');

function Button(text) {
  this.element = buttonElement.cloneNode();
  this.element.innerHTML = text;

  this.element.addEventListener('click', function() {
    this.fire({
      type: 'customButtonClick'
    });
  }.bind(this));
};

mixin(Button.prototype, CustomEventTarget.prototype);
