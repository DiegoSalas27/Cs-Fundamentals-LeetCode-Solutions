interface IHashTable<T> {
  set: (key: string, value: T) => [string, T][][]
  get: (key: string) => T | undefined
  keys: () => string[]
}

class HashTable<T> implements IHashTable<T> {
  private data: Array<Array<[string, T]>>

  constructor(size: number) {
    this.data = new Array<Array<[string, T]>>(size)
  }

  private hash(key: string): number {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length
    }

    return hash
  }

  set (key: string, value: T): [string, T][][] {
    const address = this.hash(key)
    if (!this.data[address]) {
      this.data[address] = []
    }
    this.data[address].push([key, value])
    return this.data
  }

  get (key: string): T | undefined {
    const address = this.hash(key)
    if (this.data[address]) {
      const bucket = this.data[address]
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return bucket[i][1]
        }
      }
    } else {
      return undefined
    }
  }

  keys (): string[] {
    let result: string[] = []

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        for (let j = 0; j < this.data[i].length; j++) {
          result.push(this.data[i][0][0])
        }
      }
    } 

    return result
  }
}

const myHashTable = new HashTable(2)
myHashTable.set('grapes', 'yei')
myHashTable.set('grapess', 53)
myHashTable.set('cami', 'pupi')
console.log(myHashTable.get('grapes'))
console.log(myHashTable.keys())
