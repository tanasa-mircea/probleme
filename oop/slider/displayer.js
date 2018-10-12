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