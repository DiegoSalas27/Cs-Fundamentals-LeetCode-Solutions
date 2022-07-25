/*
  2d array dfs traversal uses recursion to process each cell following a particular direction. To avoid
  processing a cell more than once, we use an 2d array with each cell initialized with false, which 
  signifies that a particular cell has not been processed. When we process a cell we update the boolean 2d
  array and that makes sure that our recursive call processes each cell once and the it the stack call
  doesn't overflow.

  Because we visit every cell once, the time complexity is O (n). The space complexity is O (n), because
  we use another 2d array to keep a reference of the cells that have been visited previously.
*/

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1]
]

const dfsTraversal = function(grid) { // T: O (n), S: O (n)
  let result = []
  let seenNodes = new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(false))

  const dfs = (grid, row, col) => {
    seenNodes[row][col] = true
    result.push(grid[row][col]) 

    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i]
      const nextRow = row + direction[0]
      const nextCol = col + direction[1]

      if (nextRow < 0 || nextCol < 0 || nextRow >= grid.length || nextCol >= grid[0].length ||
        seenNodes[nextRow][nextCol] === true)
        continue

      dfs(grid, nextRow, nextCol)
    }
  }

  dfs(grid, 0, 0)

  return result
}

let grid = [
  [1,2,3,4,5],
  [6,7,8,9,10],
  [11,12,13,14,15],
  [16,17,18,19,20],
]
const result = dfsTraversal(grid)
console.log(result)