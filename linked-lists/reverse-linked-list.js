// https://leetcode.com/problems/reverse-linked-list/

class Node {
  constructor(val, next = null) {
    this.val = val
    this.next = next
  }
}

const linkedList = [5,4,3,2,1].reduce((acc, val) => new Node(val, acc), null)

/*
  The reverse linked list problem asks us to reverse a given linked list completely: (1 -> 2 -> 3 -> 4 -> 5)
  to (5 -> 4 -> 3 -> 2 -> 1). The way the linked lists work is by having a value and next properties,
  where the value holds what ever data type we wish to store (in this case an integer), and the next
  property holds a reference to another Node instance. With this, we can traverse a link list by calling
  the next property in a loop until we have traverse the whole linked list (until we find a null next pointer). 
  
  With this knowledge, we can reverse a linked list by storing a reference of the next pointer where we
  currently are (call it nextNode), and then we can have another variable to hold a reference of the current
  node pointing the the previous value (call it previous), a currentNode variable will allow us to traverse
  the linked list until its value in null. The previous variable will hold the reversed linked list, and this
  is the variable we return.

  Example:

  currentNode = 1 -> 2 -> ...
  nextNode = 2 -> 3 -> ...
  previous = null

  currentNode.next =previous: 1 -> null
  previous = currentNode: 1 -> null

  currentNode = nextNode: 2 -> 3 -> ...

  If we perform this algorithm recursively we will end up with a previous = 5 -> 4 -> 3 -> 2 -> 1

  The trick here is to never lose the references of critical nodes which is why we have a nextNode variable
  to never lose the reference to nodes we will use in the next iteration. Remember that, in javascript,
  whenever we lose the reference to an object in memory, this object gets automatically garbage collected.
*/

const solution = function(head) { // T: O (n), S: O (1)
  let currentNode = head
  let previous = null

  while (currentNode) {
    const nextNode = currentNode.next
    currentNode.next = previous
    previous = currentNode
    currentNode = nextNode
  }

  return previous
}

const result = solution(linkedList)
console.log(JSON.stringify(result, null, 2))