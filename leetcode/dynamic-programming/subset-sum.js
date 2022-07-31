// https://www.techiedelight.com/subset-sum-problem/

/*
  This is a classical dp problem in which we are told to find a non-empty subarray or subset that sums
  to the value given. Consider that the numbers can only be used once. For exmaple,

  let nums = [1, 2, 3, 5], sum = 7

  Yes there is: [2, 5]

  How do we solve this problem without having to resort to a brute force solution? Here we can use a 
  backtracking solution to find our answer or we can use a dp approach to do so. I am going to use the dp 
  approach only, because there is another problem where we will use a backtracking solution that could also
  be applied for this one.

  The way that this works is easy, we can create a matrix with n rows and sum columns + 1. What this represents
  is if we can make up a sum of 0, 1, ... 7 using 1 or 1 and 2 or 1 and 3. etc. But this would be done in an
  organized manner. We should start from a base case which is: is it possible to make up an amount of 0?
  Yes, we can choose not to choose any coins and that is possible. Assign a value of true to that cell.
  So in orders words in the first column of each row we would assign true, which means that it is possible
  to make a sum of 0 with any number in our array by just no choosing them.

  Ok, then? Then, we can ask ourselves if it is possible to make the value of one choosing 1. Yes so assign 
  true to that cell:

  [      0     1      2      3      4      5      6      7
    1 [true, false, false, false, false, false, false, false], 
    2 [true, false, false, false, false, false, false, false], 
    3 [true, false, false, false, false, false, false, false], 
    5 [true, false, false, false, false, false, false, false], 
  ]

  [      0     1      2      3      4      5      6      7
    1 [true, true, false, false, false, false, false, false],  
    2 [true, false, false, false, false, false, false, false], 
    3 [true, false, false, false, false, false, false, false], 
    5 [true, false, false, false, false, false, false, false], 
  ]

  Can we make a sum of two with one? No, because we only have one. There is no way (remmeber that we can only
  choose values one). Ok, so we know the for row one the remaining cells will be false. Let's move to the next
  cell, can we make a sum of 1 using value 2? No, we can't, but we can say that so far making a sum of 1 is
  possible using value 1, so let's copy the truth assignment from the previous row:

  [     0     1      2      3      4      5      6      7
    1 [true, true, false, false, false, false, false, false], 
    2 [true, true, false, false, false, false, false, false], 
    3 [true, false, false, false, false, false, false, false],
    5 [true, false, false, false, false, false, false, false],
  ]

  Let's keep moving right, can we make a sum of 2 using value 2? Yes, so assign true to that cell:

  [     0     1      2      3      4      5      6      7
    1 [true, true, false, false, false, false, false, false], 
    2 [true, true, true, false, false, false, false, false], 
    3 [true, false, false, false, false, false, false, false],
    5 [true, false, false, false, false, false, false, false],
  ]

  Moving forward: can we make a sum of 3 using value 2? No, but if we add value 1, we actually can right?
  How about if we do the following: given that sum 3 is greater than value 2, subtract 2 from 3 and look
  for matrix[r - 1][3 - 2] and assign whichever value is there to the current cell we are standing at 
  matrix[r][3]. Ok, so we will look at the value in matrix[0][1] and that represents that we can make a sum
  of 1 using value 1. See the pattern? 

  [     0     1      2      3      4      5      6      7
    1 [true, true, false, false, false, false, false, false], 
    2 [true, true, true, true, false, false, false, false], 
    3 [true, false, false, false, false, false, false, false],
    5 [true, false, false, false, false, false, false, false],
  ]

  So, we can iteratively solve this problem using that logic and we should end up with the following table:

  [     0     1      2      3      4      5      6      7
    1 [true, true, false, false, false, false, false, false], 
    2 [true, true, true, true, false, false, false, false], 
    3 [true, true, true, true, true, true, true, false],
    5 [true, true, true, true, true, true, true, true],
  ]

  What does true means at the last row and at the last column of our matrix? It means that it is possible
  to make a sum of 7 using a non-empty subset of the current set we were given. And that is what we return.

  The time complexity of this solution is O (n * m). The space complexity is the same.
*/

const solution = function(nums, sum) { // T: O (n * m), S: O (n * m)
  let dp = new Array(nums.length).fill(0).map(() => new Array(sum + 1).fill(false))

  for (let r = 0; r < dp.length; r++) {
    for (let c = 0; c < dp[r].length; c++) {
      if (c === 0 || c - nums[r] === 0) {
        dp[r][c] = true
      }

      if (r > 0) {
        dp[r][c] = dp[r-1][c]

        if (c >= nums[r] && dp[r - 1][c - nums[r]] === true) {
          dp[r][c] = true
        }
      }
    }
  }

  return dp[dp.length - 1][dp[0].length - 1]
}

let nums = [1, 2, 3, 5], sum = 7

const result = solution(nums, sum)
console.log(result)