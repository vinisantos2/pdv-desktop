import { useEffect, useState } from "react";
import "./modalFinalizarVenda.css";
import type { ItemVenda } from "../../../../../types/ItemVenda";
import { criarVenda } from "../../../../../services/VendaService";
import { useAuth } from "../../../../../contexts/AuthContext";
import type { Cliente } from "../../../../../types/Cliente";
import { listarClientes } from "../../../../../services/ClienteService";
import Loading from "../../../../../components/loading/Loading";
import type { Venda } from "../../../../../types/Venda";

interface ModalFinalizarVendaProps {
  aberto: boolean;
  itens: ItemVenda[];
  onFechar: () => void;
  onVendaFinalizada: (venda?: Venda) => void;
}

type FormaPagamento = "dinheiro" | "pix" | "cartao" | "fiado";

export default function ModalFinalizarVenda({
  aberto,
  itens,
  onFechar,
  onVendaFinalizada,
}: ModalFinalizarVendaProps) {
  const [formaPagamento, setFormaPagamento] =
    useState<FormaPagamento>("dinheiro");

  const [valorRecebido, setValorRecebido] = useState<number>(0);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteId, setClienteId] = useState("");
  const [clienteNome, setClienteNome] = useState("");
  const { empresa } = useAuth();
  const empresaId = empresa!.id;
  const [carregando, setCarregando] = useState(false);

  if (!aberto) return null;

  useEffect(() => {
    async function carregarClientes() {
      if (!aberto || !empresa?.id) return;
      setCarregando(true);

      try {
        const lista = await listarClientes(empresa.id);

        setClientes(lista.filter((cliente) => cliente.ativo));
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarClientes();
  }, [aberto, empresa?.id]);

  if (!aberto) return null;

  const total = itens.reduce(
    (acc, item) => acc + item.quantidade * item.valor,
    0,
  );

  const troco = Math.max(0, valorRecebido - total);

  const formatarValor = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  async function finalizarVenda(imprimir: boolean) {
    if (itens.length === 0) {
      return;
    }

    if (formaPagamento === "fiado" && !clienteId) {
      alert("Selecione o cliente da venda fiada.");
      return;
    }

    if (formaPagamento === "dinheiro" && valorRecebido < total) {
      alert("O valor recebido é menor que o total da venda.");
      return;
    }

    setCarregando(true);

    try {
      const venda = await criarVenda(
        empresaId,
        total,
        formaPagamento,
        itens,
        formaPagamento === "fiado" ? clienteId : "",
        formaPagamento === "fiado" ? clienteNome : "",
      );

      if (imprimir) {
        onVendaFinalizada(venda);
      } else {
        onVendaFinalizada();
      }
    } catch (error) {
      console.error("Erro ao finalizar venda:", error);
    } finally {
      setCarregando(false);
    }
  }
  return (
    <div className="modal-overlay">
      <div className="modal-finalizar">
        {/* =====================================================
          HEADER
      ===================================================== */}

        <div className="modal-header">
          <div>
            <h2>Finalizar venda</h2>
            <span>Confira os itens e escolha a forma de pagamento</span>
          </div>

          <button className="modal-fechar" onClick={onFechar} type="button">
            ×
          </button>
        </div>

        {/* =====================================================
          CONTEÚDO
      ===================================================== */}

        <div className="modal-conteudo">
          {/* ===================================================
            RESUMO DA VENDA
        =================================================== */}

          <div className="itens-venda">
            <div className="secao-titulo">
              <div>
                <h3>Resumo da venda</h3>
                <span>
                  {itens.length} {itens.length === 1 ? "item" : "itens"}
                </span>
              </div>
            </div>

            <div className="lista-itens">
              {itens.map((item, index) => {
                const subtotal = item.quantidade * item.valor;

                return (
                  <div className="item-venda" key={item.codigoBarras ?? index}>
                    <div className="item-info">
                      <strong>{item.descricao}</strong>

                      <span>
                        {item.quantidade} x {formatarValor(item.valor)}
                      </span>
                    </div>

                    <strong className="item-subtotal">
                      {formatarValor(subtotal)}
                    </strong>
                  </div>
                );
              })}
            </div>

            {/* DINHEIRO */}

            {formaPagamento === "dinheiro" && (
              <div className="pagamento-dinheiro">
                <div className="campo-valor-recebido">
                  <label htmlFor="valorRecebido">Valor recebido</label>

                  <div className="input-valor">
                    <span>R$</span>

                    <input
                      id="valorRecebido"
                      type="number"
                      min="0"
                      step="0.1"
                      value={valorRecebido || ""}
                      onChange={(e) => setValorRecebido(Number(e.target.value))}
                      placeholder="0,00"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="troco">
                  <span>Troco a devolver</span>

                  <strong>{formatarValor(troco)}</strong>
                </div>
              </div>
            )}

            {/* TOTAL */}

            <div className="total-venda">
              <span>Total da venda</span>

              <strong>{formatarValor(total)}</strong>
            </div>
          </div>

          {/* ===================================================
            PAGAMENTO
        =================================================== */}

          <div className="pagamento">
            <div className="secao-titulo">
              <div>
                <h3>Forma de pagamento</h3>

                <span>Selecione uma opção</span>
              </div>
            </div>

            <div className="opcoes-pagamento">
              {/* DINHEIRO */}

              <label
                className={`opcao-pagamento ${
                  formaPagamento === "dinheiro" ? "selecionada" : ""
                }`}
              >
                <input
                  type="radio"
                  name="formaPagamento"
                  value="dinheiro"
                  checked={formaPagamento === "dinheiro"}
                  onChange={() => setFormaPagamento("dinheiro")}
                />

                <div className="opcao-conteudo">
                  <span className="opcao-icon">💵</span>

                  <div>
                    <strong>Dinheiro</strong>

                    <small>Pagamento em espécie</small>
                  </div>
                </div>
              </label>

              {/* PIX */}

              <label
                className={`opcao-pagamento ${
                  formaPagamento === "pix" ? "selecionada" : ""
                }`}
              >
                <input
                  type="radio"
                  name="formaPagamento"
                  value="pix"
                  checked={formaPagamento === "pix"}
                  onChange={() => setFormaPagamento("pix")}
                />

                <div className="opcao-conteudo">
                  <span className="opcao-icon">📱</span>

                  <div>
                    <strong>PIX</strong>

                    <small>Pagamento instantâneo</small>
                  </div>
                </div>
              </label>

              {/* CARTÃO */}

              <label
                className={`opcao-pagamento ${
                  formaPagamento === "cartao" ? "selecionada" : ""
                }`}
              >
                <input
                  type="radio"
                  name="formaPagamento"
                  value="cartao"
                  checked={formaPagamento === "cartao"}
                  onChange={() => setFormaPagamento("cartao")}
                />

                <div className="opcao-conteudo">
                  <span className="opcao-icon">💳</span>

                  <div>
                    <strong>Cartão</strong>

                    <small>Crédito ou débito</small>
                  </div>
                </div>
              </label>

              {/* FIADO */}

              <label
                className={`opcao-pagamento ${
                  formaPagamento === "fiado" ? "selecionada" : ""
                }`}
              >
                <input
                  type="radio"
                  name="formaPagamento"
                  value="fiado"
                  checked={formaPagamento === "fiado"}
                  onChange={() => setFormaPagamento("fiado")}
                />

                <div className="opcao-conteudo">
                  <span className="opcao-icon">📝</span>

                  <div>
                    <strong>Fiado</strong>

                    <small>Venda para cliente</small>
                  </div>
                </div>
              </label>
            </div>

            {/* =================================================
              CLIENTE DO FIADO
          ================================================= */}

            {formaPagamento === "fiado" && (
              <div className="cliente-fiado">
                <div className="cliente-fiado-titulo">
                  <span className="cliente-fiado-icon">👤</span>

                  <div>
                    <strong>Cliente da venda</strong>

                    <span>
                      Selecione quem ficará responsável pelo pagamento
                    </span>
                  </div>
                </div>

                <label htmlFor="clienteFiado">Cliente</label>

                <select
                  id="clienteFiado"
                  value={clienteId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setClienteId(id);

                    const clienteSelecionado = clientes.find(
                      (cliente) => cliente.id === id,
                    );

                    setClienteNome(clienteSelecionado?.nome ?? "");
                  }}
                >
                  <option value="">Selecione o cliente</option>

                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                      {cliente.telefone ? ` - ${cliente.telefone}` : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
          FOOTER
      ===================================================== */}
        {carregando && <Loading />}
        <div className="modal-footer">
          <button type="button" className="btn-cancelar" onClick={onFechar}>
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => finalizarVenda(false)}
            className="btn-confirmar"
          >
            Confirmar venda
          </button>
          <button
            type="button"
            onClick={() => finalizarVenda(true)}
            className="btn-confirmar"
          >
            Finalizar e imprimir
          </button>
        </div>
      </div>
    </div>
  );
}
