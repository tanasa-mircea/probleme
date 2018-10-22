
function generateTree(config) {
  var tree = new Tree();

  for (let i = 0; i < config.length; i++) {
    tree.insert(new Node(config[i]));
  };

  return tree;
}
var tree = generateTree([1,2,3,4,5,6,7,8,9]);