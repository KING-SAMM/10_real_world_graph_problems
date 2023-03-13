/**
 * Problem 10: Finding the shortest path in a weighted graph using Dijkstra's algorithm
 * 
 * Given a weighted graph and a starting node, find the shortest path to all other nodes using Dijkstra's algorithm.
 */


// Sample Input:

const graph = {
    A: { B: 4, H: 8 },
    B: { A: 4, C: 8, H: 11 },
    C: { B: 8, D: 7, F: 4, I: 2 },
    D: { C: 7, E: 9, F: 14 },
    E: { D: 9, F: 10 },
    F: { C: 4, D: 14, E: 10, G: 2 },
    G: { F: 2, H: 1, I: 6 },
    H: { A: 8, B: 11, G: 1, I: 7 },
    I: { C: 2, G: 6, H: 7 }
  };
  
  const startNode = "A";

//   Sample Output:

/*
Shortest paths from node A:
{
  A: { distance: 0, path: [ 'A' ] },
  B: { distance: 4, path: [ 'A', 'B' ] },
  C: { distance: 12, path: [ 'A', 'B', 'C' ] },
  D: { distance: 19, path: [ 'A', 'B', 'C', 'D' ] },
  E: { distance: 21, path: [ 'A', 'B', 'C', 'D', 'E' ] },
  F: { distance: 11, path: [ 'A', 'B', 'C', 'F' ] },
  G: { distance: 12, path: [ 'A', 'H', 'G' ] },
  H: { distance: 8, path: [ 'A', 'H' ] },
  I: { distance: 14, path: [ 'A', 'B', 'C', 'I' ] }
}
*/

// SOLUTION

function dijkstra(graph, startNode) {
    const distances = {};
    const visited = {};
    const queue = [];
  
    for (let node in graph) {
      distances[node] = Infinity;
    }
  
    distances[startNode] = 0;
    queue.push(startNode);
  
    while (queue.length) {
      const currNode = queue.shift();
      visited[currNode] = true;
  
      for (let neighbor in graph[currNode]) {
        const distance = graph[currNode][neighbor];
  
        if (!visited[neighbor]) {
          const newDistance = distances[currNode] + distance;
  
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            queue.push(neighbor);
          }
        }
      }
    }
  
    const shortestPaths = {};
  
    for (let node in distances) {
      const path = [];
      let currNode = node;
  
      while (currNode !== startNode) {
        path.push(currNode);
  
        for (let neighbor in graph[currNode]) {
          const distance = graph[currNode][neighbor];
  
          if (distances[currNode] === distances[neighbor] + distance) {
            currNode = neighbor;
            break;
          }
        }
      }
  
      path.push(startNode);
      path.reverse();
      shortestPaths[node] = { distance: distances[node], path };
    }
  
    return shortestPaths;
}
  
// const graph = {
//     A: { B: 4,C: 8, H: 8 },
//     B: { A: 4, C: 8, H: 11 },
//     C: { B: 8, D: 7, F: 4, I: 2 },
//     D: { C: 7, E: 9, F: 14 },
//     E: { D: 9, F: 10 },
//     F: { C: 4, D: 14, E: 10, G: 2 },
//     G: { F: 2, H: 1, I: 6 },
//     H: { A: 8, B: 11, G: 1, I: 7 },
//     I: { C: 2, G: 6, H: 7 }
// };
    
// const startNode = "A";

console.log(`Shortest paths from node ${startNode}:`);
console.log(dijkstra(graph, startNode));

// Output:
/*
Shortest paths from node A:
{
  A: { distance: 0, path: [ 'A' ] },
  B: { distance: 4, path: [ 'A', 'B' ] },
  C: { distance: 12, path: [ 'A', 'B', 'C' ] },
  D: { distance: 19, path: [ 'A', 'B', 'C', 'D' ] },
  E: { distance: 21, path: [ 'A', 'H', 'G', 'F', 'E' ] },
  F: { distance: 11, path: [ 'A', 'H', 'G', 'F' ] },
  G: { distance: 9, path: [ 'A', 'H', 'G' ] },
  H: { distance: 8, path: [ 'A', 'H' ] },
  I: { distance: 14, path: [ 'A', 'B', 'C', 'I' ] }
}
*/
        
        
// This implementation uses an object to keep track of the distances to each node and a queue to keep track of which nodes to visit next. It also uses an object to keep track of which nodes have been visited already. The algorithm starts by initializing all distances to Infinity except for the starting node, which is set to 0. Then, it adds the starting node to the queue and begins processing nodes in the queue until there are none left.

// For each node in the queue, the algorithm visits all of its neighbors and calculates the distance to each one. If the new distance is shorter than the current distance, the algorithm updates the distance and adds the neighbor to the queue.

// After the algorithm has finished processing all nodes, it generates the shortest paths by tracing back from each node to the starting node, using the distances and the graph. Finally, it returns an object containing the shortest paths for each node.


  
  
  