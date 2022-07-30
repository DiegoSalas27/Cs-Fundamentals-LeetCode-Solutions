// https://leetcode.com/problems/longest-palindromic-substring/

/*
  We are given a string s, and we are told to return the longest palindromic substring in s.

  We can use shifting pointers and the sliding window technique to come up with a solution. And the algorithm
  should be very similar to the palindromic substrings problem. So there is not much to add here.

  The time complexity of our solution is O (n ^ 2). The space complexity is O (1).
*/

const solution = function(s) { // T: O (n ^ 2), S: O (1)
  let longestPalindrome = ''

  for (let i = 0; i < s.length; i++) {
    let left = i, right = i
    longestPalindrome = getSubstring(left, right, s, longestPalindrome)

    left = i, right = i + 1
    longestPalindrome = getSubstring(left, right, s, longestPalindrome)
  }

  return longestPalindrome
}

const getSubstring = function(left, right, s, longestPalindrome) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    if (longestPalindrome.length < right - left + 1) {
      longestPalindrome = s.slice(left, right + 1)
    }
    left--
    right++
  }

  return longestPalindrome
}

let s = "babad"

const result = solution(s)
console.log(result)