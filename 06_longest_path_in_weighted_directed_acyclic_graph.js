Problem 6: Finding the longest path in a weighted directed acyclic graph

Sample input:

css
Copy code
Graph: {
  A: { B: 5, C: 3 },
  B: { C: 2, D: 6 },
  C: { D: 7 },
  D: { E: 4 }
}
Sample output:

less
Copy code
Longest path: ["A", "C", "D", "E"]
Longest distance: 14
Solution in JavaScript:

javascript
Copy code
function topologicalSort(graph) {
  const visited = {};
  const stack = [];

  function dfs(node) {
    visited[node] = true;

    for (let neighbor in graph[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }

    stack.push(node);
  }

  for (let node in graph) {
    if (!visited[node]) {
      dfs(node);
    }
  }

  return stack.reverse();
}

function longestPathInDAG(graph) {
  const sortedNodes = topologicalSort(graph);
  const distances = {};

  for (let node of sortedNodes) {
    distances[node] = -Infinity;
  }

  distances[sortedNodes[0]] = 0;

  for (let node of sortedNodes) {
    for (let neighbor in graph[node]) {
      const distance = distances[node] + graph[node][neighbor];

      if (distance > distances[neighbor]) {
        distances[neighbor] = distance;
      }
    }
  }

  let longestDistance = -Infinity;
  let longestPathEnd = null;

  for (let node in graph) {
    if (distances[node] > longestDistance) {
      longestDistance = distances[node];
      longestPathEnd = node;
    }
  }

  const path = [];
  let current = longestPathEnd;

  while (current !==




"Longest path: ["A", "C", "D", "E"]
Longest distance: 14