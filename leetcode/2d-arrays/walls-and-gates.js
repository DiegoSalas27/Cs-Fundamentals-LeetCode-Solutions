// https://www.lintcode.com/problem/663/

/*
  We are given a grid with 3 different values:
  
  -1: represents a wall
  0: represents a gate
  Inf: represents and empty room

  Its possible to walk over these empty rooms to get to any gate. We are asked to return the updated grid, 
  such that we calculate the minimum number of steps from any empty room to any gate.

  We know we want to perform a traversal that can move deeply in our matrix (we are walking straight on 
  4 directions until we find a wall or a gate), such that we can calculate the number of steps it takes 
  from an empty room to any gate.

  However, this approach would make our algorithm very slow, as we would revisiting rooms to calculate the
  distance from each room to any gate (assuming there are more empty rooms than gates).

  If we were to perform our traversal from a gate, we would have our starting point in a gate, and for every
  cell the we step in the amount of steps would increase by 1. The kind of traversal we can do can be either
  dfs or bfs. However, because we want our traversal to move deeply in our matrix we want to use dfs.

  Our algorithm should iterate through the matrix until we find a 0. From there, we want to perform dfs.
  We pass the grid, row, column and the step counter = 1. The logic within the dfs function is to move into
  4 directions deeply. for every recursive call the step counter should increased by 1, and we can only move
  into a certain direction if the current step value is less than the value at the next direction (this would
  mean that we cannot move through walls (-1) and we cannot move through rooms with a value less than our
  current step).

  The time complexity of our solution is O (n * m) because of the double for loop. The DFS will add a minor
  factor to our time complexity, as we won't revisit cells that have already the lowest values possible. The
  space complexity is the amount of recursive calls our dfs function can make: O (n * m) which is the size
  of the 2d array.
*/

let directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const solution = function (grid) { // T: O (n * m), S: O (n * m)
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 0) {
        dfs(grid, r, c, 1)
      }
    }
  }

  return grid
};

const dfs = function(grid, r, c, steps) {
  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i]
    const nextRow = r + direction[0]
    const nextCol = c + direction[1]

    if (nextRow < 0 || nextCol < 0 || nextRow >= grid.length || nextCol >= grid[0].length ||
      grid[nextRow][nextCol] <= steps)
      continue

    grid[nextRow][nextCol] = steps
    dfs(grid, nextRow, nextCol, steps + 1)
  }
}

let grid = [
  [2147483647, -1, 0, 2147483647],
  [2147483647, 2147483647, 2147483647, -1],
  [2147483647, -1, 2147483647, -1],
  [0, -1, 2147483647, 2147483647],
];

const result = solution(grid);
console.log(result);
