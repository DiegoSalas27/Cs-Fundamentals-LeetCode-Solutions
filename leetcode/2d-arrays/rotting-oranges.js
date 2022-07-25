// https://leetcode.com/problems/rotting-oranges/

/*
  We are given a matrix with values 0, 1 or 2 distributed arbitrarily. 0 represents an empty cell,
  1 represents a fresh orange, and 2 represents a rotten orange. Every minute, any fresh orange that is
  4-directionally adjacent to a rotten orange becomes rotten. We are asked to return the minimum minutes
  that must elapse until no cell has a fresh orange. If it's impossible, return -1.

  [                         [                         [                         [                            
    [2, 1, 1]                 [2, 2, 1]                 [2, 2, 2]                 [2, 2, 2]            
    [1, 1, 0] Minute 0 ->     [2, 1, 0] Minute 1 ->     [2, 2, 0] Minute 2 ->     [2, 2, 0] Minute 3 ->
    [0, 1, 1]                 [0, 1, 1]                 [0, 1, 1]                 [0, 2, 1]            
  ]                         ]                         ]                         ]          
  
  [                      
    [2, 2, 2]            
    [2, 2, 0] Minute 4
    [0, 2, 2]            
  ]                   
  
  As we can see because only adjacent oranges are rotten, we should think about performing a traversar that
  visit grid cells in a cross manner. Bfs is the traversal we should perform. How? we can iterate the entire
  matrix and look for 2's. If we find a 2 it means that we want to push it into our queue, if we find a 1, we
  want to increase our freshOranges variable. After iterating the entire matrix, we can start performing bfs
  on the queue that has all the rotten oranges at minute 0.

  We can have a minute counter starting at 0 and a rottenOranges counter that decreases as we pop values from
  our queue. When ever rottenOranges is = 0, we know for sure that 1 minutes has passed, because we have
  rotten adjacent oranges the current rotten oranges at the minute we are at any time. We can increase 
  minutesPassed by 1 every time this happens and reinitialize rottenOranges to the current queue length. 
  Whenever we rotten an orange, freshOranges should decrese by 1. Once our queue is empty, we will know how 
  many minutes have passed and if freshOranges is greater than 0, it means that there was at least one orange
  that couldn't be rotten and we return -1.

  The time complexity of this solution is O (n * m) because we visit every cell of the matrix. The space
  complexity is O (n * m) because our queue could hold all of the cells indexes from the grid if all
  oranges are rotten.
*/

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
]

const solution = function(grid) { // T: O (n * m), S: O (n * m)
  let freshOranges = 0
  let rottenOranges = 0
  let queue = []

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 2) {
        queue.push([r, c])
      } else if (grid[r][c] === 1) {
        freshOranges++
      }
    }
  }

  rottenOranges = queue.length

  let minutesPassed = 0

  while(queue.length) {
    const [row, col] = queue.shift()
    rottenOranges--

    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i]
      const nextRow = row + direction[0]
      const nextCol = col + direction[1]

      if (nextRow < 0 || nextCol < 0 || nextRow >= grid.length || nextCol >= grid[0].length ||
        grid[nextRow][nextCol] !== 1)
        continue

      freshOranges--
      grid[nextRow][nextCol] = 2
      queue.push([nextRow, nextCol])
    }

    if (rottenOranges === 0 && queue.length) {
      rottenOranges = queue.length
      minutesPassed++
    }
  }

  return freshOranges ? -1 : minutesPassed
}

let grid = [[2,1,1],[1,1,0],[0,1,1]]

const result = solution(grid)
console.log(result)