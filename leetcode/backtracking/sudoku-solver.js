// https://leetcode.com/problems/sudoku-solver/

/*
  We are asked to write a program to solve a Sudoku puzzle by filling the empty cells.
  The rules are layed out in leetcode. 

  our sudoku board is of 9 * 9 size

  Thinking about the solution, to do this programatically seems extremly hard because we need to account
  for every decision we would make in paper to solve the problem without having repeated digits in the same
  row, column or 3*3 sub grids. So a natural brute forceish approach would be to try to assign any number
  from 1 to 9 in each empty cell recursively from top left moving to the right and down after we have 
  completed filling a row. However, because we have know that there are restrictions in our problem, we
  would be able to backtrack whenever it's impossible to place any number from 1 to 9 in a particular
  cell without breaking any of the sudoku rules.

  Whenever we need to find a solution or all of the possible solutions, and whenever there are restrictions
  a backtracking algorithm is always fit. Backtracking is an approach that we can use to solve problems
  recursively with a set of restrictions that might force us to backtrack to meet those restrictions without
  moving to far, so that our time complexity remains reasonable within its exponential complexity.

  So how do we solve the sudoku puzzle using a backtracking approach?

  We can first create our data structures than can help use validate the restrictions of sudoku. We can have
  tree arrays of size 9: rows, cols, boxes. Each index in the row array would hold all the values being
  placed at that row. For an easy lookup we can just instantiate an object and have the numbers in the row
  as keys. Each index in the cols array would hold all the values being placed at each column. We can also
  instantiate object in each index where the keys represent the numbers being placed in a column. Finally,
  the boxes array would store at each index objects that hold the numbers as keys that are placed in each
  3*b sub grid, because we have 9 sub grids the array of size 9 works.

  Ok, after this we can start thinking about how to solve the problem recursively. Backtracking has a very
  standard structure in terms of the steps to take, generally, to solve any problem. That is, first, think
  about your base case: when ever our current row is out of the bound of our sudoku grid, that would mean
  that we have placed all of the correct values in the grid and we would return true from there.

  Then, we would have to place the corresponding values in our cells recursively. We place a value in a cell,
  validate if it does not break any of our rules, and if it doesn't, we can move to our next cell to the 
  right. If moving to the right place our column variable out of the bounds of the grid, that means that we 
  need to move to the next row at column 0 to start placing values. Whenever any of this recursive calls 
  breaks any of the rules after having tried placing all the values from 1 to 9 in a cell, it means that
  there is no possible solution for the current cell, and it means that we need to backtrack and update the
  value of our previous cell until we are not breaking any rules. And this logic would happen recursively 
  until we have filled the entire grid.

  Now, when we place a value in our matrix, we need to create a key in our 3 arrays for the current current
  row, column, and box that indicates the number we have placed in the cell we are in at that time. 
  After that, the validation would just make sure that there is no key at that particular row, column, or
  box in any of our 3 arrays so that we can keep recursively filling our grid.

  The final question would be, how do we get the box? Well, we can get the box following this logic:

  given this empty matrix, how do we know in which box we are currently?

  [  0  1  2  3  4  5  6  7  8        
  0 ['','','','','','','','',''],     
  1 ['','','','','','','','',''],     
  2 ['','','','','','','','',''],     
  3 ['','','','','','','','',''],     
  4 ['','','','','','','','',''],     
  5 ['','','','','','','','',''],     
  6 ['','','','','','','','',''],     
  7 ['','','','','','','','',''],     
  8 ['','','','','','','','',''],     
  ]                                   

  [  0  1  2  3  4  5  6  7  8    
  0 [      ], [      ],[      ],
  1 [  0   ], [   1  ],[   2  ],
  2 [      ], [      ],[      ],
    ---------------------------
  3 [      ], [      ],[      ],
  4 [  3   ], [  4   ],[  5   ],
  5 [      ], [      ],[      ],
    ---------------------------
  6 [      ], [      ],[      ],
  7 [  6   ], [  7   ],[  8   ],
  8 [      ], [      ],[      ],
  ]

  Here we can see that we parition our matrix like so. If we are in row = 2 and col = 2 we would be at box
  1. How can we calculate this programatically? Well, we can say that any row and any column we are in can
  be divided by three and that value can be rounded down. So, for example, Math.floor(2 / 3) = 0 and 
  Math.floor(2 / 3) * 3 = 0. Here we have multiplied the value of the division of the row placement by 3.
  Why? Because doing so will allow us to sum the result from the row division plus the col division at the
  an integer from 1 to 8. Let's try placing ourselves in box 7 to see this in action. Let's say that the
  row we are currently placed in is 6, and our column is 4. For the row: Math.floor(6/3) * 3 = 6. For the 
  column: Math.floor(5 / 3) = 1. 1 + 6 is 7. So, based on our column and row we can tell in which box
  we are currently at.

  Let's go ahead and solve this problem
*/

