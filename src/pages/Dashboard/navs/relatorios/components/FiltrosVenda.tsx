import "./filtroVenda.css";
import type { FormaPagamentoFiltro } from "../hooks/useRelatorios";

interface FiltrosVendaProps {
  dataInicial: string;
  setDataInicial: (valor: string) => void;

  dataFinal: string;
  setDataFinal: (valor: string) => void;

  formaPagamento: FormaPagamentoFiltro;
  setFormaPagamento: (valor: FormaPagamentoFiltro) => void;

  busca: string;
  setBusca: (valor: string) => void;

  limparFiltros: () => void;
}

export default function FiltrosVenda({
  dataInicial,
  setDataInicial,
  dataFinal,
  setDataFinal,
  formaPagamento,
  setFormaPagamento,
  busca,
  setBusca,
  limparFiltros,
}: FiltrosVendaProps) {
  return (
    <div className="filtros-venda">
      <div className="filtro-grupo filtro-busca">
        <label>Buscar</label>

        <input
          type="text"
          placeholder="Cliente ou código da venda"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="filtro-grupo">
        <label>Data inicial</label>

        <input
          type="date"
          value={dataInicial}
          onChange={(e) => setDataInicial(e.target.value)}
        />
      </div>

      <div className="filtro-grupo">
        <label>Data final</label>

        <input
          type="date"
          value={dataFinal}
          onChange={(e) => setDataFinal(e.target.value)}
        />
      </div>

      <div className="filtro-grupo">
        <label>Pagamento</label>

        <select
          value={formaPagamento}
          onChange={(e) =>
            setFormaPagamento(e.target.value as FormaPagamentoFiltro)
          }
        >
          <option value="">Todos</option>

          <option value="dinheiro">Dinheiro</option>

          <option value="pix">PIX</option>

          <option value="cartao">Cartão</option>

          <option value="fiado">Fiado</option>
        </select>
      </div>

      <button className="btn-filtrar" type="button">
        Filtrar
      </button>

      <button
        className="btn-limpar-filtros"
        type="button"
        onClick={limparFiltros}
      >
        Limpar
      </button>
    </div>
  );
}
