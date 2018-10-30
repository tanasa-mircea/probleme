// Event Target
function CustomEventTarget() {}
CustomEventTarget.prototype = {
    constructor: CustomEventTarget,

    addListener: function(type, listener) {
        // create an array if it doesn't exist
        if (!this.hasOwnProperty("_listeners")) {
            this._listeners = [];
        }

        if (typeof this._listeners[type] == "undefined") {
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    },

    fire: function(event) {
        if (!event.target) {
            event.target = this;
        }

        if (!event.type) {
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners && this._listeners[event.type] instanceof Array) {
            var listeners = this._listeners[event.type];
            for (var i=0, len=listeners.length; i < len; i++) {
                listeners[i].call(this, event);
            }
        }
    },
    removeListener: function(type, listener){
        if (this._listeners && this._listeners[type] instanceof Array) {
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
};