# Cs-Fundamentals-LeetCode-Solutions
Data structures implementation, algorithms and their applications to Leetcode most well known problems with a walkthrough explanation.

## Directory tree
| # | Title |
|---| ----- | 
| 1 | [Algorithms](./algorithms)|
| 2 | [Data Structures](./data-structures)|
| 3 | [Leetcode solutions](./leetcode)|

## Algorithms
| Technique | Algorithm | Solution | Time complexity | Space complexity |
| --------- | --------- | -------- | :---------------: | :----------------: |
| Recursion | Binary Search | [Javascript](./algorithms/recursion/binary-search.js) | *O(log n)* | recursively: *O(log n)* / iteratively: *O (1)* |
| Recursion | Tail factorial | [Javascript](./algorithms/recursion/tail-recursion.js) | *O(n)* | normal recursion: *O(n)* / tail recursion: *O (1)* |
| Recursion | 2d array BFS | [Javascript](./algorithms/recursion/bfs/2d-array-bfs.js) | *O(n)* | *O(n)* |
| Recursion | Graph BFS | [Javascript](./algorithms/recursion/bfs/graph-bfs.js) | using adjacency list: *O(v + e)* / using adjacency matrix: *O(v ^ 2)* | *O(v)* |
| Recursion | 2d array DFS | [Javascript](./algorithms/recursion/dfs/2d-array-dfs.js) |  *O(n)* | *O(n)* |
| Recursion | Graph DFS | [Javascript](./algorithms/recursion/dfs/graph-dfs.js) | using adjacency list: *O(v + e)* / using adjacency matrix: *O(v ^ 2)* | *O(v)* |
| Sorting   | Bubble Sort | [Javascript](./algorithms/sorting/bubble-sort.js) | *O(n ^ 2)* | *O(1)* |
| Sorting   | Insertion Sort | [Javascript](./algorithms/sorting/insertion-sort.js) | *O(n ^ 2)* | *O(1)* |
| Sorting   | Selection Sort | [Javascript](./algorithms/sorting/selection-sort.js) | *O(n ^ 2)* | *O(1)* |
| Sorting   | Merge Sort | [Javascript](./algorithms/sorting/merge-sort.js) | *O(n log n)* | *O(n)* |
| Sorting   | Quick Sort | [Javascript](./algorithms/sorting/quick-sort.js) | *O(n ^ 2)* | *O(n)* |

## Data structures
| Name | Description | Applications | Solution |
| ---- | ----------- | ------------ | -------- |
| Binary tree | A tree that has at most 2 children for any node | Binary search trees, Heaps, etc. | [Javascript](./data-structures/binary-trees/binary-tree.mjs) |
| Graph | Non-linear data structure consisting of nodes and edges | Network communication, Data organization, flow control, etc. | [Javascript](./data-structures/graphs/graph.js) |

## Leetcode solutions
| # | Category | Title | Solution | Dificulty | Time complexity | Space complexity |
|---| :--------: | ----- | -------- | --------- | :---------------: | :----------------: |
| 1 |  Arrays  | Two Sum | [Javascript](./leetcode/arrays/two-sum.js) | Easy | *O(n)* | *O(n)* |
| 2 |  Arrays  | Container with most water | [Javascript](./leetcode/arrays/container-with-most-water.js) | Medium | *O(n)* | *O(1)* |
| 3 |  Arrays  | Trapping Rain Water | [Javascript](./leetcode/arrays/trapping-rain-water.js) | Hard | *O(n)* | *O(1)* |
| 4 |  Strings  | Valid Palindrome | [Javascript](./leetcode/strings/valid-palindrome.js) | Easy | *O(n)* | *O(1)* |
| 5 |  Strings  | Valid Palindrome II | [Javascript](./leetcode/strings/valid-palindrome-ii.js) | Easy | *O(n)* | *O(1)* |
| 6 |  Strings  | Backspace String Compare | [Javascript](./leetcode/strings/backspace-string-compare.js) | Easy | *O(n)* | *O(1)* |
| 7 |  Strings  | First Unique Character in a String | [Javascript](./leetcode/strings/first-unique-character-in-a-string.js) | Easy | *O(n)* | *O(n)* |
| 8 |  Strings  | Longest Substring Without Repeating Characters | [Javascript](./leetcode/strings/longest-substring-without-repeating-characters.js) | Medium | *O(n)* | *O(n)* |
| 9 |  Linked Lists | Reverse Linked List | [Javascript](./leetcode/linked-lists/reverse-linked-list.js) | Easy | *O(n)* | *O(1)* |
| 10 |  Linked Lists | Reverse Linked List II | [Javascript](./leetcode/linked-lists/reverse-linked-list-ii.js) | Medium | *O(n)* | *O(1)* |
| 11 |  Linked Lists | Flatten a Multilevel Doubly Linked List | [Javascript](./leetcode/linked-lists/flatten-a-multilevel-doubly-linked-list.js) | Medium | *O(n)* | *O(1)* |
| 12 |  Linked Lists | Linked List Cycle II | [Javascript](./leetcode/linked-lists/cycle-detection.js) | Medium | *O(n)* | *O(1)* |
| 13 |  Stacks and Queues | Valid Parentheses | [Javascript](./leetcode/stacks-and-queues/valid-parenthesis.js) | Easy | *O(n)* | *O(n)* |
| 14 |  Stacks and Queues | Minimum Remove to Make Valid Parentheses | [Javascript](./leetcode/stacks-and-queues/minimum-remove-to-make-valid-parenthesis.js) | Medium | *O(n)* | *O(n)* |
| 15 |  Recursion | Find First and Last Position of Element in Sorted Array | [Javascript](./leetcode/recursion/find-first-and-last-position-of-element-in-sorted-array.js) | Medium | *O(log n)* | *O(1)* |
| 16 |  Recursion | Kth Largest Element in an Array | [Javascript](./leetcode/recursion/kth-largest-element-in-an-array.js) | Medium | *O(n log n)* | *O(1)* |
