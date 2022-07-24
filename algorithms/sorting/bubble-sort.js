/*
  bubble sort is the most basic sorting algorithm where we bubble up the values in the array so our array
  ends up being sorted in ascending order. This algorithm uses a double for loop so that we can start
  comparing to adjacent values, and bubble up the greatest one. At each iteration we are going to place
  the greatest value in the array in its final position. And because of this, we can decrease our upper
  boundry of the inner for loop, as the lasts elements in the array should already been sorted and there
  is no need to compare them with other values.
*/

const bubbleSort = function(nums) { // T: O (n ^ 2), S: O (1)
  for (let i = 0 ; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        let temp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = temp
      }
    }
  }

  return nums
}

let nums = [3,4,16,1,5]

const result = bubbleSort(nums)
console.log(result)