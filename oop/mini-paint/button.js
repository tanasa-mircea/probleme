var button = document.createElement('div'),
    response;
button.classList.add('button');

function Button(config) {
  this.config = config;
  this.element = button.cloneNode();
  this.element.innerHTML = config.text;
  this.name = this.config.name;

  if (this.config.selected) {
    this.selected = true;
    this.element.classList.add('button--active');
  } else {
    this.selected = false;
  }

  if (this.config.disabled) {
    this.disabled = true;
    this.element.classList.add('button--disabled');
  } else {
    this.disabled = false;
  }

  this.clickListenerRef = this.clickHandler.bind(this);

  Object.assign(this.element.style, this.config.customStyle);
  this.element.addEventListener('click', this.clickListenerRef);
}
mixin(Button.prototype, CustomEventTarget.prototype);

Object.assign(Button.prototype, {
  enable: function enable() {
    this.disabled = false;
    this.element.classList.remove('button--disabled');
  },

  disable: function disable() {
    this.disabled = true;
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
      type: 'buttonClick',
      button: this
    });
  }
});