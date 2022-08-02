// https://leetcode.com/problems/partition-to-k-equal-sum-subsets/

/*
  Given an integer array nums and an integer k, return true if it is possible to divide this array into k non-empty subsets
  whose sums are all equal.

  Example:

  let nums nums = [4,3,2,3,5,2,1], k = 4 => true
  It is possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.

  This looks like the partition equal subset sum problem, where we need to divide an array into two subsets such that they sum
  the same. How can we do this? The logic between this problems will differ and the best solution to come up with is one that
  actually is intuitive an easy to follow. So our solution will be a backtracking solution, because we need to exhaust all of 
  the possiblities to make up a value of nums sum / k. Our restrictions are that we cannot choose a number in a given nums index
  more than once, and if our solution doesn't work after n iteration we need to try a new one
*/

const solution = function(nums, k) { // T: O (k * 2 ^ n), S: O (n)
  let total = nums.reduce((acc, val) => acc + val, 0)

  if (total % k > 0) return false

  let target = total / k

  let used = new Array(nums.length).fill(false)

  nums.sort((a, b) => b - a)

  return backtracking(nums, 0, 0, target, k, used)
}

const backtracking = function(nums, idx, sumSoFar, target, k, used) {
  if (k === 0) return true

  if (sumSoFar === target) {
    return backtracking(nums, 0, 0, target, k - 1, used)
  }

  for (let i = idx; i < nums.length; i++) {
    if (used[i] === false && sumSoFar + nums[i] <= target) {
      used[i] = true

      if (backtracking(nums, i + 1, sumSoFar + nums[i], target, k, used)) {
        return true
      }

      used[i] = false
    }
  }

  return false
}

let nums = [4,3,2,3,5,2,1], k = 4

const result = solution(nums, k)
console.log(result)