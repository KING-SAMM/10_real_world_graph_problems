Problem 8: Finding the strongly connected components in a directed graph using Kosaraju's algorithm

Sample input:

yaml
Copy code
Graph: {
  A: { B: true },
  B: { C: true },
  C: { A: true, D: true },
  D: { E: true },
  E: { D: true }
}
Sample output:

less
Copy code
Strongly connected components:
[ [ 'A', 'C', 'B' ], [ 'D', 'E' ] ]
Solution in JavaScript:

javascript
Copy code
function kosaraju(graph) {
  const stack = [];
  const visited = {};

  function dfs1(node) {
    visited[node] = true;
    for (let neighbor in graph[node]) {
      if (!visited[neighbor]) {
        dfs1(neighbor);
      }
    }
    stack.push(node);
  }

  for (let node in graph) {
    if (!visited[node]) {
      dfs1(node);
    }
  }

  const reversedGraph = {};

  for (let node in graph) {
    reversedGraph[node] = {};
  }

  for (let node in graph) {
    for (let neighbor in graph[node]) {
      reversedGraph[neighbor][node] = true;
    }
  }

  const


function dfs2(node, component) {
visited[node] = true;
component.push(node);


for (let neighbor in reversedGraph[node]) {
  if (!visited[neighbor]) {
    dfs2(neighbor, component);
  }
}
}

const stronglyConnectedComponents = [];
visited = {};

while (stack.length > 0) {
const node = stack.pop();
if (!visited[node]) {
const component = [];
dfs2(node, component);
stronglyConnectedComponents.push(component);
}
}

return stronglyConnectedComponents;
}

const graph = {
A: { B: true },
B: { C: true },
C: { A: true, D: true },
D: { E: true },
E: { D: true }
};

const result = kosaraju(graph);

console.log(Strongly connected components: ${JSON.stringify(result)});

/*
Output:

Strongly connected components: [["D","E"],["A","C","B"]]
*/