// https://leetcode.com/problems/container-with-most-water/

/*
  Given ar array of heights, we are requested to find two lines that together with the x-axis form a 
  a container such that it contains the maximum amount of water. A naive approach would be to compute
  every single area we can get from every possible pairing of lines in a double for loop. This would
  give us a time complexity of O (n ^ 2). Can we do better?
*/

const solution1 = function(heights) { // brute force solution. T: O (n ^ 2), S: O (1)
  let maxWater = 0
  for (let i = 0; i < heights.length; i++) {
    for (let j = i + 1; j < heights.length; j++) {
      const minHeight = Math.min(heights[i], heights[j])
      const width = j - i
      let area = minHeight * width
      maxWater = Math.max(maxWater, area)
    }
  }


  return maxWater
}

/*
  We can use the two pointers technique starting a left pointer at position 0 and a right pointer at position
  heights.length - 1. This will guarantee our solution that we are going to start computing the areas with
  the greatest width first. To get the maximum area we want to have the greatest height of all of the lines
  in our array and we also need to have the greatest width. Starting at the extremes of our array will allow
  us to compute the areas moving our pointers inwards. Whenever we calculate the current area at each 
  iteration, we are going to move the pointer that currently points to the smallest height inwards, so that in
  our next iteration we can get a new area with a potentially greatest minHeight and with the previous width
  minus 1. Our algorithm should stop when the left and right pointers are the same (there is no area to 
  calculate at this point).

  Shifting pointers is a technique that could be used in many different problems that involve using arrays 
  and strings. However, depending on the problem, the way to we place and move the left and right pointers 
  will differ. 
*/

const solution2 = function(heights) { // T: O (n), S: O (n)
  let left = 0, right = heights.length - 1,
  maxArea = 0

  while (left < right) {
    const minHeight = Math.min(heights[left], heights[right])
    const width = right - left
    const area = minHeight * width
    maxArea = Math.max(maxArea, area)

    if (heights[left] <= heights[right]) {
      left++
    } else {
      right--
    }
  }

  return maxArea
}

let height = [1,8,6,2,5,4,8,3,7]

const result = solution2(height)
console.log(result)