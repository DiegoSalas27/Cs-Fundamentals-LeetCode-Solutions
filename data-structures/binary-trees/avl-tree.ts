class AVLNode {
  constructor(
    public key: number,
    public height = 1,
    public left: AVLNode | null = null,
    public right: AVLNode | null = null
  ) {}
}

interface IAVLTree {
  insert: (node: AVLNode | null, key: number) => AVLNode | null;
  delete: (node: AVLNode | null, key: number) => AVLNode | null;
  preOrder: (node: AVLNode | null) => void;
}

class AVLTree implements IAVLTree {
  constructor(public root: AVLNode | null = null) {}

  private height(node: AVLNode | null): number {
    if (node === null) return 0;

    return node.height;
  }

  private getBalance(node: AVLNode | null): number {
    if (node === null) return 0;

    return this.height(node.left) - this.height(node.right);
  }

  private leftRotate(node: AVLNode) {
    let rightNode = node.right;
    let rightNodeLeft = rightNode!.left;

    // perform rotation
    rightNode!.left = node;
    node.right = rightNodeLeft;

    // update heights
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    rightNode!.height =
      1 + Math.max(this.height(rightNode!.left), this.height(rightNode!.right));

    // return new root node
    return rightNode;
  }

  private rightRotate(node: AVLNode) {
    let leftNode = node.left;
    let leftNodeRight = leftNode!.right;

    // perform rotation
    leftNode!.right = node;
    node.left = leftNodeRight;

    // update heights
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    leftNode!.height =
      1 + Math.max(this.height(leftNode!.left), this.height(leftNode!.right));

    // return new root node
    return leftNode;
  }

  private minValueNode(node: AVLNode | null): AVLNode | null {
    let current = node;

    while (current!.left) {
      current = current!.left;
    }

    return current;
  }

  insert(node: AVLNode | null, key: number): AVLNode | null {
    // 1. Perform insertion
    if (node === null) return new AVLNode(key);

    if (key < node.key) {
      node.left = this.insert(node.left, key);
    } else if (key > node.key) {
      node.right = this.insert(node.right, key);
    } else {
      return node; // duplicate keys are not allowed
    }

    // 2. Update height of ancestor node
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));

    // 3. Get the balance factor of this ancestor node to check whether this node became unbalanced
    let balance = this.getBalance(node);

    // If the node becomes unbalanced, then there are 4 cases
    // LL case
    if (balance > 1 && key < node.left!.key) {
      return this.rightRotate(node);
    }
    // RR case
    if (balance < -1 && key > node.right!.key) {
      return this.leftRotate(node);
    }
    // LR case
    if (balance > 1 && key > node.left!.key) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }
    // RL case
    if (balance < -1 && key < node.right!.key) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  delete(node: AVLNode | null, key: number): AVLNode | null {
    // 1. Perform a standard BST delete
    if (node === null) return node;

    if (key < node.key) {
      node.left = this.delete(node.left, key);
    } else if (key > node.key) {
      node.right = this.delete(node.right, key);
    } else {
      if (node.left === null || node.right === null) {
        let temp: any = null;
        if (temp === node.left) {
          temp = node.right;
        } else {
          temp = node.left;
        }

        if (temp === null) {
          temp = node;
          node = null;
        } else {
          node = temp;
        }
      } else {
        let temp = this.minValueNode(node.right);

        node!.key = temp!.key;

        node.right = this.delete(node.right, temp!.key);
      }
    }

    if (node == null) return node;

    // 2. Update height of the current node
    node!.height = Math.max(this.height(node!.left), this.height(node!.right));

    // 3. Check balance factor of this node

    let balance = this.getBalance(node);

    // LL case
    if (balance > 1 && this.getBalance(node!.left) >= 0) {
      return this.rightRotate(node!);
    }
    // LR case
    if (balance > 1 && this.getBalance(node!.left) < 0) {
      node!.left = this.leftRotate(node!.left!);
      return this.rightRotate(node!);
    }
    // RR case
    if (balance < -1 && this.getBalance(node!.right) <= 0)
      return this.leftRotate(node!);
    // RL case
    if (balance < -1 && this.getBalance(node!.right) > 0) {
      node!.right = this.rightRotate(node!.right!);
      return this.leftRotate(node!);
    }

    return node
  }

  preOrder(node: AVLNode | null): void {
    if (node !== null) {
      console.log(node.key + " ");
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }
}

const tree = new AVLTree();
tree.root = tree.insert(tree.root, 9);
tree.root = tree.insert(tree.root, 5);
tree.root = tree.insert(tree.root, 10);
tree.root = tree.insert(tree.root, 0);
tree.root = tree.insert(tree.root, 6);
tree.root = tree.insert(tree.root, 11);
tree.root = tree.insert(tree.root, -1);
tree.root = tree.insert(tree.root, 1);
tree.root = tree.insert(tree.root, 2);

tree.preOrder(tree.root);

tree.root = tree.delete(tree.root, 1)

tree.preOrder(tree.root);
