const fs = require('fs');

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  seedFromFile(filePath) {
    const data = fs.readFileSync(filePath);
    const json = JSON.parse(data);

    json.forEach((entry) => {
      const city = Object.keys(entry)[0];
      this.adjacencyList[city] = entry[city];
    });
  }

  show() {
    for (const city in this.adjacencyList) {
      const neighbors = Object.keys(this.adjacencyList[city].neighbors);
      console.log(`${city} -> ${neighbors.join(', ')}`);
    }
  }
}

module.exports = Graph;
