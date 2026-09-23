import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Venda } from "../../../../../types/Venda";

import "./listaFiado.css";
import { ROTAS } from "../../../../../constanst/rotas";
import { useAuth } from "../../../../../contexts/AuthContext";
import ComprovanteVenda from "../../../../../components/comprovante/Comprovante";

interface ListaFiadoProps {
  vendas: Venda[];
}

export default function ListaFiado({ vendas }: ListaFiadoProps) {
  const navigate = useNavigate();

  const { empresa } = useAuth();

  const [vendaSelecionada, setVendaSelecionada] = useState<Venda | null>(null);

  if (vendas.length === 0) {
    return (
      <div className="lista-fiado-vazio">
        <div className="lista-fiado-vazio-icon">📋</div>

        <h3>Nenhum fiado encontrado</h3>

        <p>Não existem vendas fiadas pendentes no momento.</p>
      </div>
    );
  }

  // Agrupa as vendas pelo cliente
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

  function onDetalhes(vendas: Venda[]) {
    navigate(ROTAS.DASHBOARD.FIADOS.DETALHES, {
      state: {
        vendas,
      },
    });
  }

  function abrirComprovante(venda: Venda) {
    setVendaSelecionada(venda);
  }

  function fecharComprovante() {
    setVendaSelecionada(null);
  }

  return (
    <>
      <div className="lista-fiado">
        {clientesFiado.map((cliente) => (
          <div className="fiado-card" key={cliente.clienteId}>
            <div className="fiado-card-info">
              {/* Cliente */}
              <div className="fiado-card-cliente">
                <span className="fiado-card-icon">👤</span>

                <div>
                  <strong>{cliente.clienteNome}</strong>

                  <span className="fiado-card-data">
                    {cliente.vendas.length}{" "}
                    {cliente.vendas.length === 1
                      ? "venda em aberto"
                      : "vendas em aberto"}
                  </span>
                </div>
              </div>

              {/* Valor total */}
              <div className="fiado-card-valor">
                <span>Valor devido</span>

                <strong>
                  {cliente.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </div>

              {/* Botões */}
              <div className="fiado-card-acoes">
                <button
                  type="button"
                  onClick={() => onDetalhes(cliente.vendas)}
                  className="btn-detalhes"
                >
                  Detalhes
                </button>

                {/* Comprovante da primeira venda */}
                {cliente.vendas.length > 0 && (
                  <button
                    type="button"
                    onClick={() => abrirComprovante(cliente.vendas[0])}
                    className="btn-comprovante"
                  >
                    🧾 Comprovante
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal do comprovante */}
      {vendaSelecionada && empresa && (
        <ComprovanteVenda
          venda={vendaSelecionada}
          empresa={empresa}
          onVoltar={fecharComprovante}
        />
      )}
    </>
  );
}
