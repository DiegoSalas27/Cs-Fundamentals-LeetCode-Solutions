/*
  Insertion sort works best with small arrays and also when they are sorted or almost sorted, running with a
  time complexity of O (n) if the array is already sorted. Insertion sort is an algorithm that uses a
  variable that points to the last element of you subarray you have sorted so far (which is at the left side
  where you pointer that traverses the array is located at). If the element you are located right now is
  less that the pointer to the last element of this sorted (in place) subarray, then we want to locate it
  in its corresponsing position. This process will be executed iteratively
*/

const insertionSort = function(nums) { // T: O (n ^ 2), S: O (1)
  for (let i = 1; i < nums.length; i++) {
    let key = nums[i]
    let j =  i - 1

    while (j >= 0 && nums[j] > key) {
      nums[j + 1] = nums[j]
      j--
    }

    nums[j + 1] = key
  }

  return nums
}

let nums = [3,4,16,1,5]

const result = insertionSort(nums)
console.log(result)