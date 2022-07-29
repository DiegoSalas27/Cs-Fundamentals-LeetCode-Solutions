// https://leetcode.com/problems/maximum-subarray/

/*
  We are given an integer array with numbers that may contain positive and negative numbers. We are asked to
  find the contiguous subarray which has the lasrgest sum and return tat sum. A subarray is a contiguous part
  of an array:

  Example:

  given this array: [1,2,3,4,5], a contiguous subarray would be [2,3,4]. The numbers are side to side, and
  there are no numbers in between in the original array.

  So, how do we solve this problem?

  We can solve it in the most naive possible way and see what we can gleen from that. That is, solve it
  using a brute force algorithm.

  Our brute force approach will perform a double for loop and update a maxSum variable, such that the maximum
  sum is stored in it. out inner for loop will make shrink as our outer for loop increase its i index. We will
  also use a totalSum variable that will store all of the sums we have done in our solution. 

  The time complexity of our solution is O (n ^ 2) because of the double for loop. 
  The space complexuty is O (1) because we don't allocate memory that scales with the size of the input
*/

const solution1 = function(nums) { // T: O (n ^ 2), S: O (1)
  let maxSum = -Infinity
  let totalSum = 0

  for (let i = 0; i < nums.length; i++) {
    totalSum = 0
    for (let j = i; j < nums.length; j++) {
      totalSum += nums[j]
      maxSum = Math.max(maxSum, totalSum)
    }
  }

  return maxSum
}

/*
  What could we gleen from the previous brute force solution? Honestly, nothing at all. Coming up with a
  dp solution for optimization problems (max/min) is very hard and takes time to understand and even to come
  up with a working solution. There is a better algorithm to beat cuadratic time and it yields a linear time
  complexity. This means that we will visit every number in our array once, which means we will need to 
  perform a for loop and do some magic within.

  Every problem that asks for contiguous subarrays or substrings of strings or arrays could be solved using
  the shifting pointers technique or dynamic programming. If the shifting pointers technique yields a solution
  with linear run rime, then that should be our default approach to go with, there is no need to complicate
  things with dp, specially because is not in our interest to increment the space complexity of our solution
  (which usually happens).

  However, if we take a close look at the problem, we can see that shifting pointers is not not a very good
  approach, since we would have two use the sliding window technique and check the summation of the numbers 
  within the left and right pointer (which would add complexity to our run time). We want to store the greatest 
  value at a current index building up of previous sums. At the same time we want to store the greatest sum so 
  far as we are only requested to return a the maximum sum, not returning the subarray, in which case the
  sliding window technique with shifting pointers would have been an acceptable approach.

  In our implementation we are actually using the sliding window technique, although we don't use shifting
  pointers. What happens is that we traverse from left to right our array and we compare if its better
  to take the next number in our array or if it's better to add it to our maxSumSoFar variable (whichever
  is greater is the one that maxSumSoFar will hold). Why? Because there is no point in adding a number to
  our current sum if its value is greater than its summation with the maxSumSoFar (remmeber that we can have
  negative values), we can just take that number and shift our focus on sub arrays starting at that number. 
  At the same time, we need to be aware that previously after shifting our focus, there could have been greater
  sums or values than our current value we are focusing if we indeed slided our focus. Let's say that the number
  we slide our focus on is greater than is sum with the maxSumSoFar, and let's say that it's the last number
  in our array. We cannot return than number at all, it could have been the case that previously there was
  a greater accumulated sum or value, which is why all the time we need to keep updating a global sum (call
  it maxSum). That will guarantee that our algorithm always store the greatest subarray sum even when sliding
  our focus.

  Let's see an example:

  maxSumSoFar = 6
  maxSum = 6

  [-2,1,-3,4,-1,2,1,-7,4]
           ^      ^   
           |      |

  Here we can see that the maxSum is 6. Following our logic we would expand our sub array and add -5,
  because is better to store 6 - 7 than -5. Then, we would find the value of 4:
  
  maxSumSoFar = -1
  maxSum = 6

  [-2,1,-3,4,-1,2,1,-7,4]
           ^           ^    
           |           |   
  
  Here we can see that we would take 4 instead of adding it to our maxSumSoFar: 4 > -1 + 4. However, 4
  is not the greatest sum of our subarrays, it is actually 6:

  maxSumSoFar = 4
  maxSum = 6

  maxSum will be the variable that makes sure that we don't lose the reference of the greatest sum of all of
  the subarrays we have analyzed.

  The time complexity of this solution is O (n) because we iterate through the array once. Our space 
  complexity is O (1), because we don't allocate memory that scales with the size of the input.
*/

const solution2 = function(nums) { // T: O (n), S: O (1)
  let maxSumSoFar = nums[0]
  let maxSum = nums[0]

  for (let i = 1; i < nums.length; i++) {
    maxSumSoFar = Math.max(maxSumSoFar + nums[i], nums[i])
    maxSum = Math.max(maxSum, maxSumSoFar)
  }

  return maxSum
}

let nums = [-2,1,-3,4,-1,2,1,-5,4]

const result = solution1(nums)
console.log('brute force solution: ', result, '\n')

const result2 = solution2(nums)
console.log('dynamic programming solution: ', result)