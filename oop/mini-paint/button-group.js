var responseVector,
    group = document.createElement('div');

group.classList.add('group');

function ButtonGroup(groupConfig, buttonsConfig) {
  this.element = group.cloneNode();
  this.buttonsInstancesMap = {};
  this.buttons = buttonsConfig;

  if (groupConfig.style) {
    Object.assign(this.element.style, groupConfig.style);
  }

  for (let i = 0; i < buttonsConfig.length; i++) {
    newButton = new CustomButton(buttonsConfig[i]);

    this.buttonsInstancesMap[buttonsConfig[i].name] = newButton;
    this.element.appendChild(newButton.element);

    newButton.addListener('customButtonClick', this.customButtonClickHandler.bind(this));
  }
};

mixin(ButtonGroup.prototype, CustomEventTarget.prototype);
Object.assign(ButtonGroup.prototype, {
  customButtonClickHandler: function customButtonClickHandler(event) {
    this.customButtonClickOveride(event);

    this.fire({
      type: 'groupChange',
      action: event.button.name
    });
  },

  customButtonClickOveride: function customButtonClickOveride() {},

  getSelected: function getSelected() {
    responseVector = [];

    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].selected) {
        responseVector.push(this.buttons[i]);
      }

      return responseVector;
    }
  },

  getUnselected: function getUnselected() {
    responseVector = [];

    for (let i = 0; i < this.buttons.length; i++) {
      if (!this.buttons[i].selected) {
        responseVector.push(this.buttons[i]);
      }

      return responseVector;
    }
  },

  setSelected: function setSelected(buttons) {

  },

  setUnselected: function setSelected(buttons) {

  }
});
