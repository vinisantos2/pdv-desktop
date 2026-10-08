import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Venda } from "../../../../../../types/Venda";
import { useAuth } from "../../../../../../contexts/AuthContext";
import { ROTAS } from "../../../../../../constanst/rotas";
import ComprovanteVenda from "../../../../../../components/comprovante/Comprovante";
import "./listaFiado.css";

interface ListaFiadoProps {
  vendas: Venda[];
}

export default function ListaFiado({ vendas }: ListaFiadoProps) {
  const navigate = useNavigate();

  const { empresa } = useAuth();

  const [vendaSelecionada, setVendaSelecionada] = useState<Venda | null>(null);

  // =========================
  // AGRUPAR POR CLIENTE
  // =========================

  const clientesFiado = Object.values(
    vendas.reduce(
      (acc, venda) => {
        if (!venda.clienteId) return acc;

        if (!acc[venda.clienteId]) {
          acc[venda.clienteId] = {
            clienteId: venda.clienteId,
            clienteNome: venda.clienteNome || "Cliente não informado",
            total: 0,
            vendas: [],
          };
        }

        acc[venda.clienteId].total += venda.total;
        acc[venda.clienteId].vendas.push(venda);

        return acc;
      },
      {} as Record<
        string,
        {
          clienteId: string;
          clienteNome: string;
          total: number;
          vendas: Venda[];
        }
      >,
    ),
  );

  // =========================
  // DETALHES
  // =========================

  function onDetalhes(vendasCliente: Venda[]) {
    navigate(ROTAS.DASHBOARD.FIADOS.DETALHES, {
      state: {
        vendas: vendasCliente,
      },
    });
  }

  // =========================
  // COMPROVANTE
  // =========================

  function abrirComprovante(venda: Venda) {
    setVendaSelecionada(venda);
  }

  function fecharComprovante() {
    setVendaSelecionada(null);
  }

  // =========================
  // VAZIO
  // =========================

  if (vendas.length === 0) {
    return (
      <div className="lista-fiado-vazio">
        <div className="lista-fiado-vazio-icon">📋</div>

        <h3>Nenhum fiado encontrado</h3>

        <p>Não existem vendas fiadas pendentes no momento.</p>
      </div>
    );
  }

  return (
    <section className="lista-fiado">
      {/* CABEÇALHO FIXO */}
      <table className="fiado-tabela fiado-tabela-header">
        <thead>
          <tr>
            <th className="fiado-col-cliente">Cliente</th>

            <th className="fiado-col-vendas">Vendas em aberto</th>

            <th className="fiado-col-valor">Valor devido</th>

            <th className="fiado-col-acoes">Ações</th>
          </tr>
        </thead>
      </table>

      {/* CORPO COM SCROLL */}
      <div className="fiado-tabela-scroll">
        <table className="fiado-tabela">
          <tbody>
            {clientesFiado.map((cliente) => (
              <tr key={cliente.clienteId}>
                {/* CLIENTE */}
                <td className="fiado-col-cliente">
                  <div className="fiado-cliente">
                    <div className="fiado-cliente-icon">👤</div>

                    <div className="fiado-cliente-info">
                      <strong>{cliente.clienteNome}</strong>

                      <span>Cliente com débito pendente</span>
                    </div>
                  </div>
                </td>

                {/* VENDAS */}
                <td className="fiado-col-vendas">
                  <span className="fiado-quantidade">
                    {cliente.vendas.length}

                    {cliente.vendas.length === 1 ? " venda" : " vendas"}
                  </span>
                </td>

                {/* VALOR */}
                <td className="fiado-col-valor">
                  <strong className="fiado-valor">
                    {cliente.total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </td>

                {/* AÇÕES */}
                <td className="fiado-col-acoes">
                  <div className="fiado-acoes">
                    <button
                      type="button"
                      className="btn-detalhes"
                      onClick={() => onDetalhes(cliente.vendas)}
                    >
                      Detalhes
                    </button>

                    {cliente.vendas.length > 0 && (
                      <button
                        type="button"
                        className="btn-comprovante"
                        onClick={() => abrirComprovante(cliente.vendas[0])}
                        title="Visualizar comprovante"
                      >
                        🧾
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* COMPROVANTE */}

      {vendaSelecionada && empresa && (
        <ComprovanteVenda
          venda={vendaSelecionada}
          empresa={empresa}
          onVoltar={fecharComprovante}
        />
      )}
    </section>
  );
}
