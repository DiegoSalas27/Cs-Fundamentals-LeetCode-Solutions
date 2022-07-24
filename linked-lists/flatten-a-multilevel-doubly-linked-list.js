// https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/

class Node {
  constructor(val, prev, next, child) {
    this.val = val;
    this.prev = prev;
    this.next = next;
    this.child = child;
  }
}

/*
  In this problem we are given a doubly linked list with nodes with next, previous, val and child properties. 
  The next property holds a reference of the next node, the previous property holds a reference of the 
  previous node, the val property hold the value (integer) of the node, and the chold property holds a 
  reference to the starting node of another linked list. The child property might be null for some nodes
  in any doubly linked list level. We are asked to flatten this multilevel doubly linked list into a single
  level. 

  Example:
  1 <-> 2 <-> 3 <-> 4 <-> 5 <-> 6 (first level)
              |
              7 <-> 8 <-> 9 <-> 10 (second level)
                    |
                    11 <-> 12 (third level)

  In this example, we can see 3 levels in our multilevel data structure where node 3 points to node 7
  and node 8 points to node 11. The flattened doubly linked list should look like this:

  1 <-> 2 <-> 3 <-> 7 <-> 8 <-> 11 <-> 12 <-> 9 <-> 10 <-> 4 <-> 5 <-> 6

  How can we do this? Well, we can traverse our doubly linked list and check at every iteration if the current
  node we are in has a child property different from null. If it has a child, then we need to traverse the
  child linked list below it until we find the last node of that list (call it lastChild), we can then update
  the references of the pointers like so:

  lastChild.next = currentNode.next
  if (currentNode.next) { // this could be null
    currentNode.next.prev = lastChild
  }
  currentNode.next = currentNode.child
  currentNode.child.prev = currentNode
  currentNode.child = null

  By doing this we have "merged" the second level doubly linked list in the first level, and we can keep 
  traversing our first level linked list and keep repeating this process iteratively until every level merges
  with the first level.

  The time complexity of this algorithm would be O (n) where n is the number of nodes of the whole data
  structure, and the space complexity would be O (1) as we don't allocate additional memory to perform our
  algorithm
*/

const solution = function(head) { // T: O (n), S: O (1)
  let currentNode = head

  while (currentNode) {
    if (currentNode.child) {
      let lastChild = currentNode.child

      while (lastChild.next) {
        lastChild = lastChild.next
      }

      lastChild.next = currentNode.next
      if (currentNode.next) {
        currentNode.next.prev = lastChild
      }
      currentNode.next = currentNode.child
      currentNode.child.prev = currentNode
      currentNode.child = null
    }
    currentNode = currentNode.next
  }

  return head
}

const printList = function(head) {
  while(head) {
    console.log(head.val, head.next?.val, head.prev?.val, head.child?.val)
    head = head.next
  }
}

let node1 = new Node(1, null, null, null);
let node2 = new Node(2, null, null, null);
let node3 = new Node(3, null, null, null);
let node4 = new Node(4, null, null, null);
let node5 = new Node(5, null, null, null);
let node6 = new Node(6, null, null, null);
let node7 = new Node(7, null, null, null);
let node8 = new Node(8, null, null, null);
let node9 = new Node(9, null, null, null);
let node10 = new Node(10, null, null, null);
let node11 = new Node(11, null, null, null);
let node12 = new Node(12, null, null, null);

node1.next = node2
node2.prev = node1
node2.next = node3
node3.prev = node2
node3.next = node4
node4.prev = node3
node4.next = node5
node5.prev = node4
node5.next = node6
node6.prev = node5
node3.child = node7
node7.next = node8
node8.prev = node7
node8.next = node9
node9.prev = node8
node9.next = node10
node10.prev = node9
node8.child = node11
node11.next = node12
node12.prev = node11

const result = solution(node1);
printList(result)