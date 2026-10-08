import { useState } from "react";
import type { Venda } from "../../../../../types/Venda";

import { useAuth } from "../../../../../contexts/AuthContext";
import ComprovanteVenda from "../../../../../components/comprovante/Comprovante";
import Loading from "../../../../../components/loading/Loading";

import "./tabelaHistorico.css";

interface TabelaHistoricoProps {
  vendas: Venda[];
  carregando: boolean;
}

export default function TabelaHistorico({
  vendas,
  carregando,
}: TabelaHistoricoProps) {
  const [vendaSelecionada, setVendaSelecionada] = useState<Venda | null>(null);

  const { empresa } = useAuth();

  function formatarPagamento(forma: Venda["formaPagamento"]) {
    const pagamentos = {
      dinheiro: "Dinheiro",
      pix: "PIX",
      cartao: "Cartão",
      fiado: "Fiado",
    };

    return pagamentos[forma];
  }

  function formatarStatus(status: Venda["statusPagamento"]) {
    return status === "pago" ? "Pago" : "Pendente";
  }

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  if (carregando) {
    return <Loading />;
  }

  return (
    <>
      <section className="historico-card">
 
        {/* =========================
            TABELA
        ========================= */}

        <div className="historico-tabela-container">
          {/* CABEÇALHO FIXO */}

          <table className="tabela-historico tabela-historico-header">
            <thead>
              <tr>
                <th className="col-data">Data</th>

                <th className="col-cliente">Cliente</th>

                <th className="col-pagamento">Pagamento</th>

                <th className="col-total">Total</th>

                <th className="col-status">Status</th>

                <th className="col-acao">Ação</th>
              </tr>
            </thead>
          </table>

          {/* CORPO COM SCROLL */}

          <div className="historico-tabela-scroll">
            <table className="tabela-historico">
              <tbody>
                {vendas.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="estado-tabela">
                      <div>
                        <strong>Nenhuma venda encontrada</strong>

                        <span>Não existem vendas no período selecionado.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  vendas.map((venda) => {
                    const data = venda.data.toDate();

                    return (
                      <tr key={venda.id}>
                        {/* DATA */}

                        <td className="col-data">
                          <div className="data-venda">
                            <strong>{data.toLocaleDateString("pt-BR")}</strong>

                            <span>
                              {data.toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </td>

                        {/* CLIENTE */}

                        <td className="col-cliente">
                          <div className="cliente-venda">
                            <div className="cliente-venda-icon">👤</div>

                            <strong title={venda.clienteNome || "Consumidor"}>
                              {venda.clienteNome || "Consumidor"}
                            </strong>
                          </div>
                        </td>

                        {/* PAGAMENTO */}

                        <td className="col-pagamento">
                          <span
                            className={`pagamento-badge pagamento-${venda.formaPagamento}`}
                          >
                            {formatarPagamento(venda.formaPagamento)}
                          </span>
                        </td>

                        {/* TOTAL */}

                        <td className="col-total">
                          <strong className="valor-venda">
                            {formatarMoeda(venda.total)}
                          </strong>
                        </td>

                        {/* STATUS */}

                        <td className="col-status">
                          <span
                            className={`status-badge status-${venda.statusPagamento}`}
                          >
                            <span className="status-dot" />

                            {formatarStatus(venda.statusPagamento)}
                          </span>
                        </td>

                        {/* AÇÃO */}

                        <td className="col-acao">
                          <button
                            type="button"
                            className="btn-comprovante"
                            onClick={() => setVendaSelecionada(venda)}
                          >
                            🧾
                            <span>Comprovante</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================
          COMPROVANTE
      ========================= */}

      {vendaSelecionada && empresa && (
        <ComprovanteVenda
          venda={vendaSelecionada}
          empresa={empresa}
          onVoltar={() => setVendaSelecionada(null)}
        />
      )}
    </>
  );
}
