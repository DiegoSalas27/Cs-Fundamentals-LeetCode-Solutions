// https://leetcode.com/problems/binary-tree-level-order-traversal/

/*
  In this problem we are asked to return the level order traversal of a binary tree with the binary tree's
  node's values. What this means is to return in 2d array each level of each inner array.

  Example: 
          3
        /   \
      9      20
            /  \
           15   7

  Input: root = [3,9,20,null,null,15,7]
  Output: [[3],[9,20],[15,7]]

  What we should do is perform a bfs traversal in our binary tree such that we start pushing values to our
  result array for each level we are currently iterating. We can do this using a queue and a while loop that
  will stop the traversal when the queue is empty.

  This solution will give us an O (n) time complexity and an O (n) space complexity, given that we store
  in our result array all of the nodes.

  Note: while this implementation will use an array to process elements in our queue. The shift method will
  reindex every element in our array which is O (n) and is not optimal at all. Just know that the best 
  implementation for a queue is using a linked list.
*/

import { BinarySearchTree } from '../../data-structures/binary-trees/binary-tree.mjs'

const solution = function(root) { // T: O (n), S: O (n)
  if (!root) return []

  let queue = [root]
  let result = []
  let levelArray = []
  let levelCount = 1

  while (queue.length) {
    const node = queue.shift()
    levelArray.push(node.value)
    levelCount--

    if (node.left) {
      queue.push(node.left)
    }

    if (node.right) {
      queue.push(node.right)
    }

    if (levelCount === 0 && levelArray.length) {
      result.push(levelArray)
      levelArray = []
      levelCount = queue.length
    }
  }

  return result
}

const tree = new BinarySearchTree();
tree.insert(3);
tree.insert(9);
tree.insert(20);
tree.insert(15);
tree.insert(7);

const result = solution(tree.root)
console.log(result)