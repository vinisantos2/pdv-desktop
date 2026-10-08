import { Route, Routes } from "react-router-dom";

import { ROTAS } from "../constanst/rotas";

// Páginas
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Inicio from "../pages/Dashboard/navs/inicio/Inicio";
import Produtos from "../pages/Dashboard/navs/produtos/Produtos";
import Carrinho from "../pages/Dashboard/navs/carrinho/Carrinho";
import Clientes from "../pages/Dashboard/navs/clientes/Clientes";

import Fiados from "../pages/Dashboard/navs/fiados/Fiados";
import Relatorios from "../pages/Dashboard/navs/relatorios/Relatorios";
import DetalhesFiado from "../pages/Dashboard/navs/fiados/detalhes/DetalhesFiado";

import Empresa from "../pages/Dashboard/configuracoes/empresa/Empresa";
import Usuarios from "../pages/Dashboard/configuracoes/usuarios/Usuarios";
import SobreApp from "../pages/Dashboard/configuracoes/sobre/Sobre";

import RotaPrivada from "./RotaPrivada";
import PaginaNaoEncontrada from "../pages/PaginaNaoEncontrada";

export default function Rotas() {
  return (
    <Routes>

      {/* =====================================================
          LOGIN
      ====================================================== */}
      <Route
        path={ROTAS.LOGIN}
        element={<Login />}
      />


      {/* =====================================================
          ROTAS PROTEGIDAS
      ====================================================== */}
      <Route element={<RotaPrivada />}>

        {/* ===================================================
            DASHBOARD
        ==================================================== */}
        <Route
          path={ROTAS.DASHBOARD.INDEX}
          element={<Dashboard />}
        >

          {/* INÍCIO */}
          <Route
            index
            element={<Inicio />}
          />


          {/* =================================================
              ROTAS DISPONÍVEIS PARA FUNCIONÁRIO E ADMIN
          ================================================== */}

          {/* CARRINHO */}
          <Route
            path={ROTAS.DASHBOARD.CARRINHO}
            element={<Carrinho />}
          />

          {/* CLIENTES */}
          <Route
            path={ROTAS.DASHBOARD.CLIENTES}
            element={<Clientes />}
          />

          {/* FIADOS */}
          <Route
            path={ROTAS.DASHBOARD.FIADOS.INDEX}
            element={<Fiados />}
          />

          {/* DETALHES FIADO */}
          <Route
            path={ROTAS.DASHBOARD.FIADOS.DETALHES}
            element={<DetalhesFiado />}
          />

          {/* SOBRE */}
          <Route
            path={ROTAS.DASHBOARD.CONFIGURACOES.SOBRE}
            element={<SobreApp />}
          />


          {/* =================================================
              SOMENTE ADMIN
          ================================================== */}

          <Route element={<RotaPrivada apenasAdmin />}>

            {/* PRODUTOS */}
            <Route
              path={ROTAS.DASHBOARD.PRODUTOS}
              element={<Produtos />}
            />

            {/* RELATÓRIOS */}
            <Route
              path={ROTAS.DASHBOARD.RELATORIOS}
              element={<Relatorios />}
            />

            {/* EMPRESA */}
            <Route
              path={ROTAS.DASHBOARD.CONFIGURACOES.EMPRESA}
              element={<Empresa />}
            />

            {/* USUÁRIOS */}
            <Route
              path={ROTAS.DASHBOARD.CONFIGURACOES.USUARIOS}
              element={<Usuarios />}
            />

            {/* PLANO */}
            {/* <Route
              path={ROTAS.DASHBOARD.CONFIGURACOES.PLANO}
              element={<Plano />}
            /> */}

          </Route>

        </Route>

      </Route>


      {/* =====================================================
          404
      ====================================================== */}
      <Route
        path="*"
        element={<PaginaNaoEncontrada />}
      />

    </Routes>
  );
}