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

  deleteNode: function deleteNode(value) {
    var nodeToDelete = this.find(value);

    if (!nodeToDelete) {
      console.log('Node not found ', nodeToDelete);
      return;
    }

    if (nodeToDelete.value < nodeToDelete.parent.value) {
      nodeToDelete.parent.left = null;
    } else {
      nodeToDelete.parent.right = null;
    }
  },

  dfs: function dfs(levelRoot, path) {
    // debugger
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
tree.insert(new Node(8));
tree.insert(new Node(6));
tree.insert(new Node(7));
tree.insert(new Node(10));
tree.insert(new Node(5));
tree.insert(new Node(4));
tree.insert(new Node(9));
tree.insert(new Node(12));

console.log('tree ', tree);

// tree.find(7);
// tree.find(4);
// tree.find(14);
// tree.find(23);
// tree.find(12);
// tree.find(9);

// tree.deleteNode(6);

tree.dfs();
tree.bfs();