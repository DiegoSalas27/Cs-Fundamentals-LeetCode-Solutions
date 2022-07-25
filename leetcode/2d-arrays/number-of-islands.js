// https://leetcode.com/problems/number-of-islands/

/*
  In this problem, we are given a 2d array containing '1' or '0' characters arbitratily distributed in each
  cell. We are asked to find the number of islands. An Island is surrounded by water and is formed by 
  connecting adjacent lands horizontally or vertically. The 4 edges of the grid are surrounded by water.

  To solve this problem we need to visit every cell in the grid to see if we found a piece of an island. If
  we do, we can perform either bfs or dfs until we flood every piece of connected land. After that process,
  we can say that we have found one island. We can keep looping through the whole matrix until we find another
  piece of land, and perform dfs and bfs, and that would be another island (and so on). Once we have iterated 
  through the entire matrix, we will have counted the number of islands.

  This algorithm has a time complexity of O (n * m) because we iterate through the entire matrix, and at most 
  the dfs or bfs would take O (n * m) as well, but this would be added to the time complexity of the matrix
  iteration as we only flood the pieces of island once O (2 (n * m)). 
  
  The space complexity would be O (n * m) using dfs because we could have in our stack n * m calls

 [[1,1,1,1] // O (n * m) for dfs
  [1,1,1,1]
  [1,1,1,1]
  [1,1,1,1]]


  [[1,1,1,.] // O (max(n, m)) for bfs (dots represent max values that a queue can have at any time)
  [1,1,.,1]
  [1,.,1,1]
  [.,1,1,1]]

  [[1,1,1,.] // O (min(n, m)) for bfs (dots represent max values that a queue can have at any time)
   [1,1,.,1]] 

  The space complexity of bfs depends on the number of rows and columns of the matrix given.
*/

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
]

const solution = function(grid) {
  let numIslands = 0

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === '1') {
        bfs(grid, row, col)
        numIslands++
      }
    }
  }

  return numIslands
}

const bfs = function(grid, r, c) {
  let queue = [[r, c]] 

  while(queue.length) {
    const [row, col] = queue.shift()

    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i]
      const nextRow = row + direction[0]
      const nextCol = col + direction[1]

      if (nextRow < 0 || nextCol < 0 || nextRow >= grid.length || nextCol >= grid[0].length ||
        grid[nextRow][nextCol] === '0')
        continue

      grid[nextRow][nextCol] = '0'
      queue.push([nextRow, nextCol])
    }
  }
}

let  grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]

const result = solution(grid)
console.log(result)