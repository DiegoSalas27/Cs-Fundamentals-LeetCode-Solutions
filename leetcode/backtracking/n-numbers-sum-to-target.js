/* 
Given a target, return all the combinations of numbers in an array that can sum up to the target
the numbers are 1, 2 and 3, and you can use them as many times as you want. But there are some constraints
that need to be met:
3 can only be followed by 1 (sequentially)
2 can be followed by 1 or 2 (sequentially)
1 can be followed by 3 or 2 (sequentially)

test case:
[1,2,3] => [[2,1,2,1,3,1,2],...] valid , target 12

*/

const solution = function(nums, validations, target) {
let result = []

recursive(nums, 0, validations, target, [], result)

return result
}

const recursive = function(nums, currentSum, validations, target, partialResult, result) {
if (currentSum === target) {
  result.push(partialResult.slice())
} else {
  for (let i = 0; i < nums.length; i++) {
    if (isValid(validations, partialResult[partialResult.length - 1], nums[i])
    && currentSum + nums[i] <= target) {
      partialResult.push(nums[i])

      recursive(nums, currentSum + nums[i], validations, target, partialResult, result)

      partialResult.pop()
    }
  }
}
}

const isValid = function(validations, lastValue, valueToAdd) {
if (lastValue === undefined) return true

return validations[lastValue - 1][valueToAdd - 1]
}

let nums = [1,2,3]
let validations = [
[false, true, true],
[true, true, false], 
[true, false, false]
]
let target = 12

const result = solution(nums, validations, target)
console.log(result)
