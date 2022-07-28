// https://leetcode.com/problems/min-cost-climbing-stairs/

// dynamic programming: https://www.geeksforgeeks.org/dynamic-programming/?ref=lbp

/*
  In this question we are given an array with numbers. Each index in the array cost[i] represent the cost
  of stepping on the ith staircase. Once you step on that staircase you can either climb one or two steps.
  You can either start from the step with index 0 or the step at index 1.

  Example:

  cost = [10, 15, 20]

           ____________
        __|top
     __|20
  __|15
 |10

 the staircases could be visualized as so. We can then use our logic to think about how to solve this problem.
 We can either start by taking 10 or taking 15 as a cost and then climb one or two stairs. So, if we start at
 step 0 we take 10 an from there we could choose to take 15 or 20. We have to take the one that has the 
 cheapest cost (15). That would give as 25, from there we can take either 20 or reach the top of the floor.
 If we reach the top of the floor then 25 would be our accumulated value which is indeed the best you can do
 if you start at index 0. How about if we start at index 1? We can take 15 and from there choose to take 20
 or reach the top of the floor. We want to reach the top of the floor so that we accumulate just 15, which is
 indeed the best we can do if we start at index 1. 

 So that's it. After having computed every posibility starting at index 0 and 1 we came up with a solution
 that works. Now, let's come up with our recursive algorithm approach. We can divide our problem into
 subproblems starting with the first 2 indexes of our array and we want to get the minimum accumulated values
 from them:

 min (rec(0)), rec(1)) 

 Here is the pseudo code for our recurrence relation. Basically, we are trying to divide our 
 problem into two because we have two options to choose (climb one stair or climb two staris), and from those
 2 options we need to choose between two options and so on. When do we stop? We stop whenever we have 
 traversed the entire array from bottom to top (that's our base case). Let's look at it in a graphical way:

 cost = [10, 15, 20]

                   0                    
              10 /   \ 10               
                /     \
               1        2                 
           15 /\ 15  20 /\ 20      
             /  \      /  \ 
            2     3   3    4
        20 / \ 20 |   |    |
          /   \   25  30   30
         3     4
         |     |
         45    45

  In this state space tree (tree representing all the possible states) we have two decisions to make at each
  function call (we either climb up 1 or 2 stairs) but we want to get the minimum cost of climbing those
  stairs at each recursive call. 

  As you can see the complexity time of this solution is exponential, we are dividing the problem into halves
  n times for each halve, where n is the height of the tree which is equal to the number of stairs in our 
  array. We have two branches for each node which is why the total number of recursive function calls in our 
  tree is 2 ^ n. Take into account, that we will create the same state space tree if we start at index 1, 
  which is why we get 2 ^ n twice (we would drop the constant however).

  The space complexity is linear: O (n), because the maximum number of nested function calls in our stack
  will be at most the number of elements in our array. Say we are at the 3rd recursive call, in the fourth 
  recursive call we would return (we reached the top of the floor), and then try the second option (climbing
  two stairs) we still reach the top of the floor, which would also return immediately. We keep popping and
  adding function calls into our stack, but never exceeding the the size of our array because of our base
  case.
*/

// Recursive solution (bottom up)

const solution = function (cost) { // T: O (2 ^ n), S: O (n)
  const len = cost.length - 1;
  return Math.min(rec(cost, 0, 0, len), rec(cost, 1, 0, len));
};

const rec = function (cost, idx, totalCost, len) {
  if (len < idx) return totalCost;

  return Math.min(
    rec(cost, idx + 1, totalCost + cost[idx], len),
    rec(cost, idx + 2, totalCost + cost[idx], len)
  );
};

// let cost = [10, 15, 20] 

let cost = [841, 462, 566, 398, 243, 248, 238, 650, 989, 576, 361, 126, 334, 729, 446,
  841, 462, 566, 398, 243, 248, 238, 650, 989, 576, 361, 126, 334, 729, 446,
  650, 989, 576, 361, 126, 334, 729, 446, 334, 729, 446,
  650];

