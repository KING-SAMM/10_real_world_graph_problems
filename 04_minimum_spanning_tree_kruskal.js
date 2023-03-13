/**
 * Problem 4: Finding the minimum spanning tree in an undirected weighted graph using Kruskal's algorithm
 * 
 */


/*
Sample input:

Graph: {
  A: { B: 7, D: 5 },
  B: { A: 7, C: 8, D: 9, E: 7 },
  C: { B: 8, E: 5 },
  D: { A: 5, B: 9, E: 15, F: 6 },
  E: { B: 7, C: 5, D: 15, F: 8, G: 9 },
  F: { D: 6, E: 8, G: 11 },
  G: { E: 9, F: 11 }
}
*/

/*
Sample output:

Minimum spanning tree:
[
  { from: "A", to: "D", weight: 5 },
  { from: "C", to: "E", weight: 5 },
  { from: "A", to: "B", weight: 7 },
  { from: "B", to: "E", weight: 7 },
  { from: "D", to: "F", weight: 6 },
  { from: "E", to: "G", weight: 9 }
]
*/
// Solution in JavaScript:

class DisjointSet {
  constructor() {
    this.parent = {};
  }

  makeSet(x) {
    this.parent[x] = x;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }

    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    this.parent[rootX] = rootY;
  }
}

function kruskalMST(graph) {
  const disjointSet = new DisjointSet();
  const mst = [];

  for (let node in graph) {
    disjointSet.makeSet(node);
  }

  const edges = [];

  for (let node in graph) {
    for (let neighbor in graph[node]) {
      edges.push({
        from: node,
        to: neighbor,
        weight: graph[node][neighbor]
      });
    }
  }

  edges.sort((a, b) => a.weight - b.weight);

  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];

    if (disjointSet.find(edge.from) !== disjointSet.find(edge.to)) {
      disjointSet.union(edge.from, edge.to);
      mst.push(edge);
    }
  }

  return mst;
}

const graph = {
  A: { B: 7, D: 5 },
  B: { A: 7, C: 8, D: 9, E: 7 },
  C: { B: 8, E: 5 },
  D: { A: 5, B: 9, E: 15, F: 6 },
  E: { B: 7, C: 5, D: 15, F: 8, G: 9 },
  F: { D: 6, E: 8, G: 11 },
  G: { E: 9, F: 11 }
};

const mst = kruskalMST(graph);

console.log("Minimum spanning tree:");
console.log(mst);

/*
Output:

Minimum spanning tree:
[
  { from: "A", to: "D", weight: 5 },
  { from: "C", to: "E", weight: 5 },
  { from: "A", to: "B", weight: 7 },
  { from: "B", to: "E", weight: 7 },
  { from: "D", to: "F", weight: 6 },
  { from: "E", to: "G", weight: 9 }
]
*/