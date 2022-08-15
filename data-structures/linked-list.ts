class LNode<T> {
  constructor(public value: T, public next: LNode<T> | null = null) {}
}

class LinkedList<T> {
  public tail: LNode<T>
  public length: number

  constructor(public head: LNode<T>) {
    this.tail = this.head
    this.length = 1
  }

  printLinkedList (): void {
    console.log(JSON.stringify(this.head, null, 2))
  }

  append (value: T): void {
    this.tail.next = new LNode(value)
    this.tail = this.tail.next
    this.length++
  } 

  prepend (value: T): void {
    let newNode = new LNode(value)
    newNode.next = this.head
    this.head = newNode
    this.length++
  }

  insert (index: number, value: T): void {
    if (index <= 1) return this.prepend(value)

    if (index > this.length) return this.append(value)

    let currentNode = this.head
    while (index > 2) {
      currentNode = currentNode.next!
      index--
    }

    const newNode = new LNode(value)
    newNode.next = currentNode.next
    currentNode.next = newNode
    this.length++
  }

  remove (index: number): void {  
    if (index <= 1) {
      this.head = this.head.next!
      this.length--
      return
    }

    if (index > this.length) return

    let currentNode = this.head

    while (index > 2) {
      currentNode = currentNode.next!
      index--
    }

    currentNode.next = currentNode.next!.next

    if (currentNode.next === null) {
      this.tail = currentNode
    }

    this.length--
  }
}

const linkedList = new LinkedList(new LNode(1))
linkedList.append(3)
linkedList.append(4)
linkedList.append(5)
linkedList.append(6)
linkedList.printLinkedList()
linkedList.insert(2, 2)
linkedList.printLinkedList()
linkedList.insert(1, 7)
linkedList.printLinkedList()
linkedList.remove(7)
linkedList.printLinkedList()
console.log(linkedList.tail)
console.log(linkedList.length)



