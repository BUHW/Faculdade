function dijkstra(graph, start, end, fuelPrice, autonomy) {
  const distances = {};
  const previous = {};
  const visited = new Set();
  const heap = [];

  for (const city in graph.adjacencyList) {
    distances[city] = Infinity;
    previous[city] = null;
  }

  distances[start] = 0;
  heap.push([start, 0]);

  while (heap.length > 0) {
    heap.sort((a, b) => a[1] - b[1]);
    const [currentCity, currentCost] = heap.shift();
    if (visited.has(currentCity)) continue;
    visited.add(currentCity);

    if (currentCity === end) break;

    const { neighbors } = graph.adjacencyList[currentCity];

    for (const neighbor in neighbors) {
      const distance = neighbors[neighbor];
      const fuelCost = (distance / autonomy) * fuelPrice;

      const toll = (neighbor !== start && neighbor !== end) ? (graph.adjacencyList[neighbor]?.toll || 0) : 0;

      const totalCost = currentCost + fuelCost + toll;

      if (totalCost < distances[neighbor]) {
        distances[neighbor] = totalCost;
        previous[neighbor] = currentCity;
        heap.push([neighbor, totalCost]);
      }
    }
  }

  if (distances[end] === Infinity) return null;

  const path = [];
  let current = end;
  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return { path, cost: distances[end] };
}

module.exports = dijkstra;
