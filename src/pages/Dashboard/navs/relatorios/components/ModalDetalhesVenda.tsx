import type { Venda } from "../../../../../types/Venda";
import "./modalDetalhesVenda.css";

interface ModalDetalhesVendaProps {
  aberto: boolean;
  venda: Venda | null;
  onFechar: () => void;
}

export default function ModalDetalhesVenda({
  aberto,
  venda,
  onFechar,
}: ModalDetalhesVendaProps) {
  if (!aberto || !venda) {
    return null;
  }

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div className="modal-produtos-overlay" onClick={onFechar}>
      <div
        className="modal-produtos"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CABEÇALHO */}

        <div className="modal-produtos-header">
          <div>
            <span className="modal-produtos-label">
              VENDA
            </span>

            <h2>Produtos da venda</h2>
          </div>

          <button
            className="modal-produtos-fechar"
            onClick={onFechar}
            type="button"
          >
            ×
          </button>
        </div>

        {/* LISTA DE PRODUTOS */}

        <div className="modal-produtos-conteudo">
          <div className="modal-produtos-titulo">
            <div>
              <h3>Produtos</h3>

              <span>
                {venda.itens.length}{" "}
                {venda.itens.length === 1
                  ? "item"
                  : "itens"}
              </span>
            </div>
          </div>

          <div className="modal-produtos-tabela-wrapper">
            <table className="modal-produtos-tabela">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Qtd.</th>
                  <th>Valor unit.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {venda.itens.map((item, index) => {
                  const subtotal =
                    item.valor * item.quantidade;

                  return (
                    <tr
                      key={`${item.codigoBarras}-${index}`}
                    >
                      <td>
                        <strong>
                          {item.descricao}
                        </strong>
                      </td>

                      <td>
                        {item.quantidade}
                      </td>

                      <td>
                        {formatarMoeda(item.valor)}
                      </td>

                      <td>
                        <strong>
                          {formatarMoeda(subtotal)}
                        </strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* TOTAL */}

        <div className="modal-produtos-footer">
          <div className="modal-produtos-total">
            <span>Total da venda</span>

            <strong>
              {formatarMoeda(venda.total)}
            </strong>
          </div>

          <button
            className="btn-fechar-produtos"
            onClick={onFechar}
            type="button"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}