// https://leetcode.com/problems/valid-parentheses/

/*
  we are given a string containing '(', ')', '{', '}', '[' and ']'. We need to determine if the given
  string is valid. A string is valid if the brackets are closed in the correct order, and when they are
  closed by the same type of brackets

  Example 1:
    Input: s = "()"
    Output: true

  Example 2:
    Input: s = "()[]{}"
    Output: true
  
  Example 3:
    Input: s = "(]"
    Output: false

  Example 4:
    Input: s = "({[]})"
    Output: true

  When ever we have this pattern of closing brackets with such an order, we should directly think about a
  last in first out solution. Meaning that the last bracket we have seen so far shoule be the first that needs
  to be closed. Stacks are data structures that allow us to validate such constraints. In javascript, a stack
  can be represented using arrays (which conveniently have built in methods that naturally copies the stacks
  api methods). 

  The way that this algorithm works is by creating an empty stack (array) and pusing opening brackets to it.
  Whenever we see a closing bracket of any type, we want to pop an element from our stack and that element
  should be the opening bracket that corresponds to the closing bracket we are currently looking at. If it is
  not, or if the poppedValue is undefined (because there is nothing in our stack), then this would be an 
  invalid string input. If in the end of our for loop our stack is empty we return true, else return false.

  The time complexity of this solution is O (n) as we iterate through the string, and the space complexity
  would be o (n) as we can push every single bracket of the given string (if all of them are opening brackets)
*/

const solution = function(s) { // T: O (n), S: O (n)
  if (s.length === 1) return false

  const stack = []
  const brackets = {
    ')': '(',
    ']': '[',
    '}': '{'
  }

  for (let i = 0; i < s.length; i++) {
    if (brackets[s[i]] !== undefined) {
      let poppedValue = stack.pop()
      if (poppedValue !== brackets[s[i]]) return false
    } else {
      stack.push(s[i])
    }
  }

  return stack.length === 0
}

let s = "(]"

const result = solution(s)
console.log(result)