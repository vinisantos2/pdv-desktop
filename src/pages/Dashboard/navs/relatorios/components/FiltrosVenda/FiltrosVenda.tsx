import InputPadrao from "../../../../../../components/input/InputPadrao";
import type { FormaPagamentoFiltro } from "../../hooks/useRelatorios";

import "./filtroVenda.css";

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
    <section className="filtros-venda">

      {/* CAMPOS */}

      <div className="filtros-venda-campos">

        {/* BUSCA */}

        <div className="filtro-venda-busca">
          <label htmlFor="busca-venda">
            Buscar
          </label>

          <InputPadrao
            id="busca-venda"
            type="text"
            placeholder="Cliente ou código da venda..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {/* DATA INICIAL */}

        <div className="filtro-venda-data">
          <label htmlFor="data-inicial">
            Data inicial
          </label>

          <InputPadrao
            id="data-inicial"
            type="date"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
          />
        </div>

        {/* DATA FINAL */}

        <div className="filtro-venda-data">
          <label htmlFor="data-final">
            Data final
          </label>

          <InputPadrao
            id="data-final"
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>

        {/* PAGAMENTO */}

        <div className="filtro-venda-pagamento">
          <label htmlFor="forma-pagamento">
            Pagamento
          </label>

          <select
            id="forma-pagamento"
            value={formaPagamento}
            onChange={(e) =>
              setFormaPagamento(
                e.target.value as FormaPagamentoFiltro
              )
            }
          >
            <option value="">Todos</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">PIX</option>
            <option value="cartao">Cartão</option>
            <option value="fiado">Fiado</option>
          </select>
        </div>

      </div>

      {/* AÇÕES */}

      <div className="filtros-venda-acoes">

        <button
          type="button"
          className="btn-filtrar"
        >
          Filtrar
        </button>

        <button
          type="button"
          className="btn-limpar-filtros"
          onClick={limparFiltros}
        >
          Limpar filtros
        </button>

      </div>

    </section>
  );
}