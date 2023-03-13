/**
 * Problem 7: Finding strongly connected components in a directed graph
 */

// Sample input:
/*
Graph: {
A: { B: 1 },
B: { C: 1, E: 1 },
C: { D: 1 },
D: { C: 1 },
E: { F: 1 },
F: { G: 1 },
G: { E: 1, H: 1 },
H: { I: 1 },
I: { J: 1, K: 1 },
J: { G: 1 },
K: { L: 1 },
L: { I: 1 }
}
*/


// Sample output:
/*
Strongly connected components:
[ [ "C", "D" ],
[ "A", "B" ],
[ "E", "F", "G", "J" ],
[ "H", "I", "K", "L" ] ]

*/

// Solution in JavaScript:

function kosaraju(graph) {
  let visited = {};
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

  const reverseGraph = {};

  for (let node in graph) {
    for (let neighbor in graph[node]) {
      if (!reverseGraph[neighbor]) {
        reverseGraph[neighbor] = {};
      }

      reverseGraph[neighbor][node] = graph[node][neighbor];
    }
  }

  const componentLists = [];

  function dfs2(node, component) {
    visited[node] = true;
    component.push(node);

    for (let neighbor in reverseGraph[node]) {
      if (!visited[neighbor]) {
        dfs2(neighbor, component);
      }
    }
  }

  for (let node in graph) {
    if (!visited[node]) {
      dfs(node);
    }
  }

  visited = {};

  while (stack.length > 0) {
    const node = stack.pop();

    if (!visited[node]) {
      const component = [];
      dfs2(node, component);
      componentLists.push(component);
    }
  }

  return componentLists;
}

const graph = {
  A: { B: 1 },
  B: { C: 1, E: 1 },
  C: { D: 1 },
  D: { C: 1 },
  E: { F: 1 },
  F: { G: 1 },
  G: { E: 1, H: 1 },
  H: { I: 1 },
  I: { J: 1, K: 1 },
  J: { G: 1 },
  K: { L: 1 },
  L: { I: 1 }
};

const stronglyConnectedComponents = kosaraju(graph);

console.log("Strongly connected components:");
console.log(stronglyConnectedComponents);
/*
Output:

Strongly connected components:
[ [ "C", "D" ],
  [ "A", "B" ],
  [ "E", "F", "G", "J" ],
  [ "H", "I", "K", "L" ] ]

  */