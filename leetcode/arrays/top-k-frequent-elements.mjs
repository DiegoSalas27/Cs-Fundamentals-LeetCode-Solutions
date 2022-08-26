// https://leetcode.com/problems/top-k-frequent-elements/

/*
  We are given a integer array nums and an integer k. We are asked to return the k most frequent elements. And
  they can be returned in any order. How do we solve this problem?

  Easy, we can just sort the numbers and iterate through the numbers using a hash set, and appending numbers into
  an array until k === 0. The hash set would allow us to not pushing repeated values. Ok that would definetely 
  work and would take us n log n time. But, can we do better?

  Yes, we can use an algorithm that performs in O (n + k log n) remember that k is guaranteed to be less than n,
  which is why this time complexity is more desirable. How do we do this? We can use a Priority Queue. So we
  would first populate a hash table with the numbers as keys and their occurrences as values. Then we can
  push that into our priority queue while looping through our hash map. This priority queue should be a max
  heap, meaning that the value a the top of the heap should be the maximum. So far this operation is O (n + log n)
  why? Because it took us n run time to populate the hash map, and then log n which is the run time to push
  elements into a priority queue. Ok, so after that, we can perform a while loop decreasing k by 1 in each loop
  as we pop elements from our priority queue. And those popped elements are stored in an array. This last process
  should take O (k log n) because pop operation has log n run time in a priority queue and this is happening
  k times.
*/

import { Heap } from '../../data-structures/heap.mjs'

const solution = function(nums, k) { // T: O (n + k log n), S: O (n)
  let memo = {}

  for (let i = 0; i < nums.length; i++) {
    if (memo[nums[i]] === undefined) {
      memo[nums[i]] = 1
    } else {
      memo[nums[i]]++
    }
  }

  const priorityQueue = new Heap((a, b) => memo[a] > memo[b])

  for (let key in memo) {
    priorityQueue.push(key)
  }

  let result = []

  while (k > 0) {
    result.push(+priorityQueue.pop())
    k--
  }

  return result
}

/*
  The next solution we can think of is bucket sort, but it's not exactly as it is taught. We need to populate
  our hash table and after that create a matrix called frequencies were its length will be the number of elements
  in the given array. Each of the rows in the matrix represents the number of ocurrences of a number. Which is
  why we will iterate through the keys of the object and look for the values (number of repetitions) and push
  the key into that specific bucket.

  Ok, so next what we can do is say the following. We want to return the top k most frequent elements. So what if
  we iterate through our matrix starting from the end, because the we know that the indexes at the end are the 
  ones where the most repetitions are to be found. Once we find a number within any of these buckets our k 
  paramenter should be decreased by one until its 0, this is when out iteration through the bucket should stop
  and that's when we return our result.

  The time complexity of this solution is T: O (n), and the space complexity is O (n)
*/

const solution2 = function(nums, k) { 
  let memo = {}

  for (let i = 0; i < nums.length; i++) { // T: O(n)
    if (memo[nums[i]] === undefined) {
      memo[nums[i]] = 1
    } else {
      memo[nums[i]]++
    }
  }

  let buckets = new Array(nums.length + 1).fill(0).map(() => []) // T: O(n)

  for (let key in memo) { // T: O(n)
    buckets[memo[key]].push(key)
  }

  let result = []

  for (let i = buckets.length - 1; i >=0; i--) { // T: O (n + n)
    for (let j = 0; j < buckets[i].length; j++) {
      result.push(buckets[i][j])
      k--
      if (k === 0) return result
    }     
  }
}

let nums = [1,1,1,2,2,3], k = 2

const result = solution2(nums, k)
console.log(result)