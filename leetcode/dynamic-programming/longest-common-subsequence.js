// https://leetcode.com/problems/longest-common-subsequence/

/*
  We are given 2 strings and we are told to return the length of their longest common subsequence, and if there
  if no common subsequence we should return 0. 

  A subsequence of a string is a new string generated from the original string with some characters (can be
  none) deleted without changing the relative order of the remaining characters.

  Example:

  "ace" is a subsequence of "abcde"

  How do we solve this problem? Well, we can start by taking a look at the characters in either of the 
  extremes of both strings. For example, 'e' is a common subsequence in both strings which means that we can
  take 'e' out of the equation and compare the rest of the characters:

  compare 'ac' and 'abcd'

  From here, moving right to left we can see that 'd' and 'c' are not the same, meaning that if there is any
  common subsequence of characters they should be either in 'a' compared with 'abcd' or 'abc' compared with 
  'ac'. In other words, whenever a character doesn't match, we have to choices to make. Let's look at it with
  and example:
                  
                                        LCS("ace", "abcde") // 3
                                                 |
                                    1 + LCS("ac", "abcd")
                                           /         \
                                          /           \
                             max (LCS("ac", "abc"),   LCS("a", "abcd") // 2
                                        |               /             \
                             1 + LCS("a", "ab")        /               \
                                 /          \       max (LCS("", "abcd"), LCS("a", "abc"))  // 1
                                /            \                  |                .
                        max (LCS("", "ab"), LCS("a", "a"))  return 0             .
                                    |               |                            .
                                 return 0   1 + LCS("", "")
                                                      |                       return 1
                                                    return 0

  As we can see in the example the solution is pretty straight forward. We are comparing the last characters
  of each string recursively. If they match add 1 to the next recursive call and if characters at the last
  position of the string do not match, divide your problem in two recursive calls, where you are comparing
  the strings by taking one letter from one of them and leaving the other one as it is.

  The time complexity of this solution is O (2 ^ (n + m)) because in the worst case scenario all of the 
  characters mismatch and we divide our problem into two's. This run time complexity is an approximate in the
  sense that because of our base case, the algorithm won't run exactly O (2 ^ (n + m)) times, but a bit less
  because we are actually not calling lcs('', 'a') for example which is what I showed in the example.

  The space complexity should be the height of the tree. If all of the characters in both strings are 
  different, the maximum function calls nested in our stack should be of O (n) where n is the length of the 
  longest string.
*/

const solution1 = function(text1, text2) { // T: O (2 ^ (n + m)), S: O (n) n is length of longest string
  if (text1.length === 0 || text2.length === 0) return 0

  let len1 = text1.length
  let len2 = text2.length

  if (text1[len1 - 1] === text2[len2 - 1]) {
    return 1 + solution1(text1.slice(0, len1 - 1), text2.slice(0, len2 - 1))
  }

  return Math.max(solution1(text1.slice(0, len1 - 1), text2.slice(0, len2)),
    solution1(text1.slice(0, len1), text2.slice(0, len2 - 1)))
}

/*
  Ok, that algorithm works, but its run time is awful. How can we improve it? We could use memoization,
  and that can definetely work (we can have a matrix that holds as rows, the length of the fist string,
  and as columns the length of the second string, and that would uniquely identify the state transition
  we are currently are). We could also use an object and have as keys the concatenations of both string
  length for the same purpose. Let's try that.

  Because of memoization, our algorithm will run in O (n * m) where n and m and the lengths of the
  strings. The space complexity would still be O (n), because even with memoization, we would have a stack
  with the size of the longest string.
*/

