import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/auth/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Agenda from './components/pages/agenda/Agenda';
import TabelaAluno from './components/pages/aluno/TabelaAluno';
import Login from './components/pages/login/Login';
import TabelaProfissional from './components/pages/profissional/TabelaProfissional';
import TabelaResponsavel from './components/pages/responsavel/TabelaResponsavel';
import TabelaUsuario from './components/pages/usuario/tabelaUsuario';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><App /></PrivateRoute>}>
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/aluno/listar" element={<TabelaAluno />} />
            <Route path="/profissional/listar" element={<TabelaProfissional />} />
            <Route path="/responsavel/listar" element={<TabelaResponsavel />} />
            <Route path="/usuario/listar" element={<TabelaUsuario />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


ReactDOM.createRoot(document.getElementById('root')).render(<AppRouter />);