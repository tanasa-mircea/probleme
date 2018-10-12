function DragNDrop() {}

DragNDrop.prototype.initDragNDrop = function initDragNDrop(element) {
    element.addEventListener('mousedown', this.mouseDownHandler.bind(this));
};

DragNDrop.prototype.mouseDownHandler = function mouseDownHandler(event) {
    this.isMouseDown = true;
    this.mouseMoveRef = this.mouseMoveHandler.bind(this);
    this.mouseUpRef = this.mouseUpHandler.bind(this);

    this.fire({
        type: 'dragNDropStart',
        x: event.x
    });

    window.addEventListener('mousemove', this.mouseMoveRef);
    window.addEventListener('mouseup', this.mouseUpRef);
};

DragNDrop.prototype.mouseMoveHandler = function mouseMoveHandler(event) {
    if (this.isMouseDown) {
        this.fire({
            type: 'dragNDropMove',
            x: event.x
        });
    }
};

DragNDrop.prototype.mouseUpHandler = function mouseUpHandler(event) {
    if (this.isMouseDown) {
        this.isMouseDown = false;

        this.fire({
            type: 'dragNDropEnd',
            x: event.x
        });

        window.removeEventListener('mousemove', this.mouseMoveRef);
        window.removeEventListener('mouseup', this.mouseUpRef);
    }
};
mixin(DragNDrop.prototype, CustomEventTarget.prototype);
