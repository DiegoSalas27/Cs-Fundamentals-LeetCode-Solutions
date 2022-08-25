// https://leetcode.com/problems/group-anagrams/

/*
  Given an array of strings: strs, we need to group the anagrams together. The result should have the form of a
  matrix in which each array has groups words that are anagrams.

  How do we approach this problem? Well, we can think of a simple way to solve by iterating over the string array
  given, and for each of the strings we can sort them one by one and then with the
  help of a hash table, we can create as indexes the sorted strings, and as values we will have an array that 
  contains all the anagrams. So that, in the end, we can loop through the keys of the hash table and push
  their values (the grouped anagrams) into a result array which is  what we return.

  The time complexity of this solution is O (m * n log n) because we loop m times the string array, and then
  we sort strings of size n. The space complexity should be O (n) because the hash table and the result array
  could hold each of the keys and values of the original array if no anagrams are found.
*/

const solution = function(strs) { // T: O (m * n log n), S: O (n)
  if (strs.length === 1) [strs]

  let memo = {}

  for (let i = 0; i < strs.length; i++) { // O (m * n log n)
    let sorted = strs[i].split('').sort().join('')

    if (memo[sorted] === undefined) {
      memo[sorted] = [strs[i]]
    } else {
      memo[sorted].push(strs[i])
    }
  }

  return Object.values(memo);    
}

let strs = ["eat","tea","tan","ate","nat","bat"]

const result = solution(strs)
console.log(result)