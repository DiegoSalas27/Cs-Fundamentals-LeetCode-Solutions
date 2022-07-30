// https://leetcode.com/problems/longest-palindromic-subsequence/

/*
  We are given a string and we are asked to find the length of its longest palindromic subsequence.

  Note: A subsequence is a sequence that can be derived from another sequence by deleting some or no
  elements without changing the order of the remaining elements.

  How do we solve this problem. There are two approaches and one is more intuitive than the other. Let's first
  start by thinking of an approach top dowm, because it will be the one that makes most sense.

  Because we are asked for a subsequence, we can start by comparing values at the extremes of our string.

  Example:
  
  let s = "bbbab"
           |   |
  
  We can see that at the extremes of this string we have 'b', which means that we have found a subsequence of
  length = 2. So lets keep record of that length and move inwards:

  "bba"
   | |

  Now, we limit our focus to the substring inside the extremes we were located at before. 'b' and 'a' are
  different, so here we need to think about how to conitnue. Because 'b' and 'a' are different, we either have
  a palindromic subsequence in the first 2 characters or in the last 2 characters, meaning that we need to
  divide our problem into 2's and return the one that has the maximum palindromic subsequence length.

  Max (LPS("bb"), LPS("ba"))

  So we can quickly notice that LPS("bb") will yield a value of 2. If we add the value to our previous recored
  value we get 4, which is indeed the longest palindromic subsequence in our string. Let's take a look at 
  a decision tree representation of our algorithm


                                  LPS("bbbab")
                                       |
                              2 + LPS("bba")
                                   /      \
                                  /        \
                          max(LPS("bb")), LPS("ba"))
                                  |         /       \
                          2 + LPS("")      /         \
                                  |     max(LPS("b"), LPS("a"))
                              return 0        |           |
                                            return 1    return 1

  The time complexity of this solution is O (2 ^ n) where n is the length of the string. The space complexity
  should be O (n) because our stack will hold at max n function calls.
*/

const solution1 = function (s) { // T: O (2 ^ n), S: O (n)
  if (s.length <= 1) return s.length;

  if (s[0] === s[s.length - 1]) {
    return 2 + solution1(s.substring(1, s.length - 1));
  }

  return Math.max(
    solution1(s.substring(0, s.length - 1)),
    solution1(s.substring(1, s.length))
  );
};

/* 
  Let's add memoization to improve time complexity. Note that our time complexity gets drastically reduced,
  but at the cost of creating a matrix to hold every value of every recursive result. If it were up to me,
  I would say that this is by far the solution that I like the most and that makes more sense to me. Because
  I like to make sense of things, I would always go with top down memoization approach.

  If we paste this in Leetcode we get:

  Runtime: 268 ms, faster than 81.48% of JavaScript online submissions for Longest Palindromic Subsequence.
  Memory Usage: 88.6 MB, less than 60.61% of JavaScript online submissions for Longest Palindromic Subsequence.
*/

const solution2 = function (s, dp, left, right) { // T: O (n ^ 2), S: O (n ^ 2)
  if (dp[left][right] !== undefined) return dp[left][right];

  if (s.length <= 1) return s.length;

  if (s[0] === s[s.length - 1]) {
    dp[left][right] =
      2 + solution2(s.substring(1, s.length - 1), dp, left + 1, right - 1);
    return dp[left][right];
  }

  dp[left][right] = Math.max(
    solution2(s.substring(0, s.length - 1), dp, left, right - 1),
    solution2(s.substring(1, s.length), dp, left + 1, right)
  );

  return dp[left][right];
};

