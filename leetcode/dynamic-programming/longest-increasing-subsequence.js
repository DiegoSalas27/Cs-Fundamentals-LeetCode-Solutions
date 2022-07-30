// https://leetcode.com/problems/longest-increasing-subsequence/

/*
  We are given an array of positive numbers and we are asked to return the longest strictly increasing 
  subsequence.

  Example:

  let nums = [0, 3, 1, 6, 2, 2, 7] => [3, 6, 2, 7]

  This question has many different solutions, some of them better than the other. There is even a solution
  of n log n which uses binary search which is really nice. 

  We will use tabulation for the first solution, because the logic to come up with the solution is not that
  hard. So, we can start analyzing the last element in our array and claim that that longest increasing
  subsequence is of size 1 starting at the last index of our array. Ok, so how do we represent that using
  dp? 

  Create an array of size nums.length and initialize everything with 1, because without iterating the array
  we know that at least we will have a longest increasing subsequence of 1. After that, we can perform a 
  double for loop. The outer for loop should start at the previous of the last element of the array:

  [0, 3, 1, 6, 2, 2, 7]
                  ^
                  |

  From there, we should asks ourselves the following question: is the number at the next index greater
  than the number at the current index? If it is we know that our longest increasing subsequence is greater
  than 1 at least, so let's leverage the dp array and say the following: 
  
  dp[dp.length - 2] = max(dp[dp.length - 2], 1 + dp[dp.length - 1])

  Why are we doing this? Because we are going to compare the dp at index dp.length - 2 with all of the other
  subsequent dp indexes (which is the reason of our double for loop). The inner for loop is in charge of
  comparing if the subsequent value of our nums array is greater than the current index value of nums array
  we are standing at, and then if they are, we leverage our dp array to update the value of dp at the current
  index we are standing at. For instance:

  nums = [1,5,2,3,7], length = 5
                 ^
                 |

  dp[4] = 1 // [7]
  dp[3] = 2 // [3, 7]
  dp[2] = 3 // [2, 3, 7] 
  dp[1] = 2 // [5, 7] 
  dp[0] = 4 // [1, 5, 7] < [1, 2, 3, 7]

  So here you can see that dp[0] = max(1 + dp[1], dp[2], dp[3], dp[4])

  We need to try every summation, because we can see that 1 + dp[1] yields 3 ([1, 5, 7]), but 
  1 + dp[2] yields 4 ([1, 2, 3, 7])

  The time complexity of this solution is O (n ^ 2), because of the double for loop. The space complexity
  is O (n) because that's the size of our dp array
*/

const solution = function(nums) { // T: O (n ^ 2), S: O (n)
  let dp = new Array(nums.length).fill(1)

  for (let i = nums.length - 2; i >= 0; i--) {
    for (let j = i + 1; j < nums.length; j++){
      if (nums[i] < nums[j]) {
        dp[i] = Math.max(dp[i], 1 + dp[j])
      }
    }
  }

  return Math.max(...dp)
}

/*
  While this solution is very optimal, there is a better one and it relies on binary search.
  What we do is create an empty array (call it result) and iterate through or nums array. For each value in 
  our nums array, if our result array is empty of if the last value of our result array is less than the
  current value we get from nums array, just push it to our result array. However, if our array is not empty,
  but the current value we get from nums array is less that the last value of our result array (which as
  you can already tell is the greatest one in our result array) we perform binary search to see where this
  value could be placed within our result array.

  Why do we do this? Because this current value of our result array could be less or greater than any value
  before the last value in our result array, and because of that, we can update any index of our result array
  where this value represents a lower value than the current value at that index. Why do we do this? because
  that will ensure that our result array will always hold the smallest values and at the same time comply
  with the longest increasing subsequence restriction:

  nums = [1,5,2,3,7], length = 5, result []

  1 result = []
  2 result = [1]
  3 result = [1, 5]
  4 result = [1, 2] // here we replace 5 with 2 (in our binary search)
  5 result = [1, 2, 3]
  6 result = [1, 2, 3, 7]

  It is as simple as this. 

  The time complexity of this solution is O (n log n) because we iterate through the nums array and at every
  iteration we perform binary search which is O (log n). the space complexity is O (n), becase in the worst
  case scenario our result array will store every value of the nums array.
*/

const solution2 = function(nums) { // T: O (n log n), S: O (n)
  let result = []
  for (let i = 0; i < nums.length; i++) {
    if (result.length === 0 || result[result.length - 1] < nums[i]) {
      result.push(nums[i])
    } else {
      const idx = getIdx(result, nums[i])
      result[idx] = nums[i]
    }
  }

  return result.length
}

const getIdx = function(result, num) {
  let left = 0, right = result.length - 1

  while (left <= right) {
    let mid = Math.floor((left + right) / 2)

    if (result[mid] === num) return mid
    else if (result[mid] < num) left = mid + 1
    else right = mid - 1
  }

  return left
}

let nums = [3,5,6,2,5,4,19,5,6,7,12]

let result = solution(nums)
console.log('tabulation approach: ', result)

result = solution2(nums)
console.log('binary search approach: ', result)