// https://leetcode.com/problems/house-robber/

/*
  We are given an array with numbers that represent how much money neighbouring houses have. We want to rob
  as much money as possible without robbing houses that are adjacent. We are asked to get the maximum money
  we can without robbing adjacent houses.

  Example:

  nums = [1, 2, 3, 1]

  Here, we can rob house at index 0 and then rob house at index 2. That would give us a profit of 4. We can
  also rob house at index 1 and then rob house at index 3, but that would give us a profit of 3.

  Ok, so how do solve this problem with a linear run time complexity? Well, while using the brute force 
  approach will also allow us to get the maximum profit, it most likely won't help us building up our 
  intuition for solving the problem with dp. However, if you practice a lot of dp problems you will soon
  find some patterns that can allow you to tell how to them.

  For example, let's say we want to rob one house. So let's start with the first one and see how much money
  we can make from it. So, by stepping on house at index 0 we can rob 1 unit. By stepping on house at index
  1 how much money we can rob? Well, here we can say that if the amount of money on house at index 1 is 
  greater than the amount of money on house at index 0, which is why after walking through 2 adjacent houses
  starting from the left of the array, we can rob a total of 2. If we step on the third house, how much
  money can we rob? It depends, if the amount of money on the third house plus the amount of money on the
  first house (we skipped on house) is greater than the house in the middle we are better off robbing both
  houses. In this case, this is true: money on house at index 2 plus money on house at index 0 = 4 and this
  is greater than money on house at index 1 = 2. If we step on house 4 we can follow the same logic. The 
  maximum amount of money we can rob by trying to rob 4 houses is either the summation of house at index
  3 and house at index 1 or house at index 2 plus house at index 0. We don't even need to compute those
  summations, we already know that robbing up to 3 houses the maximum we can make is 4, and robbing up to
  2 houses the maximum we can make is 2. We just need to add money on house at index 3 with the computed
  calculation of robbing up to two houses and compare it with computed calculation of robbin up to 3 houses.

  As we can see, we are iterating through the array and we are asking ourselves how much money I can rob if
  we rob 1 house, 2 houses, 3 houses, etc. and we are building up our solutions based on previous calculations
  and here is where dynamic programming can help us. We can create an array with empty values and start by
  saying assigning values at each index iteratively while working our way up based on previous indexes 
  calculations.

  The time complexity of our solution is O (n) because we iterate through the array once. Our space complexity
  is O (1) because memory is not increasing with the size of our input
*/

const solution = function(nums) {
  if (nums.length <= 2) return Math.max(...nums)

  nums[1] = Math.max(nums[0], nums[1])

  for (let i = 2; i < nums.length; i++) {
    nums[i] = Math.max(nums[i - 1], nums[i - 2] + nums[i])
  }

  return nums[nums.length - 1]
}

let nums = [2,7,9,3,1]

const result = solution(nums)
console.log(result)