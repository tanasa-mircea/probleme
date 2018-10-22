
function generateTree(config) {
  var tree = new Tree();

  for (let i = 0; i < config.length; i++) {
    tree.insert(config[i]);
  };

  return tree;
}
// Right left
var tree = generateTree([10,15,18,16]);

// Right Right
var tree2 = generateTree([10,15,20,25]);

// Left Right
var tree3 = generateTree([10,5,3,4]);

// Left Left
var tree4 = generateTree([10,5,3,2]);

var treeDelete = generateTree([10,15,5,3,8,18,13,2, 1]);
treeDelete.deleteByValue(8);
debugger;