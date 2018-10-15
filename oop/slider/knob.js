// Knob used to show the percentage and handle dragging
function Knob() {
    this.node = knobElement.cloneNode();

    this.initDragNDrop(this.node);
};
mixin(Knob.prototype, CustomEventTarget.prototype);
mixin(Knob.prototype, DragNDrop.prototype);

Object.assign(Knob.prototype, {
    move: function(percentage) {
        this.node.style.left = percentage + '%';
    },

    mouseDownOverride: function(event) {
        this.fire({
            type: 'dragNDropStart',
            x: event.x,
            y: event.y
        });
    },

    mouseMoveOverride: function(event) {
        this.fire({
            type: 'dragNDropMove',
            x: event.x,
            y: event.y
        });
    },

    mouseUpOverride: function(event) {
        this.fire({
            type: 'dragNDropEnd',
            x: event.x,
            y: event.y
        });
    }
});

