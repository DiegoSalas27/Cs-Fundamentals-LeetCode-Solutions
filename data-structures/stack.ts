class SNode<T> {
  constructor(public value: T, public next: SNode<T> | null = null) {}
}

class Stack<T> {
  private length: number
  constructor(public top: SNode<T>, public bottom: SNode<T> | null = null) {
    this.bottom = this.top
    this.length = 1
  }

  print(): void {
    let currentNode = this.top
    while (currentNode) { 
      console.log(currentNode.value)
      currentNode = currentNode.next!
    }
  }

  peek (): T {
    return this.top.value
  }

  push (value: T): void {
    const newNode = new SNode<T>(value)

    if (this.length === 0) {
      this.top = newNode
      this.bottom = newNode
    } else {
      const currentNode = this.top
      this.top = newNode
      this.top.next = currentNode
    }

    this.length++
  }

  pop(): any {
    if (!this.top) return

    if (this.top === this.bottom) {
      this.bottom = null
    }

    this.top = this.top.next!
    this.length--
  }

  isEmpty(): boolean {
    return this.length === 0
  }
}

const myStack = new Stack(new SNode(5))
myStack.push(4)
myStack.push(3)
myStack.push(2)
myStack.push(1)
myStack.print()
myStack.pop()
myStack.pop()
myStack.pop()
myStack.pop()
myStack.pop()
console.log('\n')
myStack.print()
myStack.push(5)
myStack.push(4)
myStack.print()




