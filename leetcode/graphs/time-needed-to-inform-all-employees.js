// https://leetcode.com/problems/time-needed-to-inform-all-employees/

/*
  We are asked to calculate the number of minutes needed for a piece of news from the manager to get to
  all of the employees of a company. The structure of the hierarchy follows an naray tree, and one
  employee has only one manager, but a manager can have many employees. It's guaranteed that the time
  for the leaf nodes in our anary tree to inform their subordinates is 0.

  With this knowledge we can think about what is the best approach to solve this problem. Because we are given
  a managers array, we are able to create an adjacency list that represents the employee manager relationship.
  After we create our adjacency list (remember that the adjacency list is the most common and intuitive way
  to represent graphs: an nary tree is a graph after all) We can perform a traversal that goes from the top
  node (the headID) to the rest of the nodes in the graph. Because the hierarchy is from top to down and we
  want to calculate the number of minutes from top to bottom that it takes for the news to be delivered, we
  should use dfs.

  Our base case will be when the informTime of an employee is 0, because that means that we are at a leaf
  node. So the time for this employee to inform is 0 and we can return that. Next, if the if condition is not
  met, we should get the subordinates of the current employee and perform a dfs over them obtaining the max
  time between all of them (because in order for the news to be delivered to everybody we need the max). 
  Once we get the max, we can add it to the informTime of the current employee and we can return it.

  The time complexity of this solution is O (n) because we visit every node on our tree once. The space
  complexity is also O (n), because our nary tree could be skewed like a linked list (and that would be
  the number of calls in our stack at max) that would be V. Diving deep into why we get O (n), we are using
  an adjacency list where we are going to have n rows, and in each row we can have 0 to n employees, but
  there will never be duplicate values between these rows, as an employee can only have one manager. So
  we get n rows and a total of n columns (adding the columns of every row), that is O (2n). If we add the
  stack size that would be O (3n). Here we can drop the constant and we get O (n)
*/

const solution = function(n, headID, manager, informTime) { // T: O (n), S: O (n)
  const adjList = new Array(n).fill(0).map(() => [])

  for (let employee = 0; employee < manager.length; employee++) {
    const boss = manager[employee]
    if (boss !== -1) adjList[boss].push(employee)
  }

  return dfs(headID, adjList, informTime)
}

const dfs = function(employee, adjList, informTime) {
  if (informTime[employee] === 0) return 0

  let subordinates = adjList[employee]
  let max = 0
  for (let i = 0; i < subordinates.length; i++) {
    max = Math.max(max, dfs(subordinates[i], adjList, informTime))
  }

  return informTime[employee] + max
}

let n = 8,
  headID = 4,
  manager = [2, 2, 4, 6, -1, 4, 4, 5],
  informTime = [0, 0, 4, 0, 7, 3, 6, 0];

const result = solution(n, headID, manager, informTime)
console.log(result)