/*
  As we can tell, there are overlapping subproblems in the previous solution, meaning that there is a lot
  of unnecesary duplicate computation. Let's take a look again at our state space tree:

   cost = [10, 15, 20]

                   0                    
              10 /   \ 10               
                /     \
               1        2                 
           15 /\ 15  20 /\ 20      
             /  \      /  \ 
            2     3   3    4
        20 / \ 20 |   |    |
          /   \   25  30   30
         3     4
         |     |
         45    45


        2             2    
    20 / \ 20      20 /\ 20
      /   \          /  \ 
     3     4        3    4      <- cannot be memoized because accumulated results differ, even when
     |     |        |    |         the indexes are the same 
     45    45       30   30

  As you can see, here we see an overlapping of to subproblems that call the same problem at the same index.
  Note that the ending accumulated values for each of them differs by 15, because the left subproblem was
  previously called by subproblem at index 1 which added 15 to the accumulated result. This subproblem could 
  be memoized or stored in a data structure that allow us to prevent duplicate computations. However, because 
  of the way our problem has been layed out, it would unperformant to memoize values in terms of space 
  complexity because we would need to uniquely identify in which state transition we are standing. 
  In some cases, like in this example, even with this memoization technique time complexity would
  be as inefficient as the recursive approach because nothing is memoized.

  The main properties of a problem that suggest that it can be solved using dynammic programming are:

  1) Overlapping subproblems
  2) Optimal substructure

  Overlapping subproblems means that whenever a problem can be solved recusively and applying the divide
  and conquer technique we see that our space state tree has subproblems that yield the same result. While 
  this is not obvious in the example space state tree we constructed, there will be overlapping subproblems
  if given other inputs, like this one (we will test it): 

  cost = [841, 462, 566, 398, 243, 248, 238, 650, 989, 576, 361, 126, 334, 729, 446,
  841, 462, 566, 398, 243, 248, 238, 650, 989, 576, 361, 126, 334, 729, 446,
  650, 989, 576, 361, 126, 334, 729, 446, 334, 729, 446]

  If a problem has an Optimal substructure solution it means that that the optimal solution for the given
  problem can be obtained by using optimal solutions of its subproblems. Remember Bellman-Ford algorithm for
  getting the shortest path problem. That algorithm used the distances array to store optimal distances
  from one node to another accumulating shortest path iteratively. In this problem we see that we build up
  our solution by getting the minimum from two subproblems recursively and adding that to the current cost
  of the stair at index i.

  So we now that dynamic programming is suitable for this problem. We want to store the results in memory by 
  using dynamic programming, Let's memoize the computations from bottom up, even though this might not be 
  performant or intuitive at all. 

  The only way we can have a state transition that have the sufficient parameters to uniquely identify a 
  certain position or standing in our problem is by creating a 2d array. each row would represent an index
  in our cost array, and each column would represent the total sum from 0 to the summation of all or the
  elements in our array. For example:
  
  const [10, 15, 20]

  let dp = [
    [0, 1, 2, ....45],
    [0, 1, 2, ....45],
    [0, 1, 2, ....45]
  ]

  Why do we do this? Because of the way our problem is being layed out. We know that there are discrepancies
  of subproblems with the same indexes that yield different totalSums, so the only way we can know for sure
  that we are in a subproblem that not only has the same index, but also the same totalSum for that 
  corresponsing index is by having a 2d array. Although this approach would yield a better time complexity
  than the recursive bottom - top approach, it is still very unperformant in terms of space complexity.

  I have added a few input examples that will give you a better intuition as to why memoization from bottom
  to top is extremely bad for space complexity purposes.
*/

// Recursive solution (bottom up) memoization

const solution2 = function (cost) { // T: O ( < n ^ 2), S: O (n * totalSum)
  const len = cost.length - 1;
  let totalCost = cost.reduce((acc, val) => acc + val, 0);
  let memo = new Array(cost.length).fill(0).map(() => new Array(totalCost + 1));
  let reusedComputations = [] // this is for testing purposes
  let one = rec2(cost, 0, 0, memo, len, reusedComputations);
  let two = rec2(cost, 1, 0, memo, len, reusedComputations);
  console.log('reused computations', reusedComputations.length) // for comparison with top down memoization
  return Math.min(one, two);
};

