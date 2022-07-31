// https://leetcode.com/problems/partition-equal-subset-sum/

/*
  This problem is almost exactly the same as the subset sum, and can be solve almost exactly in the same
  way. We are given a non-empty array nums containing only positive integers. We need to check if the 
  array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

  What we need to do is to take the total sum of the given array and divide it by 2. Why? because if we
  are going to partition our array into two subsets with equal sum, then its total sum is also divided by two
  If the total sum divided by two is an odd number, we can return false immediately, because there is
  no way that two odd numbers sum to an odd number, or that two even numbers sum to an odd number:

  odd + odd = even
  even + even = even

  Ok, what's next? Well, our target is to make for the sum of totalSum/2 right? We can create a matrix
  with rows of size n, and columns of size (totalSum/2) + 1. From here we can perform the same algorithm
  as in the subset sum.

  The time complexity of this solution is O (n * m). The space complexity is the same.
*/

const solution = function(nums) { // T: O (n * m), S: O (n * m)
  const total = nums.reduce((acc, val) => acc + val, 0)

  if (total % 2 > 0) return false

  let target = total / 2

  let dp = new Array(nums.length).fill(0).map(() => new Array(target + 1).fill(false))

  for (let r = 0; r < dp.length; r++) {
    for (let c = 0; c < dp[r].length; c++) {
      if (c === 0 || nums[r] === c) {
        dp[r][c] = true
      }

      if (r > 0) {
        dp[r][c] = dp[r - 1][c]

        if (c >= nums[r] && dp[r - 1][c - nums[r]] === true) {
          dp[r][c] = true
        }
      }
    }
  }

  return dp[dp.length - 1][dp[0].length - 1]
}

let nums = [1,5,11,5]
 
const result = solution(nums)
console.log(result)