// https://leetcode.com/problems/valid-anagram/

/*
  We are given 2 strings s and t. We need to return true if t is an anagram of s, else return false. Anagrams are
  just words that share the exact same letters in which ever order they appear and are by definition of the same
  length.

  Thinking about the solution comes to my mind 2 possible ways to solve it. We can use a hashmap to hold the
  number of appearances of each characters. We would iterate one of the strings to populate our hash map, and
  then we would iterate over the other string to check if any of its characters are not contained in the hash map.
  If that is the case, then obviously they do not match and we return false. If, however, a character is contained
  in the hash map, we can decrease by one the value at that key. In the end, we can iterate through the hash map
  values and check if there is any value greater than 0, that would mean that t is not an anagram of s, because 
  one of them have one more character repeated.

  The time complexity of this solution is O (s + t), where s is the length of string s, and t is the length of 
  string t. The space complexity of this solution is O (n), because we are storing in a hash map the characters
  of any of the strings, and because we validate that both strings have the same length, it really doesn't matter
  in which order we perform the iterations of each of them
*/

const solution = function(s, t) { // T: O (s + t), S: O (n)
  if (s.length !== t.length) return false

  let map = new Map()

  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) {
      map.set(s[i], 1)
    } else {
      map.set(s[i], map.get(s[i]) + 1)
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (!map.has(t[i])) return false

    map.set(t[i], map.get(t[i]) - 1)
  }

  for (let [key, value] of map) {
    if (value !== 0) return false
  }

  return true
}

/*
  This second solution is not as optimal as the first one, because we are sorting the strings by first mapping 
  them into an array and then using the function sort. This takes O (n) to convert them into arrays an O (n log n)
  to sort them. So the overall time complexity is O (n + n log n) = O (n log n), the space complexity is O (n)
  because we are storing the strings in arrays.
*/

const solution2 = function(s, t) { // T: O (n log n), S: O (n)
  if (s.length !== t.length) return false

  if (s.split('').sort() !== t.split('').sort()) return false

  return true
}

let s = "anagram", t = "nagaram"

const result = solution(s, t)
console.log(result)