/**
 * Problem 2: Finding the minimum spanning tree of a weighted undirected graph
 */

/*
Sample input:

Graph: {A: {B: 2, D: 4}, B: {A: 2, C: 3, D: 1}, C: {B: 3, D: 2}, D: {A: 4, B: 1, C: 2}}
*/

/*
Sample output:

Minimum spanning tree: {A: {B: 2}, B: {A: 2, D: 1}, C: {D: 2}, D: {B: 1, C: 2}}
*/


function prim(graph) {
    const visited = new Set();
    const minimumSpanningTree = {};

    const startNode = Object.keys(graph)[0];
    visited.add(startNode);
    while (visited.size < Object.keys(graph).length) {
        let minEdge = null;
        let minWeight = Infinity;

        for (let node of visited) {
        for (let neighbor in graph[node]) {
            if (!visited.has(neighbor) && graph[node][neighbor] < minWeight) {
            minEdge = [node, neighbor];
            minWeight = graph[node][neighbor];
            }
        }
        }

        minimumSpanningTree[minEdge[0]] = minimumSpanningTree[minEdge[0]] || {};
        minimumSpanningTree[minEdge[1]] = minimumSpanningTree[minEdge[1]] || {};

        minimumSpanningTree[minEdge[0]][  // error here



        minimumSpanningTree[minEdge[1]] = minWeight;
        minimumSpanningTree[minEdge[1]][minEdge[0]] = minWeight;

        visited.add(minEdge[1]);
    }

    return minimumSpanningTree;
}

const graph = {
    A: { B: 2, D: 4 },
    B: { A: 2, C: 3, D: 1 },
    C: { B: 3, D: 2 },
    D: { A: 4, B: 1, C: 2 }
};

console.log(prim(graph)); // { A: { B: 2 }, B: { A: 2, D: 1 }, C: { D: 2 }, D: { B: 1, C: 2 } }