// https://leetcode.com/problems/kth-largest-element-in-an-array/

/*
  The kth largest element problem asks us to return the kth largest element of the sorted array.
  We can use any sorting algorithm for this, but the best algorithm we can think of is quickSelect
  or mergeSort. Both of them would work fine. However quickSelect has a nice implementation that 
  can saves us a lot of unnecesary computation because it will only sort our array where
  the targetIdx is included.
*/

const solution = function(nums, k) { // T: O (n log(n)), S: O (1)
  const len = nums.length
  targetIdx = len - k
  return quickSelect(nums, 0, len - 1, targetIdx)
}

const quickSelect = function(nums, left, right, targetIdx) {
  if (left < right) {
    const partitionIdx = getPartition(nums, left, right)

    if (partitionIdx === targetIdx) {
      return nums[partitionIdx]
    } else if (partitionIdx < targetIdx) {
      return quickSelect(nums, partitionIdx + 1, right, targetIdx)
    } else {
      return quickSelect(nums, 0, partitionIdx - 1, targetIdx)
    }
  }

  return nums[targetIdx]
}

const getPartition = function(nums, left, right) {
  let pivot = nums[right]
  let i = left

  for (let j = left; j < right; j++) {
    if (nums[j] < pivot) {
      swap(nums, i, j)
      i++
    }
  }

  swap(nums, i, right)

  return i
}

const swap = function(nums, i, j) {
  let temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}

let nums = [3,2,1,5,6,4], k = 2

const result = solution(nums, k)
console.log(result)