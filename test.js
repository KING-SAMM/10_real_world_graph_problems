//Draw a visual representation of the graph below

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