// https://leetcode.com/problems/coin-change/

/*
  We are given an integer array coins representing coins of different denominations and an integer amount
  repreenting a total amount of money. We are asked to return the fewest number of coins that we need to
  make up that amount. If that amount of money cannot be made up by any combinatin of the coins return -1.
  We may assume that we have infinite number of each kind of coin.

  There are multiple ways in which we can solve this problem. I want to start with naive recursive approaches
  which can yield interesting insights. 

  The first approach is a backtracking solution that will try every possible combination of numbers that
  will comply with a restriction which is that the total sum so far is less than the amount given.
  We can store in a temporary array the values that make up that amount and for each combination, we can
  store that in a results array. In the end of our backtracking solution the results array should contain
  all of the combination that can make up that amount and we should just return the smallest inner array.

  This might not be the best solution, but the insights that we will be able to take from it are important,
  and can help us to think for solution of problems that can only be solved with backtracking. Also, this
  solution might serve as a boilerplate for other solutions where we are told to retrieve "all combinations
  under some conditions".

  The time complexity of this solution is exponential, and the space complexity is incredibly bad. which
  is why you will get such a result from Leetcode if you copy the code coming next:

  &lt;--- Last few GCs ---&gt;
  [32:0x4f30180]      673 ms: Scavenge 99.1 (117.4) -&gt; 97.3 (132.2) MB, 23.8 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure
  [32:0x4f30180]      701 ms: Scavenge 113.0 (132.2) -&gt; 114.8 (133.7) MB, 15.7 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure
  [32:0x4f30180]      740 ms: Scavenge 114.8 (133.7) -&gt; 113.4 (144.2) MB, 38.8 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure
  &lt;--- JS stacktrace ---&gt;
  FATAL ERROR: Scavenger: semi-space copy Allocation failed - JavaScript heap out of memory
  1: 0xb00e10 node::Abort() [nodejs run]
  2: 0xa1823b node::FatalError(char const*, char const*) [nodejs run]
  3: 0xcee09e v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [nodejs run]
  4: 0xcee417 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [nodejs run]
  5: 0xea65d5  [nodejs run]
  6: 0xf1fc4e v8::internal::SlotCallbackResult v8::internal::Scavenger::ScavengeObject&lt;v8::internal::FullHeapObjectSlot&gt;(v8::internal::FullHeapObjectSlot, v8::internal::HeapObject) [nodejs run]
  7: 0xf20ef8 v8::internal::Scavenger::ScavengePage(v8::internal::MemoryChunk*) [nodejs run]
  8: 0xf21217 v8::internal::ScavengerCollector::JobTask::ConcurrentScavengePages(v8::internal::Scavenger*) [nodejs run]
  9: 0xf24714 v8::internal::ScavengerCollector::JobTask::ProcessItems(v8::JobDelegate*, v8::internal::Scavenger*) [nodejs run]
  10: 0xf24860 v8::internal::ScavengerCollector::JobTask::Run(v8::JobDelegate*) [nodejs run]
  11: 0x18db9e4 v8::platform::DefaultJobWorker::Run() [nodejs run]
  12: 0xb6d535  [nodejs run]
  13: 0x7f6d7671c609  [/lib/x86_64-linux-gnu/libpthread.so.0]
  14: 0x7f6d76643103 clone [/lib/x86_64-linux-gnu/libc.so.6]

  Basically, we just killed the javascript memory heap. But it works, right? :)
*/

const solution1 = function(coins, amount) { 
  let result = []
  backtracking(coins, amount, 0, result, [])
  console.log(result)

  // note that we return the array with smallest length in our matrix
  return result.length === 0 ? -1 :  result.reduce((a, b) => a.length <= b.length ? a : b).length
}

