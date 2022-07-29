// https://leetcode.com/problems/knight-probability-in-chessboard/

/*
  A knight chessboard piece can move in 4 directions in a chessboard of n * n size (zero indexed chessboard)
  trying to make exactly k moves. The chess knight has eight possible moves it can make (which is specified)
  in our directions array of our solution. Each time the knight is to move, it chooses one of eight possible
  moves uniformily at random (even if the piece would go off the chessboard) and moves there.

  The knight will continue to move until is has made k moves or has moved off the chessboard. We are asked
  to return the probability of the knight remaining in the chessboard after it has stopped mobing.

  example:
  n = 3, k = 2, row = 0, column = 0

  we have a 3 * 3 chessboard, the knight has 2 moves it can make and is position at the first row and first
  column on the chessboard at k = 0

  [
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]

  At k = 0 the knight can move into 8 possible directions at random. Meaning that the probability for the
  knight to step on any of the possible 8 subsequent positions is 1 / 8:

  k = 1

  1/8  1/8 
1/8[      1/8
    [0, 0, 0],
1/8 [0, 0, 1/8],
 1/8[0, 1/8, 0],
  ]

  When k = 1, the probability of the knight of being in the chessboard is 2 / 8 (we add up 1/8 + 1/8). Notice
  that the knight also could have move out of the chessboard and that probability is of 6/8.

  k = 2

  [
    [2*((1/8)/8), 0, (1/8)/8],
    [0, 0, 0],
    [(1/8)/8, 0, 0],
  ]

  When k = 2, the probability of the knight of being in the chess board is the sum of all of the probabilities
  of the matrix when k = 2, which is 2*((1/8)/8) + (1/8)/8 + (1/8)/8 = 0.0625. Notice than for every k move
  the chances of the knight remaining on the chessboard is divided by 8, which is why the more moves the 
  knight makes, the less probable it is for it to remain within the chessboard.

  So here we have our approach to the problem, we can go either top down, or we can go bottom up. 

  We will first start with the top down approach, because it seems like the more natura way to go about it.

  We can perform a recursive solution at first, where we loop through a directions array that represents
  the possible 8 moves a knight can make and add them to the current row and column where our knight
  stands at every k move. We want to return the sum of all of the probabilities of each recursive call made
  inside this for loop (which without dp is a horrendous solution). As we move into the next recursive call
  k should decrease by 1. Our base case should be when the knight
  has moved out of the bound of the chessboard (in which case we return 0), or when k = 0, if the knight
  at this move is still inside the chessboard we return 1. Then as we pop up this function call in our stack
  the caller function will add that value to the 8 values that each recursive calls return within the for
  loop and divide them by 8.

  After this, the caller function will return the total probability to its subsequent caller function
  until we have made it up to the first function where k = 2. As you can see, our approach went from where
  the k was equal to 2 to the bottom state where the knight has stopped moving. From there, the returned value
  is processed moving up our recursive calls.

  The time complexity of this approach is 8 ^ k, because we are making 8 recursive calls at every k move,
  Our space complexity is also 8 ^ k, because we are adding 8 recursive calls k times into our stack.
*/

const directions = [
  [-2, -1],
  [-2, 1],
  [2, -1],
  [2, 1],
  [-1, -2],
  [1, -2],
  [-1, 2],
  [1, 2],
];

// Recursive top down approach

const solution = function(n, k, row, column) { // T: O (8 ^ k), S: O (8 ^ k)
  if (k === 0) return 1

  return rec(n, k, row, column)
}

const rec = function(n, k, r, c) {
  if (r < 0 || c < 0 || r >= n || c >= n) return 0

  if (k === 0) return 1

  let probability = 0
  for (let i = 0; i < directions.length; i++) { // O (8)
    let direction = directions[i]
    let nextRow = r + direction[0]
    let nextCol = c + direction[1]

    probability += rec(n, k - 1, nextRow, nextCol) // divide the problem 8 times per k move
  }

  return probability / 8
}

/*
  Can we improve this solution? Yes, we can memoize our function calls. Depending on how big the chessboard
  is, and the knight placement, there is chance that the knight might step on a cell more than once at the
  same k level in different movements. Because of this, the step at this cell and at this k move can be 
  memoized, because no matter what, it will yield the same result always. So let's do that.

  The time complexity of our solution will be of n ^ 2 * k, because that represents every grid at each k 
  move (our dp is an array of matrixes). So if the worst case scenario is that our recursive calls fill up
  the entire dp structure we created. Because of this, our space complexity will also be the same as our
  time complexity
*/

// Recursive top down approach with memoization

const solution2 = function(n, k, row, column) { // O (k * n ^ 2), S: O (k * n ^ 2)
  if (k === 0) return 1

  let dp = new Array(k).fill(0).map(() => new Array(n).fill(0).map(() => new Array(n)))

  return rec2(n, k, row, column, dp)
}

const rec2 = function(n, k, r, c, dp) {
  if (r < 0 || c < 0 || r >= n || c >= n) return 0

  if (k === 0) return 1

  if (dp[k - 1][r][c] !== undefined) return dp[k - 1][r][c]

  let probability = 0

  for (let i = 0; i < directions.length; i++) { // O (8)
    let direction = directions[i]
    let nextRow = r + direction[0]
    let nextCol = c + direction[1]

    probability += rec2(n, k - 1, nextRow, nextCol, dp) // divide the problem 8 times per k move
  }

  dp[k - 1][r][c] = probability / 8
  return dp[k - 1][r][c]
}

/*
  Ok, there might be even a better way to solve this problem, and this might be done using tabulation most
  likely. So, let's think about the bottom up approach to solve this problem. 

  We have actually already came up with the logic to perform the bottom up solution and it has been explained
  in the example previously given. Each k move has its own matrix with the probabilities in each cell of a 
  knight being placed there. So again, we could create a 3d grid, where each row represents our kth move,
  and each grid represents the matrix state of probabilities.

  The time complexity of this solution is O (k * n ^ 2), because we are performing a triple for loop
  where we iterate the chessboard k times. Because our dp is also a 3d matrix, the space complexity is
  O (K * n ^ 2)

  Note that we can improve the space complexity here if we just use 2 grids of n ^ 2 size. We don't need
  to create k matrixes. This is because one grid can hold grid when k = 0, the other grid will we used to
  store the next k state. Once that's done, grid one = grid two, and grid two will be equal to a new
  empty grid. With this little optimization, space complexity would be n ^ 2
*/

const solution3 = function(n, k, row, column) { // O (k * n ^ 2), S: O (k * n ^ 2)
  if (k === 0) return 1

  let dp = new Array(k + 1).fill(0).map(() => new Array(n).fill(0).map(() => new Array(n).fill(0)))

  dp[0][row][column] = 1

  let probability = 0

  for (let step = 1; step <= k; step++) {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        for (let i = 0; i < directions.length; i++) {
          let direction = directions[i]
          let prevRow = r + direction[0]
          let prevCol = c + direction[1]

          if (prevRow < 0 || prevCol < 0 || prevRow >= n || prevCol >= n) continue

          dp[step][r][c] += dp[step - 1][prevRow][prevCol] / 8
        }
        if (step === k) {
          probability += dp[step][r][c]
        }
      }
    }
  }

  return probability
}

let n = 3, k = 2, row = 0, column = 0 // 0.06250
 
let result = solution(n, k, row, column)
console.log('recursive top down: ', result, '\n')

result = solution2(n, k, row, column)
console.log('recursive top down with memoization: ', result)

result = solution3(n, k, row, column)
console.log('bottom up tabulation: ', result)