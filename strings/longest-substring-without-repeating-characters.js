// https://leetcode.com/problems/longest-substring-without-repeating-characters/

/*
  This problem asks us to get the length of the longest substring without repeating characters. 

  for example: "abccabb"

  we can see that in this string the longest substring we can form is 3 (either 'abc' or 'cab'). Now,
  what do they mean by substring? A substring is a portion of the original string were all the characters
  are sequential, side by side, and contiguous. a Subsequence is a portion of the original string, where
  characters are not contiguous, but appear in the same order they appeared in the original string (we can
  omit characters in between).

  A naive brute force approach would be for us to do a double for loop where we are going to start
  traversing the string from each index to the end, until we find the longest substring without repeating
  characters. For example, we could start from 'a' and traverse the array until the end and get the longest
  substring without repeating characters. Then  we would try with b, then c, etc. 

  The time complexity for this solution is: T: O (n ^ 2), space complexity is: S: O (1)
*/

const solution1 = function(s) { // brute force solution T: O (n), S: O (n)
  if (s.length <= 1) return s.length

  let longest = 0
  for (let i = 0; i < s.length; i++) {
    let set = new Set()
    set.add(s[i])
    for (let j = i + 1; j < s.length; j++) {
      if (set.has(s[j])) {
        longest = Math.max(longest, set.size)
        break
      } else {
        set.add(s[j])
        longest = Math.max(longest, set.size)
      }
    }
  }

  return longest
}

/*
  While our previous solution works, there can be a better way to solve this problem is a time complexity of
  O (n). The way that we do this is by avoiding the double nested for loop and using a hash map. With a hash
  map we can save as a key the characters we currently are analyzing and as a value its index. With this, we
  can traverse our string for left to right and whenever we find a character that has been previously added
  into our hash map. If such a character exists we need to get at this point the length of our substring,
  then, we need to update our left pointer to the character value in our hash map + 1 so that our left 
  pointer starts at an index in our string where characters are not repeated from our left pointer to our
  right pointer. (This technique is the sliding window, where the right pointer always moves to the right
  and our left pointer moves based on a condition). After that, we have to update the index of the repeated
  character to the index were our right pointer is currently are located.

  Note that if a repeated character is found in an index which is smaller than the index where our left 
  pointer is placed, it means that we can dismiss it and keep incrementing our substring by moving our 
  right pointer.

  For example:
    abcad
     ^ ^
     | |
     L R

  hash map = {
    'a': 0,
    'b': 1,
    'c': 2
  }
     
  Here the right pointer sits in an index where the a character has been found in our hash map previously,
  but our left pointer is located at an index (1) which is greater than the index of 'a' (0), so the left
  pointer can remain where it is placed, and we can keep moving our right pointer to the right to increase
  the length of our substring (which will be of 4).
*/    


const solution2 = function(s) { // T: O (n), S: O (n)
  let map = {}
  let left = 0, longest = 0
  for (let right = 0; right < s.length; right++) {
    const character = s[right]

    if (map[character] !== undefined && map[character] >= left) {
      left = map[character] + 1
    }

    longest = Math.max(longest, right - left + 1)
    map[character] = right
  }

  return longest
}

let s = "abcabcbb"

const result = solution2(s)
console.log(result)