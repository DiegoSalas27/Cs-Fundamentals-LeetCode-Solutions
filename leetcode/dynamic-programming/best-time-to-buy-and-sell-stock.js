// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

/*
  We are given an array of prices where prices[i] is the price og a given stock on the ith day. We want
  to maximize the profit by choosing a single day to buy one stock and choosing a different day in the future
  to set that stock. We are asked to return the maximum profit we can achieve. If no profit can be achieved
  return 0.

  Example: 

  prices = [7, 3, 5, 1, 6, 4]

  In this prices array we can buy one stock at day 0 which will costs us 7. However, if we want to sell it
  we need to sell it in the subsequent days not the same day. The prices at which we could sell it in any of
  the subsequent days will be less than 7, which means we would be losing money. So let's try buying that
  stock on day 1 which will cost us 3. We can see that the best day to sell it is on day 4, because we can 
  sell it at 6 and our profit would be of 3. Ok, can we do better? Yes. We can buy one stock
  on day 3 and sell it on day 6 that will give us a profit of 5 = 6 - 1. This is the maximum profit we can
  make.

  So what does our intuition tell us? It tells us that we can get a profit when the subsequent number at the
  next index in our array is greater than the current number we are standing. But if the subsequent number in
  our array is less than the number at the index where we are standing, we know that our profit would 
  maximize if we start buying our stock at that index in the array. Because we are calculating the maximum
  profit at every iteration of our array, we can be sure that our logic will always yield the maximum
  profit

  Just as a side note, this problem is said to be solved using dynamic programming, but honestly it doesn't
  make sense, at least with the solution that I will show you here. DP has its basis on recursion or 
  iteration (and tabulation) and it works with previous computations to build up subsequent solutions so that 
  the run time of our solutions can be drastically reduced. The solution that I show here doesn't build up 
  like that, it is actually a question that uses shifting pointers (and the sliding window technique to be 
  precise) in an array, and it could be better understood that way. If you can get the best run time and space 
  complexity in a problem without having to resort to dp then go ahead an do that. There is no need to 
  complicate things.

  The time complexity of our solution is O (n) because we iterate over the array once. 
  The space complexity of our solution is O (1), becase we are not allocating memory with the size of the 
  input.
*/

const solution = function(prices) {
  let left = 0, maximumProfit = 0

  for (let right = 1; right < prices.length; right++) {
    // Whenever we find a smaller value coming next, move the left pointer to that right position
    if (prices[right] < prices[left]) {
      left = right
    } else {
      // We always calculate the maximum profit at each iteration
      maximumProfit = Math.max(maximumProfit, prices[right] - prices[left])
    }
  }

  return maximumProfit
}

let prices = [7,1,5,3,6,4]

const result = solution(prices)
console.log(result)