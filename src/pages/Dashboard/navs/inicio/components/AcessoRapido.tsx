import { useNavigate } from "react-router-dom";
import { ROTAS } from "../../../../../constanst/rotas";
import "./acessoRapido.css";
const acoes = [
  {
    icone: "🛒",
    titulo: "Nova venda",
    descricao: "Abrir caixa",
    rota: ROTAS.DASHBOARD.CARRINHO,
  },
  {
    icone: "📦",
    titulo: "Produtos",
    descricao: "Gerenciar produtos",
    rota: ROTAS.DASHBOARD.PRODUTOS,
  },
  {
    icone: "👥",
    titulo: "Clientes",
    descricao: "Gerenciar clientes",
    rota: ROTAS.DASHBOARD.CLIENTES,
  },
  {
    icone: "📒",
    titulo: "Fiados",
    descricao: "Ver contas pendentes",
    rota: ROTAS.DASHBOARD.FIADOS.INDEX,
  },
];

export default function AcessoRapido() {
  const navigate = useNavigate();
  return (
    <section className="dashboard-section">
      <div className="section-header">
        <h2>Acesso rápido</h2>

        <p>Principais ações do sistema</p>
      </div>
      <div className="action-grid">
        {acoes.map((acao) => (
          <button
            className="action-card"
            onClick={() => navigate(acao.rota)}
            key={acao.titulo}
          >
            <span className="action-icon">{acao.icone}</span>

            <strong>{acao.titulo}</strong>

            <small>{acao.descricao}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
