interface ITrie {
  insert: (word: string) => void
  search: (word: string) => boolean
  startWith: (prefix: string) => boolean
}

class TrieNode {
  constructor(public keys: Record<string, TrieNode> = {}, public end: boolean = false) {}
}

class Trie implements ITrie {
  private root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  insert (word: string, node = this.root): void {
    if (word.length === 0 ) {
      node.end = true
      return
    } else if (!node.keys[word[0]]) {
      node.keys[word[0]] = new TrieNode()
      this.insert(word.substring(1), node.keys[word[0]])
    } else {
      this.insert(word.substring(1), node.keys[word[0]])
    }
  }

  search (word: string, node = this.root): boolean {
    if (word.length === 0 && node.end) {
      return true
    } else if (word.length === 0 || !node.keys[word[0]]) {
      return false
    } else {
      return this.search(word.substring(1), node.keys[word[0]])
    }
  }

  startWith (prefix: string, node = this.root): boolean {
    if (prefix.length === 0) {
      return true
    } else if (!node.keys[prefix[0]]) {
      return false
    } else {
      return this.startWith(prefix.substring(1), node.keys[prefix[0]])
    }
  }
}

const trie = new Trie()
trie.insert('apple')
console.log(trie.search('dog')) // false
trie.insert('dog')
console.log(trie.search('dog')) // true
console.log(trie.startWith('app')) // true
console.log(trie.search('app')) // false
trie.insert('app')
console.log(trie.search('app')) // true

