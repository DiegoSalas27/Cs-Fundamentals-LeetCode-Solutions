// https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/

/*
  The more important takeaways of this article is that graphs can help us represent networks with weighted
  or unweighted paths (edges). Nodes could represent anything: integers, strings, classes, etc.

  Graph can also represent dependencies between nodes or things. For example, a course depending on another 
  course might be represented or someone being the manager of somebody could be represented as a directed 
  graph. The distance between some place and another place, or the connections between states, or towns
  could be represented as a undirected graph with weighted vertices.

  // https://www.geeksforgeeks.org/graph-and-its-representations/

  Graphs could be represented in many ways, but the most common ones are adjacency matrices and adjacency
  lists. Graphs could also be represented as instances of classes pointing to other instances, 
  which is why linked lists and trees are also graphs, but no all graphs are linked lists or trees.

  The representation of a graph is situation-specific (depends on the type of operations we want to perform
  over it). We will explore that with the following implementations.

  Adjacency Matrix:

  const adj = [
    [0,1,0,0,1],
    [1,0,1,1,1],
    [0,1,0,1,0],
    [0,1,1,0,1],
    [1,1,0,1,0],
  ]

  Adjacency matrix is a 2D array of size V * V. A slot adj[i][j] = 1 indicates that there is an edge from 
  vertex i to vertex j. The adjacency matrix for undirected graph is always symmetric. Adjacency matrix is
  also used to represent weighted graphs. If adj[i][j] = w, then there is an edge from vertex i to vertex j
  with weight w.

  Pros: Representation is easier to implement and follow. Removing an edge takes O(1) time. Queries like
  whether there is an edge from vertex 'u' to vertex 'v' are efficient and can be done O (1).

  Cons: Consumes more space O (V ^ 2) than the adjacency list. Adding a vertex could be O (V ^ 2). Computing
  neighbors of vertex takes O (V).

  An Adjacency List is an array of array, but not a matrix. The size of each of the rows is equal to the 
  number of vertices. We can also represent a weighted graph. The weights of edges can be represented as 
  lists of pairs. In some scenarios, Adjacency lists can be represented as object where each index contains
  an array of size equal to the number of connections a certain node has. 

  Pros: Saves space O (|V| + |E|). Adding a neighbor is easier. Computing all neigbors of a vertex takes
  optimal time.

  Cons: Queries like whether there is an edge from vertex u to vertex v are not efficient and can be done
  O(V). Most of  the graph have limited connections, and are not complete (every node connects to every
  other node). Which is why most of them are represented as adjacency lists.
*/

// Implementation of adjacency list

const createGraph = function(v, pairs) {
  let adj = []

  for (let i = 0; i < v; i++) {
    adj.push([]);
  }

  for (let i = 0; i < pairs.length; i++) {
    const source = pairs[i][0]
    const target = pairs[i][1]
    adj[source].push(target)
  }

  console.log(adj)
}

const v = 5, pairs = [[0, 1],[0, 4],[1, 2],[1,3],[1,4],[2,3],[3,4]]

createGraph(v, pairs)