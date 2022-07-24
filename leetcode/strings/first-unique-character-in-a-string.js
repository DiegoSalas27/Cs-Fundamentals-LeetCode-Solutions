// https://leetcode.com/problems/first-unique-character-in-a-string/

/*
  Here we are asked to find the first non-repeating character in a string and return its index. 
  Here the naive approach would be to do a double for loop and compare each character at each index
  with the rest of the characters in the string from left to right. This would give us O (n ^ 2) time
  complexity. 
*/

const solution1 = function(s) { // T: O (n ^ 2), S: O (1)
  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < s.length; j++) {
      if (s[i] === s[j] && i !== j) {
        break
      }

      if (j + 1 === s.length) {
        return i
      }
    }
  }

  return -1
}

/*
  A better way to solve this problem most likely would involve storing the characters in a hash map
  or. So we would store each character as a key, and the times the they have been found as their values.
  Doing this will allow us to traverse the string once from left to right, and then, we can loop
  through the keys of our hash map and see if any of its entries has a value of 1. If that is the case,
  we can look for the index of that key in our string and return it. storing each character in our
  hash map would take O (n) space, and iterating over our string would take O (n), as well is iterating
  over the keys of our hash map: O (n).
*/

const solution2 = function(s) { // T: O (n), S: O (n)
  let map = {}
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] === undefined) {
      map[s[i]] = 1
    } else {
      map[s[i]] += 1
    }
  }

  for (let key in map) {
    if (map[key] === 1) return s.indexOf(key)
  }

  return -1
}

let s = "leetcode"

const result = solution2(s)
console.log(result)