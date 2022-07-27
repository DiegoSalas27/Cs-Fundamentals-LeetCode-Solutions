// https://leetcode.com/problems/search-a-2d-matrix/

/*
  We are given a matrix with integers in each row that are sorted from left to right. Its guaranteed that the
  first integer of each row is greater than the last integer of the previous row.

  We are asked to write an efficient algorithm that searches for a value target in am m * n matrix. A naive
  approach would be to iterate over the entire matrix and check if the value is found. This wuld give us a
  run time of n * m. Can we do better?

  Yes. Leveraging the properties of the given matrix, we can compare the given target of the last element
  at each row of the matrix. If the target is <= that the last element, we now for sure that if this target
  is present in the matrix, it should be at this row. Once we have done that, we can perform a binary search
  to look for the value.

  The time complexity of this solution if O (n + log (m)) where n is the number of rows (maximum possible
  comparison to find the row to perform binary search on) and m is the number of columns at any row (log (m)
  is the run time of binary search).
*/

const solution = function(matrix, target) { // T: O (n + log(m)), S: O (1)
  for (let r = 0; r < matrix.length; r++) {
    const lastCol = matrix[r].length - 1
    if (target <= matrix[r][lastCol]) {
      let left = 0, right = lastCol

      while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (target < matrix[r][mid]) {
          right = mid - 1
        } else if (target > matrix[r][mid]) {
          left = mid + 1
        } else {
          return true
        }
      }
      return false
    }
  }

  return false
}

let matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13

const result = solution(matrix, target)
console.log(result)