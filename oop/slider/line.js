// Line used as layout reference for knob and click handler
function Line() {
  this.node = lineElement.cloneNode();
  this.clickHandlerRef = function(event) {
    this.fire({
        type: 'lineClick',
        x: event.x
    });
  }.bind(this);

  this.node.addEventListener('click', this.clickHandlerRef);
};

mixin(Line.prototype, CustomEventTarget.prototype);
