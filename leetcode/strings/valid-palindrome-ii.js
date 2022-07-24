// https://leetcode.com/problems/valid-palindrome-ii/

/*  
  In this problem we are told to check if a string is a palindrome after removing at most one character
  from it. This means that we can use the shifting pointer technique starting from the extremes of our
  string and if at some point the string[left] !== string[right], then this means that we need to remove
  either the character where the left pointer is located, or where the right pointer is located, and from
  there keep performing the same algorithm. If again string[left] !== string[right] we return false. If 
  we never return false and our iteration is done, we return true.
*/

const solution = function(s) { // T: O (n), s: O (1)
  let left = 0, right = s.length - 1
  while (left < right) {
    if (s[left] !== s[right]) {
      return solve(left + 1, right, s) || solve(left, right - 1, s) 
    }
    left++
    right--
  }

  return true
}

const solve = function(left, right, s) {
  while (left < right) {
    if (s[left] !== s[right]) return false
    left++
    right--
  }

  return true
}

let s = "abca"

const result = solution(s)
console.log(result)