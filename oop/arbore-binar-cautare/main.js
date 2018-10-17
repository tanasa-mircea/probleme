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
    if (!this.root) {
      this.root = node;
      return;
    }

    if (!levelRoot) {
      levelRoot = this.root;
    }

    if (node.value <= levelRoot.value) {
      if (!levelRoot.left) {
        node.parent = levelRoot;
        levelRoot.left = node;
        return;
      }
      return this.insert(node, levelRoot.left);
    } else {
      if (!levelRoot.right) {
        node.parent = levelRoot;
        levelRoot.right = node;
        return;
      }

      return this.insert(node, levelRoot.right);
    }
  },

  find: function find(value, levelRoot, path) {
    if (!levelRoot) {
      levelRoot = this.root;
      path = 'Find ' + value + '. Start on root -> ';
    }

    if (levelRoot.value === value) {
      path += 'Found it';
      console.log('Path ', path);
      return levelRoot;
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

    if (direction === 'right') {
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
    var nodeToDelete = this.find(value);

    if (!nodeToDelete) {
      console.log('Node not found ', nodeToDelete);
      return;
    }

    this.deleteNode(nodeToDelete);
  },

  deleteNode: function deleteNode(nodeToDelete) {
    if (nodeToDelete.left || nodeToDelete.right) {
      if (nodeToDelete.right) {
        var replacerNode = this.findMinNode(nodeToDelete.right);

        nodeToDelete.value = replacerNode.value;

        this.deleteNode(replacerNode);
      }

      return;
    };

    if (nodeToDelete.value < nodeToDelete.parent.value) {
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

tree.insert(new Node(20));
tree.insert(new Node(10));
tree.insert(new Node(5));
tree.insert(new Node(15));
tree.insert(new Node(3));
tree.insert(new Node(2));
tree.insert(new Node(4));
tree.insert(new Node(7));
tree.insert(new Node(6));
tree.insert(new Node(8));
tree.insert(new Node(14));
tree.insert(new Node(13));
tree.insert(new Node(12));
tree.insert(new Node(11));
tree.insert(new Node(17));
tree.insert(new Node(18));
tree.insert(new Node(15.5));
tree.insert(new Node(16));
tree.insert(new Node(30));
tree.insert(new Node(25));
tree.insert(new Node(35));
tree.insert(new Node(21));
tree.insert(new Node(22));
tree.insert(new Node(23));
tree.insert(new Node(24));
tree.insert(new Node(26));
tree.insert(new Node(27));
tree.insert(new Node(28));
tree.insert(new Node(29));
tree.insert(new Node(31));
tree.insert(new Node(32));
tree.insert(new Node(33));

console.log('tree ', tree);
debugger

// tree.find(7);
// tree.find(4);
// tree.find(14);
// tree.find(23);
// tree.find(12);
// tree.find(9);

tree.deleteByValue(15);

tree.dfs();
tree.bfs();

// console.log('Min node is ', tree.findMinNode(tree.find(6)));