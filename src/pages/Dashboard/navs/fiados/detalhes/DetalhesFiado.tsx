import "./detalhesFiado.css";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Venda } from "../../../../../types/Venda";
import { registrarPagamentoFiado } from "../../../../../services/VendaService";
import { useAuth } from "../../../../../contexts/AuthContext";

export default function DetalhesFiado() {
  const location = useLocation();
  const navigate = useNavigate();
  const { empresa } = useAuth();

  const { vendas } = location.state as {
    vendas: Venda[];
  };

  const [recebendoPagamento, setRecebendoPagamento] = useState(false);

  const [vendaSelecionada, setVendaSelecionada] = useState<Venda | null>(null);

  const [valorRecebido, setValorRecebido] = useState("");

  if (!vendas || vendas.length === 0) {
    return (
      <div className="detalhes-fiado-vazio">
        <h2>Nenhuma venda encontrada</h2>

        <button onClick={() => navigate(-1)}>← Voltar</button>
      </div>
    );
  }

  const clienteNome = vendas[0].clienteNome || "Cliente não informado";

  const totalDevido = vendas.reduce((total, venda) => total + venda.total, 0);

  const valorParaPagamento = vendaSelecionada
    ? vendaSelecionada.total
    : totalDevido;

  const valorRecebidoNumerico = Number(valorRecebido) || 0;

  const troco =
    valorRecebidoNumerico > valorParaPagamento
      ? valorRecebidoNumerico - valorParaPagamento
      : 0;

  const valorRestante =
    valorRecebidoNumerico < valorParaPagamento
      ? valorParaPagamento - valorRecebidoNumerico
      : 0;

  function abrirPagamentoTotal() {
    setVendaSelecionada(null);
    setValorRecebido("");
    setRecebendoPagamento(true);
  }

  function abrirPagamentoVenda(venda: Venda) {
    setVendaSelecionada(venda);
    setValorRecebido("");
    setRecebendoPagamento(true);
  }

  function cancelarPagamento() {
    setVendaSelecionada(null);
    setValorRecebido("");
    setRecebendoPagamento(false);
  }

  async function confirmarPagamento() {
    const valor = Number(valorRecebido);

    if (!valor || valor <= 0) {
      alert("Informe um valor válido.");
      return;
    }

    if (!empresa?.id) {
      alert("Empresa não encontrada.");
      return;
    }

    if (valor < valorParaPagamento) {
      alert(
        `O valor recebido é insuficiente para quitar ${
          vendaSelecionada ? "esta venda" : "todas as vendas"
        }.`,
      );

      return;
    }

    try {
      const vendasParaPagar = vendaSelecionada ? [vendaSelecionada] : vendas;

      await registrarPagamentoFiado(empresa.id, vendasParaPagar);

      alert("Pagamento registrado com sucesso!");

      setVendaSelecionada(null);
      setValorRecebido("");
      setRecebendoPagamento(false);
    } catch (error) {
      console.error("Erro ao registrar pagamento:", error);

      alert("Não foi possível registrar o pagamento.");
    }
  }
  return (
    <div className="detalhes-fiado">
      {/* =========================
          CABEÇALHO
      ========================= */}

      <div className="detalhes-fiado-header">
        <button className="detalhes-fiado-voltar" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <div>
          <h1>Detalhes do fiado</h1>
          <p>{clienteNome}</p>
        </div>
      </div>

      {/* =========================
          RESUMO
      ========================= */}

      <div className="detalhes-fiado-resumo">
        <div className="detalhes-fiado-resumo-card">
          <span>Cliente</span>
          <strong>{clienteNome}</strong>
        </div>

        <div className="detalhes-fiado-resumo-card">
          <span>Vendas em aberto</span>

          <strong>{vendas.length}</strong>
        </div>

        <div className="detalhes-fiado-resumo-card">
          <span>Total devido</span>

          <strong className="valor-devido">
            {totalDevido.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </div>
      </div>

      {/* =========================
          PAGAMENTO
      ========================= */}

      <div className="detalhes-fiado-pagamento">
        {!recebendoPagamento ? (
          <button
            className="btn-receber-pagamento"
            onClick={abrirPagamentoTotal}
          >
            💰 Receber valor total
          </button>
        ) : (
          <div className="pagamento-fiado">
            <div className="pagamento-fiado-header">
              <div>
                <h3>
                  {vendaSelecionada
                    ? "Receber pagamento da venda"
                    : "Receber pagamento total"}
                </h3>

                <p>
                  Valor devido:{" "}
                  <strong>
                    {valorParaPagamento.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </p>
              </div>

              <button
                className="btn-fechar-pagamento"
                onClick={cancelarPagamento}
              >
                ×
              </button>
            </div>

            <div className="pagamento-fiado-form">
              <div className="campo-pagamento">
                <label htmlFor="valorRecebido">Valor recebido</label>

                <input
                  id="valorRecebido"
                  type="number"
                  min="0"
                  step="0.01"
                  value={valorRecebido}
                  onChange={(e) => setValorRecebido(e.target.value)}
                  placeholder="0,00"
                  autoFocus
                />
              </div>

              <div className="pagamento-fiado-info">
                <div className="pagamento-info-item">
                  <span>Valor devido</span>

                  <strong>
                    {valorParaPagamento.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </div>

                <div className="pagamento-info-item">
                  <span>Valor recebido</span>

                  <strong>
                    {valorRecebidoNumerico.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </div>

                {troco > 0 && (
                  <div className="pagamento-info-item pagamento-troco">
                    <span>Troco</span>

                    <strong>
                      {troco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </strong>
                  </div>
                )}

                {valorRestante > 0 && (
                  <div className="pagamento-info-item pagamento-restante">
                    <span>Valor restante</span>

                    <strong>
                      {valorRestante.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </strong>
                  </div>
                )}
              </div>
            </div>

            <div className="pagamento-fiado-acoes">
              <button
                className="btn-cancelar-pagamento"
                onClick={cancelarPagamento}
              >
                Cancelar
              </button>

              <button
                className="btn-confirmar-pagamento"
                onClick={confirmarPagamento}
              >
                Confirmar pagamento
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =========================
          VENDAS
      ========================= */}

      <div className="detalhes-fiado-vendas">
        <div className="detalhes-fiado-vendas-header">
          <div>
            <h2>Vendas em aberto</h2>
            <p>Selecione uma venda para receber individualmente.</p>
          </div>

          <span>
            {vendas.length} {vendas.length === 1 ? "venda" : "vendas"}
          </span>
        </div>

        <div className="detalhes-fiado-lista">
          {vendas.map((venda) => {
            const data = new Date(venda.data.seconds * 1000);

            const selecionada = vendaSelecionada?.id === venda.id;

            return (
              <div className="venda-fiado" key={venda.id}>
                <div className="venda-fiado-info">
                  <span>Data da venda</span>

                  <strong>{data.toLocaleDateString("pt-BR")}</strong>
                </div>

                <strong className="venda-fiado-valor">
                  {venda.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>

                {!selecionada && (
                  <button
                    className="btn-receber-venda"
                    onClick={() => abrirPagamentoVenda(venda)}
                  >
                    Receber
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
