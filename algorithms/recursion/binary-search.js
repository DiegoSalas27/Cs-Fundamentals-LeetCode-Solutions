/*
  Binary search is an algorithm we can use to find the index or the value we are looking
  for in a sorted array. It could also be used in problems were its logic seems fit. 

  Binary search can be implemented iteratively or recursively. The iteratively implementation is better
  since the space complexity remains constant O (1). However, the time complexity in both implementations
  is exactly the same. 

  Binary search works by finding the middle index of an array and from there comparing the value that the 
  array has at that middle index with the value we are looking for. Based on that comparison we update our
  left pointer to mid + 1 if our target is greater than array at the mid pointer or we update the right
  pointer if our target is less than array at the mid pointer. If the values are equal we do whatever the
  problem tells us to do.

  Whenever a problem is divided in halves recursively we create a perfect binary tree like structure were
  the height is log (n) and this is why the time complexity of binary search is log (n).
*/

var binarySearchRecursive = function(sortedArr, left, right, val) { // time complexity: O(log n), space complexity: O(log n)
  let mid = Math.floor((left + right) / 2) // round down

  if (sortedArr[mid] < val) {
    return binarySearch(sortedArr, mid + 1, right, val)
  } else if (sortedArr[mid] > val) {
    return binarySearch(sortedArr, left, mid - 1, val)
  } else {
    return mid
  }
}

var binarySearchIterative = function(sortedArr, target) { // time complexity: O(log n), space complexity: O(1)
  let left = 0, right = sortedArr.length

  while(left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (sortedArr[mid] > target) {
      right = mid - 1
    } else if (sortedArr[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }

  return - 1
}

const result = binarySearchIterative([1,2,3,4,5,6,7], 5)
console.log(result)