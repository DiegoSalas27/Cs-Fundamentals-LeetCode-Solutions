const solution = function(s, k) {
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