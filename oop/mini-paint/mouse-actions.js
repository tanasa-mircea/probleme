function MouseActions() {}

MouseActions.prototype = {
    initMouseActions: function initMouseActions(element) {
        element.addEventListener('mousedown', this.mouseDownHandler.bind(this));
    },

    mouseDownOverride: function() {
        throw new Error("this must be overriden in the child Object [mouseDownOverride]");
    },

    mouseMoveOverride: function() {
        throw new Error("this must be overriden in the child Object [mouseMoveOverride]");
    },

    mouseUpOverride: function() {
        throw new Error("this must be overriden in the child Object [mouseUpOverride]");
    },

    mouseDownHandler: function mouseDownHandler(event) {
        this.isMouseDown = true;
        this.mouseMoveRef = this.mouseMoveHandler.bind(this);
        this.mouseUpRef = this.mouseUpHandler.bind(this);

        this.mouseDownOverride(event);

        window.addEventListener('mousemove', this.mouseMoveRef);
        window.addEventListener('mouseup', this.mouseUpRef);
    },

    mouseMoveHandler: function mouseMoveHandler(event) {
        if (this.isMouseDown) {
            this.mouseMoveOverride(event);
        }
    },

    mouseUpHandler: function mouseUpHandler(event) {
        if (this.isMouseDown) {
            this.isMouseDown = false;

            this.mouseUpOverride(event);

            window.removeEventListener('mousemove', this.mouseMoveRef);
            window.removeEventListener('mouseup', this.mouseUpRef);
        }
    }
};
