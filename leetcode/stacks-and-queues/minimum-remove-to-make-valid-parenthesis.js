// https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/

/*
  We are aksed to return a valid string, where the parenthesis should be balanced as in the valid
  parenthesis problem. A valid string could be an empty string, or a string that contains only lowercase
  characters, or where it contains lowercase characters with balanced parenthesis.

  How do we go about solving this problem? Well, we can create a stack that will hold the indexes where our
  opening brackets are located, and whenever we find a closing parenthesis we will pop an element from that 
  stack, if we pop a value from our stack but it is undefined, then the closing bracket in our string has
  no corresponding opening bracket, which means it needs to be removed. How to we remove it? We can have
  another stack or data structure that hold indexes of closing brackets with no previous opening brackets as 
  well. And, while this would be a valid solution, it is not optimal as we would increase both our time and 
  space complexity. So we can do even better by replacing that closing bracket by an empty space (in place).To 
  accomplish this we will have to convert our string into an array were in place conversion like this is
  viable. After we have traversed the whole array, we can join it and the empty spaces will be erased from
  our string. 

  Example:
  ['H', '', 'l', 'l', 'o'] -> before join('')
  Hllo -> after join('')

  This is a very nice in place solution for our algorithm.

  Now, after the array traversal, we need to check if our stack has any values. If it has, then we want
  to perform an iteration on them and replace by empty spaces those indexes in our array.

  After this, we should have a valid string

  The time complexity of this solution will be O (n) as we perform split, join an a for loop through our
  string / array. The space complexity would be O (n) as our stack can store pure '(' which could be the
  string input.
*/

const solution = function(s) { // T: O (n), S: O (n)
  s = s.split('') // T: O (n)
  let stack = []

  for (let i = 0; i < s.length; i++) { // T: O (n)
    if (s[i] === ')') {
      let poppedValue = stack.pop()
      if (poppedValue === undefined) {
        s[i] = ''
      }
    } else if (s[i] === '(') {
      stack.push(i)
    } 
  }

  while(stack.length) { // T: O (n)
    let index = stack.pop()
    s[index] = ''
  }

  return s.join('') // T: O (n)
}

let s = "lee(t(c)o)de)"

const result = solution(s)
console.log(result)