const rec2 = function (cost, idx, totalCost, memo, len, reusedComputations) {
  if (len < idx) return totalCost;

  if (memo[idx][totalCost] === undefined) {
    memo[idx][totalCost] = Math.min(
      rec2(cost, idx + 1, totalCost + cost[idx], memo, len, reusedComputations),
      rec2(cost, idx + 2, totalCost + cost[idx], memo, len, reusedComputations)
    );
  } else {
    // console.log('used')
    reusedComputations.push(memo[idx][totalCost])
  }

  return memo[idx][totalCost];
};

let result = solution(cost);
console.log('recursion: bottom up', result, "\n");

// cost = [
//   841, 462, 566, 398, 243, 248, 238, 650, 989, 576, 361, 126, 334, 729, 446,
//   897, 953, 38, 195, 679, 65, 707, 196, 705, 569, 275, 259, 872, 630, 965, 978,
//   109, 56, 523, 851, 887, 91, 544, 598, 963, 305, 481, 959, 560, 454, 883, 50,
//   216, 732, 572, 511, 156, 177, 831, 122, 667, 548, 978, 771, 880, 922, 777,
//   990, 498, 525, 317, 469, 151, 874, 202, 519, 139, 670, 341, 514, 469, 858,
//   913, 94, 849, 839, 813, 664, 163, 3, 802, 21, 634, 944, 901, 446, 186, 843,
//   742, 330, 610, 932, 614, 625, 169, 833, 4, 81, 55, 124, 294, 71, 24, 929, 534,
//   621, 543, 417, 534, 427, 327, 179, 90, 341, 949, 368, 692, 646, 290, 488, 145,
//   273, 617, 596, 82, 538, 751, 80, 616, 763, 826, 932, 184, 630, 478, 163, 925,
//   259, 237, 839, 602, 60, 786, 603, 413, 816, 278, 4, 35, 243, 64, 631, 405, 23,
//   638, 618, 829, 481, 877, 756, 482, 999, 973, 718, 157, 262, 752, 931, 882,
//   741, 40, 77, 535, 542, 879, 607, 879, 321, 46, 210, 116, 244, 830, 591, 285,
//   382, 925, 48, 497, 913, 203, 239, 696, 162, 623, 291, 525, 950, 27, 546, 293,
//   108, 577, 672, 354, 256, 3, 671, 998, 22, 989, 557, 424, 251, 923, 542, 243,
//   46, 488, 80, 374, 372, 334, 190, 817, 150, 742, 362, 196, 75, 193, 162, 645,
//   859, 758, 433, 903, 199, 289, 175, 303, 475, 818, 213, 576, 181, 668, 243,
//   297, 572, 549, 840, 161, 292, 719, 226, 338, 981, 345, 203, 655, 210, 65, 111,
//   746, 76, 935, 406, 646, 976, 567, 32, 726, 638, 674, 727, 861, 426, 297, 349,
//   464, 973, 341, 452, 826, 223, 805, 940, 458, 468, 967, 107, 345, 987, 553,
//   407, 916, 103, 324, 367, 864, 74, 946, 712, 596, 105, 194, 79, 634, 855, 703,
//   70, 170, 543, 208, 739, 632, 663, 880, 857, 824, 258, 743, 488, 659, 647, 470,
//   958, 492, 211, 927, 356, 488, 744, 570, 143, 674, 502, 589, 270, 80, 6, 463,
//   506, 556, 495, 713, 407, 229, 689, 280, 162, 454, 757, 565, 267, 575, 417,
//   948, 607, 269, 852, 938, 560, 24, 222, 580, 604, 800, 628, 487, 485, 615, 796,
//   384, 555, 226, 412, 445, 503, 810, 949, 966, 28, 768, 83, 213, 883, 963, 831,
//   390, 951, 378, 497, 440, 780, 209, 734, 290, 96, 398, 146, 56, 445, 880, 910,
//   858, 671, 164, 552, 686, 748, 738, 837, 556, 710, 787, 343, 137, 298, 685,
//   909, 828, 499, 816, 538, 604, 652, 7, 272, 729, 529, 343, 443, 593, 992, 434,
//   588, 936, 261, 873, 64, 177, 827, 172, 712, 628, 609, 328, 672, 376, 628, 441,
//   9, 92, 525, 222, 654, 699, 134, 506, 934, 178, 270, 770, 994, 158, 653, 199,
//   833, 802, 553, 399, 366, 818, 523, 447, 420, 957, 669, 267, 118, 535, 971,
//   180, 469, 768, 184, 321, 712, 167, 867, 12, 660, 283, 813, 498, 192, 740, 696,
//   421, 504, 795, 894, 724, 562, 234, 110, 88, 100, 408, 104, 864, 473, 59, 474,
//   922, 759, 720, 69, 490, 540, 962, 461, 324, 453, 91, 173, 870, 470, 292, 394,
//   771, 161, 777, 287, 560, 532, 339, 301, 90, 411, 387, 59, 67, 828, 775, 882,
//   677, 9, 393, 128, 910, 630, 396, 77, 321, 642, 568, 817, 222, 902, 680, 596,
//   359, 639, 189, 436, 648, 825, 46, 699, 967, 202, 954, 680, 251, 455, 420, 599,
//   20, 894, 224, 47, 266, 644, 943, 808, 653, 563, 351, 709, 116, 849, 38, 870,
//   852, 333, 829, 306, 881, 203, 660, 266, 540, 510, 748, 840, 821, 199, 250,
//   253, 279, 672, 472, 707, 921, 582, 713, 900, 137, 70, 912, 51, 250, 188, 967,
//   14, 608, 30, 541, 424, 813, 343, 297, 346, 27, 774, 549, 931, 141, 81, 120,
//   342, 288, 332, 967, 768, 178, 230, 378, 800, 408, 272, 596, 560, 942, 612,
//   910, 743, 461, 425, 878, 254, 929, 780, 641, 657, 279, 160, 184, 585, 651,
//   204, 353, 454, 536, 185, 550, 428, 125, 889, 436, 906, 99, 942, 355, 666, 746,
//   964, 936, 661, 515, 978, 492, 836, 468, 867, 422, 879, 92, 438, 802, 276, 805,
//   832, 649, 572, 638, 43, 971, 974, 804, 66, 100, 792, 878, 469, 585, 254, 630,
//   309, 172, 361, 906, 628, 219, 534, 617, 95, 190, 541, 93, 477, 933, 328, 984,
//   117, 678, 746, 296, 232, 240, 532, 643, 901, 982, 342, 918, 884, 62, 68, 835,
//   173, 493, 252, 382, 862, 672, 803, 803, 873, 24, 431, 580, 257, 457, 519, 388,
//   218, 970, 691, 287, 486, 274, 942, 184, 817, 405, 575, 369, 591, 713, 158,
//   264, 826, 870, 561, 450, 419, 606, 925, 710, 758, 151, 533, 405, 946, 285, 86,
//   346, 685, 153, 834, 625, 745, 925, 281, 805, 99, 891, 122, 102, 874, 491, 64,
//   277, 277, 840, 657, 443, 492, 880, 925, 65, 880, 393, 504, 736, 340, 64, 330,
//   318, 703, 949, 950, 887, 956, 39, 595, 764, 176, 371, 215, 601, 435, 249, 86,
//   761, 793, 201, 54, 189, 451, 179, 849, 760, 689, 539, 453, 450, 404, 852, 709,
//   313, 529, 666, 545, 399, 808, 290, 848, 129, 352, 846, 2, 266, 777, 286, 22,
//   898, 81, 299, 786, 949, 435, 434, 695, 298, 402, 532, 177, 399, 458, 528, 672,
//   882, 90, 547, 690, 935, 424, 516, 390, 346, 702, 781, 644, 794, 420, 116, 24,
//   919, 467, 543, 58, 938, 217, 502, 169, 457, 723, 122, 158, 188, 109, 868, 311,
//   708, 8, 893, 853, 376, 359, 223, 654, 895, 877, 709, 940, 195, 323, 64, 51,
//   807, 510, 170, 508, 155, 724, 784, 603, 67, 316, 217, 148, 972, 19, 658, 5,
//   762, 618, 744, 534, 956, 703, 434, 302, 541, 997, 214, 429, 961, 648, 774,
//   244, 684, 218, 49, 729, 990, 521, 948, 317, 847, 76, 566, 415, 874, 399, 613,
//   816, 613, 467, 191,
// ]; // this should kill you program with bottom up memoization

