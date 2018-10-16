function RadioGroup(groupConfig, buttonsConfig) {
  var group = new ButtonGroup(groupConfig, buttonsConfig);

  group.customButtonClickOveride = function(event) {
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].name === event.button.name) {
        this.buttonsInstancesMap[this.buttons[i].name].select();
      } else {
        this.buttonsInstancesMap[this.buttons[i].name].unselect();
      }
    };
  };

  return group;
}

