var toolElement = document.createElement('input'),
    toolElementLabel = document.createElement('label');

toolElement.type = 'radio';
toolElement.name = 'matrixTool';

function Tool(text, checked) {
  this.element = toolElementLabel.cloneNode();
  this.element.innerHTML = text;
  this.inputElement = toolElement.cloneNode();

  if (checked) {
    this.inputElement.checked = true;
  }

  this.element.appendChild(this.inputElement);

  this.inputElement.addEventListener('change', function(event) {
    this.fire({
      type: 'toolChange'

    });
  }.bind(this));
};

mixin(Tool.prototype, CustomEventTarget.prototype);
