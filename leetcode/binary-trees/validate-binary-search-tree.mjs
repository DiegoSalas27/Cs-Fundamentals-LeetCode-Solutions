// https://leetcode.com/problems/validate-binary-search-tree/

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

/*
  This problem asks us to determine in a given binary tree is a valid binary search tree. A tree is a binary
  search tree if the values of the sub tree nodes to the left of a node are less than its value, and the
  sub tree nodes to the right of a node are greater than its value. How do solve this problem?

  We can perform a recursive call starting at the root node and think about the problem constraints.
  We know that the root node will always comply with the binary search tree property. So we can move
  either left or right (the order doesn't matter here). If we go to the left, we know that the left node's
  right boundary is going to be the value of the root node, so its value should be less than that, but what
  is its left boundary? If we go to the right of the root node, we know that the right node's left boundary
  is going to be the value of the root node, so its value should be greater than that, but what about is its
  right boundary?

  In other words, the left most nodes of every level have no left boundaries defined by our logic, the same
  thing applies for the right most nodes at every level, but in terms of their right boundaries. So this
  should force us to create a default value that will make the any node in our binary tree to comply with
  the constraints. 

  If we think about the root node, this is the left most node as well as the right most node at level 0,
  so what are its boundaries? The answer is, it has no boundaries at all, because its the only node in the
  tree, and it has no parents at all. So its value could be very small or very large. Because of this, we can
  say that its boundaries could be -Infinity and Infinity. This way, we can pass the left boundary (-Infinity)
  to the left child of the root node, and the right boundary (Infinity) to the right child of the root node.

  This algorithm will run in O (n), because we need to visit every node to determine if the tree is valid.
  The space complexity would be O (n) because this binary tree could be skewed and our call stack will have
  that size.
*/


const solution = function(root) { // T: O (n), S: O (n)
  const dfs = (node, leftBoundary, rightBoundary) => {
    if (!node) return true

    if (node.val <= leftBoundary || node.val >= rightBoundary) return false

    return dfs(node.left, leftBoundary, node.val) && dfs(node.right, node.val, rightBoundary)
  }

  return dfs(root, -Infinity, Infinity)
}

let node15 = new TreeNode(15)
let node21 = new TreeNode(21)
let node20 = new TreeNode(20, node15, node21)
let node1 = new TreeNode(1)
let node3 = new TreeNode(3, node1, node20)

const result = solution(node3)
console.log(result)
