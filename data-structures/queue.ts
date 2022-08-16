class QNode<T> {
  constructor(public value: T, public next: QNode<T> | null = null) {}
}

class Queue<T> {
  private length: number
  constructor(public first: QNode<T> | null = null, public last: QNode<T> | null = null) {
    this.last = this.first
    this.length = 1
  }

  print(): void {
    let currentNode = this.first
    while (currentNode) { 
      console.log(currentNode.value)
      currentNode = currentNode.next!
    }
  }

  peek (): T | null {
    return this.length >= 1 ? this.first!.value : null
  }

  enqueue (value: T): void {
    const newNode = new QNode(value)
    if (this.length === 0) {
      this.first = newNode
      this.last = this.first
    } else {
      this.last!.next = newNode
      this.last = newNode
    }

    this.length++
  }

  dequeue (): void {
    if (this.length === 0) return

    if (this.first === this.last) {
      this.first = null
      this.last = null
    } else {
      this.first = this.first!.next
    }
    this.length--
  }
}

const myQueue = new Queue(new QNode(1))
myQueue.enqueue(2)
myQueue.enqueue(3)
myQueue.enqueue(4)
myQueue.enqueue(5)
console.log(myQueue.peek())
console.log('\n')
myQueue.print()
myQueue.dequeue()
myQueue.dequeue()
myQueue.dequeue()
myQueue.dequeue()
myQueue.dequeue()
console.log('\n')
myQueue.print()
myQueue.enqueue(1)
myQueue.print()





