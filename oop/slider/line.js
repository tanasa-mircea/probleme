// Line used as layout reference for knob and click handler
function Line() {
  this.node = lineElement.cloneNode();

  this.node.addEventListener('click', function(event) {
      this.fire({
          type: 'lineClick',
          x: event.x
      });
  }.bind(this));
};
mixin(Line.prototype, CustomEventTarget.prototype);