const solution2 = function(text1, text2, memo) { // T: O (n * m), S: O (n) n is length of longest string
  if (text1.length === 0 || text2.length === 0) return 0

  if (memo[`${text1.length}-${text2.length}`]) return memo[`${text1.length}-${text2.length}`]

  let len1 = text1.length
  let len2 = text2.length

  if (text1[len1 - 1] === text2[len2 - 1]) {
    memo[`${text1.length}-${text2.length}`] = 1 + solution2(text1.slice(0, len1 - 1), 
    text2.slice(0, len2 - 1), memo)
    return memo[`${text1.length}-${text2.length}`] 
  }

  memo[`${text1.length}-${text2.length}`] = Math.max(solution2(text1.slice(0, len1 - 1), 
  text2.slice(0, len2), memo), solution2(text1.slice(0, len1), text2.slice(0, len2 - 1), memo))

  return memo[`${text1.length}-${text2.length}`]
}

/*
  Ok, having seen this, the time complexity seems pretty hot. However, when we run our code in leetcode
  the runtime is pretty bad, as well as the memory usage:

  Runtime: 2258 ms, faster than 5.04% of JavaScript online submissions for Longest Common Subsequence.
  Memory Usage: 172.4 MB, less than 5.04% of JavaScript online submissions for Longest Common Subsequence.

  What if we use a 2d array instead of an object for memoization in our recursive top down approach?
*/

const solution3 = function(text1, text2, memo) { // T: O (n * m), S: O (n) n is length of longest string
  if (text1.length === 0 || text2.length === 0) return 0

  if (memo[text1.length - 1][text2.length - 1]) return memo[text1.length - 1][text2.length - 1]

  let len1 = text1.length
  let len2 = text2.length

  if (text1[len1 - 1] === text2[len2 - 1]) {
    memo[text1.length - 1][text2.length - 1] = 1 + solution3(text1.slice(0, len1 - 1), 
    text2.slice(0, len2 - 1), memo)
    return memo[text1.length - 1][text2.length - 1]
  }

  memo[text1.length - 1][text2.length - 1] = Math.max(solution3(text1.slice(0, len1 - 1), 
  text2.slice(0, len2), memo), solution3(text1.slice(0, len1), text2.slice(0, len2 - 1), memo))

  return memo[text1.length - 1][text2.length - 1]
}

