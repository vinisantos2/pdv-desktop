import { NavLink } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../../../contexts/AuthContext";
import { ROTAS } from "../../../../constanst/rotas";

import "./sidebar-menu.css";

export default function SidebarMenu() {
  const { usuario } = useAuth();

  const [configuracoesAberto, setConfiguracoesAberto] = useState(false);

  const isAdmin = usuario?.perfil === "admin";

  return (
    <nav className="sidebar-menu">
      {/* PDV */}
      <NavLink to={ROTAS.DASHBOARD.INDEX} end className="menu-item">
        <span>🛒</span>
        PDV
      </NavLink>

      {/* PRODUTOS */}
      {isAdmin && (
        <NavLink to={ROTAS.DASHBOARD.PRODUTOS} className="menu-item">
          <span>📦</span>
          Produtos
        </NavLink>
      )}

      {/* CARRINHO */}
      <NavLink to={ROTAS.DASHBOARD.CARRINHO} className="menu-item">
        <span>🛒</span>
        Carrinho
      </NavLink>

      {/* CLIENTES */}
      <NavLink to={ROTAS.DASHBOARD.CLIENTES} className="menu-item">
        <span>👥</span>
        Clientes
      </NavLink>

      {/* FIADOS */}
      <NavLink to={ROTAS.DASHBOARD.FIADOS.INDEX} className="menu-item">
        <span>📒</span>
        Fiados
      </NavLink>

      {/* RELATÓRIOS */}
      {isAdmin && (
        <NavLink to={ROTAS.DASHBOARD.RELATORIOS} className="menu-item">
          <span>📊</span>
          Relatórios
        </NavLink>
      )}

      {/* CONFIGURAÇÕES */}
      {isAdmin && (
        <>
          <button
            type="button"
            className="menu-item menu-item-configuracoes"
            onClick={() => setConfiguracoesAberto((aberto) => !aberto)}
          >
            <span>⚙️</span>
            Configurações
            <span className="menu-seta">{configuracoesAberto ? "⌃" : "⌄"}</span>
          </button>

          {/* SUBMENU */}
          {configuracoesAberto && (
            <div className="submenu">
              {/* EMPRESA */}
              <NavLink
                to={ROTAS.DASHBOARD.CONFIGURACOES.EMPRESA}
                className="submenu-item"
              >
                🏢 Empresa
              </NavLink>

              {/* USUÁRIOS */}
              <NavLink
                to={ROTAS.DASHBOARD.CONFIGURACOES.USUARIOS}
                className="submenu-item"
              >
                👥 Usuários
              </NavLink>

              {/* PLANO */}
              <NavLink
                to={ROTAS.DASHBOARD.CONFIGURACOES.PLANO}
                className="submenu-item"
              >
                💳 Plano e pagamento
              </NavLink>

              {/* PERMISSÕES */}
              <NavLink
                to={ROTAS.DASHBOARD.CONFIGURACOES.PERMISSOES}
                className="submenu-item"
              >
                🔒 Permissões
              </NavLink>
            </div>
          )}
        </>
      )}

      {/* SOBRE */}
      <NavLink to={ROTAS.DASHBOARD.CONFIGURACOES.SOBRE} className="menu-item">
        <span>ℹ️</span>
        Sobre
      </NavLink>
    </nav>
  );
}
