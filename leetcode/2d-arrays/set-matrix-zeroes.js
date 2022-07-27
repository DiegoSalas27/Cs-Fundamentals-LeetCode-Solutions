// https://leetcode.com/problems/set-matrix-zeroes/

/*
  We are given a mtrix with values 1 and 0's. For every 0 we find in the matrix, we need to set its entire row
  and column to 0's. 

  What we can do is to traverse the entire matrix and store in two arrays the rows and columns positions where
  we have found a 0. After that we can loop through both arrays in single for loops and set the rows and 
  columns to 0's.

  The time complexity of this approach is of O (n * m) given that we iterate the entire matrix. The space
  complexity of this solution is O (n + m), because the matrix could have only 0 values, and we would
  store every cell indexes in our hash sets.
*/

const solution1 = function(matrix) { // T: O (n * m), S: O (n + m)
  let rows = new Set()
  let cols = new Set()

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === 0) {
        rows.add(r)
        cols.add(c)
      }
    }
  }

  for (let row of rows) {
    for (let c = 0; c < matrix[row].length; c++) {
      matrix[row][c] = 0
    }
  }

  for (let col of cols) {
    for (let r = 0; r < matrix.length; r++) {
      matrix[r][col] = 0
    }
  }

  return matrix
}

/*
  However, we are asked to find a solution with a space complexity that does not scale with the size of the
  input. How do we do this?

  We can have two boolean variables that act as flags that tells us if there is a 0 in the first row or in the
  first column. We will use them later to transform all columns at row 0 to 0 and all of the rows at col 0 to
  0. Next, we can look for 0 starting at the second row and the second column, such that whenever we find a 
  0 at row >= 1 && column >= 1 we can turn the first row at the same column to 0 and the first column at the
  same row to 0:        
                        left border
                        |
  [                   [ v                
    [1,0,1,1,1],        [1,0,1,0,1],   <- top border
    [1,1,1,1,1],        [1,1,1,1,1],    
    [1,1,1,0,1],  =>    [0,1,1,0,1],
    [0,1,1,1,1],        [0,1,1,1,1],    
  ]                   ]             
  
  Why do we do this? We do this because after having visited every cell in the given matrix, we will then,
  perform another double for loop to set the matrix's 1's when row >= 1 && column >= 1 to 0's if we find a 0 
  in the left and top borders of our matrix where the 1's row or column matches with row or column where the
  0 is placed:

  [                     [                 
    [1,0,1,0,1],          [1,0,1,0,1],    
    [1,1,1,1,1],   =>     [1,1,1,0,1],  
    [0,1,1,0,1],          [0,0,0,0,0],    
    [0,1,1,1,1],          [0,1,1,0,1],    
  ]                     ]      
  
  Finally, we can use our flags to see if we need to set all the first row columns to 0 and all the first 
  column rows to 0. In our example we need to do that.

  [                   [             
    [1,0,1,0,1],        [0,0,0,0,0],
    [1,1,1,0,1],  =>    [0,0,1,0,1],
    [0,0,0,0,0],        [0,0,0,0,0],
    [0,1,1,0,1],        [0,0,0,0,0],
  ]                   ]     
  
  By approaching the problem in this way we are avoiding the discrepancies of setting cell values to 0 on the
  fly while iterating the matrix. 

  The time complexity of this approach is of O (n * m) given that we iterate the entire matrix. The space
  complexity of this solution is O (1), given that we are not allocating additional memory that scales with
  the size of the input.
*/

const solution2 = function(matrix) {
  let setRow0 = false, setCol0 = false

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === 0 && r === 0) {
        setCol0 = true
      }

      if (matrix[r][c] === 0 && c === 0) {
        setRow0 = true
      }

      if (matrix[r][c] === 0 && r >= 1 && c >= 1) {
        matrix[0][c] = 0
        matrix[r][0] = 0
      }
    }
  }

  for (let r = 1; r < matrix.length; r++) {
    for (let c = 1; c < matrix[r].length; c++) {
      if (matrix[0][c] === 0 || matrix[r][0] === 0) {
        matrix[r][c] = 0
      }
    }
  }

  if (setRow0) {
    for (let r = 0; r < matrix.length; r++) {
      matrix[r][0] = 0
    }
  }

  if (setCol0) {
    for (let c = 0; c < matrix[0].length; c++) {
      matrix[0][c] = 0
    }
  }

  return matrix
}

// let matrix = [[1,1,1],[1,0,1],[1,1,1]] // [[1,0,1],[0,0,0],[1,0,1]]

let matrix = [             
  [1,0,1,1,1],
  [1,1,1,1,1],
  [1,1,1,0,1],
  [0,1,1,1,1],
] // [[0,0,0,0,0],[0,0,1,0,1],[0,0,0,0,0],[0,0,0,0,0]]     

const result = solution1(matrix)
console.log(result)