/*
  https://www.youtube.com/watch?v=uXBnyYuwPe8&t=709s
  
  quick sort is one of the best algorithms to sort arrays, specially of small size, with a time complexity
  of O (n log n). Although, the worst case complexity is O (n ^ 2). 

  This algorithm works by sorting an array in place, and by getting a partition index, from which we will
  sort the left side of the array and the right side of the array taking the partitioning index as an index
  which we will not use for further recursive calls, but as right and left boundary for the recursive calls.
  quick sort will work faster than other sorting algorithms for small data sets.
*/

const quickSort = function(nums, left, right) {
  if (left < right) {
    const partitionIdx = getPartition(nums, left, right)

    quickSort(nums, left, partitionIdx - 1)
    quickSort(nums, partitionIdx + 1, right)
  }

  return nums
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

let nums = [3,4,16,1,5]

const result = quickSort(nums, 0, nums.length - 1)
console.log(result)