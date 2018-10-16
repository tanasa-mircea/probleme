var mainElement = document.createElement('div');

function UndoManager() {
  this.element = mainElement.cloneNode();
  this.undoStateManager = new Stiva(30);
  this.redoStateManager = new Stiva(30);

  this.undoButton = new Button({ name: 'undo', text: 'Undo', disabled: true });
  this.redoButton = new Button({ name: 'redo', text: 'Redo', disabled: true });

  this.element.appendChild(this.undoButton.element);
  this.element.appendChild(this.redoButton.element);

  this.undoButton.addListener('buttonClick', this.undoClickHandler.bind(this));
  this.redoButton.addListener('buttonClick', this.redoClickHandler.bind(this));
};

mixin(UndoManager.prototype, CustomEventTarget.prototype);
Object.assign(UndoManager.prototype, {
  addAction: function addAction(action) {
    this.undoStateManager.push(action);
    this.undoButton.enable();
  },

  undoClickHandler: function undoClickHandler() {
    if (this.undoStateManager.isEmpty()) {
      return;
    };

    var state = this.undoStateManager.pop();

    if (this.undoStateManager.isEmpty()) {
      this.undoButton.disable();
    }

    this.redoStateManager.push(state);
    this.redoButton.enable();
    this.fire({
      type: 'undo',
      state: state
    });

    return state;
  },

  redoClickHandler: function redoClickHandler() {
    if (this.redoStateManager.isEmpty()) {
      return;
    };

    var state = this.redoStateManager.pop();

    if (this.redoStateManager.isEmpty()) {
      this.redoButton.disable();
    }

    this.undoStateManager.push(state);
    this.undoButton.enable();
    this.fire({
      type: 'redo',
      state: state
    });

    return state;
  }
});
