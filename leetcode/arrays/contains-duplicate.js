// https://leetcode.com/problems/contains-duplicate/

/*
  This is a pretty easy problem that makes use of caching through hash sets. We are told to return true if in 
  a given an integer array there is a value that appears at least twice, else we return false.

  The solution should be trivial, in the sense that we can pass an array to the constructor of the hash set
  native implementation in javascript, and we should be able to get the size of the hash set. The size of the
  hash set will be different than the size of the array if there is at least one duplicate value, else their 
  sizes should be equal.

  The time complexity of the solution is of is O(n), because passing an array to the hash set constructor iterates
  every element of the array to put it into a set placement. Because of this, the space complexity should be of
  O(n) as well.
*/

const solution = function(nums) { // T: O (n), S: O (n)
  const set = new Set(nums)
  return set.size !== nums.length
}

let nums = [1,2,3,1]

const result = solution(nums)
console.log(result)