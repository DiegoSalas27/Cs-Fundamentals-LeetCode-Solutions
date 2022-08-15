interface IMyArray {
  get (index: number): object
  push (item: any): number
  pop (): number
  splice (start: number, end: number): void
}

class MyArray implements IMyArray {
  private data: object
  private length: number

  constructor() {
    this.length = 0
    this.data = {}
  }

  splice(start: number, end: number): void {
    this.shiftitems(start, end, end - start)
  }

  private shiftitems (start: number, end: number, increment: number): void {
    for (let i = start; i + increment < this.length; i++) {
      this.data[i] = this.data[i + increment]
    }

    for (let i = this.length - 1; i >= end; i--) {
      delete this.data[i]
      this.length--
    }
  } 

  pop(): number {
    const lastItem = this.data[this.length - 1]
    delete this.data[this.length - 1]
    this.length--
    return lastItem
  }

  push(item: any): number {
    this.data[this.length] = item
    this.length++
    return this.length
  }

  get(index: number): object {
    return this.data[index]
  }
}

const myArray = new MyArray()
console.log(myArray.get(0))
myArray.push(1)
console.log(myArray.get(0))
console.log(myArray)
myArray.pop()
console.log(myArray)
myArray.push(1)
myArray.push(2)
myArray.push(3)
myArray.push(4)
myArray.push(5)
console.log(myArray)
myArray.splice(1, 3)
console.log(myArray)
