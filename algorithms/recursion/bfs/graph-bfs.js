// Adjacency List

const bfsTraversalAdjacencyList = function(adjList, start) {
  let queue = [start]
  let seenNodes = new Set()
  let result = []

  seenNodes.add(start)

  while (queue.length) {
    const node = queue.shift()
    result.push(node)

    const adjacentNodes = adjList[node]

    for (let i = 0; i < adjacentNodes.length; i++) {
      const adjacentNode = adjacentNodes[i];

      if (!seenNodes.has(adjacentNode)) {
        seenNodes.add(adjacentNode)
        queue.push(adjacentNode)
      }
    }
  }

  return result
}

let adjacencyList = [
  [1, 3],
  [0],
  [3, 8],
  [0, 2, 4, 5],
  [3, 6],
  [3],
  [4, 7],
  [6],
  [2]
]; // [0, 1, 3, 2, 4, 5, 8, 6, 7]


// Adjacency Matrix

let adjacencyMatrix = [
  [0, 1, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0]
]; // [0, 1, 3, 2, 4, 5, 8, 6, 7]

const bfsTraversalAdjacencyMatrix = function(adjacencyMatrix, start) {
  let queue = [start]
  let seenNodes = new Set()
  let result = []

  seenNodes.add(start)

  while (queue.length) {
    const node = queue.shift()
    result.push(node)

    const adjacentNodes = adjacencyMatrix[node]

    for (let i = 0; i < adjacentNodes.length; i++) {
      const connectionVal = adjacentNodes[i];

      if (connectionVal > 0 && !seenNodes.has(i)) {
        seenNodes.add(i)
        queue.push(i)
      }
    }
  }

  return result
}

let result = bfsTraversalAdjacencyList(adjacencyList, 0)
console.log(result, '\n')

result = bfsTraversalAdjacencyMatrix(adjacencyMatrix, 0)
console.log(result)