// https://leetcode.com/problems/palindrome-partitioning/

/*
  Given a string s, partition s such that every substring of the partition is a palindrome. Return all of the possible palindrome
  partitioning of s.

  Example:

  let s = "aab"
  output: [["aa", b], ["a","a","b"]

  Given that we need to return all of the possible palindrome partitioning of s, we need to figure out a way to break the string
  s into all possible combinations so that each substring we get is a palindrome:

  Example:

  let s = "aab"
  output: [["aa", b], ["a","a","b"] <- this are valid string patitionings

  let s = "abc"
  output: ["ab", "c"] <- this is an invalid string partition. Why? Because, even when "c" is a valid palindrome, "ab" is not
  so all of the subtrings partition need to be palindromes.

  If you really think about this problem, what we need to do is to try every possible combination with one restriction in mind.
  Our approach screams for backtracking because of this. Now, given that backtracking is the way to go, how do we solve the 
  problem? After all, backtracking is just a method to solve problems given some restrictions, but the approaches differ quite
  a bit.

  Let's think first about something that should be obvious. If we partition the string into n substring of one character then
  this substrings paritions will all be palindromic:

  1) "a", "a", "b", "a" <- this is valid

  What about other partitions, where we could have at least two characters in one of the partitions?

  2) "aa", "b", "a" <- this is valid

  What about other partitions, where we could have at least three characters in one of the partitions?

  3) "a", "aba" <- this is valid
  
  When we partition our substrings into at least one substring that has two characters our possible solution should look like:

  "a", "ab", "a"

  The moment that we saw this, we know that ab is not a valid palindrome, so we no longer need to continue with that solution,
  because the restriction has already been violated. As we recursively build up our solution, we are going to discard those
  that violate our restriction, which is why backtracking is the way to go.

  Generally speaking, backtracking has the following format:

  1. Add current solution
  2. Decide whether to continue or not (by recursing further)
  3. Remove current solution

  The time complexity of the solution is O (n * (2 ^ n)), space complexity is O (n), where n is the length of the string s, and
  that's how many recursive calls will be in the stack at max.
*/

const solution = function(s) {
  let result = []

  backtracking(s, 0, result, [])

  return result
}

const backtracking = function(s, idx, result, partialResult) {
  if (idx === s.length) {
    result.push(partialResult.slice())
  } else {
    for (let i = idx; i < s.length; i++) {
      if (isValidPalindrome(s, idx, i)) {
        let substring = s.slice(idx, i + 1)
        partialResult.push(substring)

        backtracking(s, i + 1, result, partialResult)

        partialResult.pop()
      }
    }
  }
}

const isValidPalindrome = function(s, left, right) {
  while (left < right) {
    if (s[left++] !== s[right--]) return false
  }

  return true
}

let s = "aab"

const result = solution(s)
console.log(result)