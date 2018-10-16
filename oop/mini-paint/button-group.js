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
    newButton = new Button(buttonsConfig[i]);

    this.buttonsInstancesMap[buttonsConfig[i].name] = newButton;
    this.element.appendChild(newButton.element);

    newButton.addListener('buttonClick', this.buttonClickHandler.bind(this));
  }
};

mixin(ButtonGroup.prototype, CustomEventTarget.prototype);
Object.assign(ButtonGroup.prototype, {
  buttonClickHandler: function buttonClickHandler(event) {
    this.buttonClickOveride(event);

    this.fire({
      type: 'groupChange',
      action: event.button.name,
      button: event.button
    });
  },

  buttonClickOveride: function buttonClickOveride() {},

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

  },

  disable: function disable(buttons) {
    if (!buttons) {
      for (let i = 0; i < this.buttons.length; i++) {
        this.buttonsInstancesMap[this.buttons[i].name].disable();
      }
    }
  },

  enable: function enable(buttons) {
    if (!buttons) {
      for (let i = 0; i < this.buttons.length; i++) {
        this.buttonsInstancesMap[this.buttons[i].name].disable();
      }
    }
  }
});
