/* explanation as to why merge sort performs in n log(n):
 https://www.youtube.com/watch?v=alJswNJ4P3U&t=1581s */

/* comparison between merge sort and quick sort
  https://www.geeksforgeeks.org/quick-sort-vs-merge-sort/
*/

/*
  Merge sort is one of the best algorithms to sort arrays of any size. It will always perform in n log (n)
  which is nice. It is well suited for large arrays. 
  
  Merge sort works by partitioning the array into 2 halves at each recursive call. When the sub arrays have a
  length of 1, they are merged in ascending order and this merge process is performed from bottom to the top.
  This algorithm doesn't perform sorting in place, which means that it creates 2 arrays at each recursive 
  call.
*/

const mergeSort = function(nums) {
  if (nums.length === 1) return nums

  let mid = Math.floor(nums.length / 2)

  let leftArray = nums.slice(0, mid)
  let rightArray = nums.slice(mid)

  return merge(
    mergeSort(leftArray),
    mergeSort(rightArray)
  )
}

const merge = function(leftArr, rightArr) {
  let result = []
  let leftP = 0, rightP = 0

  while (leftP < leftArr.length && rightP < rightArr.length) {
    if (leftArr[leftP] < rightArr[rightP]) {
      result.push(leftArr[leftP])
      leftP++
    } else {
      result.push(rightArr[rightP])
      rightP++
    }
  }

  result = result.concat(leftArr.slice(leftP)).concat(rightArr.slice(rightP))

  return result
}

let nums = [3,4,16,1,5]

const result = mergeSort(nums)
console.log(result)