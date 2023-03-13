/**
 * Problem 3: Finding the maximum flow in a directed weighted graph using the Ford-Fulkerson algorithm with the Edmonds-Karp implementation
 */

/*
Sample input:

Graph: {
  S: { A: 2, B: 3 },
  A: { C: 3, D: 1 },
  B: { C: 1, D: 1 },
  C: { T: 2 },
  D: { T: 3 }
},
Source node: "S",
Sink node: "T"
*/

/*
Sample output:


Maximum flow: 4
*/



function edmondsKarp(graph, source, sink) {
  function bfs(graph, source, sink, parent) {
    const visited = {};
    const queue = [source];
    visited[source] = true;
    parent[source] = null;

    while (queue.length > 0) {
      const node = queue.shift();

      for (let neighbor in graph[node]) {
        if (!visited[neighbor] && graph[node][neighbor] > 0) {
          visited[neighbor] = true;
          parent[neighbor] = node;
          queue.push(neighbor);
        }
      }
    }

    return visited[sink];
  }

  function findMaxFlow(graph, source, sink) {
    let maxFlow = 0;
    const parent = {};

    while (bfs(graph, source, sink, parent)) {
      let pathFlow = Infinity;

      for (let node = sink; node !== source; node = parent[node]) {
        const prev = parent[node];
        pathFlow = Math.min(pathFlow, graph[prev][node]);
      }

      for (let node = sink; node !== source; node = parent[node]) {
        const prev = parent[node];
        graph[prev][node] -= pathFlow;
        graph[node][prev] += pathFlow;
      }

      maxFlow += pathFlow;
    }

    return maxFlow;
  }

  const residualGraph = {};

  for (let node in graph) {
    residualGraph[node] = {};
    for (let neighbor in graph[node]) {
      residualGraph[node][neighbor] = graph[node][neighbor];
    }
  }

  return findMaxFlow(residualGraph, source, sink);
}

const graph = {
  S: { A: 2, B: 3 },
  A: { C: 3, D: 1 },
  B: { C: 1, D: 1 },
  C: { T: 2 },
  D: { T: 3 }
};

const maxFlow = edmondsKarp(graph, "S", "T");

console.log(`Maximum flow: ${maxFlow}`);
/*
Output:

Maximum flow: 4
*/