result = solution2(cost);
console.log('recursion: bottom up with memoization', result, "\n");

/*
  Before going into the bottom up tabulation iterative approach (best solution in terms of run time)
  let's go ahead and try to solve this problem recursively from top to bottom
*/

// Recursive solution (top down)

const solution3 = function(cost) { // T: O (2 ^ n), S: O (n)
  const len = cost.length - 1
  return Math.min(rec3(cost, len), rec3(cost, len - 1))
}

const rec3 = function(cost, idx) {
  if (idx <= 1) return cost[idx] === undefined ? 0 : cost[idx]

  return cost[idx] + Math.min(rec3(cost, idx - 1), rec3(cost, idx - 2))
}

result = solution3(cost);
console.log('recursion: top down', result, "\n");

/*
  Now, let's add memoization to our recursive top down solution
*/

// recursive top down with memoization

const solution4 = function(cost) { // T: O (n), S: O (n)
  const len = cost.length - 1
  let memo = new Array(cost.length)
  let reusedComputations = [] // this is for testing purposes
  let one = rec4(cost, len, memo, reusedComputations)
  let two = rec4(cost, len - 1, memo, reusedComputations)
  console.log('reused computations', reusedComputations.length)
  return Math.min(one, two)
}

const rec4 = function(cost, idx, memo, reusedComputations) {
  if (idx <= 1) return cost[idx] === undefined ? 0 : cost[idx]

  if (memo[idx] === undefined) {
    memo[idx] = cost[idx] + Math.min(rec4(cost, idx - 1, memo, reusedComputations), 
    rec4(cost, idx - 2, memo, reusedComputations))
  } else {
    reusedComputations.push(memo[idx])
  }

  return  memo[idx]
}


