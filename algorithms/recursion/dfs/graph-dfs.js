// Adjacency List

const dfsTraversalAdjacencyList = function(adjacencyList, start) {
  let result = []
  let seenNodes = new Set()

  const dfs = (node) => {
    result.push(node)
    seenNodes.add(node)

    const connections = adjacencyList[node]

    for (let v = 0; v < connections.length; v++) {
      const vertex = connections[v]
      if (!seenNodes.has(vertex)) {
        dfs(vertex)
      }
    }
  }

  dfs(start)

  return result
}

const adjacencyList = [
  [1, 3],
  [0],
  [3, 8],
  [0, 2, 4, 5],
  [3, 6],
  [3],
  [4, 7],
  [6],
  [2]
];


// Adjacency Matrix

const dfsTraversalAdjacencyMatrix = function(adjacencyMatrix, start) {
  let result = []
  let seenNodes = new Set()

  const dfs = (node) => {
    result.push(node)
    seenNodes.add(node)

    const connections = adjacencyMatrix[node]

    for (let v = 0; v < connections.length; v++) {
      const connection = connections[v]
      if (connection > 0 && !seenNodes.has(v)) {
        dfs(v)
      }
    }
  }

  dfs(start)

  return result
}

const adjacencyMatrix = [
  [0, 1, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0]
];

let result = dfsTraversalAdjacencyList(adjacencyList, 0)
console.log(result, '\n')

result = dfsTraversalAdjacencyMatrix(adjacencyMatrix, 0)
console.log(result)