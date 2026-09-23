import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./dashboard.css";
import { ROTAS } from "../../constanst/rotas";

export default function Dashboard() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  function sair() {
    // Depois vamos colocar o logout do Firebase aqui
    navigate(ROTAS.LOGIN);
  }

  return (
    <div className="main-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">PDV</div>

          <div>
            <strong>Meu PDV</strong>
            <span>Sistema de vendas</span>
          </div>
        </div>

        {/* MENU */}
        <nav className="sidebar-menu">
          <NavLink to={ROTAS.DASHBOARD.INDEX} end className="menu-item">
            <span>🛒</span>
            PDV
          </NavLink>

          <NavLink to={ROTAS.DASHBOARD.PRODUTOS} className="menu-item">
            <span>📦</span>
            Produtos
          </NavLink>

          <NavLink to={ROTAS.DASHBOARD.CARRINHO} className="menu-item">
            <span>🛒</span>
            Carrinho
          </NavLink>

          <NavLink to={ROTAS.DASHBOARD.CLIENTES} className="menu-item">
            <span>👥</span>
            Clientes
          </NavLink>

          <NavLink to={ROTAS.DASHBOARD.FIADOS.INDEX} className="menu-item">
            <span>📒</span>
            Fiados
          </NavLink>

          <NavLink to={ROTAS.DASHBOARD.RELATORIOS} className="menu-item">
            <span>📊</span>
            Relatórios
          </NavLink>

          <NavLink to={ROTAS.DASHBOARD.CONFIGURACOES} className="menu-item">
            <span>⚙️</span>
            Configurações
          </NavLink>
        </nav>

        {/* USUÁRIO */}
        <div className="sidebar-bottom">
          <div className="user-info">
            <div className="user-avatar">
              {usuario?.nome.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="user-data">
              <strong>{usuario?.nome || "Usuário"}</strong>

              <span>Operador</span>
            </div>
          </div>

          <button className="logout-button" onClick={sair}>
            Sair
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