result = solution4(cost);
console.log('recursion: top down with memoization', result, "\n");

/*
  If you compare the amount of reused computations between memoization bottom up and top down, you will 
  notice something curious. The amount of reused computations for the bottom up with memoization is (by far)
  greater than the amount of reused computations in the top down approach. What does this tell us?

  This tell us that the fact the we have reused more computations in the bottom up approach means that our
  state space tree is in fact, larger than our space state tree in the top down approach. This also means,that
  we have performed more operations in our bottom top approach with memoization, which is why its run time
  is greater than top down. If we were to log the dp matrix of the bottom up approach we would see that there
  are many cells which remain empty, because not all state transition with each index can make up for
  every total sum possible from 0 to totalSum of cost array. But, if we see the array in our top down
  memoization approach, every index has a value (although this is not always the case).

  What can we gleen from this?

  We can say that even if we memoize computations in a bottom up recursive solution, the run time of our
  algorithm would not be as performant as with top down, given the size of the space state tree. We can
  also say that bottom up approach with memoization might not be performant for storage depending on the
  size of the matrix to account for unique state transition. We can also say that memoization works best 
  for top down approach and that it drastrically improves time complexity without adding to much to space 
  complexity.

  We want to use memoization with top down approach, but for bottom up we are better off by using tabulation.

  How does tabulation works?

  It works by starting at the bottom and building our solution to the top using previous computed values
  we would start our transition from the base state dp[0] and follow the state transition relation to reach
  our destinarion state dp[n]. Tabulation can be performed on an array or a matrix, and it is filled up
  sequentially and we access calculated states from the table.

  The time complexity of this solution is O (n) because we iterate through the cost array once. The space
  complexity is O (1) because we don't our space doesn't group with the size of the input.
*/

const solution5 = function(cost) { // T: O (n), S: O (1)
  for (let i = 2; i < cost.length; i++) {
    cost[i] += Math.min(cost[i -1], cost[i - 2])
  }

  return Math.min(cost[cost.length - 1], cost[cost.length - 2])
}

result = solution5(cost)
console.log('bottom up tabulation: ', result)

