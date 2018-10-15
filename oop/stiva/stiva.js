function Stiva(maxLength) {
  this.elements = [];
  this.length = 0;

  if (maxLength && !isNaN(maxLength)) {
    this.maxLength = maxLength;
  } else {
    this.maxLength = 0;
  }
};

Stiva.prototype.push = function push(newElement) {
  if (!this.elements) {
    this.elements = [];
  };

  if (!this.length) {
    this.length = 0;
  };

  this.elements[this.length] = newElement;
  this.length++;
};

Stiva.prototype.top = function top() {
  return this.elements[this.length - 1];
};

Stiva.prototype.pop = function pop() {
  var popedElement = this.elements[this.length - 1];
  this.length--;
  this.elements.length = this.length;

  return popedElement;
};

Stiva.prototype.isEmpty = function isEmpty() {
  return this.length === 0;
};

Stiva.prototype.isFull = function isFull() {
  return this.maxLength && this.length >= this.maxLength;
};

Stiva.prototype.getSize = function getSize() {
  return this.length;
};

Stiva.prototype.clear = function clear() {
  this.elements.length = 0;
  this.length = 0;
};