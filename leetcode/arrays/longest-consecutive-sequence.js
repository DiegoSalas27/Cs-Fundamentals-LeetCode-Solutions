// https://leetcode.com/problems/longest-consecutive-sequence/

/*
  We are given an unsorted array nums and we are told to return the length of the longest consecutive 
  elements sequence. The idea is to implement an algorithm that can run in O(n) time.

  Well, we know we cannot sort so this makes our lives a little bit harder, but it doesn't have to be.
  Linear time solutions often require caching values, and this is not an exemption. We can pass the nums
  array as a constructor for a hash set so that we can have O (1) lookups. Why a has set? because the hash
  set will be later use to look for the beginning of a consecutive increasing sequence. For example

  nums: [100, 4, 200, 1, 3, 2]

  If we were to separate the consecutive sequences we would have the following:

  -> 100
  -> 200
  -> 1, 2, 3, 4

  The greatest consecutive increasing sequence is 4. Ok, how can we tell that using our algorithm. As I 
  mentioned, we need to know which number is the beginning of a sequence, so we can do the following

  if (!set.has(100 - 1)) ...

  This would mean that 100 is the beginning of a sequence within nums array. Ok, then what? Well, we can
  then perform a while loop as long as we can keep looking for consecutive values moving forward:

  counter = 0
  while (set.has(100 + counter)) ...

  And so, as we can see, we can compute all of the consecutive sequences within nums array and get the
  longest one, that is the one that we return.

  The time complexity of this solution is O (n). The space complexity is also O (n) because we cache
  values in our hash set.
*/

const solution = function(nums) { // T: O (n), S: O (n)
  if (nums.length === 0) return 0

  let longest = 0

  let set = new Set(nums)

  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i] - 1)) continue

    let length = 1

    while (set.has(nums[i] + length)) {
      length++
    }

    longest = Math.max(longest, length)
  }

  return longest
}

let nums = [100,4,200,1,3,2]

const result = solution(nums)
console.log(result)