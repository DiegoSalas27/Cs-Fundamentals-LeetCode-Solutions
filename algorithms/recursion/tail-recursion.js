// impacts final space complexity (optimized space complexity with recursive function)
// recursive function adds additional layer to call stack
// Tail recursion might improve space complexity depending on if the engine implementation of the language
// supports it.

// Normal recursion space: O(n)
// Tail recursion space: O(1)

var recFactorial = function(x) { // normal recursion
  if (x <= 1) {
    return 1
  } else {
    return x * recFactorial(--x)
  }
}

var tailFactorial = function(x, totalSoFar = 1) { // tail recursion
  if (x === 0) {
    return totalSoFar
  } else {
    return tailFactorial(x - 1, totalSoFar * x)
  }
}

const result = tailFactorial(4)
console.log(result)