/*
  For some reason our run time and space complexity improved in leetcode

  Runtime: 264 ms, faster than 18.05% of JavaScript online submissions for Longest Common Subsequence.
  Memory Usage: 82 MB, less than 13.21% of JavaScript online submissions for Longest Common Subsequence.

  I would argue that the reason for which it improved is because of the way to computers store values in 
  memory for arrays and objects. The way that objects work is that they hash their keys and they store their 
  non hashed keys and their values together in scattered memory addresses. The way that arrays 
  (and I assume 2d arrays) are stored is in sequential memory addresses. Because computers have caching
  mechanisms they usually boost performance when reading from sequential memory addresses rather than 
  scattered. This might be the reason for which we should prefer using arrays or matrixes to store values for 
  tabulation an memoization in most of the cases, rather than objects. 

  The space complexity also improved a little bit. I cannot honestly answer why, but it did.

  However, we are still doing poorly with our solution. We want to achieve O (n * m) run time, and we want it
  to be showned as optimal in leetcode. Here comes the bottom up approach using tabulation. When you see it,
  you will notice that we follow exactly the same logic as in our recursive top down approach and build up
  our solution based on previous calculated values just as if we were to use memoization.

  Example:

  we create a matrix of size (n + 1) * (m + 1) initialized with 0's

  let text1 = "abcde", text2 = "ace" 

  let dp =  [  '' a  b  c  d  e
            ''[0, 0, 0, 0, 0, 0],
            a [0, 0, 0, 0, 0, 0],
            c [0, 0, 0, 0, 0, 0],
            e [0, 0, 0, 0, 0, 0],
            ]

  As you can see, we have created a matrix that has one extra column and one extra row. Why? because row 0
  and column 0 represent base cases when we compare a non empty string with an empty string. Take for example
  dp[0, 1] in there we compare 'a' with an empty string. In dp[0, 2] we comapre 'b' with an empty string.
  So as you can imagine a non empty string and an empty string have nothing in common, which is why all 
  columns in the first row have values of zeroes. At the same time, dp[1, 0] here we compare 'a' with an
  empty string. In dp[2, 0] we compare 'c' with an empty string. Again, they have nothing in common, which is
  why all of the rows at column 0 have a value of 0. If this is not clear, they literally represent the base
  cases in our recursive solution

  dp[0, 1] = LCS('a', '') = 0
  dp[0, 2] = LCS('b', '') = 0
  dp[1, 0] = LCS('a', '') = 0
  dp[2, 0] = LCS('c', '') = 0

  Ok, what can we gleen from this. What we can take from this is that we can build our solution based on the
  base cases and build it down right. So at dp[1][1] we would see that there is a match 'a' === 'a'. So that
  should contain 1:

  let text1 = "abcde", text2 = "ace" 

  let dp =  [  '' a  b  c  d  e
            ''[0, 0, 0, 0, 0, 0],
            a [0, 1, 0, 0, 0, 0],
            c [0, 0, 0, 0, 0, 0],
            e [0, 0, 0, 0, 0, 0],
            ]

  We keep moving to the right and we compare dp[1][2] 'a' === 'b' which is false. Recall that in our recursive
  solution when two letters didn't match we would take the maximum between the comparison of one of the strings
  with its last letter cut off, and then the other one remaining the same, and the oposite in the other call
  when we subdivided the problem. What we do in this algorithm is exactly the same remember that when we 
  compare dp[1][2] 'a' === 'b' we are talking about this scenario: LCS('a', 'ab'), meaning that we would take
  the maximum of LCS('', ab) and LCS('a','a') which is represented as taking the maximum of dp[1][1] and
  dp[0][2] and we would copy the value of 1:

  let text1 = "abcde", text2 = "ace" 

  let dp =  [  '' a  b  c  d  e
            ''[0, 0, 0, 0, 0, 0],
            a [0, 1, 1, 0, 0, 0],
            c [0, 0, 0, 0, 0, 0],
            e [0, 0, 0, 0, 0, 0],
            ]

  if we do this recursively we would copy the value of 1 until we find another match:

  let text1 = "abcde", text2 = "ace" 

  let dp =  [  '' a  b  c  d  e
            ''[0, 0, 0, 0, 0, 0],
            a [0, 1, 1, 1, 1, 1],
            c [0, 1, 1, 0, 0, 0],
            e [0, 0, 0, 0, 0, 0],
            ]
    
  when we compare LCS('abc', 'ac') which is dp[2, 3] we can see that 'c' === 'c'. meaning that we add 1
  to our solution: 1 + LCS('ab', 'a') which is why we would add the value of 1 that we have at its top
  left dp[1, 2]:

  let text1 = "abcde", text2 = "ace" 

  let dp =  [  '' a  b  c  d  e
            ''[0, 0, 0, 0, 0, 0],
            a [0, 1, 1, 1, 1, 1],
            c [0, 1, 1, 2, 2, 2],
            e [0, 1, 1, 2, 2, 3],
            ]

  That's it. That is our algorithm for bottom up with tabulation.

  The time complexity of this solution is O (n * m) and the space complexity is O (n * m).
*/ 

const solution4 = function(text1, text2) { // T: O (n * m), S: O (n * m)
  let dp = new Array(text1.length + 1).fill(0).map(() => new Array(text2.length + 1).fill(0))

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[i].length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j- 1])
      }
    }
  }

  return dp[dp.length - 1][dp[0].length - 1]
}

let text1 = "abcde", text2 = "ace" 

let result = solution1(text1, text2)
console.log('recursive top down approach: ', result, '\n')

let memo = {}
result = solution2(text1, text2, memo)
console.log('recursive top down with memoization and object: ', result, '\n')

memo = new Array(text1.length).fill(0).map(() => new Array(text2.length))
result = solution3(text1, text2, memo)
console.log('recursive top down with memoization and 2d array: ', result, '\n')

result = solution4(text1, text2)
console.log('recursive bottom up with tabulation: ', result, '\n')