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

  this.percentageSubmitRef = function percentageSubmitRef(event) {
    event.preventDefault();
    this.fire({
        type: 'percentageFormSubmit',
        newValue: Number(event.target[0].value)
    });
  }.bind(this);

  this.absoluteSubmitRef = function absoluteSubmitRef(event) {
    event.preventDefault();
    this.fire({
        type: 'absoluteFormSubmit',
        newValue: Number(event.target[0].value)
    });
  }.bind(this);

  this.configFormNode.addEventListener('submit', this.percentageSubmitRef);
  this.configFormAbsNode.addEventListener('submit', this.absoluteSubmitRef);
};

mixin(Displayer.prototype, CustomEventTarget.prototype);

Object.assign(Displayer.prototype, {
    updatePercentageForm: function updatePercentageForm(newVal) {
        this.configFormNode[0].value = newVal;
    },

    updateAbsoluteForm: function updateAbsoluteForm(newVal) {
        this.configFormAbsNode[0].value = newVal;
    }
});