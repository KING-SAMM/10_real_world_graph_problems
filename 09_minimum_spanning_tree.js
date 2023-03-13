/**
 * Problem 9: Finding the minimum spanning tree of an undirected weighted graph using Kruskal's algorithm
 * 
 */

//Sample input:
/*
Graph : {
  A: { B: 4, H: 8 },
  B: { A: 4, C: 8, H: 11 },
  C: { B: 8, D: 7, F: 4, I: 2 },
  D: { C: 7, E: 9, F: 14 },
  E: { D: 9, F: 10 },
  F: { C: 4, D: 14, E: 10, G: 2 },
  G: { F: 2, H: 1, I: 6 },
  H: { A: 8, B: 11, G: 1, I: 7 },
  I: { C: 2, G: 6, H: 7 }
}
*/
// Sample output:
/*
Minimum spanning tree: {
  A: { B: 4 },
  B: { A: 4, H: 11 },
  C: { I: 2, F: 4 },
  D: { C: 7, E: 9 },
  E: { D: 9 },
  F: { C: 4, G: 2 },
  G: { F: 2, H: 1 },
  H: { B: 11, G: 1 },
  I: { C: 2 }
}
*/

//Solution in JavaScript:

class UnionFind {
  constructor(size) {
    this.parent = new Array(size);
    this.rank = new Array(size);

    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }

    return this.parent[x];
  }

  union(x, y) {
    const px = this.find(x);
    const py = this.find(y);

    if (px === py) {
      return false;
    }

    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }

    return true;
  }
}

function kruskal(graph) {
  const edges = [];

  for (let node in graph) {
    for (let neighbor in graph[node]) {
      edges.push([node, neighbor, graph[node][neighbor]]);
    }
  }

  edges.sort((a, b) => a[2] - b[2]);

  const uf = new UnionFind(Object.keys(graph).length);
  const mst = {};

  for (let i = 0; i < edges.length; i++) {
    const [node1, node2, weight] = edges[i];

    if (uf.union(node1, node2)) {
      if (!mst[node1]) {
        mst[node1] = {};
      }

      if (!mst[node2]) {
        mst[node2] = {};
      }

      mst[node1][node2] = weight;
      mst[node2][node1] = weight;
    }
  }

  return mst;
}

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

const mst = kruskal(graph);

console.log("Minimum spanning tree:");
console.log(mst);


// Output:

// Minimum spanning tree:
// {
//   A: { B: 4 },
//   B: { A: 4, H: 11 },
//   C: { F: 4, I: 2 },
//   D: { C: 7, E: 9 },
//   E: { D: 9 },
//   F: { C: 4, G: 2 },
//   G: { F: 2, H: 1 },
//   H: { B: 11, G: 1 },
//   I: { C: 2 }
// }