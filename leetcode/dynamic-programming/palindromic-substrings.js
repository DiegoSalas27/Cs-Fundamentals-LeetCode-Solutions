// https://leetcode.com/problems/palindromic-substrings/

/*
  We are given a string s and we are told to return the number of palindromic substrings in it. A string
  is a palindrome when it reads the same backward as forward. A substring is a contiguous sequence of 
  characters within the string.

  Whenever I read 'compute all substrings' or 'get the longest substring' I think of shifting pointers and 
  sliding window technique. Why? because it is the easiest working solution to come up with for most of the 
  problem that I have worked on that involve optimization in substrings, and generally speaking the run time 
  is pretty good in many case. However, it is true that dynamic programming could be a better candidate for 
  solving the problem. So let's start with a simple approach that can give us a fast and intuitive answer.

  we can have two pointers: left and right and we can move those pointers outwards. How? We can create a
  for loop that iterates through the string and inside we can use the shifting pointers technique, where
  both left and right pointers are initilized with the ith value of the iteration, and from there compute
  the number of palindromic substrings by moving those pointers outwards until our rules are not met. What
  are those rules? that left pointer is never less than 0 or else we would be out of the bounds of our string.
  The same goes for right pointer, which has to be less than string.length, because it would also be of the
  bounds. Finally, whenever the characters at left and right pointers mismatch, we should stop our inner
  while loop. Why do we do this? Let's look at an example:


  let s = "aaaa"
           |
           L
           R

  In here, the left and the right pointers are located at the same index, and they are within the bounds of the
  string. If we compare the values located at L and R, we can see that it is the character itself, which means
  that so far the maximum palindromic substring has a length of 1. Ok, let's move our pointers outwards.
  If we do that, we exit our while loop, because the left pointer would be at index -1. Ok, so what next?

  Next, we move to the next iteration of our for loop and re-initialize L and R to 1

  "aaaa"
    |
    L
    R

  Ok, here we still have another substring (total of 2 so far). So move your pointers outwards:

  "aaaa"
   | |
   L R
    
   So, our substring now is "aaa" and it's a palindrome. Notice that we don't care the about the values 
   between the extremes of "aaa" which is the "a" at the middle, we already know that middle values are
   palindromes, so we just need to check the extremes at every turn. If you think about it, we are using
   previous knowledge to go ahead and build on top the previous result. Because we are moving outwards
   this solution avoids checking every single character to know if a substring is a palindrome it relies
   on dp. In this case, the dp approach is subtle in the sense that we are not using top down approach 
   of bottom up. We are using iteration without tabulation but shifting pointers.

   If we move our pointers outwards we are out of the bounds of the string (total of 3 palindromes so far). 
   So initialize L and R to 2

  "aaaa"         "aaaa"
     |   =>        | | 
     L             L R
     R           

  We have 2 more palindromes, so our total is 5.

  "aaaa"   
      |
      L     
      R     

  Here we found yet another palindrome (total is 6)

  However, you may tell that there are still palindromes that we haven't accounted for. we are missing 
  this substrings: "aa", "aa", "aa", "aaaa"

  How do we account for this? we can have another while loop within our for loop that initializes left
  to ith value and right to ith value + 1, so that our checks would look like this:

  "aaaa"     "aaaa"      "aaaa"    "aaaa"
   ||    =>    ||   =>    |  |  =>    || 
   LR          LR         L  R        LR 

   And so that is our solution. We have counted 10 palindromic substrings in here. our palindromic check
   is O (1) and our approach is brute forceish and takes O (n ^ 2). Our space complexity is O (1) as we
   do not allocate memory that scales with the size of the input.
*/  

const solution = function(s) { // T: O (n ^ 2), S: O (1)
  let palindromicSubstrings = 0

  for (let i = 0; i < s.length; i++) {
    let left = i, right = i
    palindromicSubstrings = calculateSubstrings(left, right, s, palindromicSubstrings)

    left = i, right = i + 1
    palindromicSubstrings = calculateSubstrings(left, right, s, palindromicSubstrings)
  }

  return palindromicSubstrings
}

const calculateSubstrings = function(left, right, s, palindromicSubstrings) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    palindromicSubstrings++
    left--
    right++
  }

  return palindromicSubstrings
}

/*
  while there is definetely a dp approach for this problem, we know that because of the nature of the problem
  we would most likely use an n * n grid and fill it with values using tabulation. Which would yield the same
  time complexity, but a worse space complexity because of the grid we create.
*/

let s = "aaaa"

const result = solution(s)
console.log(result)