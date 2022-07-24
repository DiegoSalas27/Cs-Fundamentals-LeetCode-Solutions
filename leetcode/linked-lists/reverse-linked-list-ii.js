// https://leetcode.com/problems/reverse-linked-list-ii/

class Node {
  constructor(val, next = null) {
    this.val = val
    this.next = next
  }
}

const linkedList = [5,4,3,2,1].reduce((acc, val) => new Node(val, acc), null)

/*
  This problem is similar to the reverse linked list problem we saw before, but in here we are asked to
  reverse the linked list in between left and right indexes (starting from index 1). We are given 2 integers
  left and right where left <= right and the head og a singly linked list. This is an example of how we
  would reverse a singly linked list given:

  Example: left = 2, right = 4, head: 1 -> ...

  from 1 -> 2 -> 3 -> 4 -> 5
          
  to 1 -> 4 -> 3 -> 2 -> 5

  this would be the linked list reversed from 2 and 4 indexes.

  How do we go about doing this? Well, we can create variables to reference critical nodes in our linked list
  so that we can linked them later once we have reversed a portion of the linked list. This variables are:
  a variable that will allow us to iterate over the linked list (call it currentNode), a variable that will
  hold the reference to the previous node before the node were our reverse algorithm will start (call it
  startNode), a node that will hold a reference to the tail of the inner linked list we will reverse (call it
  tail) and another variable that will hold a reference to the head of the linked list and will be updated
  throughout our reversal process (call it previous).

  Example: left 2, right = 4, head: 1 -> ...

  1 -> 2 -> 3 -> 4 -> 5

  in here, startNode would reference Node with value 1, tail would reference 2 (because this node will 
  eventually be the tail of the inner linked list we reverse), previous would end up being 4 -> 3 -> 2
  and with it we will be able to link it with our startNode (1):

  startNode.next = previous = 1 -> 4 -> 3 -> 2 -> null

  at the end of our while loop (where we reverse the inner linked list) our currentNode will hold the value
  of 5 -> null

  so we will be able to link it with our tail = 2 -> 3 -> ...

  tail.next = currentNode = 2 -> 5 -> null

  and, so our head will look like this: 1 -> 4 -> 3 -> 2 -> 5
  
  Referencing different nodes in the linked list the way we have done it will reestructure their connections
  but the head value will only know what's going on with Node 1. After all the reconnections done in our
  process the head will still be referencing Node 1, but because it is a pointer to the same value we have
  been working with, the head will contain (at least in this scenario) the final reversed linked list and this
  is the variable we want to return.

  In terms of time complexity this algorithm would take O (n), and in terms of space complexity O (1), because
  we are not creating structures that scale with the input given (we just use pointers).
*/

const solution = function(head, left, right) { // T: O (n), S: O (1)
  let currentNode = head
  let startNode = head

  let counter = 1

  while (counter < left) {
    startNode = currentNode
    currentNode = currentNode.next
    counter++
  }

  let tail = currentNode
  let previous = null

  while (counter <= right) {
    let nextNode = currentNode.next
    currentNode.next = previous
    previous = currentNode
    currentNode = nextNode
    counter++
  }

  tail.next = currentNode

  if (left > 1) {
    startNode.next = previous
    return head
  }

  return previous
} 

let left = 1, right = 5

const result = solution(linkedList, left, right)
console.log(JSON.stringify(result, null, 2))