// This is a boilerplate for a recursive function to create all combinations of numbers under some conditions
const backtracking = function(coins, amount, totalSofar, result, partialResult) {
  if (totalSofar === amount) {
    result.push([...partialResult])
  } else {
    for (let i = 0; i < coins.length; i++) {
      if (totalSofar + coins[i] <= amount) {
        partialResult.push(coins[i])
        
        backtracking(coins, amount, totalSofar + coins[i], result, partialResult)

        partialResult.pop()
      } 
    }
  }
}

/*
  Interesting, we know that the last element in our matrix is the array with the smallest length and we need
  to return that length. Why is this happening? Because in our recursive solution we are adding to are 
  partialResult array the smallest elements always, until the condition is not met. And that is because the
  given array [1,2,5] has its numbers sorted in ascending order. The last array in the matrix should contain
  [5]. Ok, so what if we are a bit smarter and sort the array in descending order [5, 2, 1] so that our first
  array in the matrix contains [5] and we don't need to compute more recursive calls, but just return the 
  length of the first array we obtain? That will improve a lot our run time and storage.
*/

// grerdy method
const solution2 = function(coins, amount) {
  if (amount === 0) return 0

  let result = []
  coins.sort((a, b) => b - a) // sort in desc order
  const res = rec(coins, amount, 0, result)
  console.log(result)
  return res ? res : -1
}

const rec = function(coins, amount, totalSofar, result) {
  if (totalSofar === amount) {
    return true
  } else {
    for (let i = 0; i < coins.length; i++) {
      if (totalSofar + coins[i] <= amount) {
        result.push(coins[i])
        
        if (rec(coins, amount, totalSofar + coins[i], result)) {
          return result.length
        }

        result.pop()
      } 
    }
  }
}

/*
  We have performed two backtracking solutions that seem yield the request result.
  The first solution we came up with does solve the problem but with a horrendus complexity in time and space.
  The second one seems to work, but it doesn't:
  
  nums = [1, 3, 4, 5], amount = 7

  If we go greedy like in our second solution we would take:
  
  [5, 1, 1]

  And this is indeed what the second solution returns, but is this right? It's not, going greedy like this
  does not necessarily yield the best solution but rather an approximation. The correct answer should be:

  [3, 4]

  This is actually what our first solution would yield.

  Now, let's do a proper recursive solution that can solve the problem, see if we can memoized it.
*/

const solution3 = function(coins, amount) {
  if (amount === 0) return 0

  const result = rec2(coins, 0, amount, 0, 0)

  return result === Infinity ? -1 : result
}

const rec2 = function(coins, idx, amount, totalSofar, numCoins) {
  if (totalSofar === amount) {
    return numCoins
  }

  if (idx >= coins.length || totalSofar > amount) {
    return Infinity
  }

  return Math.min(
    rec2(coins, idx + 1, amount, totalSofar, numCoins),
    rec2(coins, idx, amount, totalSofar + coins[idx], numCoins + 1))
}

/*
  Ok this is a bit smarter, but still. How do we memoize it? Are there actually repeated instances of 
  the problem? The answer is no. If you write down the state space tree you will notice that the tree shrinks
  from left to right, because there are less combinations of coins. Because of this, nothing can be memoized.
  The time complexity of this solution is still exponential.

  Let's find yet another recursive approach where we can actually find a memoization optimization for
*/

const solution4 = function(coins, amount) {
  if (amount === 0) return 0

  let res = rec3(coins, amount, 0, 0)

  return res === Infinity ? -1: res
}

const rec3 = function(coins, amount, totalSoFar, numCoins) {
  if (totalSoFar > amount || numCoins > amount) {
    return Infinity
  }

  if (totalSoFar === amount) {
    return numCoins
  }

  let leastNumCoins = Infinity

  for (let i = 0; i < coins.length; i++) {
    leastNumCoins =  Math.min(leastNumCoins, rec3(coins, amount, totalSoFar + coins[i], numCoins + 1))
  }

  return leastNumCoins
}

// with memoization

const solution5 = function(coins, amount) {
  if (amount === 0) return 0

  let dp = new Array(amount + 1).fill(0).map(() => new Array(amount + 1))

  let res = rec4(coins, amount, 0, 0, dp)

  return res === Infinity ? -1: res
}

