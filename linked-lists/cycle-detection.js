// https://leetcode.com/problems/linked-list-cycle-ii/

// Mathematical explanation: https://www.geeksforgeeks.org/floyds-cycle-finding-algorithm/

class Node {
  constructor(val, next= null) {
    this.val = val  
    this.next = next
  }
}

const linkedList = [-4,0,2,3].reduce((node, val) => new Node(val, node), null)

const createCycle = function(head, l, r) {
  let counter = 0
  let cycleNode = null
  while(head) {
    if (counter === l) {
      cycleNode = head
    }

    if (counter === r) {
      head.next = cycleNode
      break
    }
    counter++
    head = head.next
  } 
}

/*
  This problem asks us to detect a cycle in a linked list. The easit kind of memoristic way to do this is by
  using Floyd's tortoise and the hare algorithm. In this algorithm, we create two variables (call them
  tortoise and hare) which both point to the head of the given linked list. Then, in a while loop we move
  those pointers like this: the tortoise pointer moves one node at a time, and the hare pointer moves 2 nodes
  at a time. If the next node of the hare node is null or if the next.next node of the hare is null, then it
  means that there is no cycle. If both the hare and the tortoise pointer point to the same node during our
  while loop, then this means we have found a cycle. From this 'meetingPoint' we can create an inner while
  loop where we can use the head node given and move it one node to its right per iteration, and the 
  meetingPoint node moves also one node to its right per iteration. When both pointers coincide on the same
  node. Then that node will be the start of the cycle and that is what we return.
*/

const solution = function(head) {
  if (!head) return null

  let tortoise = head
  let hare = head

  while (true) {
    if (!hare.next || !hare.next.next) return null
    hare = hare.next.next
    tortoise = tortoise.next

    if (hare === tortoise) {
      let meetingPoint = hare
      while (meetingPoint !== head) {
        meetingPoint = meetingPoint.next
        head = head.next
      }
        
      return meetingPoint
    }
  }
}

createCycle(linkedList, 1, 3)
const result = solution(linkedList)
console.log(result)