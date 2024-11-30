import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Agenda from './components/pages/agenda/Agenda';
import Aluno from './components/pages/aluno/Aluno';
import TabelaAluno from './components/pages/aluno/TabelaAluno';
import Login from './components/pages/login/Login';
import TabelaProfissional from './components/pages/profissional/TabelaProfissional';
import Responsavel from './components/pages/responsavel/Responsavel';
import TabelaResponsavel from './components/pages/responsavel/TabelaResponsavel';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />}>
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/aluno/cadastrar" element={<Aluno />} />
          <Route path="/aluno/listar" element={<TabelaAluno />} />
          <Route path="/profissional/listar" element={<TabelaProfissional />} />
          <Route path="/responsavel/cadastrar" element={<Responsavel />} />
          <Route path="/responsavel/listar" element={<TabelaResponsavel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppRouter />);