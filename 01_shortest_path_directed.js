/**
 * Problem 1: Finding the shortest path between two nodes in a weighted graph
 */
/*
Sample input:

Graph: {A: {B: 4, C: 2}, B: {D: 5}, C: {D: 8}, D: {}}
Start node: A
End node: D
*/

/*
Sample output:


Shortest path from A to D: [A, C, D]
Shortest distance from A to D: 10
*/

function dijkstra(graph, start, end) {
  const distances = {};
  const parents = {};
  const visited = [];
  const unvisited = Object.keys(graph);

  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  while (unvisited.length > 0) {
    let current = null;
    for (let node of unvisited) {
      if (current === null || distances[node] < distances[current]) {
        current = node;
      }
    }

    for (let neighbor in graph[current]) {
      let newDistance = distances[current] + graph[current][neighbor];
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        parents[neighbor] = current;
      }
    }

    visited.push(current);
    unvisited.splice(unvisited.indexOf(current), 1);
    if (current === end) {
      break;
    }
  }

  const path = [end];
  let parent = parents[end];
  while (parent) {
    path.push(parent);
    parent = parents[parent];
  }
  path.reverse();

  return {
    path: path,
    distance: distances[end]
  };
}

const graph = {
  A: { B: 4, C: 2 },
  B: { D: 5 },
  C: { D: 8 },
  D: {}
};

console.log(dijkstra(graph, "A", "D")); // { path: [ 'A', 'C', 'D' ], distance: 10 }