// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

/*
  We are asked to find the first position of a target value on an array sorted in ascending order.
  We can do this iteratively by doing a for loop on our array, but that would take us O (n) time.
  We need to return this result in O (log n time). How do we do this?

  Use binary search. Find the index were we first encounter the target and from there, start performing
  binary search on both sides of the index we first found. Repeat this process of both sides recursively
  until we find the first and last index where this target value is found. 

  If the target is not found we need to return [-1, -1]

  Because we use binary search implemented in an iteratively manner the time complexity is O (log n), and the
  space complexity is O (1)
*/

const solution = function(nums, target) { // T: O (log n), S: O (1)
  if (nums.length === 0) return [-1, -1]

  let idx = binarySearch(nums, target)

  if (idx === -1) return [-1, -1] 

  let leftBoundary = leftBinarySearch(nums, target, idx - 1)
  let rightBoundary = rightBinarySearch(nums, target, idx + 1)

  return [leftBoundary, rightBoundary]
}

const binarySearch = function(nums, target) {
  let left = 0, right = nums.length - 1

  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1
}

const leftBinarySearch = function(nums, target, idx) {
  let left = 0, right = idx
  let leftBoundary = idx + 1

  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] < target) {
      left = mid + 1
    } else {
      leftBoundary = mid
      right = mid - 1
    }
  }

  return leftBoundary
}

const rightBinarySearch = function(nums, target, idx) {
  let left = idx, right = nums.length - 1
  let rightBoundary = idx - 1

  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] > target) {
      right = mid - 1
    } else {
      rightBoundary = mid
      left = mid + 1
    }
  }

  return rightBoundary
}


let nums = [5,7,7,8,8,10], target = 8
 
const result = solution(nums, target)
console.log(result)