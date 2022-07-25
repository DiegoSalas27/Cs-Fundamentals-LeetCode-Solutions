export class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    let currentNode = this.root;

    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = new Node(value);
          return;
        }
      }

      if (value > currentNode.value) {
        if (currentNode.right) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = new Node(value);
          return;
        }
      }
    }
  }

  lookup(value) {
    // should return node we are looking for, or return false or null if it doesn't find it
    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.value) {
        // we use divide and conquer to search for a subset of nodes
        return currentNode;
      }

      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  remove(value) {
    if (!this.root) return null;

    let currentNode = this.root;
    let parentNode = null;

    while (currentNode) {
      if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else {
        let nodeToDelete = currentNode;

        if (currentNode.right) {
          currentNode = currentNode.right;

          if (currentNode.left) {
            while (currentNode.left) {
              currentNode = currentNode.left;
            }

            nodeToDelete.right.left = currentNode.right;
            currentNode.right = nodeToDelete.right;
          }

          currentNode.left = nodeToDelete.left;

          if (parentNode) {
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode;
            } else {
              parentNode.right = currentNode;
            }
          } else {
            this.root = currentNode;
          }
        } else {
          if (parentNode) {
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.left;
            } else {
              parentNode.right = currentNode.left;
            }
          } else {
            this.root = currentNode.left;
          }
        }

        return nodeToDelete;
      }
    }

    return null;
  }
}

const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);
// console.log(JSON.stringify(traverse(tree.root), null, 2));
// console.log(JSON.stringify(traverse(tree.lookup(20)), null, 2));
// tree.remove(20);
// console.log(JSON.stringify(traverse(tree.root), null, 2));

//       9
//   4      20
// 1  6  15  170

// BFS [9, 4, 20, 1, 6, 15, 170]
// DFS [9, 4, 1, 6, 20, 15, 170]

// Inorder: [1, 4, 6, 9, 15, 20, 170]
// Preorder: [9, 4, 1, 6, 20, 15, 170]
// Postorder: [1, 6, 4, 15, 170, 20, 9]

function traverse(node) { // This is depth first search
  if (!node) return null;
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  console.log(tree.value);
  return tree;
}
