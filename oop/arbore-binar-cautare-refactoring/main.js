function Tree() {
  this.root = null;
}

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
};

Tree.prototype = {
  insert: function insert(node, levelRoot) {
    // If the root was not set then the node is the root
    if (!this.root) {
      this.root = node;
      return;
    }

    // At init the level root is undefined
    if (!levelRoot) {
      levelRoot = this.root;
    }

    // Left case
    // If the spot is free then set the node there, else go to the next level
    if (node.value <= levelRoot.value) {
      if (!levelRoot.left) {
        node.parent = levelRoot;
        levelRoot.left = node;
        this.balance(node);
        return;
      }
      return this.insert(node, levelRoot.left);
    }

    // Right case
    // If the spot is free then set the node there, else go to the next level
    if (!levelRoot.right) {
      node.parent = levelRoot;
      levelRoot.right = node;
      this.balance(node);
      return;
    }

    return this.insert(node, levelRoot.right);

  },

  balance: function balance(node) {
    if (!node.parent || !node.parent.parent) {
      return;
    };

    let parent = node.parent.parent,
        grandParent = parent.parent;

    if (!grandParent) {
      // Here parent is root
      if (!parent.left) {
        this.rotate('left');
        return;
      }

      if (!parent.right) {
        this.rotate('right');
        return;
      }

      return;
    }

    if (parent.left && parent.right) {
      return;
    }

    this.rotateNew('right', parent, grandParent);
  },

  find: function find(value, levelRoot, path) {
    // At init level root is undefined
    if (!levelRoot) {
      levelRoot = this.root;
      path = 'Find ' + value + '. Start on root -> ';
    }

    // If the value of current node is the same with the searched one then we found it
    if (levelRoot.value === value) {
      path += 'Found it';
      console.log('Path ', path);
      return levelRoot;
    }

    // If the value of current node lower than the searched one then we go to the left
    if (value < levelRoot.value) {
      if (!levelRoot.left) {
        // If there is no left to go to then there is no node with that value
        path += 'Not Found it';
        console.log('Path ', path);
        return;
      }

      path += 'Go to the left -> ';
      return this.find(value, levelRoot.left, path);
    }

    // If there is no right to go to then there is no node with that value
    if (!levelRoot.right) {
      path += 'Not Found it';
      console.log('Path ', path);
      return;
    }

    path += 'Go to the right -> ';
    return this.find(value, levelRoot.right, path);
  },

  rotate: function(direction) {
    let newRootBranch,
        auxBranch;

    if (direction === 'left' && this.root.right) {
      newRootBranch = Object.assign({}, this.root.right);
      newRootBranch.parent = null;

      auxBranch = Object.assign({}, newRootBranch.left);
      auxBranch.parent = this.root;
      this.root.right = auxBranch;

      this.root.parent = newRootBranch;
      newRootBranch.left = Object.assign({}, this.root);

      this.root = newRootBranch;
    }

    if (direction === 'right' && this.root.left) {
      newRootBranch = Object.assign({}, this.root.left);
      newRootBranch.parent = null;

      auxBranch = Object.assign({}, newRootBranch.right);
      auxBranch.parent = this.root;
      this.root.left = auxBranch;

      this.root.parent = newRootBranch;
      newRootBranch.right = Object.assign({}, this.root);

      this.root = newRootBranch;
    }
  },

  rotateNew: function(direction, pivotNode, pivotNodeParent) {
    let newRootBranch,
        auxBranch;

    if (direction === 'left' && pivotNode.right) {
      newRootBranch = Object.assign({}, pivotNode.right);
      newRootBranch.parent = null;

      auxBranch = Object.assign({}, newRootBranch.left);
      auxBranch.parent = pivotNode;
      pivotNode.right = auxBranch;

      pivotNode.parent = newRootBranch;
      newRootBranch.left = Object.assign({}, pivotNode);

      if (pivotNode.value > pivotNodeParent.value) {
        pivotNodeParent.right = newRootBranch;
      } else {
        pivotNodeParent.left = newRootBranch;
      }
    }

    if (direction === 'right' && pivotNode.left) {
      newRootBranch = Object.assign({}, pivotNode.left);
      newRootBranch.parent = null;

      auxBranch = Object.assign({}, newRootBranch.right);
      auxBranch.parent = pivotNode;
      pivotNode.left = auxBranch;

      pivotNode.parent = newRootBranch;
      newRootBranch.right = Object.assign({}, pivotNode);

      if (pivotNode.value > pivotNodeParent.value) {
        pivotNodeParent.right = newRootBranch;
      } else {
        pivotNodeParent.left = newRootBranch;
      }
    }
  },

  findMinNode: function findMinNode(minNode) {
    let newMinNode;

    if (!minNode.left) {
      return minNode;
    }

    if (minNode.left.value < minNode.value) {
      newMinNode = minNode.left;
    } else {
      newMinNode = minNode;
    }

    return findMinNode(newMinNode);
  },

  deleteByValue: function deleteByValue(value) {
    // First get the node with the searched value
    // If there is one, call the deleteNode method
    var nodeToDelete = this.find(value);

    if (!nodeToDelete) {
      console.log('Node not found ', nodeToDelete);
      return;
    }

    this.deleteNode(nodeToDelete);
  },

  deleteNode: function deleteNode(nodeToDelete, direction) {
    // If it has a right then we get the minNode from the right and replace the node we want to delete with it
    // After that delete the minNode
    if (nodeToDelete.right) {
      var replacerNode = this.findMinNode(nodeToDelete.right);

      nodeToDelete.value = replacerNode.value;

      return this.deleteNode(replacerNode, 'right');
    }

    // If it has a left then we replace the node we want to delete with the left node
    if (nodeToDelete.left) {
      nodeToDelete.value = nodeToDelete.left.value;

      return this.deleteNode(nodeToDelete.left, 'left');
    }

    // If we have a direction then delete the node that it says
    if (direction) {
      nodeToDelete.parent[direction] = null;

      return;
    }

    // If we don't have directions than we should find it
    if (nodeToDelete.value <= nodeToDelete.parent.value) {
      nodeToDelete.parent.left = null;
    } else {
      nodeToDelete.parent.right = null;
    }
  },

  dfs: function dfs(levelRoot, path) {
    if (!levelRoot) {
      levelRoot = this.root;
      path = 'Start from root ' + levelRoot.value + ' -> ';
    }

    if (levelRoot.left && !levelRoot.left.isVisited) {
      levelRoot.left.isVisited = true;
      path += levelRoot.left.value + ' -> ';
      return dfs(levelRoot.left, path);
    }

    if (levelRoot.right && !levelRoot.right.isVisited) {
      levelRoot.right.isVisited = true;
      path += levelRoot.right.value + ' -> ';
      return dfs(levelRoot.right, path);
    }

    if (!levelRoot.parent) {
      path += 'Done';
      console.log(path);
      return;
    }

    return dfs(levelRoot.parent, path);
  },

  bfs: function bfs(queue, path) {
    var nextQueue = [];

    if (!queue) {
      queue = [this.root];
      path = 'Start from root ' + this.root.value + ' -> ';
    }

    for (let i = 0; i < queue.length; i++) {
      if (queue[i].left) {
        path += queue[i].left.value + ' ';
        nextQueue.push(queue[i].left);
      }

      if (queue[i].right) {
        path += queue[i].right.value + ' ';
        nextQueue.push(queue[i].right);
      }
    }

    if (nextQueue.length === 0) {
      path += 'Done';
      console.log(path);
      return;
    }

    path += ' -> ';
    return bfs(nextQueue, path);
  }
};

var tree = new Tree();

// let treeConfig = [15, 13, 17, 16, 18, 19];
// let treeConfig = [41, 35, 30];
// let treeConfig = [41, 48, 40, 50];
// let treeConfig = [41,20,65,11,29,50,26,23];
// let treeConfig = [20, 10, 5, 15, 3, 2, 4, 7, 6, 8, 14, 13, 12, 11, 17, 18, 15.5, 16, 30, 25, 35, 21, 22, 23, 24, 26, 27, 28, 29, 31, 32, 33];
let treeConfig = [40, 45, 35, 42];

for (let i = 0; i < treeConfig.length; i++) {
  tree.insert(new Node(treeConfig[i]));
};

console.log('tree ', tree);

// tree.find(7);
// tree.find(4);
// tree.find(14);
// tree.find(23);
// tree.find(12);
// tree.find(9);

// tree.deleteByValue(40);
tree.deleteByValue(45);

// tree.dfs();
// tree.bfs();

// console.log('Min node is ', tree.findMinNode(tree.find(6)));