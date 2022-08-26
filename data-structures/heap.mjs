/**
 * Interface for Heap class
*/
export class Heap {
    constructor(comparator) {
        if (comparator === void 0) { comparator = function (a, b) { return a > b; }; }
        this.comparator = comparator;
        this.heap = [];
    }
    size() {
        return this.heap.length;
    }
    peek() {
        return this.heap[this.size() - 1];
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    push(x) {
        this.heap.push(x);
        this.siftUp();
        return this.size();
    }
    pop() {
        var elementPopped;
        if (this.size() > 1) {
            this.swap(0, this.size() - 1);
        }
        elementPopped = this.heap.pop();
        this.siftDown();
        return elementPopped;
    }
    siftUp() {
        var nodeIdx = this.size() - 1;
        while (nodeIdx > 0 && this.compare(nodeIdx, this.parent(nodeIdx))) {
            this.swap(nodeIdx, this.parent(nodeIdx));
            nodeIdx = this.parent(nodeIdx);
        }
    }
    siftDown() {
        var nodeIdx = 0;
        while ((this.leftChild(nodeIdx) < this.size() &&
            this.compare(this.leftChild(nodeIdx), nodeIdx)) ||
            (this.rightChild(nodeIdx) < this.size() &&
                this.compare(this.rightChild(nodeIdx), nodeIdx))) {
            var greaterNodeIdx = this.rightChild(nodeIdx) < this.size() &&
                this.compare(this.rightChild(nodeIdx), this.leftChild(nodeIdx)) ? this.rightChild(nodeIdx) :
                this.leftChild(nodeIdx);
            this.swap(nodeIdx, greaterNodeIdx);
            nodeIdx = greaterNodeIdx;
        }
    }
    leftChild(idx) {
        return idx * 2 + 1;
    }
    rightChild(idx) {
        return idx * 2 + 2;
    }
    parent(idx) {
        var parent = Math.floor((idx - 1) / 2);
        return parent;
    }
    swap(i, j) {
        var temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
    compare(i, j) {
        return this.comparator(this.heap[i], this.heap[j]);
    }
}

var heap = new Heap();
heap.push(50);
heap.push(40);
heap.push(25);
heap.push(20);
heap.push(35);
heap.push(10);
heap.push(15);
console.log(heap.heap);
heap.push(45);
console.log(heap.heap);
heap.pop();
console.log(heap.heap);
//# sourceMappingURL=heap.js.map