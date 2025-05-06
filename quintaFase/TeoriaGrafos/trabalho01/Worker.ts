import { parentPort, workerData } from 'worker_threads';

function reconstruirGrafo(serializado: [string, string[]][]): Map<string, Set<string>> {
  return new Map(serializado.map(([k, v]) => [k, new Set(v)]));
}

/**
 * Encontra todos os caminhos possíveis até o destino com até 6 arestas.
 * Retorna inclusive caminhos mais longos, o que você não quer.
*/
function buscarTodosCaminhosComLimitePaginado(
  grafo: Map<string, Set<string>>,
  origem: string,
  destino: string,
  limite: number,
  pagina: number,
  tamanho: number
): string[][] {
  const resultados: string[][] = [];
  const inicio = (pagina - 1) * tamanho;
  const fim = inicio + tamanho;
  let totalEncontrados = 0;

  const fila: [string, string[], Set<string>][] = [[origem, [origem], new Set([origem])]];

  while (fila.length > 0) {
    const [atual, caminho, visitados] = fila.shift()!;
    const nivel = caminho.length - 1;
    if (nivel > limite) continue;

    const vizinhos = grafo.get(atual);
    if (!vizinhos) continue;

    for (const vizinho of vizinhos) {
      if (visitados.has(vizinho)) continue;

      const novoCaminho = [...caminho, vizinho];
      const novoVisitados = new Set(visitados);
      novoVisitados.add(vizinho);

      if (vizinho === destino) {
        if (totalEncontrados >= inicio && totalEncontrados < fim) {
          resultados.push(novoCaminho);
        }
        totalEncontrados++;

        if (totalEncontrados >= fim) {
          parentPort?.postMessage(resultados);
          return resultados;
        }
      } else {
        fila.push([vizinho, novoCaminho, novoVisitados]);
      }
    }
  }

  parentPort?.postMessage(resultados);
  return resultados;
}

const { grafo, origem, destino, limite, pagina, tamanho } = workerData;
const grafoReconstruido = reconstruirGrafo(grafo);

if (!grafoReconstruido.has(origem) || !grafoReconstruido.has(destino)) {
  parentPort?.postMessage([]);
} else {
  buscarTodosCaminhosComLimitePaginado(
    grafoReconstruido,
    origem,
    destino,
    limite,
    pagina,
    tamanho
  );
}

/**
 * Salvar o primeiro caminho encontrado como comprimentoMinimo.
 * Ignorar caminhos com comprimento maior que esse.
 * Retornar apenas os caminhos com o menor comprimento encontrado.
*/
// function buscarTodosCaminhosComLimitePaginado(
//   grafo: Map<string, Set<string>>,
//   origem: string,
//   destino: string,
//   limite: number,
//   pagina: number,
//   tamanho: number
// ): string[][] {
//   const resultados: string[][] = [];
//   const fila: [string, string[], Set<string>][] = [[origem, [origem], new Set([origem])]];

//   let comprimentoMinimo = Infinity;
//   let totalEncontrados = 0;
//   const inicio = (pagina - 1) * tamanho;
//   const fim = inicio + tamanho;

//   while (fila.length > 0) {
//     const [atual, caminho, visitados] = fila.shift()!;
//     const nivel = caminho.length - 1;

//     if (nivel > limite || nivel > comprimentoMinimo) continue;

//     const vizinhos = grafo.get(atual);
//     if (!vizinhos) continue;

//     for (const vizinho of vizinhos) {
//       if (visitados.has(vizinho)) continue;

//       const novoCaminho = [...caminho, vizinho];
//       const novoVisitados = new Set(visitados);
//       novoVisitados.add(vizinho);

//       if (vizinho === destino) {
//         const novoNivel = novoCaminho.length - 1;

//         if (comprimentoMinimo === Infinity) {
//           comprimentoMinimo = novoNivel;
//         }

//         if (novoNivel === comprimentoMinimo) {
//           if (totalEncontrados >= inicio && totalEncontrados < fim) {
//             resultados.push(novoCaminho);
//           }
//           totalEncontrados++;

//           if (totalEncontrados >= fim) {
//             parentPort?.postMessage(resultados);
//             return resultados;
//           }
//         }
//       } else {
//         fila.push([vizinho, novoCaminho, novoVisitados]);
//       }
//     }
//   }

//   parentPort?.postMessage(resultados);
//   return resultados;
// }