const rec4 = function(coins, amount, totalSoFar, numCoins, dp) {
  if (totalSoFar > amount || numCoins > amount) {
    return Infinity
  }

  if (totalSoFar === amount) {
    return numCoins
  }

  if (dp[numCoins][totalSoFar] !== undefined) return dp[numCoins][totalSoFar]

  let leastNumCoins = Infinity

  for (let i = 0; i < coins.length; i++) {
    leastNumCoins =  Math.min(leastNumCoins, rec4(coins, amount, totalSoFar + coins[i], numCoins + 1, dp))
  }

  dp[numCoins][totalSoFar] = leastNumCoins
  return dp[numCoins][totalSoFar]
}

/*
  Solution 4 does actually help us with the run time of our recursive algorithm, and this is a truly top
  down dp approach that uses memoization. The only we that we can reuse computations is by identifying 
  uniquely our state transition. This means, that we need to know (in this case) the number of coins
  having been used and the total made so far using those coins. 

  Nice could this be the optimum solution? No it's not. While the combinations of coins is calculated only
  once. We are using a lot of memory (a matrix) to store our state transitions. Imagine if we were to scale
  up for a huge value, say 1000000. That might kill our memory heap. Because that would mean that we have
  to create a 1000000 * 1000000 matrix. 

  Now what? Well, now we can think about a solution that goes from bottom to top using tabulation.
  The logic behind this is really simple and it is actually intuitive.
*/

const solution6 = function(coins, amount) { // T: O (n * amount), S: O (amount)
  if (amount === 0) return 0

  let dp = new Array(amount + 1).fill(amount + 1)

  dp[0] = 0

  coins.sort((a, b) => a - b)

  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i) {
        dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]])
      } else {
        break
      }
    }
  }

  return dp[amount] === amount + 1 ? -1 : dp[amount]
}

/*
  We are creating a dp array that store values from 0 to 7. This dp array will help us determine the amount
  of coins that we can use to make for value 0, 1, ... to 7. Why are we doing this? Because this will help 
  us work our way up from previous calculations. Follow this example:

  let coins = [1,3,4,5], amount = 7
  
  It's obivous that to make for a value of 0 we need 0 coins.
  To make for a value of 1 we need 1 coin of denomination 1. 

  How do can we extrapolate this logic to dp? Well, we can iterate over the dp array, and for each target
  value we can compare that with all of the coins we are given (the inner for loop). If the coin is less
  or equal than the target we want to calculate for, then we can just say that dp[i] will we equal to the
  minimum between itself and the dp[i - nums[j]] + 1. In the case for making a value of 1, this will mean
  take the value of dp[0] and add 1 to it, because that one represents having taken one coin.

  To make for a value of 2 we need 2 coins of denomination 1.

  dp[0] = 0
  dp[1] = 1
  dp[2] = min(dp[2], 1 + dp[2 - 1]) = 2

  If the coin denomination is greater than the target value, there is nothing to compute obviously.

  To make for a value of 3 we need 3 coins of denomination 1 or 1 coin of denomination 3

  dp[0] = 0
  dp[1] = 1
  dp[2] = 2

  dp[3] = min(dp[3], 1 + dp[3 - 1]) = 3 // prev iteration
  dp[3] = min(3, 1 + dp[3 - 3]) = 1 // subsequent iteration

  We can perform this operation iteratively building up our final target value = 7
*/

let coins = [1,3,4,5], amount = 7

let result = solution1(coins, amount)
console.log('backtracking approach 1: ', result)

result = solution2(coins, amount)
console.log('greedy approach: ', result)

result = solution3(coins, amount)
console.log('recursive approach: ', result)

result = solution4(coins, amount)
console.log('recursive approach 2: ', result)

result = solution5(coins, amount)
console.log('top down memoization: ', result)

result = solution6(coins, amount)
console.log('bottom up tabulation: ', result)