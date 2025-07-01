const express = require('express');
const cors = require('cors');
const path = require('path');
const Graph = require('./graph/Graph');
const dijkstra = require('./graph/Dijkstra');

const app = express();
const PORT = 8090;

const graph = new Graph();
graph.seedFromFile('capitais.json');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/capitais', (req, res) => {
  res.json(Object.keys(graph.adjacencyList));
});

app.post('/rota', (req, res) => {
  const { start, end, fuel, autonomy } = req.body;

  if (!graph.adjacencyList[start] || !graph.adjacencyList[end]) {
    return res.status(400).json({ error: 'Capital inválida.' });
  }

  const result = dijkstra(graph, start, end, parseFloat(fuel), parseFloat(autonomy));
  if (!result) {
    return res.status(404).json({ message: 'Rota não encontrada.' });
  }

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
