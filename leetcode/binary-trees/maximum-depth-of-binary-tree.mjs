// https://leetcode.com/problems/maximum-depth-of-binary-tree/

/*
  We are asked to get the maximum depth of a binary tree. To do this we need to traverse from the root node
  to the farthest leaf node. How can we do this?

  We can perform a recursive call all the way to the left or to the right (using depth first search), and
  perform this traversal until we have visited every node in the tree. We have to visit every node of the
  tree, because we don't know where the farthest leaf is located.

  Our algorithm will increase a depth variable by 1 for every recursive call we make and we will 
  divide our algorithm moving to the left and to the right recursively and compare at each level
  their depths. We then return the maximum depth out of those recursive comparison from bottom to top.

  Because we visit every node of the binary tree recursively, our time complexity is O (n) where n is the
  number of nodes, and our space complexity is O (n) because this binary tree could be skewed to the right
  or to the left.

  Example of a skewed binary tree:

  1
   \
    2
     \
      3
       \
        4
*/

import { BinarySearchTree } from '../../data-structures/binary-trees/binary-tree.mjs'

const solution = function(root) { // T: O (n), S: O (n)
  const dfs = (node, depth = 0) => {
    if (node === null) return depth

    return Math.max(dfs(node.left, depth + 1), dfs(node.right, depth + 1))
  }

  return dfs(root)
}

const tree = new BinarySearchTree();
tree.insert(3);
tree.insert(9);
tree.insert(20);
tree.insert(15);
tree.insert(7);

const result = solution(tree.root)
console.log(result)