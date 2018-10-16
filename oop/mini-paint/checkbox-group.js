function CheckboxGroup(groupConfig, buttonsConfig) {
  var group = new ButtonGroup(groupConfig, buttonsConfig);

  group.customButtonClickOveride = function(event) {
    if (event.button.isSelected()) {
      event.button.unselect();
    } else {
      event.button.select();
    }
  };

  return group;
}

