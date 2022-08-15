/**
 * Interface for Heap class
*/

interface IHeap {
  push: (x: number) => number
  pop: () => number
  size: () => number
  peek: () => number
  isEmpty: () => boolean
}

class Heap implements IHeap {
  heap: number[]
  constructor(private readonly comparator = (a: number, b: number) => a > b) {
    this.heap = []
  }

  size (): number {
    return this.heap.length
  }

  peek (): number {
    return this.heap[this.size() - 1]
  }

  isEmpty (): boolean {
    return this.heap.length === 0
  }
  
  push (x: number): number {
    this.heap.push(x)

    this.siftUp()

    return this.size()
  }

  pop (): number {
    let elementPopped: number
    if (this.size() > 1) {
      this.swap(0, this.size() - 1)
    }

    elementPopped = this.heap.pop()!
    this.siftDown()

    return elementPopped
  }

  private siftUp (): void {
    let nodeIdx = this.size() - 1

    while (nodeIdx > 0 && this.compare(nodeIdx, this.parent(nodeIdx))) {
      this.swap(nodeIdx, this.parent(nodeIdx))
      nodeIdx = this.parent(nodeIdx)
    }
  }

  private siftDown (): void {
    let nodeIdx = 0
    while ((this.leftChild(nodeIdx) < this.size() && 
    this.compare(this.leftChild(nodeIdx), nodeIdx)) ||
    (this.rightChild(nodeIdx) < this.size() &&
    this.compare(this.rightChild(nodeIdx), nodeIdx))) {
      const greaterNodeIdx =
        this.rightChild(nodeIdx) < this.size() &&
        this.compare(this.rightChild(nodeIdx), this.leftChild(nodeIdx)) ? this.rightChild(nodeIdx) :
        this.leftChild(nodeIdx)

      this.swap(nodeIdx, greaterNodeIdx)
      nodeIdx = greaterNodeIdx
    }
  }

  private leftChild (idx: number): number {
    return idx * 2 + 1
  }

  private rightChild (idx: number): number {
    return idx * 2 + 2
  }


  private parent (idx: number): number {
    let parent = Math.floor((idx - 1) / 2)
    return parent
  }

  private swap(i: number, j: number): void {
    let temp = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = temp
  }

  private compare(i: number, j: number): boolean {
    return this.comparator(this.heap[i], this.heap[j])
  }
}

const heap = new Heap()
heap.push(50)
heap.push(40)
heap.push(25)
heap.push(20)
heap.push(35)
heap.push(10)
heap.push(15)
console.log(heap.heap)
heap.push(45)
console.log(heap.heap)
heap.pop()
console.log(heap.heap)

