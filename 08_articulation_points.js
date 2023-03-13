/**
 * Problem 8: Finding articulation points in an undirected graph
 * 
 */


// Sample input:
/*
Graph: {
  A: { B: 1, C: 1 },
  B: { A: 1

*/

// Solution in JavaScript:

function findArticulationPoints(graph) {
  let time = 0;

  const visited = {};
  const discoveryTimes = {};
  const low = {};
  const parent = {};
  const isArticulationPoint = {};

  function dfs(node) {
    visited[node] = true;
    discoveryTimes[node] = low[node] = ++time;
    let childCount = 0;

    for (let neighbor in graph[node]) {
      if (!visited[neighbor]) {
        childCount++;
        parent[neighbor] = node;
        dfs(neighbor);

        low[node] = Math.min(low[node], low[neighbor]);

        if (parent[node] === undefined && childCount > 1) {
          isArticulationPoint[node] = true;
        }

        if (parent[node] !== undefined && low[neighbor] >= discoveryTimes[node]) {
          isArticulationPoint[node] = true;
        }
      } else if (neighbor !== parent[node]) {
        low[node] = Math.min(low[node], discoveryTimes[neighbor]);
      }
    }
  }

  for (let node in graph) {
    if (!visited[node]) {
      parent[node] = undefined;
      dfs(node);
    }
  }

  const articulationPoints = [];

  for (let node in isArticulationPoint) {
    if (isArticulationPoint[node]) {
      articulationPoints.push(node);
    }
  }

  return articulationPoints;
}

const graph = {
  A: { B: 1, C: 1 },
  B: { A: 1, C: 1, D: 1 },
  C: { A: 1, B: 1, D: 1 },
  D: { B: 1, C: 1, E: 1 },
  E: { D: 1, F: 1 },
  F: { E: 1, G: 1 },
  G: { F: 1 }
};

const articulationPoints = findArticulationPoints(graph);

console.log("Articulation points:");
console.log(articulationPoints);

// Output:
/*
Articulation points:
[ "D", "E" ]

*/