/*
  That solution was pretty good. And it should yield the same performance in a bottom up approach. With this,
  we can say that bottom up tabulation is not necessarily always the best way to solve dp problems, specially
  because of how time consuming it is to come up with a solution using this method. However,
  we need to understand that even when both have the same time complexities, using recursion has an impact
  on run time, and this is inevitable. Which is why even when their Big O is the same, in reality bottom
  up approach should work a bit faster.  

  Coming up with the bottom up approach with tabulation is really hard and not very intuitive, but we can
  start with claim, which is that the best way to represent our state transition is using a matrix of size
  n * n. Why? because we can go from our base cases to build up our solution to the top. What do I mean by
  saying that? I mean that our base cases are when the string has a length <= 1, this means that we either
  return 1 or zero. From there que can recursively going up to build our solution in a similar fashion as
  the longest common subsequence.

  How do we do this? Well, we can also claim that if we represent our state transition in a matrix like so:

  let dp = [      b  b  b  a  b
               b [0, 0, 0, 0, 0],
               b [0, 0, 0, 0, 0],
               b [0, 0, 0, 0, 0],
               a [0, 0, 0, 0, 0],
               b [0, 0, 0, 0, 0]
            ]

  This matrix is a mirror of our string, meaning that dp[0][0] represents the comparison of 'b' at string 
  index 0 with itself. dp[1, 1] represents the comparison of 'b' at string index 1 with itself, and so on.
  What can we claim from this. We can claim that each string is a palindrome, and because we compare that
  string with itself diagonally, we can set values of 1 there to represent the length of that subsequence
  comparison:

  let dp = [      b  b  b  a  b
               b [1, 0, 0, 0, 0],
               b [0, 1, 0, 0, 0],
               b [0, 0, 1, 0, 0],
               a [0, 0, 0, 1, 0],
               b [0, 0, 0, 0, 1]
            ]
  
  From here, things become much more less intuitive. Honestly speaking I don't understand myself how can we
  relate our top down logic to filling up values in this matrix. However, I understand the logic of this 
  bottom up approach, but I would say it's not intuitive at all (and so far I haven't found the intuition
  to come up with the bottom up tabulation approach from the top down approach which is why I really don't
  like bottom up tabulation in general, because making sense of things is way better than just memorizing). 

  Having said that, while the logic here is not as similar or cannot be extrapolated from the top down 
  approach completely, there are some similarities that I will try to expose.

  The approach after filling the table with 1's diagonally is to iteratively assign values to our table
  from left to right and bottom to top. What does that mean? It means that we start at dp[0, 1] and that
  would indicates the comparison of 'bb' which are the first 2 b's in the string 'bbbab'. Ok, that's a 
  palindrome, so the length of this palindrome is 2. So lets assign 2 to that index of our dp:

  let dp = [    b  b  b  a  b
             b [1, 2, 0, 0, 0],
             b [0, 1, 0, 0, 0],
             b [0, 0, 1, 0, 0],
             a [0, 0, 0, 1, 0],
             b [0, 0, 0, 0, 1]
          ]

  The logic here is not that easy (and again, not intuitive), but it goes like this. 'bb' between this two
  'b's there are no other letters, there are 0 letters. This means that we are actually adding 2 (which is the
  length of the palindrome 'bb') to 0 which is the number of letters in between 'bb' which is ''. Why do we do
  this? Because in our top down recursive approach whenever we find a match between the extremes of a substring
  of the original string we do the following: return 2 + LPS(string.substring(1, string.length - 1)) which 
  means that we add to 2 whatever the subsequent recursive function call returns. So if our string at that 
  point was 'bb' in our subsequent recursive function call we receive '' as a parameter and we return 0.

  Makes sense? Hopefully it does, but how is that logic represented in our matrix? Well to dp[0, 1] we add
  the value of dp[1, 0], meaning that we add dp[0 + 1, 1 - 1]: we go one row down and one column to the left.
  If you take a look at the matrix this seems weird because dp[1, 0] seems like you compare again 'bb' as if
  you were to be in dp[0, 1] right? Well, that's the unintuitive part of this approach, but it works as we
  build up our solution. Basically whatever is below our diagonal should store the same values (but mirrored)
  to what is to the top of our diagonal. Because of this, we really don't care filling up the values at the
  bottom of our diagonal.

  After all of this, we try to move up in our rows of our current column, but we are out of the bounds of our
  matrix, so let's move to the next column. We move to dp[1][2] and we see that we compare 'bb' which are the
  second and third letters in our string 'bbbab', this substring is a palindrome and has a length of 2, so 
  let's add that value to our matrix:

  let dp = [    b  b  b  a  b
             b [1, 2, 0, 0, 0],
             b [0, 1, 2, 0, 0],
             b [0, 0, 1, 0, 0],
             a [0, 0, 0, 1, 0],
             b [0, 0, 0, 0, 1]
          ]

  Ok, so let's move up. We can see in here that we are at dp[0, 2] we have a substring 'bbb' which are the
  first three letters of our string 'bbbab' we see that the extremes of 'bbb' are equal, but it's length
  is 3. How do we intuitively calculate that on our matrix? Well, we an dismiss whatever values are between
  the extremes of 'bbb' which is the middle 'b'. Because the longest palindromic subsequence instead of the
  substring the values in the middle could be whatever (even non palindromic), which is why we can say that
  at least the extremes make up for 2 more characters in the whole substring, but, because there is a 'b' in
  between and it is also a palindrome of length 1, we add 1 + 2 and that gives us 3:

  let dp = [    b  b  b  a  b
             b [1, 2, 3, 0, 0],
             b [0, 1, 2, 0, 0],
             b [0, 0, 1, 0, 0],
             a [0, 0, 0, 1, 0],
             b [0, 0, 0, 0, 1]
          ]

  Note that again, whenever two extremes match, we go one row down and one column to the left and add that 
  value to 2: dp[0, 2] = 2 + dp[1, 1]. Now, we move to the top, but we are out of the bounds of our dp, so
  let's move to the next column at row: column - 1. We wiil be at dp[2, 3] here we compare the substring
  'ba' from 'bbbab'. Because they are different we take the greatest values as if we were to do that in
  our recursive top down approach. Remember this: 
  
  return Math.max(LPS(s.substring(1, s.length)), LPS(s.substring(0, s.length - 1)))

  this would divide the problem into two's and in each subsequen recursive call we would receive 'a' and 'b'
  and return 1, right? How do we extrapolate that into our matrix? Well, we can compare the values at dp[2,2]
  and dp[3,3] which is comparing which one has the greatest length 'a' or 'b' ? both are one, so we just 
  copy that to dp[2, 3]:


  let dp = [    b  b  b  a  b
             b [1, 2, 3, 0, 0],
             b [0, 1, 2, 0, 0],
             b [0, 0, 1, 1, 0],
             a [0, 0, 0, 1, 0],
             b [0, 0, 0, 0, 1]
          ]
  
  That's it. That's all there is to our logic. Let's complete the table step by step until we reach the top:

  [ b  b  b  a  b           [ b  b  b  a  b        [ b  b  b  a  b       [ b  b  b  a  b
 b [1, 2, 3, 0, 0],        b [1, 2, 3, 3, 0],     b [1, 2, 3, 3, 0],    b [1, 2, 3, 3, 0],
 b [0, 1, 2, 2, 0],        b [0, 1, 2, 2, 0],     b [0, 1, 2, 2, 0],    b [0, 1, 2, 2, 0],
 b [0, 0, 1, 1, 0],        b [0, 0, 1, 1, 0],     b [0, 0, 1, 1, 0],    b [0, 0, 1, 1, 3],
 a [0, 0, 0, 1, 0],        a [0, 0, 0, 1, 0],     a [0, 0, 0, 1, 1],    a [0, 0, 0, 1, 1],
 b [0, 0, 0, 0, 1]         b [0, 0, 0, 0, 1]      b [0, 0, 0, 0, 1]     b [0, 0, 0, 0, 1]
  ]                          ]                     ]                     ]

   [ b  b  b  a  b       [ b  b  b  a  b
  b [1, 2, 3, 3, 0],    b [1, 2, 3, 3, 4],
  b [0, 1, 2, 2, 3],    b [0, 1, 2, 2, 3],
  b [0, 0, 1, 1, 3],    b [0, 0, 1, 1, 3],
  a [0, 0, 0, 1, 1],    a [0, 0, 0, 1, 1],
  b [0, 0, 0, 0, 1]     b [0, 0, 0, 0, 1]
   ]                     ]

  That's how we fill our table for the bottom up approach. Again I despise memorizing logic when it's 
  unintuitive to come up with the solution in the first place. 

  The time complexity is O (n * 2) because it's the time to iterate through the matrix. The space complexity
  is the same.
*/

const solution3 = function (s) { // T: O (n * 2), S: O (n * 2)
  let dp = new Array(s.length).fill(0).map(() => new Array(s.length).fill(0));

  for (let i = 0; i < dp.length; i++) {
    dp[i][i] = 1;
  }

  for (let c = 1; c < dp[0].length; c++) {
    for (let r = c - 1; r >= 0; r--) {
        if (s[c] === s[r]) {
                dp[r][c] = 2 + dp[r + 1][c - 1]
        } else {
                dp[r][c] = Math.max(dp[r][c - 1], dp[r + 1][c])
        }
        
    }
  }

  return dp[0][dp[0].length - 1]
};

let s = "bbbab";

let result = solution1(s);
console.log("recursive top down approach: ", result);

let dp = new Array(s.length).fill(0).map(() => new Array(s.length));
result = solution2(s, dp, 0, s.length - 1);
console.log("recursive top down approach: ", result);

result = solution3(s);
console.log("bottom up tabulation: ", result);
