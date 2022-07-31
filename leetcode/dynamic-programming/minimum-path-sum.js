// https://leetcode.com/problems/minimum-path-sum/

/*
  We are given a n * m grid with non-negative numbers and we are asked to find a path from top left to bottom
  right which minimizes the sum of all number along its path.

  Note: you can only move either down or right at any point in time.

  example:

  grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ]

  As we can see, if we go from grid[0][0] all the way to the right, we accumulate 5, then from grid[0][2]
  if we go all the way to the bottom, we accumulate 7. So it took us 7 units to go from grid[0][0] to
  grid[2][2] moving only down and right. This is indeed the path with the minimum cost to get there.

  Because of the way the problem is layed out, there is an easy solution that we can make without having to
  consume additional memory. What is it?

  we can iterate all over the matrix and assign accumulated values to each of the cells of the grid. How?
  For example, lets assign accumulated values to each cell in the grid iteratively:

  grid = [            grid = [             grid = [
    [1, 3, 1],           [1, 4, 1],          [1, 4, 5],
    [1, 5, 1], =>        [1, 5, 1], =>       [1, 5, 1], 
    [4, 2, 1],           [4, 2, 1],          [4, 2, 1],
  ]                    ]                   ]        

  As you can see here, we can iteratively keep adding the values of previous cells to the current value in the
  first row. So for instance: grid[0][1] += grid[0][0], then grid[0][2] += grid[0][1]. How do we know this is
  the right way to solve the problem? Because, no matter what, in the first row the less number of steps we
  can take to get to the next column is by going all the way to the right (remmeber we can only go down or 
  right). Now, if you notice, we are following the dynamic programming paradigm, where we build up our 
  solutions, based on previous calculated values. Let's also perform the same calculation for all of the rows
  in the first column:


  grid = [         grid = [       grid = [
    [1, 4, 5],      [1, 4, 5],      [1, 4, 5],
    [1, 5, 1], =>   [2, 5, 1], =>   [2, 5, 1], 
    [4, 2, 1],      [4, 2, 1],      [6, 2, 1],
  ]                ]              ]        

  Ok, we follow the same logic but moving downwards. What's next? Here comes the interesing part of the 
  problem. If we want to calculate the minimum cost to get to dp[1][1] from dp[0][0] we can only get there
  by previously putting a step on dp[1][0] or dp[0][1] right? Because we could have only got there if we
  previously moved down or right. Then, the only calculation we need to make is which one is the better
  path to choose from. How do we do this? by comparing the values of dp[1][0] and dp[0][1], the one that has
  the smallest value is the one that is going to get added to dp[1][1]: dp[1][1] = min(dp[1][0], dp[0][1]).

  That's it. We can iteratively solve this problem using this logic.

  The time complexity of this solution is O (n * m) because we iterate through the whole matrix. The space
  complexity is O (1), because we don't allocate memory that scales with the size of the input.
*/

const solution = function(grid) { // T: O (n * m), S: O (1)
  for(let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (i === 0 && j > 0) {
        grid[i][j] += grid[i][j - 1]
      } else if (j === 0 && i > 0) {
        grid[i][j] += grid[i - 1][j]
      } else if (i > 0 && j > 0) {
        grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])
      }
    }
  }

  return grid[grid.length - 1][grid[0].length - 1]
}

let grid = [[1,3,1],[1,5,1],[4,2,1]]

const result = solution(grid)
console.log(result)