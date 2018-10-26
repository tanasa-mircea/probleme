function Tree() {
  this.root = null;
}

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
  this.height = 0;
};

Node.prototype = {
  getLeftHeight: function() {
    if (!this.left) {
      return 0;
    }

    return this.left.height + 1;
  },

  getRightHeight: function() {
    if (!this.right) {
      return 0;
    }

    return this.right.height + 1;
  }
};

Tree.prototype = {
  insert: function insert(value) {
    this.root = this.insertNode(value, this.root);
  },

  insertNode: function insertNode(value, levelRoot) {
    // If the root is empty then the node will be root
    if (!levelRoot) {
      return new Node(value);
    }

    // If node's value is bigger than levelRoot's then try to add it on the left, else try to add it on right
    if (value < levelRoot.value) {
      levelRoot.left = this.insertNode(value, levelRoot.left);
    } else {
      levelRoot.right = this.insertNode(value, levelRoot.right);
    }

    levelRoot.height = Math.max(levelRoot.getLeftHeight(), levelRoot.getRightHeight());

    // Update height and rebalance tree
    var balanceState = this.getBalancingDirection(levelRoot);
    if (balanceState <= -2) {
      if (value < levelRoot.left.value) {
        // Left left case
        levelRoot = this.rotate('right', levelRoot);
      } else {
        // Left right case
        levelRoot = this.rotate('left', levelRoot.left);
        return this.rotate('right', levelRoot);
      }
    }

    if (balanceState >= 2) {
      if (value > (levelRoot.right && levelRoot.right.value) || 0 ) {
        // Right right case
        levelRoot = this.rotate('left', levelRoot);
      } else {
        // Right left case
        levelRoot = this.rotate('right', levelRoot.right);
        return this.rotate('left', levelRoot);
      }
    }

    return levelRoot;
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

  rotate: function(direction, pivot) {
    if (direction === 'right') {
      var other = pivot.left;
      pivot.left = other.right;
      other.right = pivot;
      pivot.height = Math.max(pivot.getLeftHeight(), pivot.getRightHeight());
      other.height = Math.max(other.getLeftHeight(), other.getRightHeight());
      return other;
    }

    if (direction === 'left') {
      var other = pivot.right;
      pivot.right = other.left;
      other.left = pivot;

      pivot.height = Math.max(pivot.getLeftHeight(), pivot.getRightHeight());
      other.height = Math.max(other.getRightHeight(), other.getLeftHeight());
      return other;
    }
  },

  getBalancingDirection: function(node) {
    var difference = node.getRightHeight() - node.getLeftHeight();
    return difference;
  },

  findMinNode: function findMinNode(minNode) {
    let newMinNode;

    // If the current node doesn't have left then it means that the currentNode is the min
    if (!minNode.left) {
      return minNode;
    }

    // If the left's value is less than current value then got to the left
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
      console.log('Node not found ', value);
      return;
    }

    this.root = this.deleteNode(value, this.root);
  },

  deleteNode: function deleteNode(value, levelRoot) {
    if (levelRoot === null) {
      return levelRoot;
    }

    if (value < levelRoot.value) {
      // The value to be deleted is in the left sub-tree
      levelRoot.left = this.deleteNode(value, levelRoot.left);
    }

    if (value > levelRoot.value) {
      // The value to be deleted is in the right sub-tree
      levelRoot.right = this.deleteNode(value, levelRoot.right);
    }

    if (levelRoot.value === value) {
      // levelRoot is the node to be deleted
      if (!levelRoot.left && !levelRoot.right) {
        levelRoot = null;
      } else if (!levelRoot.left && levelRoot.right) {
        levelRoot = levelRoot.right;
      } else if (levelRoot.left && !levelRoot.right) {
        levelRoot = levelRoot.left;
      } else {
        // Node has 2 children, get the in-order successor
        var inOrderSuccessor = this.findMinNode(levelRoot.right);
        levelRoot.value = inOrderSuccessor.value;
        levelRoot.right = this.deleteNode(inOrderSuccessor.key, levelRoot.right);
      }
    }

    if (levelRoot === null) {
      return levelRoot;
    }

    // Update height and rebalance tree
    levelRoot.height = Math.max(levelRoot.getLeftHeight(), levelRoot.getRightHeight());
    var balanceState = this.getBalancingDirection(levelRoot);

    if (balanceState <= -2) {
      // Left left case
      if (this.getBalancingDirection(levelRoot.left) === 0 || this.getBalancingDirection(levelRoot.left) === -1) {
        return this.rotate('right', levelRoot);

      }
      // Left right case
      if (this.getBalancingDirection(levelRoot.left) === 1) {
        levelRoot.left = this.rotate('left', levelRoot.left);
        return this.rotate('right', levelRoot);
      }
    }

    if (balanceState >= 2) {
      // Right right case
      if (this.getBalancingDirection(levelRoot.right) === 0 || this.getBalancingDirection(levelRoot.right) === 1) {
        return this.rotate('left', levelRoot);

      }
      // Right left case
      if (this.getBalancingDirection(levelRoot.right) === -1) {
        levelRoot.right = this.rotate('right', levelRoot.right);
        return this.rotate('left', levelRoot);
      }
    }

    return levelRoot;
  },

  // Depth First Search
  dfs: function dfs(levelRoot, path, parent) {
    // At init, start from root
    if (!levelRoot) {
      levelRoot = this.root;
      path = 'Start from root ' + levelRoot.value + ' -> ';
    }

    // If the current level has a left then go to it and mark it as visited
    if (levelRoot.left && !levelRoot.left.isVisited) {
      levelRoot.left.isVisited = true;
      path += levelRoot.left.value + ' -> ';
      path = dfs(levelRoot.left, path, levelRoot);
    }

    // If the current level has a right then go to it and mark it as visited
    if (levelRoot.right && !levelRoot.right.isVisited) {
      levelRoot.right.isVisited = true;
      path += levelRoot.right.value + ' -> ';
      path = dfs(levelRoot.right, path, levelRoot);
    }

    // If neither left nor right are unvisited and we don't have a parent then we are done
    if (!parent) {
      path += 'Done';
      console.log(path);
      return path;
    }

    // If neither left nor right are unvisited but we have a parent then go back to it
    return path;
  },

  // Breadth First Search
  bfs: function bfs(queue, path) {
    var nextQueue = [];

    // At init, set a queue with the root inside
    if (!queue) {
      queue = [this.root];
      path = 'Start from root ' + this.root.value + ' -> ';
    }

    // Iterate through the queue and push to the nextQueue the next branches
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

    // If the nextQueue is empty then we are done
    if (nextQueue.length === 0) {
      path += 'Done';
      console.log(path);
      return path;
    }

    path += ' -> ';
    return bfs(nextQueue, path);
  }
};