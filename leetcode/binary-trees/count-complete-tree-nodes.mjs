// https://leetcode.com/problems/count-complete-tree-nodes/

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

/*
  This problem asks us to count the number of nodes of a complete binary tree. But, what is a complete binary
  tree? 

  A complete binary tree is a tree that has all of its level completely filled (meaning that every node at
  each level, except for the last one perhaps will have exactly 2 children). And all of the nodes in the last
  level are as far left as possible. For example:

              1         
            /   \
           2      3
          /  \    / \
         4    5  6   7
        /
       9 

  In this tree the top 3 levels are completely filled, but the last level has only one node. This is indeed
  a complete binary tree. And it has one interesting property. We can rest assure that the number of nodes
  previous to the last level will be of (2 ^ h) - 1. Perfect binary trees, have 2 properties that we can
  extend to complete binary trees as well (except possibly for the last level, which is where they differ):

  1. The number of nodes at each level is 2 to the power of the level or height. 
  2. The number of nodes in a level is equal to the number of nodes of all of the previous levels + 1.

            1         2 ^ 0 = 1 node
          /   \
          2      3    2 ^ 1 = 2 nodes
        /  \    / \
       4    5  6   7  2 ^ 2 = 4 nodes
      /
      9               2 ^ 3 = 8 nodes (this property would comply in a perfect binary tree)

  Now, leveraging these two properties, we can say that the height of a complete binary tree is the number
  of traversals all the way to the left starting from the root node. Once we get the height we can use both
  property 1 (to get the total possible nodes at the last level) and then subtract one from it, because we
  know that the total number of nodes in previous levels will be (2 ^ h) - 1 (leveraging property n° 2).

  So far, the time complexity of this logic should be O (log n), because in a complete binary tree as well as
  in a perfect binary tree the height of the tree is always is log n and that is the time we take to calculate
  its height. So, how do we get the number of nodes in the last level? 

  Because the problem asks us to design an algorithm that runs in less than O (n) time complexity, what we
  need to leverage is the binary search algorithm with performs at O (log (n)). We can perform binary search
  at the last level of our tree (treating each node like a 0 indexed array) and check if at any mid partition 
  that we create we find a node. If we do, we need to move our left pointer to mid + 1, because we want to 
  know if there are more nodes to the right of the node we found. If we don't find a node, we move right to 
  mid - 1, because we need the get the right most node of the last level. Once we find the place (index) of 
  the last node level, we can be sure that to its left, the nodes are going to be complete. So we can just 
  add to the previousLevelNodes the index of the right most node we have found and that should be our answer.
*/

const solution = function(root) { // T: O (log n), S: O (1)
  if (!root) return 0

  const height = getHeight(root)

  const previousLevelNodes = Math.pow(2, height) - 1

  let left = 0, right = previousLevelNodes

  while (left <= right) {
    let partitionIdx = Math.ceil((left + right) / 2)

    if (nodeExists(root, height, partitionIdx, previousLevelNodes)) {
      left = partitionIdx + 1
    } else {
      right = partitionIdx - 1
    }
  }

  return previousLevelNodes + left
}

const nodeExists = function(node, height, partitionIdx, previousLevelNodes) {
  let left = 0, right = previousLevelNodes
  let counter = 0

  while (counter < height) {
    counter++

    let nodeIdx = Math.ceil((left + right) / 2)

    if (nodeIdx <= partitionIdx) {
      node = node.right
      left = nodeIdx + 1
    } else {
      node = node.left
      right = nodeIdx - 1
    }
  }

  return node
}

const getHeight = function(node) {
  let height = 0

  while (node.left) {
    height++
    node = node.left
  }

  return height
}

let node4 = new TreeNode(4)
let node5 = new TreeNode(5)
let node6 = new TreeNode(6)
let node3 = new TreeNode(3, node6)
let node2 = new TreeNode(2, node4, node5)
let node1 = new TreeNode(1, node2, node3)

const result = solution(node1)
console.log(result)