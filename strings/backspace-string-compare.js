// https://leetcode.com/problems/backspace-string-compare/

/*
  The backspace string compare problem asks us to determine if two given strings are the same after having
  performed backspace deletions of their characters based on the hashes ('#') we find in each string. The '#'
  deletes one character to its left, and if we we find to adjacent hashes '##' they will delete two
  characters to their left. One natural approach could be to use a stack so that whenever we find a character
  we just push it into it and when we find a '#' we pop the last element added from our stack. This will
  give us a solution with T: O (n) and S: O (n). We would traverse the whole string O (n), and in the worst
  case scenario we would push into our stack the whole string if no '#'s are found O (n)
*/

const solution1 = function(s, t) {
  return finalString(s) === finalString(t)
}

const finalString = function(str) { // T: O (n), S: O (n)
  let stack = [] 
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '#') {
      stack.push(str[i])
    } else {
      stack.pop()
    }
  }

  return stack.join('')
}

/*
  T: O (n) seems like the best we can do in this situation, but what about the space complexity? Can we do
  better? We actually can. While using a stack seems to be a plausible solution for the problem, there is 
  a better way to solve this problem with an S: O (1). Once again, we can use the shifting pointers technique,
  but in here we would have to place our pointers (one for each string) at the last index of both of them.
  If we find a string then we need to compare both of them and see if they match and move the pointers to the
  left. If at some point we find a '#', we need to move our pointer 2 places to the left instead of 1, 
  because the '#' forces us to dismiss one character to the left. If we find two or more consecutive '#'s
  we would have to increase by 2 our counter every time we find a '#', an decrease it for every step we go to
  our left. Once that's done, we can compare again the characters of both strings we our pointers are place
  at. If at some point they differ, then return false.
*/

const solution2 = function(s, t) { // T: O (n), S: O (1)
  let sP = s.length - 1, tP = t.length - 1

  while (sP >= 0 || tP >= 0) {
    if (s[sP] === '#') {
      let counter = 2
      while (counter > 0) {
        counter--
        sP--
        if (s[sP] === '#') {
          counter += 2
        }
      }
    }

    if (t[tP] === '#') {
      let counter = 2
      while (counter > 0) {
        counter--
        tP--
        if (t[tP] === '#') {
          counter += 2
        }
      }
    }

    if (s[sP] !== t[tP]) return false
    sP--
    tP--
  }

  return true
}


let s = "a#c", t = "b"

const result = solution1(s, t)
console.log(result)