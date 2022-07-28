// https://leetcode.com/problems/network-delay-time/

/*
  We are given a network of n nodes labeled from 1 to n. We are also given a list of travel times called
  times which is a list of directed edges times[i] = (ui, vi, wi) where ui is the source node, vi is the
  target node, and wi is the time it takes for a signal to traver from source to target.

  You will send a signal from node k. We need to return the minimum time it takes for all the n nodes to receive the 
  signal. If it is impossible for all the n nodes to receive the signal, return -1.

  Because we are given edges of nodes pointing to other nodes with a time from one to another, we must think
  about directed weighted graphs. In addition, we should also consider an algorithm to getting the minimum
  time its takes from a source node to send a signal, so that the rest of the nodes received it. This last
  condition screams for shortest path.

  There are two algorithms that can help us to determine the shortest path from a source node to all the
  vertices of a graph: Dijsktra's and Bellman-Ford. The difference between them is that when it comes to
  a graph with positive weighted edges, Dijsktra's perform bettern than Bellmand-Ford. However, Bellmand-Ford
  works also on graph with negative weights in which Dijsktra's does not. In addition, Bellmand-Ford could be
  use in a graph to detect if there are negative cycles (which is out of the scope of this problem).

  We will implement both algorithms to solve the Network Delay problem and we will analyze their run time
  complexities as well as their space complexities.

  Dijsktra'stime complexity is O (E log V). E is the number of edges we visit while performing the algorithm
  log V is the re heapify algorithm of the priorityQueue when ever we push a value into it. As this happens
  E times, then O (E log V) is the final time complexity. Note that whenever we pop an element from our
  priorityQueue it takes V log V, because we pop from our priorityQueue V times, hence V log V. Because, in
  general, there are more edges than vertices E log V is the bottleneck for the time complexity of our 
  solution.

  In terms of space complexity, our adjacency list has V rows, and the sum of all lengths of all arrays
  in each row is E (number of edges). Which is why the space complexity is O (V + E)
*/

const dijkstra = function(times, n, k) { // T: O (E log V), S: O (V + E)
  // Create a distances array to hold the current minimum distances from node k to any node
  // and initialize it with Infinity. Create also an adjacency list.
  let distances = new Array(n).fill(Infinity)
                 
  let adjList = distances.map(() => [])

  // create the connections in the adjacency list
  // subtract one to the nodes because they are labeled from 1 to n

  for (const [source, target, time] of times) { 
    adjList[source - 1].push([target - 1, time])
  }

  // set the distance of the k node equal to 0 and initialize a priorityQueue
  // in javascript there is no built in priorityQueue implementation, so we will use an array instead
  // and simulate to some extend the min heap logic

  distances[k - 1] = 0
  let priorityQueue = [k - 1]

  // iterate while priorityQueue has elements
  while (priorityQueue.length) { // O (V)
    const source = priorityQueue.pop() // Here there are V removes that can happen = O (V log V)

    const distance = distances[source]

    const neighbors = adjList[source]
    
    for (const [target, time] of neighbors) { // this is going to sum up to E after while loop is done
      if (distances[target] > time + distance) {
        distances[target] = time + distance // update the distances array 

        // pushing elements to a priotityQueue has a run time of O (log v)
        // O (log v) is done E times assuming our priorityQueue accounts for duplicate values

        priorityQueue.push(target) // this array does not account for duplicate values
      }
    }

    priorityQueue.sort((a, b) => distances[b] - distances[a]) // simulate min Heap re heapify
  }

  let maxDistance = Math.max(...distances)

  return maxDistance === Infinity ? -1 : maxDistance
}

/*

*/

const bellmanFord = function(times, n, k) {

}

let n = 5,
k = 1,
times = [
  [1, 2, 9],
  [1, 4, 2],
  [2, 5, 1],
  [4, 2, 4],
  [4, 5, 6],
  [3, 2, 3],
  [5, 3, 7],
  [3, 1, 5],
];

const result = dijkstra(times, n, k)
console.log(result)