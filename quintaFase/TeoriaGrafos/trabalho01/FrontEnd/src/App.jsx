import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ComboBox from "./components/ComboBox";
import { Grafo } from "./components/Grafo";
import SelectItens from "./components/SelectItens";

function App() {
  const [atores, setAtores] = useState([]);
  const [atorOrigem, setAtorOrigem] = useState(null);
  const [atorDestino, setAtorDestino] = useState(null);
  const [caminho, setCaminho] = useState([]);
  const [quantidadeItens, setQuantidadeItens] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8090/buscar-atores")
      .then((res) => {
        setAtores(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  function buscarCaminho() {
    if (atorOrigem && atorDestino) {
      setLoading(true);
      axios
        .post(`http://localhost:8090/buscar-caminho`, {
          atorOrigem: atorOrigem.nome,
          atorDestino: atorDestino.nome,
        })
        .then((res) => {
          if (res.data.caminho.length === 0) {
            alert("Nenhum caminho encontrado.");
            return;
          }
          setCaminho(res.data.caminho);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      alert("Selecione os dois atores.");
    }
  }

  function buscarCaminhoComLimite() {
    if (atorOrigem && atorDestino) {
      setLoading(true);
      axios
        .post(
          `http://localhost:8090/buscar-caminho-limite?page=1&size=${quantidadeItens}`,
          {
            atorOrigem: atorOrigem.nome,
            atorDestino: atorDestino.nome,
          }
        )
        .then((res) => {
          if (res.data.caminhos.length === 0) {
            alert("Nenhum caminho encontrado.");
            return;
          }
          setCaminho(res.data.caminhos);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      alert("Selecione os dois atores.");
    }
  }

  return (
    <>
      <div className="combobox-group">
        <ComboBox
          titleLabel="Ator de Origem"
          atores={atores}
          valor={atorOrigem}
          onChange={setAtorOrigem}
        />
        <ComboBox
          titleLabel="Ator de Destino"
          atores={atores}
          valor={atorDestino}
          onChange={setAtorDestino}
        />
        <SelectItens
          label="Quantidade de itens"
          value={quantidadeItens}
          onChange={(e) => setQuantidadeItens(e.target.value)}
        />
      </div>
      <div className="button-group">
        <Button variant="contained" onClick={buscarCaminho} disabled={loading}>
          Buscar caminho
        </Button>
        <Button
          variant="contained"
          onClick={buscarCaminhoComLimite}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Buscar caminho com limite"}
        </Button>
      </div>

      <div className="grafo-group">
        <Grafo caminho={caminho} />
      </div>
    </>
  );
}

export default App;
