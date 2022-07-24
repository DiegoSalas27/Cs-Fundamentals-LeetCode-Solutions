/*
  Selection sort works by selecting at each iteration the smallest value and swaping it with the value in
  our array at the first index, and then at the second index, and so on iteratively. Again, we can omit
  performing comparisons with elements that have already been sorted, just like bubble sort.
*/

const selectionSort = function(nums) { // T: O (n ^ 2), S: O (1)
  for (let i = 0; i < nums.length; i++) {
    let smallest = i

    for (let j = i + 1; j < nums.length; j++) {
      if (nums[smallest] > nums[j]) {
        smallest = j
      }
    }

    let temp = nums[i]
    nums[i] = nums[smallest]
    nums[smallest] = temp
  }

  return nums
}

let nums = [3,4,16,1,5]

const result = selectionSort(nums)
console.log(result)