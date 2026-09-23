import { useAuth } from "../../../../contexts/AuthContext";
import FiltrosVenda from "./components/FiltrosVenda";
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
    <div className="relatorios-container">
      <div className="relatorios-header">
        <div>
          <h1>Histórico de vendas</h1>
          <p>Consulte e filtre todas as vendas realizadas.</p>
        </div>
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

      <TabelaHistorico vendas={vendasFiltradas} carregando={carregando} />
    </div>
  );
}
