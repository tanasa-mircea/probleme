function Tree() {
  this.root = null;
}

Tree.prototype.insert = function insert(node, levelRoot) {
  if (!this.root) {
    this.root = node;
    return;
  }

  if (!levelRoot) {
    levelRoot = this.root;
  }

  if (node.value <= levelRoot.value) {
    if (!levelRoot.left) {
      levelRoot.left = node;
      return;
    }
    return this.insert(node, levelRoot.left);
  } else {
    if (!levelRoot.right) {
      levelRoot.right = node;
      return;
    }

    return this.insert(node, levelRoot.right);
  }
};

Tree.prototype.find = function find(value, levelRoot, path) {
  if (!levelRoot) {
    levelRoot = this.root;
    path = 'Start on root -> ';
  }

  if (levelRoot.value === value) {
    levelRoot = this.root;
    path += 'Found it';
    console.log('Path ', path);
    return;
  }

  if (value < levelRoot.value) {
    if (!levelRoot.left) {
      path += 'Not Found it';
      console.log('Path ', path);
      return;
    }

    path += 'Go to the left -> ';
    return this.find(value, levelRoot.left, path);
  } else {
    if (!levelRoot.right) {
      path += 'Not Found it';
      console.log('Path ', path);
      return;
    }

    path += 'Go to the right -> ';
    return this.find(value, levelRoot.right, path);
  }

};

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
};

var tree = new Tree();
tree.insert(new Node(8));
tree.insert(new Node(6));
tree.insert(new Node(7));
tree.insert(new Node(10));
tree.insert(new Node(5));
tree.insert(new Node(4));
tree.insert(new Node(9));

console.log('tree ', tree);

tree.find(7);
tree.find(4);
tree.find(14);
tree.find(23);
tree.find(9);
