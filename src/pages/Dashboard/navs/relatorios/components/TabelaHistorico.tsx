import { useState } from "react";
import type { Venda } from "../../../../../types/Venda";

import "./tabelaHistorico.css";
import { useAuth } from "../../../../../contexts/AuthContext";
import ComprovanteVenda from "../../../../../components/comprovante/Comprovante";

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

  function formatarPagamento(formaPagamento: Venda["formaPagamento"]) {
    switch (formaPagamento) {
      case "dinheiro":
        return "Dinheiro";

      case "pix":
        return "PIX";

      case "cartao":
        return "Cartão";

      case "fiado":
        return "Fiado";

      default:
        return formaPagamento;
    }
  }

  function formatarStatus(status: Venda["statusPagamento"]) {
    switch (status) {
      case "pago":
        return "Pago";

      case "pendente":
        return "Pendente";

      default:
        return status;
    }
  }

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div className="historico-card">
      {/* CABEÇALHO */}

      <div className="historico-header">
        <div>
          <h2>Vendas realizadas</h2>

          <span>Histórico de vendas do período selecionado</span>
        </div>

        <div className="total-vendas">
          <strong>{vendas.length}</strong>

          <span>{vendas.length === 1 ? "venda" : "vendas"}</span>
        </div>
      </div>

      {/* TABELA */}

      <div className="tabela-wrapper">
        <table className="tabela-historico">
          <thead>
            <tr>
              <th>Data</th>
              <th>Cliente</th>
              <th>Pagamento</th>
              <th>Itens</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {carregando && (
              <tr>
                <td colSpan={7} className="sem-vendas">
                  <div className="estado-tabela">
                    <span className="loading-ponto">...</span>

                    <span>Carregando vendas...</span>
                  </div>
                </td>
              </tr>
            )}

            {!carregando && vendas.length === 0 && (
              <tr>
                <td colSpan={7} className="sem-vendas">
                  <div className="estado-tabela">
                    <strong>Nenhuma venda encontrada</strong>

                    <span>Não existem vendas no período selecionado.</span>
                  </div>
                </td>
              </tr>
            )}

            {!carregando &&
              vendas.length > 0 &&
              vendas.map((venda) => {
                const data = venda.data.toDate();

                return (
                  <tr key={venda.id}>
                    {/* DATA */}

                    <td>
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

                    <td>
                      <div className="cliente-venda">
                        <strong>{venda.clienteNome || "Consumidor"}</strong>
                      </div>
                    </td>

                    {/* PAGAMENTO */}

                    <td>
                      <span
                        className={`pagamento-badge pagamento-${venda.formaPagamento}`}
                      >
                        {formatarPagamento(venda.formaPagamento)}
                      </span>
                    </td>

                    {/* ITENS */}

                    <td>
                      <span className="quantidade-itens">
                        {venda.itens.length}{" "}
                        {venda.itens.length === 1 ? "item" : "itens"}
                      </span>
                    </td>

                    {/* TOTAL */}

                    <td>
                      <strong className="valor-venda">
                        {formatarMoeda(venda.total)}
                      </strong>
                    </td>

                    {/* STATUS */}

                    <td>
                      <span
                        className={`status-badge status-${venda.statusPagamento}`}
                      >
                        <span className="status-dot" />

                        {formatarStatus(venda.statusPagamento)}
                      </span>
                    </td>

                    {/* AÇÃO */}

                    <td>
                      <button
                        type="button"
                        className="btn-detalhes"
                        onClick={() => setVendaSelecionada(venda)}
                      >
                        Ver comprovante
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* MODAL DO COMPROVANTE */}

      {vendaSelecionada && empresa && (
        <ComprovanteVenda
          venda={vendaSelecionada}
          empresa={empresa}
          onVoltar={() => setVendaSelecionada(null)}
        />
      )}
    </div>
  );
}
