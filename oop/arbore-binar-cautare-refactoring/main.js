
function generateTree(config) {
  var tree = new Tree();

  for (let i = 0; i < config.length; i++) {
    tree.insert(new Node(config[i]));
  };

  return tree;
}

// QUnit.test('Tree Insert', function( assert ) {
//   var tree = generateTree([2,3,1]);
//   var testTree = new Tree();
//   testTree.root = new Node(2);
//   testTree.root.left = new Node(1);
//   testTree.root.left.parent = testTree.root;
//   testTree.root.right = new Node(3);
//   testTree.root.right.parent = testTree.root;

//   assert.deepEqual( tree, testTree, "Same tree" );
// });

// QUnit.test('Tree Insert Balancing Incresing', function( assert ) {
//   var tree = generateTree([1,2,3]);
//   var testTree = new Tree();
//   testTree.root = new Node(2);
//   testTree.root.left = new Node(1);
//   testTree.root.left.parent = testTree.root;
//   testTree.root.right = new Node(3);
//   testTree.root.right.parent = testTree.root;

//   assert.deepEqual( tree, testTree, "Same tree" );
// });

// QUnit.test('Tree Insert Balancing Decreasing', function( assert ) {
//   var tree = generateTree([3,2,1]);
//   var testTree = new Tree();
//   testTree.root = new Node(2);
//   testTree.root.left = new Node(1);
//   testTree.root.left.parent = testTree.root;
//   testTree.root.right = new Node(3);
//   testTree.root.right.parent = testTree.root;

//   assert.deepEqual( tree, testTree, "Same tree" );
// });

// QUnit.test('Tree Find', function( assert ) {
//   var tree = generateTree([10,5,15,7]);
//   var testNode = new Node(7);
//   testNode.parent = tree.root.left;

//   assert.deepEqual( tree.find(7), testNode, "Same node" );
// });

// QUnit.test('Tree Delete', function( assert ) {
//   var tree = generateTree([10,5,15,7]);
//   tree.deleteByValue(7);

//   let testTree = new Tree();
//   testTree.root = new Node(10);
//   testTree.root.left = new Node(5);
//   testTree.root.left.parent = testTree.root;
//   testTree.root.right = new Node(15);
//   testTree.root.right.parent = testTree.root;

//   assert.deepEqual( tree, testTree, "Same tree" );
// });

// QUnit.test('Tree Delete Balancing', function( assert ) {
//   var tree = generateTree([10,5,15,18]);
//   tree.deleteByValue(15);

//   let testTree = new Tree();
//   testTree.root = new Node(10);
//   testTree.root.left = new Node(5);
//   testTree.root.left.parent = testTree.root;
//   testTree.root.right = new Node(18);
//   testTree.root.right.parent = testTree.root;

//   assert.deepEqual( tree, testTree, "Same tree" );
// });

QUnit.test('Tree Delete Balancing Bug', function( assert ) {
  var tree = generateTree([10,5,15,7]);
  // tree.deleteByValue(15);
  debugger

  let testTree = new Tree();
  testTree.root = new Node(7);
  testTree.root.left = new Node(5);
  testTree.root.left.parent = testTree.root;
  testTree.root.right = new Node(10);
  testTree.root.right.parent = testTree.root;

  assert.deepEqual( tree, testTree, "Same tree" );
});

// QUnit.test('Tree BFS', function( assert ) {
//   var tree = generateTree([20,10,30,5,15,25,35]),
//       bfs = tree.bfs(),
//       expectedBfs = 'Start from root 20 -> 10 30  -> 5 15 25 35  -> Done';


//   assert.deepEqual( bfs, expectedBfs, "Same sequence" );
// });

// QUnit.test('Tree DFS', function( assert ) {
//   var tree = generateTree([20,10,30,5,15,25,35]),
//   dfs = tree.dfs(),
//   expectedDfs = 'Start from root 20 -> 10 -> 5 -> 15 -> 30 -> 25 -> 35 -> Done';


// assert.deepEqual( dfs, expectedDfs, "Same sequence" );
// });