// https://leetcode.com/problems/binary-tree-right-side-view/

/*
  In this problem we are asked to return to right most node at each level of a binary tree from top to 
  bottom. To do this, we can perform a dfs from the root node all the way to the right performing a 
  preorder traversal: meaning that we will push into our result array a node value, before looking at its
  left and right children.

  If the length of the result array is equal to the level of the binary tree we are currently at, we want
  to push that node value into our array, because there has been no node at this level pushed into our 
  array, and if we always traverse to the right first, we will make sure we will always push the right most
  node at each level. Here is an example

    Example: 
          3      level = 0, result = [], push node value in array -> result [3] 
        /   \
      9      20  level = 1, result = [3], push node value in array -> result [3, 20] 
            /  \
           15   7  level = 2, result = [3, 20], push node value in array -> result [3, 20, 7] 
               /
              3  level = 3, result = [3, 20, 7], push node value in array -> result [3, 20, 7, 3] 

  This recursive algorithm will take a time complexity of O (n) given that we will visit every node in the
  binary tree. In terms of space complexity, it will take O (n), because we will not only store all of the
  node values in the binary tree in our result array if it is skewed, but also because of the number of 
  recursive calls.
*/

import { BinarySearchTree } from '../../data-structures/binary-trees/binary-tree.mjs'

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