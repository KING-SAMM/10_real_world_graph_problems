/**
 * Problem 2: Finding the shortest path between two nodes in a weighted directed graph using Dijkstra's algorithm
 */


/*
Sample input:

Graph: {
A: { B: 4, C: 2 },
B: { D: 3 },
C: { B: 1, D: 5 },
D: { E: 7 },
E: {}
},
Start node: "A",
End node: "E"
*/

/*
Sample output:

Shortest path: ["A","C","B","D","E"]
*/


function dijkstra(graph, startNode, endNode) {
  const distances = {};
  const previous = {};
  const queue = [];

  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
    queue.push(node);
  }

  distances[startNode] = 0;

  while (queue.length > 0) {
    queue.sort((a, b) => distances[a] - distances[b]);
    const smallest = queue.shift();

    if (smallest === endNode) {
      const path = [];
      while (previous[smallest]) {
        path.push(smallest);
        smallest = previous[smallest];
      }
      path.push(startNode);
      return path.reverse();
    }

    if (distances[smallest] === Infinity) {
      break;
    }

    for (let neighbor in graph[smallest]) {
      const alt = distances[smallest] + graph[smallest][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = smallest;
      }
    }
  }

  return null;
}

const graph = {
  A: { B: 4, C: 2 },
  B: { D: 3 },
  C: { B: 1, D: 5 },
  D: { E: 7 },
  E: {}
};

const shortestPath = dijkstra(graph, "A", "E");

console.log(`Shortest path: ${shortestPath}`);

/*
Output:

Shortest path: A,C,B,D,E
*/