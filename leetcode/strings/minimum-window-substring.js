// https://leetcode.com/problems/minimum-window-substring/

/*
  We are given two strings s and t of lengths m and n respectively. We are asked to return the minimum window
  substring of s, such that every character in t (including duplicates) is included in the window. If there 
  is no such substring, return the empty string "".

  How do we do this? Well, let's first think about the edge cases, so if s is empty, there is no
  substring that can contain every character of t, right? so we just return an empty string. Also, if t
  has more characters than s, there is no way that s can contain all characters of t, right? so we should
  also return an empty string.

  Ok, having done that, let's think about a logical way in which we can optimally solve this problem. The 
  solution will require caching via a hash map and shifting pointers (sliding window technique) to narrow
  our substring to the smallest one that containts all characters in t. So, what we can do, it to create
  two objects that are going to hold the characters as keys for each string: called tCharacters and 
  sCharacters. tCharacters is going to be populated through a for loop on t such that the values represent
  how many times a character (key) is present on the string. Also in this loop we will create key values
  for sCharacters where the values will all be zeroes, because later we will make use of it.

  Example:
  tCharacters = {
    A: 1,
    B: 1,
    C: 1
  }

  sCharacters = {
    A: 0,
    B: 0,
    C: 0
  }

  After this, we create a series of variables that will allow us to compute the smallest window that 
  contains all characters in t:

  we create a "left" variable that will be the starting position of our window and that will be updated
  whenever a valid substring is met. Then, we will have a "shortest" variable that will hold the length of
  the shortest valid window so far. The "result" variable will store the smallest window's characters.
  Finally we will have two variablers: "have" and "need" which will be used logically to perform some 
  validations that we will see in a next.

  So, after defining those variables we need to iterate through the s string and check if at each step
  the character is present in our sCharacters hash map, if it is, we update the value of that key by 1, and
  if at that time sCharacters[s[right]] === tCharacters[s[right]] it means that so far our window contains
  all the characters s[right] in the tCharacters string. And that means that we can increase our have 
  variable by 1 (note that have is an integer variable that starts at 0 and increases as sCharacters keys'
  values matches the respective keys' values on the tCharacters hash map). Note that "need" is an integer
  variable that will hold all distinct characters in the string "t" (meaning no duplicates). When have
  and need are equal, that is when we have found a valid window and that is when we can update our result
  and our shortest variable. Finally, at this point we want to increase our left pointer (shrink our window)
  as long as sCharacters[s[left]] < tCharacters[s[left]], because that is when have is decrease by one. 

  This is a hard problem, and perhaps the solution will make it clearer for you. The time complexity of
  this problem is O (n) because we iterate through the string s. The space complexity is O (n) because
  we store here all distinct characters of t in a hash table.
*/

const solution = function(s, t) { // T: O (n), S: O (n)
  if (s.length === 0 || t.length > s.length) return ''

  let sCharacters = {}
  let tCharacters = {}

  for (let i = 0; i < t.length; i++) {
    if (tCharacters[t[i]] === undefined) {
      tCharacters[t[i]] = 1
      sCharacters[t[i]] = 0
    } else {
      tCharacters[t[i]]++
    }
  }

  let left = 0, result = '', shortest = Infinity, have = 0, need = new Set(t.split('')).size

  for (let right = 0; right < s.length; right++) {
    if (sCharacters[s[right]] !== undefined) {
      sCharacters[s[right]]++
      if (sCharacters[s[right]] === tCharacters[s[right]]) {
        have++
      }
    }

    while (have === need) {
      let len = right - left + 1
      if (shortest > len) {
        shortest = len
        result = s.substring(left, right + 1)
      }

      if (sCharacters[s[left]] !== undefined) {
        sCharacters[s[left]]--
        if (sCharacters[s[left]] < tCharacters[s[left]]) {
          have--
        }
      }

      left++
    }
  }

  return result
}

let s = "ADOBECODEBANC", t = "ABC"

const result = solution(s, t)
console.log(result)