// https://leetcode.com/problems/transpose-matrix/

/*
  We are given a 2D array of integers and we are asked to return its transpose matrix. What is the transpose
  matrix?

  [                               [   
    [1, 2, 3],  => transpose  =>    [1, 4],
    [4, 5, 6]                       [2, 5],
                                    [3, 6]
  ]                               ]

  The transpose matrix is a matrix flipped over its main diagonal, switching the matrix's row and column
  indices. So in the example above, 2 is at index (0, 1) and then is flipped to (1, 0). 3 is at index
  (0, 2) and then is flipped to (2, 0). Note the the number of columns in the transpose matrix is the number
  of rows in the original matrix, and the number of rows in the tranposed matrix is the number of columns of
  the original matrix.

  With this intuition, we can create a new empty matrix with empty values that has the number of columns
  and rows of the resulting transpose of the matrix given.

  After that, we can iterate over the original matrix and for every cell we check, we can assign that value
  to the tranposed matrix just inverting columns and rows indexes.

  The time complexity of this solution is O (n * m) because we are visiting every cell in the given matrix.
  The space complexity is of O (n * m) because we allocate memory for the transpose matrix we create.
*/

const solution = function (matrix) { // T: O (n * m), S: O (n * m)
  let tranpose = new Array(matrix[0].length)
    .fill(0)
    .map(() => new Array(matrix.length));

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      tranpose[c][r] = matrix[r][c];
    }
  }

  return tranpose;
};

// let matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ]; // [[1,4,7],[2,5,8],[3,6,9]]

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
]; // [[1, 4],[2, 5],[3, 6]] 

const result = solution(matrix);
console.log(result);
