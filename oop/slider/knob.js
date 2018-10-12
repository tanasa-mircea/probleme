// Knob used to show the percentage and handle dragging
function Knob() {
    this.node = knobElement.cloneNode();

    this.initDragNDrop(this.node);
};
mixin(Knob.prototype, CustomEventTarget.prototype);
mixin(Knob.prototype, DragNDrop.prototype);

Knob.prototype.move = function(percentage) {
    this.node.style.left = percentage + '%';
};