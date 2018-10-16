var responseVector,
    group = document.createElement('div');

group.classList.add('group');

function ButtonGroup(groupConfig, buttonsConfig) {
  this.element = group.cloneNode();
  this.buttons = buttonsConfig;

  if (groupConfig.style) {
    Object.assign(this.element.style, groupConfig.style);
  }

  for (let i = 0; i < this.buttons.length; i++) {
    newButton = new Button(this.buttons[i]);

    this.buttons[i].instance = newButton;
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
      if (this.buttons[i].instance.isSelected()) {
        responseVector.push(this.buttons[i]);
      }
    }

    return responseVector;
  },

  getUnselected: function getUnselected() {
    responseVector = [];

    for (let i = 0; i < this.buttons.length; i++) {
      if (!this.buttons[i].instance.isSelected()) {
        responseVector.push(this.buttons[i]);
      }
    }

    return responseVector;
  },

  setSelected: function setSelected(buttons) {
    for (let i = 0; i < this.buttons.length; i++) {
      if (!buttons || buttons.indexOf(this.buttons[i].name) >= 0) {
        this.buttons[i].instance.select();
      }
    }
  },

  setUnselected: function setSelected(buttons) {
    for (let i = 0; i < this.buttons.length; i++) {
      if (!buttons || buttons.indexOf(this.buttons[i].name) >= 0) {
        this.buttons[i].instance.unselect();
      }
    }
  },

  disable: function disable(buttons) {
    for (let i = 0; i < this.buttons.length; i++) {
      if (!buttons || buttons.indexOf(this.buttons[i].name) >= 0) {
        this.buttons[i].instance.disable();
      }
    }
  },

  enable: function enable(buttons) {
    for (let i = 0; i < this.buttons.length; i++) {
      if (!buttons || buttons.indexOf(this.buttons[i].name) >= 0) {
        this.buttons[i].instance.enable();
      }
    }
  }
});
