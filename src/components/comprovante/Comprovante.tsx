import "./comprovante.css";

import type { Empresa } from "../../types/Empresa";
import type { Venda } from "../../types/Venda";

interface ComprovanteVendaProps {
  venda: Venda;
  empresa: Empresa;
  onVoltar: () => void;
}

export default function ComprovanteVenda({
  venda,
  empresa,
  onVoltar,
}: ComprovanteVendaProps) {
  const data = new Date(venda.data.seconds * 1000);
  const dataPagamento = venda.dataPagamento
    ? new Date(venda.dataPagamento.seconds * 1000)
    : null;

  function imprimir() {
    window.print();
  }

  async function compartilhar() {
    const texto = `
${empresa.nome}
${empresa.cnpj ? `CNPJ: ${empresa.cnpj}\n` : ""}

COMPROVANTE DE VENDA

Venda: ${venda.id}
Data: ${data.toLocaleDateString("pt-BR")}
Hora: ${data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}

${venda.itens
  .map(
    (item) =>
      `${item.quantidade}x ${item.descricao} - ${(
        item.quantidade * item.valor
      ).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`,
  )
  .join("\n")}

TOTAL: ${venda.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}

Pagamento: ${venda.formaPagamento}
Status: ${venda.statusPagamento}

Obrigado pela sua compra!
  `.trim();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Comprovante de venda",
          text: texto,
        });
      } catch (error) {
        console.log("Compartilhamento cancelado:", error);
      }

      return;
    }

    await navigator.clipboard.writeText(texto);

    alert("Comprovante copiado para a área de transferência.");
  }

  return (
    <div className="comprovante-overlay">
      <div className="comprovante-modal">
        {/* =========================
            CABEÇALHO DO MODAL
        ========================= */}

        <div className="comprovante-modal-header">
          <h2>Comprovante de venda</h2>

          <button
            type="button"
            onClick={onVoltar}
            className="comprovante-fechar"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        {/* =========================
            CONTEÚDO
        ========================= */}

        <div className="comprovante-modal-body">
          <div className="comprovante">
            {/* =========================
                EMPRESA
            ========================= */}

            <div className="comprovante-empresa">
              {empresa.logo && (
                <img
                  src={empresa.logo}
                  alt={empresa.nome}
                  className="comprovante-logo"
                />
              )}

              <h2>{empresa.nome}</h2>

              {empresa.cnpj && <span>CNPJ: {empresa.cnpj}</span>}
            </div>

            <div className="comprovante-linha" />

            {/* =========================
                TÍTULO
            ========================= */}

            <div className="comprovante-titulo">COMPROVANTE DE VENDA</div>

            {/* =========================
                INFORMAÇÕES
            ========================= */}

            <div className="comprovante-info">
              <div>
                <span>Nº da venda</span>

                <strong>{venda.id}</strong>
              </div>

              <div>
                <span>Data</span>

                <strong>{data.toLocaleDateString("pt-BR")}</strong>
              </div>
              <div>
                <span>Data pagamento</span>

                <strong>
                  {dataPagamento
                    ? dataPagamento.toLocaleDateString("pt-BR")
                    : "Sem pagamento"}
                </strong>
              </div>

              <div>
                <span>Hora</span>

                <strong>
                  {data.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </strong>
              </div>

              {venda.clienteNome && (
                <div>
                  <span>Cliente</span>

                  <strong>{venda.clienteNome}</strong>
                </div>
              )}
            </div>

            <div className="comprovante-linha" />

            {/* =========================
                PRODUTOS
            ========================= */}

            <div className="comprovante-itens">
              <div className="comprovante-item-header">
                <span>QTD</span>

                <span>DESCRIÇÃO</span>

                <span>TOTAL</span>
              </div>

              {venda.itens.map((item, index) => {
                const totalItem = item.quantidade * item.valor;

                return (
                  <div className="comprovante-item" key={index}>
                    <span>{item.quantidade}</span>

                    <span>{item.descricao}</span>

                    <span>
                      {totalItem.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="comprovante-linha" />

            {/* =========================
                TOTAL
            ========================= */}

            <div className="comprovante-total">
              <div>
                <span>Subtotal</span>

                <strong>
                  {venda.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </div>

              <div className="total-final">
                <span>TOTAL</span>

                <strong>
                  {venda.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </div>
            </div>

            <div className="comprovante-linha" />

            {/* =========================
                PAGAMENTO
            ========================= */}

            <div className="comprovante-pagamento">
              <span>Forma de pagamento</span>

              <strong>{venda.formaPagamento}</strong>
            </div>

            {/* =========================
                STATUS
            ========================= */}

            <div className="comprovante-status">
              <span>Status</span>

              <strong>{venda.statusPagamento}</strong>
            </div>

            {/* =========================
                RODAPÉ
            ========================= */}

            <div className="comprovante-footer">
              <strong>Obrigado pela sua compra!</strong>

              <span>Volte sempre!</span>

              <small>Este comprovante não possui valor fiscal.</small>
            </div>
          </div>
        </div>

        {/* =========================
            RODAPÉ DO MODAL
        ========================= */}
        <div className="comprovante-modal-footer">
          <button
            type="button"
            className="comprovante-btn-voltar"
            onClick={onVoltar}
          >
            Fechar
          </button>

          <button
            type="button"
            className="comprovante-btn-imprimir"
            onClick={compartilhar}
          >
            📤 Compartilhar
          </button>

          <button
            type="button"
            className="comprovante-btn-imprimir"
            onClick={imprimir}
          >
            🖨 Imprimir
          </button>
        </div>
      </div>
    </div>
  );
}

