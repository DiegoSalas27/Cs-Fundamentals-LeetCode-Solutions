// https://leetcode.com/problems/two-sum/

/*
  For the brute force solution we can compute every possible pairing of numbers such that they add up
  to the target number in a double for loop. Once a valid pair is found, we can return their indices. While 
  this is the easiest way to think on how to solve the problem, the Time Complexity would be O (n ^ 2), 
  given the double for loop. Can we do better?
*/

const solution1 = function(nums, target) { // brute force solution. T: O (n ^ 2), S: O (1)
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j]
    }
  }
}

/*
  What if we were to use a data structure which can help us reduce the time complexity of our solution?
  We could use a hash table, so that we store as a key the number we are currently computing and as a value
  its index. We can then subtract from the target the value we are currently at and look for that key 
  in our hash table, if that key is found that would mean that we have indeed captured that value previously. 
  This simple addition of a hash table can help us improve our time complexity to O (n). However, the space 
  complexity would be increased by the number of elements in the array we are given: O (n). In general, 
  there is a tradeof between time complexity and space complexity. It depends on the usecase to know 
  how to approach the problem.
*/

const solution2 = function(nums, target) { // T: O (n), s: O (n)
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (!map.has(target - nums[i])) {
      map.set(nums[i], i)
    } else {
      return [map.get(target - nums[i]), i]
    }
  }
}

let nums = [2,7,11,15], target = 9 // [0, 1]

const result = solution2(nums, target)
console.log(result)