const solution = function (board) {
  const len = board.length;

  // Create the arrays for applying the sudoku rules

  let rows = new Array(len);
  let cols = new Array(len);
  let boxes = new Array(len);

  // Create empty objects at each index where numbers from 1 to 9 will be the keys

  for (let i = 0; i < len; i++) {
    rows[i] = {};
    cols[i] = {};
    boxes[i] = {};
  }

  // iterate through the matrix and start filling our arrays for further validations

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] !== '.') {
        let value = board[r][c]
        let boxId = getBoxId(r, c)
        rows[r][value] = true
        cols[c][value] = true
        boxes[boxId][value] = true
      }
    }
  }

  // perform the backtracking solution

  backtracking(board, 0, 0, len, rows, cols, boxes);

  return board
};

const backtracking = function(board, r, c, len, rows, cols, boxes) {
  // if the row position is out of the bounds it means we have solved the sudoku puzzle

  if (r >= len) return true

  // check if the cell at the current row and index holds a number

  if (board[r][c] === '.') {
    // start placing values from 1 to 9 until the sudoku rules are met

    for (let i = 1; i <= 9; i++) {
      const value = i.toString()
      board[r][c] = value
      let boxId = getBoxId(r, c)
      let row = rows[r]
      let col = cols[c]
      let box = boxes[boxId]

      if (isValid(row, col, box, value)) {
        // if the rules are met, lets add that value key to all of our validation arrays

        row[value] = true
        col[value] = true
        box[value] = true

        // if the current cell holds a number, then, we just want to move on recursively
        // if we are out of the bounds in the columns, move to the next row at column 0,
        // else keep moving to the right

        if (c + 1 < len) {
          if (backtracking(board, r, c + 1, len, rows, cols, boxes)) {
            return true
          }
        } else {
          if (backtracking(board, r + 1, 0, len, rows, cols, boxes)) {
            return true
          }
        }

        // if the validations of futher recursive calls are not met it means that we need to try
        // to find another value for this current cell. So let's erase that key of array validation
        // arrays

        row[value] = false
        col[value] = false
        box[value] = false
      }
    }

    // if no value was able to comply with the sudoku rules, assign an empty cell to the current row
    // and don't return anything, this will trigger the previous function call to change the value
    // of its corresponding cell

    board[r][c] = '.'
  } else {
    // if the current cell holds a number, then, we just want to move on recursively
    // if we are out of the bounds in the columns, move to the next row at column 0,
    // else keep moving to the right

    if (c + 1 < len) {
      return backtracking(board, r, c + 1, len, rows, cols, boxes)
    } else {
      return backtracking(board, r + 1, 0, len, rows, cols, boxes)
    }
  }
}

const getBoxId = function(r, c) {
  let row = Math.floor(r / 3) * 3
  let col = Math.floor(c / 3)

  return row + col
}

const isValid = function(row, col, box, value) {
  if (row[value] || col[value] || box[value]) return false
  return true
}

let board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const result = solution(board);
console.log(result);
