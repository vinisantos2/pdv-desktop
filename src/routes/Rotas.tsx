import { Route, Routes } from "react-router-dom";

import { ROTAS } from "../constanst/rotas";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Inicio from "../pages/Dashboard/navs/inicio/Inicio";
import Produtos from "../pages/Dashboard/navs/produtos/Produtos";
import Carrinho from "../pages/Dashboard/navs/carrinho/Carrinho";
import Clientes from "../pages/Dashboard/navs/clientes/Clientes";

import RotaPrivada from "./RotaPrivada";
import PaginaNaoEncontrada from "../pages/PaginaNaoEncontrada";
import Fiados from "../pages/Dashboard/navs/fiados/Fiados";
import Relatorios from "../pages/Dashboard/navs/relatorios/Relatorios";
import DetalhesFiado from "../pages/Dashboard/navs/fiados/detalhes/DetalhesFiado";
import Configuracoes from "../pages/Dashboard/navs/configuracoes/Configuracoes";

export default function Rotas() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path={ROTAS.LOGIN} element={<Login />} />

      {/* ROTAS PROTEGIDAS */}
      <Route element={<RotaPrivada />}>
        <Route path={ROTAS.DASHBOARD.INDEX} element={<Dashboard />}>
          {/* INÍCIO */}
          <Route index element={<Inicio />} />

          {/* PRODUTOS */}
          <Route path={ROTAS.DASHBOARD.PRODUTOS} element={<Produtos />} />

          {/* CARRINHO */}
          <Route path={ROTAS.DASHBOARD.CARRINHO} element={<Carrinho />} />

          {/* CLIENTES */}
          <Route path={ROTAS.DASHBOARD.CLIENTES} element={<Clientes />} />

          {/* Relatorios */}
          <Route path={ROTAS.DASHBOARD.RELATORIOS} element={<Relatorios />} />

          {/* Fiados */}
          <Route path={ROTAS.DASHBOARD.FIADOS.INDEX} element={<Fiados />} />
          <Route
            path={ROTAS.DASHBOARD.CONFIGURACOES}
            element={<Configuracoes />}
          />

          <Route
            path={ROTAS.DASHBOARD.FIADOS.DETALHES}
            element={<DetalhesFiado />}
          />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<PaginaNaoEncontrada />} />
    </Routes>
  );
}
