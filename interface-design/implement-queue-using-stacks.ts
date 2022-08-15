/**
* interface for Queue class
*/

interface IQueue {
  push: (x: number) => void
  pop: () => number
  peek: () => number
  empty: () => boolean
}

class Queue implements IQueue {
  private queue1: number[] = []
  private queue2: number[] = []

  push (x: number): void {
    this.queue1.push(x)
  }

  pop (): number {
    if (!this.queue2.length) {
      while(this.queue1.length) {
        this.queue2.push(this.queue1.pop()!)
      }
    }

    return this.queue2.pop()!
  }
  peek (): number {
    if (!this.queue2.length) {
      while(this.queue1.length) {
        this.queue2.push(this.queue1.pop()!)
      }
    }

    return this.queue2[this.queue2.length - 1]
  }
  empty (): boolean {
    return this.queue1.length === 0 && this.queue2.length === 0
  }
}

const myQueue = new Queue()
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
console.log(myQueue.peek()) // return 1
console.log(myQueue.pop()) // return 1, queue is [2]
console.log(myQueue.empty()) // return false