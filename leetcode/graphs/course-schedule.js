// https://leetcode.com/problems/course-schedule/

/*
  We are given an array the represents the dependencies between courses, where each course is labeled from 0
  to numCourses - 1. This array of dependencies contains paris [ai, bi] that indicate that coursebi must be 
  taken first, before taking course ai. For example:
  
  [0, 1] indicates that to take course 0 you have to first take course 1.

  We need to return true if all courses can be finished; else, return false.

  How do we know if all courses can be finished? Well, this boils down to determining if course ai is a
  prerequisite of course bi, and if course bi is a prerequisite of course ai, for example. Or if the first
  course to take has a prerequisite and the prerequisite has a prerequisite course and so on. This should
  tell us that we need to determine if there is a cycle in this graph of dependencies. Why do we think of
  graphs? Because graphs can represent nodes pointing to other nodes (poiting means in our case 'is a 
  prerequisite'). The graph we want to create is a directed graph. For example

  we are given this prerequisites array, and total number of courses is 7

   [[0,3], [1,0], [2,1], [4,5], [6,4], [5,6]]

   we can create from here an adjacencyList that looks

   adjList = [
    [1],
    [2],
    [],
    [0],
    [6],
    [4],
    [5]
   ]

   if we plot this adjacency list we will tell immediately that there is a cycle formed

   3 -> 0 -> 1 -> 2

   5  -  6
    \   /
      4

  This is an unconnected directed graph with a cycle. 4 goes to 6, 6 goes to 5 and 5 goes to 4.

  It's possible for us to take course 3 as it has no prerequisites, then we can take 0, 1 and 2 in that
  order. But in the other graph there is a cycle. It's impossible to take any course because all of them 
  have prerequisites.

  How do we detect a cycle in a graph?

  We can use topological sort, which is an algorithm that takes nodes with indegree values of 0, and from 
  there it decreases the indegree values of the neighbor nodes. As long as the graph is a Directed Acyclic
  Graph (DAG) topological sort is possible, however, if the graph has a cycle, topolical sort will not be
  able to decrease the indegree values of the nodes that are within that cycle. 

  Indegree is the number of edges that are incident to a node. So a node with 3 edges pointing at it will 
  have an indegree value of 3.

  We should create an inDegree array of the length of the numCourses, and start every cell with zero. We 
  should then create an adjacency list and create the connections between courses. As we do this, we should
  increase the inDegree value of the nodes that depend on another course. After this we should have our
  adjacency list and our inDegree array with the correct values.

  We then look for the nodes with inDegree value of 0 and push them into a stack (we will perform bfs), but
  because we don't care about the order in which we process nodes a queue is not needed. From the nodes with
  inDegree = 0 we visit their neighbors and decrease their neighbors inDegree values by 1. If any neighbor
  ends up with an inDegree = 0, we push it into our stack and repeat this process until our stack is empty.

  If there are no cycles in our graph, our inDegree array should contain values of zeroes. However, if there
  was a cycle in our graph, the maximum value of our inDegree array should be grater than 0. This would mean
  that it's impossible to finish all courses.

  The time complexity of this solution is: O (V + E) because we could visit every course (V) and we would
  loop through each of the courses edges in each iteration adding up to the total number of edges (E). The
  space complexity should be O (V + E), because each row represents each course (V rows), and the sum of each
  array length in all the rows should add up to E.
*/

const solution = function(numCourses, prerequisites) { // T: O (V + E), S: O (V + E)
  let inDegree = new Array(numCourses).fill(0) // O (V)
  let adjList = inDegree.map(() => []) // O (V

  for (let i = 0; i < prerequisites.length; i++) { // O (E)
    const prerequisite = prerequisites[i][1]
    const dependentCourse = prerequisites[i][0]

    adjList[prerequisite].push(dependentCourse)
    inDegree[dependentCourse]++
  }

  let stack = []

  for (let i = 0; i < numCourses; i++) { // O (V)
    if (inDegree[i] === 0) {
      stack.push(i)
    }
  }

  while(stack.length) { // O (V) => O (V + E)
    const course = stack.pop()

    const neighbors = adjList[course]

    for (let i = 0; i < neighbors.length; i++) { // this is going to sum up to E after while loop is done
      const neighbor = neighbors[i]
      inDegree[neighbor]--

      if (inDegree[neighbor] === 0) {
        stack.push(neighbor)
      }
    }
  }

  let max = Math.max(...inDegree)

  return max === 0 ? true : false
}

let numCourses = 7, prerequisites = [[0,3], [1,0], [2,1], [4,5], [6,4], [5,6]]

const result = solution(numCourses, prerequisites)
console.log(result)