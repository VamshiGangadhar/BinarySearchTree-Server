class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  // printStructuredTree() {
  //   const result = [];
  //   if (!this.root) {
  //     result.push("Null");
  //     return result;
  //   }

  //   const queue = [{ node: this.root, level: 0 }];

  //   while (queue.length > 0) {
  //     const { node, level } = queue.shift();
  //     result.push("  ".repeat(level) + node.value);

  //     if (node.left) {
  //       queue.push({ node: node.left, level: level + 1 });
  //     }
  //     if (node.right) {
  //       queue.push({ node: node.right, level: level + 1 });
  //     }
  //   }
  //   console.log(result);
  //   return result;

  // }

  printStructuredTree() {
    const result = {};
    if (!this.root) {
      return result;
    }

    const queue = [{ node: this.root, level: 0 }];

    while (queue.length > 0) {
      const { node, level } = queue.shift();
      if (!result[level]) {
        result[level] = [];
      }

      const nodeInfo = {
        name: node.value,
        children: [],
      };

      if (node.left) {
        nodeInfo.children.push({ name: node.left.value });
        queue.push({ node: node.left, level: level + 1 });
      }

      if (node.right) {
        nodeInfo.children.push({ name: node.right.value });
        queue.push({ node: node.right, level: level + 1 });
      }

      result[level].push(nodeInfo);
    }

    // Construct the tree structure recursively
    const constructTree = (node) => {
      if (!node) {
        return null;
      }

      const tree = {
        name: node.value,
        children: [],
      };

      tree.children.push(constructTree(node.left));
      tree.children.push(constructTree(node.right));

      return tree;
    };

    const formattedResult = constructTree(this.root);

    return formattedResult;
  }

  addNode(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (current) {
      if (value === current.value) {
        return;
      }
      else if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  deleteNode(value) {
    this.root = this._deleteNodeRecursive(this.root, value);
  }

  _deleteNodeRecursive(node, value) {
    if (!node) {
      return null;
    }

    if (value === node.value) {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const minNode = this._findMinNode(node.right);
      node.value = minNode.value;
      node.right = this._deleteNodeRecursive(node.right, minNode.value);
    } else if (value < node.value) {
      node.left = this._deleteNodeRecursive(node.left, value);
    } else {
      node.right = this._deleteNodeRecursive(node.right, value);
    }

    return node;
  }

  _findMinNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  inOrderTraversal() {
    const result = [];
    this._inOrderRecursive(this.root, result);
    return result;
  }

  _inOrderRecursive(node, result) {
    if (!node) return;
    this._inOrderRecursive(node.left, result);
    result.push(node.value);
    this._inOrderRecursive(node.right, result);
  }

  preOrderTraversal() {
    const result = [];
    this._preOrderRecursive(this.root, result);
    return result;
  }

  _preOrderRecursive(node, result) {
    if (!node) return;
    result.push(node.value);
    this._preOrderRecursive(node.left, result);
    this._preOrderRecursive(node.right, result);
  }

  postOrderTraversal() {
    const result = [];
    this._postOrderRecursive(this.root, result);
    return result;
  }

  _postOrderRecursive(node, result) {
    if (!node) return;
    this._postOrderRecursive(node.left, result);
    this._postOrderRecursive(node.right, result);
    result.push(node.value);
  }

  findNodeDetails(value) {
    const details = {
      value: null,
      level: 0,
      parents: [],
      children: [],
    };
  
    this._findNodeDetailsRecursive(this.root, value, details, 0, null);
    return details;
  }
  
  _findNodeDetailsRecursive(node, targetValue, details, level, parent) {
    if (!node) return;
  
    if (node.value === targetValue) {
      details.value = node.value;
      details.level = level;
      details.parents = parent !== null ? [parent] : [];
      if (node.left) details.children.push(node.left.value);
      if (node.right) details.children.push(node.right.value);
    } else {
      if (node.value > targetValue) {
        this._findNodeDetailsRecursive(
          node.left,
          targetValue,
          details,
          level + 1,
          node.value
        );
      } else {
        this._findNodeDetailsRecursive(
          node.right,
          targetValue,
          details,
          level + 1,
          node.value
        );
      }
    }
  }
  
  clear() {
    this.root = null;
  }
}

module.exports = BinarySearchTree;
