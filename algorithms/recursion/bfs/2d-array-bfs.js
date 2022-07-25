/*
  2d array bfs traversal uses an iterative solution to process each cell following a particular direction. 
  To avoid processing a cell more than once, we use an 2d array with each cell initialized with false, which 
  signifies that a particular cell has not been processed. When we process a cell we update the boolean 2d
  array at that cell to true and that makes sure that our queue does not add previously processed cells.

  Because we visit every cell once, the time complexity is O (n). The space complexity is O (n), because
  we use another 2d array to keep a reference of the cells that have been visited previously.
*/

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1]
]

const bfsTraversal = function(grid, r, c) { // T: O (n), S: O (n)
  let result = []
  let seenNodes = new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(false))
  let queue = [[r, c]]
  seenNodes[r][c] = true

  while(queue.length) {
    const [row, col] = queue.shift()
    result.push(grid[row][col])

    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i]
      const nextRow = row + direction[0]
      const nextCol = col + direction[1]

      if (nextRow < 0 || nextCol < 0 || nextRow >= grid.length || nextCol >= grid[0].length ||
        seenNodes[nextRow][nextCol] === true)
        continue

      seenNodes[nextRow][nextCol] = true
      queue.push([nextRow, nextCol])
    }
  }

  return result
}

let grid = [
  [1,2,3,4,5],
  [6,7,8,9,10],
  [11,12,13,14,15],
  [16,17,18,19,20],
]
const result = bfsTraversal(grid, 2, 2)
console.log(result)