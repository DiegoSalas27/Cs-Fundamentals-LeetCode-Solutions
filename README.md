# Cs-Fundamentals-LeetCode-Solutions
Data structures, algorithms and their applications to Leetcode most well known problems with a walkthrough explanation.

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
| 17 |  Binary trees | Maximum Depth of Binary Tree | [Javascript](./leetcode/binary-trees/maximum-depth-of-binary-tree.mjs) | Easy | *O(n)* | *O(n)* |
| 18 |  Binary trees | Binary Tree Level Order Traversal | [Javascript](./leetcode/binary-trees/level-order-of-binary-tree.mjs) | Medium | *O(n)* | *O(n)* |
| 19 |  Binary trees | Binary Tree Right Side View | [Javascript](./leetcode/binary-trees/binary-tree-right-side-view.mjs) | Medium | *O(n)* | *O(n)* |
| 20 |  Binary trees | Count Complete Tree Nodes | [Javascript](./leetcode/binary-trees/count-complete-tree-nodes.mjs) | Medium | *O(log n)* | *O(1)* |
| 21 |  Binary trees | Validate Binary Search Tree | [Javascript](./leetcode/binary-trees/validate-binary-search-tree.mjs) | Medium | *O(n)* | *O(n)* |
| 22 |  2D arrays | Number of Islands | [Javascript](./leetcode/2d-arrays/number-of-islands.js) | Medium | *O(n * m)* | *O(max (n, m))* |
| 23 |  2D arrays | Rotting Oranges | [Javascript](./leetcode/2d-arrays/rotting-oranges.js) | Medium | *O(n * m)* | *O(n * m)* |
| 24 |  2D arrays | Walls and Gates | [Javascript](./leetcode/2d-arrays/walls-and-gates.js) | Medium | *O(n * m)* | *O(n * m)* |
| 25 |  2D arrays | Transpose Matrix | [Javascript](./leetcode/2d-arrays/transpose-matrix.js) | Easy | *O(n * m)* | *O(n * m)* |
| 26 |  2D arrays | Set Matrix Zeroes | [Javascript](./leetcode/2d-arrays/set-matrix-zeroes.js) | Medium | *O(n * m)* | *O(1)* |
| 27 |  2D arrays | Search a 2D Matrix | [Javascript](./leetcode/2d-arrays/search-a-2D-matrix.js) | Medium | *O(n + log(m))* | *O(1)* |
| 28 |  Graphs | Time Needed to Inform All Employees | [Javascript](./leetcode/graphs/time-needed-to-inform-all-employees.js) | Medium | *O(n)* | *O(n)* |
| 29 |  Graphs | Course Schedule | [Javascript](./leetcode/graphs/course-schedule.js) | Medium | *O(v + e)* | *O(v + e)* |
| 30 |  Graphs | Network Delay Time | [Javascript](./leetcode/graphs/network-delay.js) | Medium | *O(e + log v)* | *O(v + e)* |
| 31 |  Dynamic Programming | Min Cost Climbing Stairs | [Javascript](./leetcode/dynamic-programming/min-cost-climbing-stairs.js) | Easy | *O(n)* | *O(1)* |
| 32 |  Dynamic Programming | Knight Probability in Chessboard | [Javascript](./leetcode/dynamic-programming/knight-probability-in-chessboard.js) | Medium | *O(k * n ^ 2)* | *O(k * n ^ 2)* |
| 33 |  Dynamic Programming | Best Time to Buy and Sell Stock | [Javascript](./leetcode/dynamic-programming/best-time-to-buy-and-sell-stock.js) | Easy | *O(n)* | *O(1)* |
| 34 |  Dynamic Programming | Coin Change | [Javascript](./leetcode/dynamic-programming/coin-change.js) | Medium | *O(n * amount)* | *O(amount)* |
| 35 |  Dynamic Programming | House Robber | [Javascript](./leetcode/dynamic-programming/house-robber.js) | Medium | *O(n)* | *O(1)* |
| 36 |  Dynamic Programming | 0-1 Knapsack Problem | [Javascript](./leetcode/dynamic-programming/knapsack.js) | Medium | *O(n * w)* | *O(n)* |
| 37 |  Dynamic Programming | Longest Common Subsequence | [Javascript](./leetcode/dynamic-programming/longest-common-subsequence.js) | Medium | *O(n * m)* | *O(n * m)* |
| 38 |  Dynamic Programming | Longest Increasing Subsequence | [Javascript](./leetcode/dynamic-programming/longest-increasing-subsequence.js) | Medium | *O(n log n)* | *O(n)* |
| 39 |  Dynamic Programming | Longest Palindromic Subsequence | [Javascript](./leetcode/dynamic-programming/longest-palindromic-subsequence.js) | Medium | *O(n ^ 2)* | *O(n ^ 2)* |
| 40 |  Dynamic Programming | Longest Palindromic Substring | [Javascript](./leetcode/dynamic-programming/longest-palindromic-substring.js) | Medium | *O(n ^ 2)* | *O(1)* |
| 41 |  Dynamic Programming | Maximum Subarray | [Javascript](./leetcode/dynamic-programming/maximum-subarray.js) | Medium | *O(n)* | *O(1)* |
| 42 |  Dynamic Programming | Partition a set into two subsets such that the difference of subset sums is minimum | [Javascript](./leetcode/dynamic-programming/minimize-two-machine-loads-difference.js) | Hard | *O(n * m)* | *O(n * m)* |
| 43 |  Dynamic Programming | Minimum Path Sum | [Javascript](./leetcode/dynamic-programming/minimum-path-sum.js) | Medium | *O(n * m)* | *O(1)* |
| 44 |  Dynamic Programming | Palindromic Substrings | [Javascript](./leetcode/dynamic-programming/palindromic-substrings.js) | Medium | *O(n * 2)* | *O(1)* |
| 45 |  Dynamic Programming | Partition Equal Subset Sum | [Javascript](./leetcode/dynamic-programming/partition-equal-subset-sum.js) | Medium | *O(n * m)* | *O(n * m)* |
| 46 |  Dynamic Programming | Subset Sum | [Javascript](./leetcode/dynamic-programming/subset-sum.js) | Medium | *O(n * m)* | *O(n * m)* |
