var button = document.createElement('div'),
    response;
button.classList.add('button');

function CustomButton(config) {
  this.element = button.cloneNode();
  this.element.innerHTML = config.text;
  this.name = config.name;

  if (config.selected) {
    this.selected = true;
    this.element.classList.add('button--active');
  } else {
    this.selected = false;
  }
  this.clickListenerRef = this.clickHandler.bind(this);

  Object.assign(this.element.style, config.customStyle);
  this.element.addEventListener('click', this.clickListenerRef);
}
mixin(CustomButton.prototype, CustomEventTarget.prototype);

Object.assign(CustomButton.prototype, {
  enable: function enable() {
    this.enabled = true;
    this.element.classList.remove('button--disabled');
  },

  disable: function disable() {
    this.disabled = false;
    this.element.classList.add('button--disabled');
  },

  select: function select() {
    this.selected = true;
    this.element.classList.add('button--active');
  },

  unselect: function unselect() {
    this.selected = false;
    this.element.classList.remove('button--active');
  },

  isDisabled: function isDisabled() {
    return this.disabled;
  },

  isSelected: function isSelected() {
    return this.selected;
  },

  clickHandler: function clickHandler(event) {
    if (this.disabled) {
      return;
    };

    this.fire({
      type: 'customButtonClick',
      button: this
    });
  }
});