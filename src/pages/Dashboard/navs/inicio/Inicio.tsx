import "./inicio.css";

import DashboardCards from "./components/DashboardCards";
import AcessoRapido from "./components/AcessoRapido";
import UltimasVendas from "./components/UltimasVendas";
import EstoqueBaixo from "./components/EstoqueBaixo";
import Loading from "../../../../components/loading/Loading";

import useInicio from "./hooks/useInicio";

export default function Inicio() {
  const {
    usuario,
    empresa,
    produtos,
    ultimasVendas,
    vendasHoje,
    faturamentoHoje,
    produtosEstoqueBaixo,
    carregando,
  } = useInicio();

  if (carregando) {
    return <Loading />;
  }

  return (
    <div className="dashboard">
      {/* Cabeçalho */}
      <header className="dashboard-header">
        <div>
          <h1>Olá, {usuario?.nome || "Usuário"}!</h1>

          <p>Bem-vindo ao {empresa?.nome || "seu PDV"}.</p>
        </div>

        <div className="dashboard-date">
          <span>Hoje</span>

          <strong>{new Date().toLocaleDateString("pt-BR")}</strong>
        </div>
      </header>

      {/* Indicadores */}
      <DashboardCards
        faturamentoHoje={faturamentoHoje}
        vendasHoje={vendasHoje}
        produtosCadastrados={produtos.length}
      />

      {/* Acesso rápido */}
      <AcessoRapido />

      {/* Conteúdo */}
      <section className="dashboard-content">
        <UltimasVendas vendas={ultimasVendas} />

        <EstoqueBaixo produtos={produtosEstoqueBaixo} />
      </section>
    </div>
  );
}
