// https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/

/*
  We are asked to write a program to select a subset of numbers we are given that comply with this contraints:
  The numbers should sum the maximum value but their weights needs to be less or equal the our threshold w.
  This items are represented by two arrays: weights, values. The weights array contain in each index the
  weight of the ith item. The values array contains in each index the value of the ith item.

  Whenever you select an item you add to the total sum its value, but you also add its weight to the total
  weight. Items cannot be splitted.

  example:

  weights = [5, 3, 4, 2]
  values = [60, 50, 70, 30]
  k = 5

  For this problem, we are going to perform the top down approach, its memoization variant, and finally
  the bottom up approach

  In the top down approach, we can say that in order to get the maximum sum we might need to try every
  possibility. This means that have to select from either of these two choices: we take an element value +
  what the recursive calls returns decreasing the total weight, or we don't take an element and we return
  whatever the recursive calls returns.

  Our base case will happen when the number of elements traversed is equal to 0 or when the weight that 
  has been decreasing recursively as we were taking elements is equal to 0.

  The time complexity of this approach is O (2 ^ n) because we divide the problem into two for each recursive
  call. The space complexity is O (n). Note that the recursive solution computes the same sub-problems again
  and again (you can see that if you draw your state space tree). 
*/

// recursive brute force / exhaustive search
const solution1 = function(weights, values, w, n) { // T: O (2 ^ n), S: O (n)
  if (n === 0 || w === 0) {
    return 0
  }
  
  if (weights[n - 1] > w) {
    return solution1(weights, values, w, n - 1)
  }

  let res = Math.max(
    values[n - 1] + solution1(weights, values, w - weights[n - 1], n -1),
    solution1(weights, values, w, n - 1)
  )

  return res
}

/*
  Let's add memoization to it. To uniquely identify our state transition we need to consider the weight
  we have so far and also the number of elements in any of the 2 arrays.

  The time complexity of this solution is O (n * w) because we reduce redundant calls
  The space complexity will grow to O (n * w) because of our dp matrix
*/

const solution2 = function(weights, values, w, n, dp) { // T: O (n * w), S: O (n)
  if (n === 0 || w === 0) {
    return 0
  }

  if (dp[n][w] !== undefined) return dp[n][w]
  
  if (weights[n - 1] > w) {
    dp[n][w] = solution2(weights, values, w, n - 1, dp)

    return dp[n][w]
  }

  dp[n][w] = Math.max(
    values[n - 1] + solution2(weights, values, w - weights[n - 1], n -1, dp),
    solution2(weights, values, w, n - 1, dp)
  )

  return dp[n][w]
}

/*
  The last implementation is the bottom up approach with tabulation. We will create the same matrix of
  n * w so that we can fill it iteratively from top to bottom, the top left part represent our bottom
  case were the weight = 0. From there we build up our solution to when the weight = 5.
*/

const solution3 = function(weights, values, w) { // T: O (n * w), S: O (n)
  let dp = new Array(weights.length).fill(0).map(() => new Array(w + 1).fill(0))

  for (let r = 0; r < dp.length; r++) {
    for (let c = 0; c < dp[r].length; c++) {
      if (c === 0) {
        dp[r][c] = 0
      }

      if (r === 0 && c === weights[r]) {
        dp[r][c] = values[r]
      }

      if (r > 0) {
        dp[r][c] = dp[r - 1][c]

        if (c >= weights[r]) {
          dp[r][c] = Math.max(values[r] + dp[r - 1][c - weights[r]], dp[r - 1][c])
        }
      }
    }
  }

  console.log('maximum we can make is: ', dp[dp.length - 1][dp[0].length - 1])

  let result = []

  recursivelyGetChosenValues(dp, weights, values, dp.length - 1, dp[0].length - 1, result)

  console.log('The value of the items selected were: ', result)

  return dp[dp.length - 1][dp[0].length - 1]
}

const recursivelyGetChosenValues = function(dp, weights, values, r, c, result) {
  if (r <= 0 || c <= 0) return

  if (dp[r][c] === values[r] + dp[r - 1][c - weights[r]]) {
    result.push(values[r])
    recursivelyGetChosenValues(dp, weights, values, r - 1, c - weights[r], result)
  } else {
    recursivelyGetChosenValues(dp, weights, values, r - 1, c, result)
  }
}

let weights = [1, 1, 1],
values = [10, 20, 30],
w = 2,
n = weights.length

let result = solution1(weights, values, w, n)
console.log(result)

let dp = new Array(weights.length + 1).fill(0).map(() => new Array(w + 1))
result = solution2(weights, values, w, n, dp)
console.log(result)

weights = [5, 3, 4, 2],
values = [60, 50, 70, 30],
w = 5

result = solution3(weights, values, w)
console.log(result)