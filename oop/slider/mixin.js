// Mixin function
function mixin(receiver, supplier) {
  Object.keys(supplier).forEach(function(property) {
      var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
      Object.defineProperty(receiver, property, descriptor);
  });

  return receiver;
}