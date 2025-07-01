import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ComboBox from "./components/ComboBox";
import { Grafo } from "./components/Grafo";

function App() {
  const [capitais, setCapitais] = useState([]);
  const [origem, setOrigem] = useState(null);
  const [destino, setDestino] = useState(null);
  const [custoTotal, setCustoTotal] = useState(null);
  const [precoCombustivel, setPrecoCombustivel] = useState("");
  const [autonomia, setAutonomia] = useState("");
  const [caminho, setCaminho] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8090/capitais")
      .then((res) => {
        const lista = res.data.map((nome) => ({ nome }));
        setCapitais(lista);
      })
      .catch((err) => console.error("Erro ao buscar capitais:", err));
  }, []);

  function buscarCaminhoMaisBarato() {
    if (!origem || !destino || !precoCombustivel || !autonomia) {
      alert("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    axios
      .post("http://localhost:8090/rota", {
        start: origem.nome,
        end: destino.nome,
        fuel: parseFloat(precoCombustivel),
        autonomy: parseFloat(autonomia),
      })
      .then((res) => {
        const rota = res.data.path.map((nome) => ({
          nome,
          tipo: "capital",
        }));
        setCaminho(rota);
        setCustoTotal(res.data.cost);
      })
      .catch((err) => {
        console.error("Erro ao buscar rota:", err);
        alert("Rota não encontrada.");
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <div className="combobox-group">
        <ComboBox
          titleLabel="Capital de Origem"
          atores={capitais}
          valor={origem}
          onChange={setOrigem}
        />
        <ComboBox
          titleLabel="Capital de Destino"
          atores={capitais}
          valor={destino}
          onChange={setDestino}
        />
        <TextField
          label="Preço do combustível (R$)"
          value={precoCombustivel}
          onChange={(e) => setPrecoCombustivel(e.target.value)}
          type="number"
        />
        <TextField
          label="Autonomia (km/l)"
          value={autonomia}
          onChange={(e) => setAutonomia(e.target.value)}
          type="number"
        />
      </div>

      <div className="button-group">
        <Button
          variant="contained"
          onClick={buscarCaminhoMaisBarato}
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar Caminho Mais Barato"}
        </Button>
      </div>

      {caminho.length > 0 && (
        <div className="caminho-custo">
          <p>
            Custo de {origem.nome} a {destino.nome} é R$ {custoTotal.toFixed(2)}
          </p>
        </div>
      )}

      <div className="grafo-group">
        <Grafo caminho={caminho} />
      </div>
    </>
  );
}

export default App;
