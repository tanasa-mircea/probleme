function CheckboxGroup(groupConfig, buttonsConfig) {
  var group = new ButtonGroup(groupConfig, buttonsConfig);

  group.buttonClickOveride = function(event) {
    if (event.button.isSelected()) {
      event.button.unselect();
    } else {
      event.button.select();
    }
  };

  return group;
}

