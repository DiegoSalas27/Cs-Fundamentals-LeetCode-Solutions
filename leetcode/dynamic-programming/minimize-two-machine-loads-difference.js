// https://www.geeksforgeeks.org/partition-a-set-into-two-subsets-such-that-the-difference-of-subset-sums-is-minimum/

/*
  In this problem we are asked to partition an array of positive integers such that the sum of each of them
  has the smallest difference. This is actually one common dp question in technical interviews and is
  disguised as assigning job to two machines such that the difference of the loads is minimum (offline
  algorithm).

  Ok, so what we can do is to perform a very similar algorithm as the patition equal subset sum problem.
  That is, get total sum of the given array, divide it by 2, round number to lower integer, create the
  matrix of n rows and target + 1 columns. After the matrix has been filled, we can check for the first
  true value starting at the last column at the last row of the matrix, from there we move to the left until
  we find a true. Once we find true, we can subtract that from our totalSum and that would give us the
  sum of the other subarray, from that result we can subtract again the number where we found the true
  assignment and that should be the minimum difference.
*/

const solution = function(nums) { // T: O (n * m), S: O (n * m)
  const total = nums.reduce((acc, val) => acc + val, 0)

  let target = Math.floor(total / 2)

  let dp = new Array(nums.length).fill(0).map(() => new Array(target + 1)) 

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

  for (let i = dp[0].length; i >= 0; i--) {
    if (dp[dp.length - 1][i] === true) {
      const otherSum = total - i
      return Math.abs(otherSum - i)
    }
  }
} 

let nums = [10, 20, 15, 5, 25];

const result = solution(nums)
console.log(result)