// https://leetcode.com/problems/product-of-array-except-self/

/*
  We are given an array of nums which is an integer array, where the answer at the ith position of a resulting array
  should be the multiplication of all of the elements in the nums array except for the element at that position.
  We must write a linear time algorithm without using division. How do we do this?

  This problem asks for a solution of a trivial, but rare algorithm in computer science which is a variation of
  prefix sum, and is actually using multiplication for this. I believe this problem rarely would be asked in an
  interview, because of how rare it is, and because it actually doesn't test any analytical skill of technical skill.
  

  Having said that, let's think about a solution. Say we have an array nums: [1, 2, 3, 4].
  We know that we can use a prefix array and a postfix array to compute the result array which will hold the multipli
  cation of all the numbers except for the one at the ith index. For example:

  nums: [1, 2, 3, 4]
  prefix: [1, 2, 6, 24] // note that this is similar to prefix sum in the sense that numbers appear as a sequential
  // multiplication of the numbers in the nums array => [1, 1 * 2, 2 * 3, 6 * 4]
  postfix: [24, 24, 12, 4] // This is the same case but starting at the last index.

  So, how do we even use this? Well we can be smart and say the following now: 
  result[0] will be 24, because the previous value of 1 (in the prefix array) doesn't exist and we can take it as 1,
  and the next position of 1 in the postfix array is 24. So 1 * 24 = 24. Ok..., let's try now result[1]. the previous
  value of 2 at prefix array is 1 (because that's how much is the multiplication of numbers in its left side) and the
  next value of 2 in the postfix array is 12, because that is the multiplication of numbers in its right side. It's 
  fair to say that the multiplication of both sides should give you the total multiplication of numbers in the array
  except for nummber 2. We can apply this logic at each step of our iteration.

  a bit of an optimization is to use prefix and postfix as intergers that will hold values that scale as we traverse
  the nums array. And this will be more clear in the implementation.

  The time complexity of this solution is O (n). The space complexity is also O (n) as we store values in the result
  array.
*/

const solution = function(nums) { // T: O (n), S: O (n)
  let result = new Array(nums.length)

  let prefix = 1

  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix
    prefix *= nums[i]
  }

  let postfix = 1

  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= postfix
    postfix *= nums[i]
  }

  return result
}

let nums = [1,2,3,4]

const result = solution(nums)
console.log(result)