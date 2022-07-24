// https://leetcode.com/problems/valid-palindrome/

/*
  In this problem we are given a string with printable ASCII characters and we need to convert the string
  to get lowecase letters removing all non-alphanumeric characters. After that, we need to return true if
  the word reads the same forward and backward; return false, if it does not.

  Checking is a string is a palindrome is a very simple algorithm that involves using the shifting pointer
  technique once again. We can place the pointers in different places in our string: at the middle, moving 
  them outwards; at the extremes, moving them inwards. We can also just reverse the string and compare it
  with the original string. However, the shifting pointer technique would be even better because we would
  traverse our string n/2 times, instead of n. Shifting pointers is already the best solution we can go for
  and it is also the most natural one to come up with.
*/

const solution = function(s) { // T: O (n), s: O (1)
  s = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase()
  
  let left = 0, right = s.length - 1

  while (left < right) {
    if (s[left] !== s[right]) return false
    left++
    right--
  }

  return true
}

let s = "A man, a plan, a canal: Panama"

const result = solution(s)
console.log(result)