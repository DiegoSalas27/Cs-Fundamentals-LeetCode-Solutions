// https://leetcode.com/problems/binary-tree-right-side-view/

/*
  In this problem we are asked to return to right most node at each level of a binary tree from top to 
  bottom. To do this, we can perform a dfs from the root node all the way to the right performing a 
  preorder traversal: meaning that we will push into our result array a node value, before looking at its
  left and right children.

  This recursive algorithm will take a time complexity of O (n) given that we will visit every node in the
  binary tree. In terms of space complexity, it will take O (n), because we will not only store all of the
  node values in the binary tree in our result array if it is skewed, but also because of the number of 
  recursive calls.
*/

import { BinarySearchTree } from '../../algorithms/binary-trees/binary-tree.mjs'

const solution = function(root) { // T: O (n), S: O (n)
  if (!root) return []
    
  let result = []

  const dfs = (node, height = 0) => {
    if (result.length === height) {
      result.push(node.value)
    }

    node.right && dfs(node.right, height + 1)
    node.left && dfs(node.left, height + 1)

    return result
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