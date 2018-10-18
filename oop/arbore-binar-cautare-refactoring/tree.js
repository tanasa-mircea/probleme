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
    // If the spot is free then set the node there and balance the tree, else go to the next level
    if (node.value <= levelRoot.value) {
      if (!levelRoot.left) {
        node.parent = levelRoot;
        levelRoot.left = node;
        this.balance(levelRoot);
        return;
      }
      return this.insert(node, levelRoot.left);
    }

    // Right case
    // If the spot is free then set the node there and balance the tree, else go to the next level
    if (!levelRoot.right) {
      node.parent = levelRoot;
      levelRoot.right = node;
      this.balance(levelRoot);
      return;
    }

    return this.insert(node, levelRoot.right);
  },

  balance: function balance(node) {
    if (!node || !node.parent) {
      return;
    };

    let parent = node.parent;

    // If the parent's branches are filled then we can't rotate;
    if (parent.left && parent.right) {
      return;
    }

    if (!parent.left) {
      if (node.left) {
        this.rotate('right', node);
      }

      this.rotate('left', parent);
      return;
    }

    if (!parent.right) {
      if (node.right) {
        this.rotate('left', node);
      }

      this.rotate('right', parent);
      return;
    }
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
    // If pivot is empty then the root will be the pivot
    let newRootBranch = new Node(0),
        auxBranch = new Node(0),
        currentPivot = new Node(0);

    if (!pivot) {
      Object.assign(currentPivot, this.root);
    } else {
      Object.assign(currentPivot, pivot);
    }

    // For the left rotation we must have something on the right
    if (direction === 'left' && currentPivot.right) {
      // The new root will be the right branch
      Object.assign(newRootBranch, currentPivot.right);
      // Set new root parent as currentPivot parent
      newRootBranch.parent = currentPivot.parent;

      // Save newRoot's left as auxBranch because it will be replace by oldRoot's left
      if (!newRootBranch.left) {
        auxBranch = null;
      } else {
        Object.assign(auxBranch, newRootBranch.left);
        auxBranch.parent = currentPivot;
      }

      // Make oldRoot the left of the newRoot
      newRootBranch.left = currentPivot;

      // Make sure that newRoot's right has the right parent ref
      if (newRootBranch.right) {
        newRootBranch.right.parent = newRootBranch;
      }

      // Set oldRoot's left the aux branch
      currentPivot.right = auxBranch;

      // Set oldRoot's parent the newRoot
      currentPivot.parent = newRootBranch;

      if (!pivot || !pivot.parent) {
        this.root = newRootBranch;
        return;
      }

      if (newRootBranch.value > pivot.parent.value) {
        pivot.parent.right = newRootBranch;
      } else {
        pivot.parent.left = newRootBranch;
      }
    }

    // For the right rotation we must have something on the left
    if (direction === 'right' && currentPivot.left) {
      // The new root will be the left branch
      Object.assign(newRootBranch, currentPivot.left);
      // Set new root parent as currentPivot parent
      newRootBranch.parent = currentPivot.parent;

      // Save newRoot's right as auxBranch because it will be replace by oldRoot's right
      if (!newRootBranch.right) {
        auxBranch = null;
      } else {
        Object.assign(auxBranch, newRootBranch.right);
        auxBranch.parent = currentPivot;
      }

      // Make oldRoot the right of the newRoot
      newRootBranch.right = currentPivot;

      // Make sure that newRoot's right has the right parent ref
      if (newRootBranch.left) {
        newRootBranch.left.parent = newRootBranch;
      }

      // Set oldRoot's right the aux branch
      currentPivot.left = auxBranch;

      // Set oldRoot's parent the newRoot
      currentPivot.parent = newRootBranch;

      if (!pivot || !pivot.parent) {
        this.root = newRootBranch;
        return;
      }

      if (newRootBranch.value > pivot.parent.value) {
        pivot.parent.right = newRootBranch;
      } else {
        pivot.parent.left = newRootBranch;
      }
    }
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
      this.balance(nodeToDelete);

      return;
    }

    // If we don't have directions than we should find it
    if (nodeToDelete.value <= nodeToDelete.parent.value) {
      nodeToDelete.parent.left = null;
    } else {
      nodeToDelete.parent.right = null;
    }

    this.balance(nodeToDelete);
  },

  // Depth First Search
  dfs: function dfs(levelRoot, path) {
    // At init, start from root
    if (!levelRoot) {
      levelRoot = this.root;
      path = 'Start from root ' + levelRoot.value + ' -> ';
    }

    // If the current level has a left then go to it and mark it as visited
    if (levelRoot.left && !levelRoot.left.isVisited) {
      levelRoot.left.isVisited = true;
      path += levelRoot.left.value + ' -> ';
      return dfs(levelRoot.left, path);
    }

    // If the current level has a right then go to it and mark it as visited
    if (levelRoot.right && !levelRoot.right.isVisited) {
      levelRoot.right.isVisited = true;
      path += levelRoot.right.value + ' -> ';
      return dfs(levelRoot.right, path);
    }

    // If neither left nor right are unvisited and we don't have a parent then we are done
    if (!levelRoot.parent) {
      path += 'Done';
      console.log(path);
      return path;
    }

    // If neither left nor right are unvisited but we have a parent then go back to it
    return dfs(levelRoot.parent, path);
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