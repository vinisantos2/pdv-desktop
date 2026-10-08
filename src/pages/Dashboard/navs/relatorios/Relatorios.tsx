import { useAuth } from "../../../../contexts/AuthContext";

import FiltrosVenda from "./components/FiltrosVenda/FiltrosVenda";
import TabelaHistorico from "./components/TabelaHistorico";

import useRelatorios from "./hooks/useRelatorios";

import "./relatorios.css";

export default function Relatorios() {
  const { empresa } = useAuth();

  const {
    vendasFiltradas,
    carregando,
    dataInicial,
    setDataInicial,
    dataFinal,
    setDataFinal,
    formaPagamento,
    setFormaPagamento,
    busca,
    setBusca,
    limparFiltros,
  } = useRelatorios({
    empresaId: empresa?.id ?? "",
  });

  return (
    <div className="relatorios-page">

      {/* HEADER */}

      <header className="relatorios-header">

        <div className="relatorios-titulo">
          <h1>Relatórios</h1>

          <p>
            Consulte e acompanhe o histórico de vendas do sistema.
          </p>
        </div>

        <FiltrosVenda
          dataInicial={dataInicial}
          setDataInicial={setDataInicial}
          dataFinal={dataFinal}
          setDataFinal={setDataFinal}
          formaPagamento={formaPagamento}
          setFormaPagamento={setFormaPagamento}
          busca={busca}
          setBusca={setBusca}
          limparFiltros={limparFiltros}
        />

      </header>


      {/* CONTEÚDO */}

      <main className="relatorios-content">

        <TabelaHistorico
          vendas={vendasFiltradas}
          carregando={carregando}
        />

      </main>

    </div>
  );
}