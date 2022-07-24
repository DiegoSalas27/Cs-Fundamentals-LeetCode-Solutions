// https://leetcode.com/problems/trapping-rain-water/

/*
  The problem boils down to finding how much water can be contained at each index of the array we are given. 
  This is because for each index there will be a left max height and a right max height that we can find. If
  the height of the index we are currently in is less that the minimum of the two heights we find (the height)
  of the amount of water is bounded by the lowest of the left and right heights or else the water would spill
  out of the container. Then, the only thing we need to do is to subtract from lowest height the height we are
  currently in and from there accumulate the amount of water contained so far. This approach would traverse
  the array all the way to the left and all the way to the right for every index (T: O (n ^ 2)).
*/

const solution1 = function(height) { // brufe force solution. T: O (n ^ 2), S: O (1)
  let waterContained = 0

  for (let i = 0; i < height.length; i++) {
    let maxLeft = height[i]
    let left = i

    while (left >= 0) {
      maxLeft = Math.max(maxLeft, height[left])
      left--
    }

    let maxRight = height[i]
    let right = i

    while (right < height.length) {
      maxRight = Math.max(maxRight, height[right])
      right++
    }

    let minHeight = Math.min(maxLeft, maxRight)

    waterContained += minHeight - height[i] < 0 ? 0 : minHeight - height[i]
  }

  return waterContained
}

/*
  Why using shifting pointers over dynamic programming?

  Trapping Rain Water is a problem that has multiple solutions, and the two most prominent are shifting
  pointers and dynamic programming (dp). However, we need to think about each of both approaches. Why would 
  we want to use dp over shifting pointers? We know for a fact that shifting pointers is
  a technique that tends to decrease not only time complexity of brute force solutions, but also in many
  cases their space complexity; dp, on the other hand, is an optimization technique that
  involves memoizing previous computed solutions to not repeat computations over and over again (storing 
  results of subproblems in a data structure of our choice). Generally speaking, dp will reduce exponential
  time complexities to polynomial time (best case scenario linear time). Ok so, but why not using dp? The 
  reason is because dp tends to use memory in order to store previous computations (and I say tends because
  some solutions may just update an array or matrix in place instead of creating additional memory data 
  structures, for example). Also, dynamic programming forces you to come up with an idea that many times is 
  hard to get to on how to store the computations made. dp programming is not a very straight forward
  solution and the way it is applied in different problems can differ quite a lot.

  The shifting pointers technique

  The trapping rain water problem is definitely a hard problem to come up with a solution for. However, once
  we understand the basic idea of how to go about calculating the amount of water at each index in the array
  iteratively, we know that we can use at this point shifting pointers to reduce the time complexity. 
  How? well, we can create 4 pointers: left, maxLeft, right, and maxRight. left pointers traverses the array
  from left to right; the right pointer traverses the array from right to left; and the maxLeft and maxRight
  are pointers which will hold the greatest height we have found so far starting from left and from the right
  respectively. This addition of 2 pointers to store the greatest values as we traverse left to right and
  right to left the array will allow us to improve our time complexity to O (n), while maintaining our space
  complexity to O (1). How do we move our pointers? Well, whenever you go the next height (left to right or 
  right to left) you need to know which of the maxHeights you store so far (maxLeft and maxRight) is greater, 
  because that will tell you which of the two pointers (left or right) to move. If the maxLeft is less than
  maxRight it means you want to move you left pointer to the right, because you know that the left boundary
  will determine the maximum amount of water each index in our array (moving from left to right) can contain
  (we really don't care about our right boundary because is greater as it has no impact in our calculation). 
  The same logic would apply if maxRight is less than maxLeft, but we would move our right pointer to the left.
*/

const solution2 = function(height) { // T: O (n), s: O (1)
  let left = 0, right = height.length - 1, 
  maxLeft = height[left], maxRight = height[right]
  let waterContained = 0

  while (left <= right) {
    if (maxLeft <= maxRight) {
      if (height[left] <= maxLeft) {
        waterContained += maxLeft - height[left]
      } else {
        maxLeft = height[left]
      }
      left++
    } else {
      if (height[right] <= maxRight) {
        waterContained += maxRight - height[right]
      } else {
        maxRight = height[right]
      }
      right--
    }
  }

  return waterContained
}

let height = [5,5,1,7,1,1,5,2,7,6]

const result = solution2(height)
console.log(result)