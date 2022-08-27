// https://leetcode.com/problems/3sum/

/*
  The 3SUM problem is a problem that leverages on the two sum problem, that can be solved using some
  techniques to reduce the run time to O (n ^ 2). How do we do this?

  We can first think of a way that allows us to traverse the array the least amount of times possible. 
  How about if we first sort the array in ascending order. Ok, why would we do that? because after that
  we can fixate on a number in the array starting from the left and then, find subsequent numbers that
  sum 0 with the fixedNumber. 

  So we would use shifting pointers to reduce the time complexity (because a hash map could work as well)
  remember that this fixedNumber acts as our target and the problem could be reduced to 2SUM. However, 
  shifting pointers would allow us to increase the left pointer if the sum is less than 0, and right pointer
  would decrease if our sum is greater than 0, and this would work perfectly well because the array is 
  sorted (that's the reason). If it's still not clear, let's look at an example:

  nums = [-1,0,1,2,-1,-4]

  // sort it

  nums = [-4, -1, -1, 0, 1, 3]

  fixedNum = -4
  Our left pointer should start at the next index (as long as the next number in the next index is different
  from -4) because we don't want duplicates. Then we can just run a while loop until left pointers is greater
  or equal to right pointer. This pointers will move based on the sum value as mentioned before. Eventually
  we want to calculate all possible sums for the fixedNumber which is why this while loop will catch every
  possible combination.

  The time complexity of this solution is O (n ^ 2) because of the nested loop. The space complexity if
  O (1), because we are not allocating more memory as the size of our input grows
*/

const solution = function(nums) { // T: O (n ^ 2), S: O (1)
  let res = []
  nums.sort((a, b) => a - b) //  O (n log n)

  for (let i = 0; i < nums.length; i++) { // O (n ^ 2)
    if (i > 0 && nums[i] === nums[i - 1]) continue

    const fixedNum = nums[i]

    let left = i + 1, right = nums.length - 1

    while (left < right) {
      const sum = fixedNum + nums[left] + nums[right]

      if (sum < 0) {
        left++
      } else if (sum > 0) {
        right--
      } else {
        res.push([fixedNum, nums[left], nums[right]])
        left++
        while (nums[left] === nums[left - 1] && left < right) left++
      }
    }
  }

  return res
}

let nums = [-1,0,1,2,-1,-4]

const result = solution(nums)
console.log(result)