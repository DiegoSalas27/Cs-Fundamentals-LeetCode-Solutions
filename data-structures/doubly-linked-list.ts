class DLNode<T> {
  constructor(
    public value: T,
    public next: DLNode<T> | null = null,
    public prev: DLNode<T> | null = null
  ) {}
}

class DoublyLinkedList<T> {
  public tail: DLNode<T>;
  public length: number;

  constructor(public head: DLNode<T>) {
    this.tail = this.head;
    this.length = 1;
  }

  printdoublyLinkedList(): void {
    let currentNode = this.head;

    while (currentNode) {
      console.log(
        "value: ",
        currentNode.value,
        "next: ",
        currentNode.next?.value,
        "prev: ",
        currentNode.prev?.value
      );

      currentNode = currentNode.next!
    }
  }

  append(value: T): void {
    const newNode = new DLNode(value);
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  prepend(value: T): void {
    let newNode = new DLNode(value);
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    this.length++;
  }

  insert(index: number, value: T): void {
    if (index <= 1) return this.prepend(value);

    if (index > this.length) return this.append(value);

    let currentNode = this.head;
    while (index > 2) {
      currentNode = currentNode.next!;
      index--;
    }

    const newNode = new DLNode(value);
    const nextNode = currentNode.next;
    currentNode.next = newNode;
    newNode.prev = currentNode;
    newNode.next = nextNode;
    if (nextNode) {
      nextNode.prev = newNode
    }
    this.length++;
  }

  remove(index: number): void {
    if (index <= 1) {
      this.head = this.head.next!;
      this.length--;
      return;
    }

    if (index > this.length) return;

    let currentNode = this.head;

    while (index > 2) {
      currentNode = currentNode.next!;
      index--;
    }

    currentNode.next = currentNode.next!.next;
    if (currentNode.next) {
      currentNode.next.prev = currentNode;
    } else {
      this.tail = currentNode;
    }

    this.length--;
  }
}

const doublyLinkedList = new DoublyLinkedList(new DLNode(1));
doublyLinkedList.append(3);
doublyLinkedList.append(4);
doublyLinkedList.append(5);
doublyLinkedList.append(6);
console.log(doublyLinkedList.tail);
console.log(doublyLinkedList.length);
doublyLinkedList.insert(2, 2);
doublyLinkedList.insert(1, 7);
doublyLinkedList.printdoublyLinkedList();
console.log('\n')
doublyLinkedList.remove(7);
doublyLinkedList.printdoublyLinkedList();
console.log(doublyLinkedList.tail);
console.log(doublyLinkedList.length);
