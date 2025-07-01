import ForceGraph2D from "react-force-graph-2d";

export const Grafo = ({ caminho }) => {
  const nodes = [];
  const links = [];
  const adicionados = new Set();

  const caminhos = Array.isArray(caminho[0]) ? caminho : [caminho];

  caminhos.forEach((caminhoAtual) => {
    for (let i = 0; i < caminhoAtual.length; i++) {
      const atual = caminhoAtual[i];

      if (!adicionados.has(atual.nome)) {
        nodes.push({
          id: atual.nome,
          tipo: atual.tipo,
        });
        adicionados.add(atual.nome);
      }

      if (i > 0) {
        links.push({
          source: caminhoAtual[i - 1].nome,
          target: atual.nome,
        });
      }
    }
  });

  return (
    <ForceGraph2D
      graphData={{ nodes, links }}
      nodeAutoColorBy="tipo"
      nodeLabel="id"
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.id;
        const fontSize = 20 / globalScale;
        ctx.font = `${fontSize}px Roboto`;
        ctx.fillStyle = node.tipo === "capital" ? "#1976d2" : "#19d279";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.fillText(label, node.x + 10, node.y + 2);
      }}
    />
  );
};
