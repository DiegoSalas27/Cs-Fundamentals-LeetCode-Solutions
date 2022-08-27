// https://leetcode.com/problems/longest-repeating-character-replacement/

/*
  We are given a string s and an integer k. We are told to choose any character in the string and change
  it to any other uppercase English character and that we can do this operation at most k times. We are
  asked to return the length of the longest substring containing the same letter you can get after 
  performing the above operations.

  How do we solve this problem? There are plenty of ways, but the best solution lies on using shifting
  pointers and a hashmap. How? Well, we can iterate through the string (using our right pointer) and
  we can creeate/update the frequencies of the character we see currently (in a frequencies hash map). 
  After that We can get the maximum frequency. 

  Why are we doing this? Because our goal is to get the maximum length of the substring where we can replace
  at most k characters so all of them are the same. But how? Well, the maxFrequency should be substracted
  from the length of the current window we have whose value is calculated by substracting left from right
  + 1. The reason for which we subtract maxFrequency from the current window is because the result should
  indicate us the number of characters we can replace for the character with the longest frequency, and
  if that result is less or equal to k, then its doable, else it would be impossible, right? If it's 
  impossible, then we should update our left pointer to the right by 1, so that we can decrease our window
  and try another substring starting from a different starting place (sliding window technique).

  The time complexity of this solution is O (n) because we iterate through the string. The space complexity
  of our solution is O (n) too, because we can store n different characters at most in our hash map.
*/

const solution = function(s, k) { // T: O (n), S: O (n)
  let left = 0, longest = 0, maxF = 0, frequencies = {}

  for (let right = 0; right < s.length; right++) {
    let character = s[right]

    // create or update frequency of a character
    if (frequencies[character] === undefined) {
      frequencies[character] = 1
    } else {
      frequencies[character]++
    }

    // get max frequency between all characters
    maxF = Math.max(maxF, frequencies[character])

    // check if string is valid and get longest substring
    let len = right - left + 1
    if (len - maxF <= k) {
      longest = Math.max(longest, len)
    } else {
      frequencies[s[left]]--
      left++
    }
  }
  
  return longest
}

let s = "ABAB", k = 2

const result = solution(s, k)
console.log(result)